#!/bin/bash

################################################################################
# Clean Repository Script - Split Lease Search Lite
################################################################################
#
# Purpose: Remove files that should not be in the repository
#   - Database files (*.db)
#   - Binary installers (*.msi, *.exe, gh.msi)
#   - Large zip files (cloudflare-upload.zip if > 10MB)
#   - Python cache (__pycache__)
#   - Temporary files
#   - Log files (keep directory structure)
#
# Usage:
#   ./scripts/clean-repo.sh           # Dry run (show what would be deleted)
#   ./scripts/clean-repo.sh --execute # Actually delete files
#   ./scripts/clean-repo.sh --help    # Show help
#
# IMPORTANT: This script will NOT execute deletions without --execute flag
#            Review the dry run output before executing!
#
# Version: 1.0.0
# Created: 2025-10-09
################################################################################

set -e  # Exit on error

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
CYAN='\033[0;36m'
NC='\033[0m' # No Color

# Configuration
EXECUTE=false
SCRIPT_DIR="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"
PROJECT_ROOT="$(cd "$SCRIPT_DIR/.." && pwd)"

################################################################################
# Functions
################################################################################

print_header() {
    echo -e "${CYAN}========================================================================${NC}"
    echo -e "${CYAN}$1${NC}"
    echo -e "${CYAN}========================================================================${NC}"
}

print_info() {
    echo -e "${BLUE}[INFO]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[SUCCESS]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

show_help() {
    cat << EOF
Clean Repository Script - Split Lease Search Lite

USAGE:
    ./scripts/clean-repo.sh [OPTIONS]

OPTIONS:
    --execute       Actually delete files (default is dry run)
    --help          Show this help message

DESCRIPTION:
    This script removes files that should not be in the repository:

    1. Database files (*.db, *.sqlite, *.sqlite3)
    2. Binary installers (*.msi, *.exe, gh.msi)
    3. Large archives (cloudflare-upload.zip if > 10MB)
    4. Python cache (__pycache__/, *.pyc)
    5. Temporary files (tmp/, temp/, *.tmp)
    6. Log files (*.log, but keeps directory structure)
    7. Backup files (*_backup.*, backup_*)
    8. OS-specific files (.DS_Store, Thumbs.db)

EXAMPLES:
    # Dry run (safe, shows what would be deleted)
    ./scripts/clean-repo.sh

    # Execute deletion (requires confirmation)
    ./scripts/clean-repo.sh --execute

SAFETY:
    - Default mode is DRY RUN (no files deleted)
    - Requires explicit --execute flag to delete
    - Shows confirmation prompt before deletion
    - Lists all files that will be deleted
    - Skips .gitkeep files (preserves directory structure)

EOF
}

confirm_execution() {
    echo ""
    echo -e "${YELLOW}========================================================================${NC}"
    echo -e "${YELLOW}WARNING: You are about to DELETE files from the repository!${NC}"
    echo -e "${YELLOW}========================================================================${NC}"
    echo ""
    read -p "Are you sure you want to proceed? (type 'yes' to confirm): " -r
    echo ""
    if [[ ! $REPLY =~ ^yes$ ]]; then
        print_info "Deletion cancelled by user"
        exit 0
    fi
}

check_if_in_git() {
    if [ -d "$PROJECT_ROOT/.git" ]; then
        print_warning "Git repository detected"
        print_warning "These files may be tracked in git history"
        print_info "Consider using: git rm --cached <file>"
        echo ""
    fi
}

remove_files() {
    local pattern="$1"
    local description="$2"
    local count=0

    print_info "Searching for: $description"

    # Find files matching pattern
    while IFS= read -r -d '' file; do
        # Skip .gitkeep files
        if [[ $(basename "$file") == ".gitkeep" ]]; then
            continue
        fi

        if [ "$EXECUTE" = true ]; then
            rm -f "$file"
            print_success "Deleted: $file"
        else
            echo "  Would delete: $file"
        fi
        ((count++))
    done < <(find "$PROJECT_ROOT" -type f -name "$pattern" -print0 2>/dev/null)

    if [ $count -eq 0 ]; then
        echo "  None found"
    else
        echo "  Total: $count files"
    fi
    echo ""
}

remove_directories() {
    local pattern="$1"
    local description="$2"
    local count=0

    print_info "Searching for: $description"

    # Find directories matching pattern
    while IFS= read -r -d '' dir; do
        if [ "$EXECUTE" = true ]; then
            rm -rf "$dir"
            print_success "Deleted directory: $dir"
        else
            echo "  Would delete directory: $dir"
        fi
        ((count++))
    done < <(find "$PROJECT_ROOT" -type d -name "$pattern" -print0 2>/dev/null)

    if [ $count -eq 0 ]; then
        echo "  None found"
    else
        echo "  Total: $count directories"
    fi
    echo ""
}

remove_large_files() {
    local min_size_mb=$1
    local description="$2"
    local count=0

    print_info "Searching for: $description (> ${min_size_mb}MB)"

    # Find files larger than specified size
    while IFS= read -r -d '' file; do
        if [ "$EXECUTE" = true ]; then
            rm -f "$file"
            print_success "Deleted: $file"
        else
            local size=$(du -h "$file" | cut -f1)
            echo "  Would delete: $file ($size)"
        fi
        ((count++))
    done < <(find "$PROJECT_ROOT" -type f -size +${min_size_mb}M -print0 2>/dev/null)

    if [ $count -eq 0 ]; then
        echo "  None found"
    else
        echo "  Total: $count files"
    fi
    echo ""
}

################################################################################
# Main Execution
################################################################################

# Parse arguments
for arg in "$@"; do
    case $arg in
        --execute)
            EXECUTE=true
            shift
            ;;
        --help|-h)
            show_help
            exit 0
            ;;
        *)
            print_error "Unknown option: $arg"
            echo "Use --help for usage information"
            exit 1
            ;;
    esac
done

# Print header
print_header "Repository Cleanup Script"
echo ""
print_info "Project root: $PROJECT_ROOT"

if [ "$EXECUTE" = true ]; then
    print_warning "MODE: EXECUTE (files will be deleted)"
    confirm_execution
else
    print_info "MODE: DRY RUN (no files will be deleted)"
    print_info "Use --execute flag to actually delete files"
fi

echo ""
check_if_in_git

# Start cleanup
print_header "1. DATABASE FILES"
remove_files "*.db" "SQLite database files"
remove_files "*.db-journal" "SQLite journal files"
remove_files "*.db-shm" "SQLite shared memory files"
remove_files "*.db-wal" "SQLite WAL files"
remove_files "*.sqlite" "SQLite database files (.sqlite)"
remove_files "*.sqlite3" "SQLite database files (.sqlite3)"

print_header "2. BINARY INSTALLERS"
remove_files "*.msi" "Windows installers (.msi)"
remove_files "*.exe" "Windows executables (.exe)"
remove_files "gh.msi" "GitHub CLI installer"

print_header "3. LARGE ARCHIVES"
remove_large_files 10 "Large zip files"

print_header "4. PYTHON CACHE"
remove_directories "__pycache__" "Python cache directories"
remove_files "*.pyc" "Python compiled files"
remove_files "*.pyo" "Python optimized files"
remove_files "*.pyd" "Python DLL files"

print_header "5. TEMPORARY FILES"
remove_directories "tmp" "tmp directories"
remove_directories "temp" "temp directories"
remove_directories "temp_repo" "temp_repo directories"
remove_files "*.tmp" "Temporary files (.tmp)"
remove_files "*.temp" "Temporary files (.temp)"
remove_files "*.cache" "Cache files"

print_header "6. LOG FILES"
remove_files "*.log" "Log files (keeps directory structure)"

print_header "7. BACKUP FILES"
remove_files "*_backup.*" "Backup files (*_backup.*)"
remove_files "backup_*" "Backup files (backup_*)"
remove_files "*.bak" "Backup files (*.bak)"
remove_files "*.orig" "Original files (*.orig)"
remove_files "*.old" "Old files (*.old)"

print_header "8. OS-SPECIFIC FILES"
remove_files ".DS_Store" "macOS .DS_Store files"
remove_files "Thumbs.db" "Windows Thumbs.db files"
remove_files "desktop.ini" "Windows desktop.ini files"
remove_files "._*" "macOS resource fork files"

print_header "9. NODE_MODULES (If Empty or Corrupted)"
# Only list, don't auto-delete as it may be intentional
if [ -d "$PROJECT_ROOT/node_modules" ]; then
    local size=$(du -sh "$PROJECT_ROOT/node_modules" 2>/dev/null | cut -f1)
    print_info "node_modules directory exists ($size)"
    print_info "To remove manually: rm -rf node_modules"
fi
echo ""

# Summary
print_header "CLEANUP SUMMARY"
if [ "$EXECUTE" = true ]; then
    print_success "Cleanup complete! Files have been deleted."
    print_info "Git cache cleanup (if needed):"
    echo "  git rm --cached *.db"
    echo "  git rm --cached *.msi"
    echo "  git commit -m 'Remove ignored files from git cache'"
else
    print_info "Dry run complete. No files were deleted."
    print_info "To execute deletion, run:"
    echo "  ./scripts/clean-repo.sh --execute"
fi

echo ""
print_header "NEXT STEPS"
print_info "1. Review the list of files above"
print_info "2. Ensure .gitignore is updated to prevent re-addition"
print_info "3. Run 'git status' to see if any files are tracked"
print_info "4. Use 'git rm --cached <file>' to untrack files"
print_info "5. Commit changes to .gitignore"
echo ""

exit 0
