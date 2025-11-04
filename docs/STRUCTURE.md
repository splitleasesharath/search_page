# Project Structure Documentation

**Split Lease Search Lite - File and Directory Organization**

## Overview

This document describes the complete file and directory structure of the Split Lease Search Lite project. The project follows a modular organization pattern with clear separation of concerns.

---

## Directory Tree

```
search_lite/
├── assets/              # Static assets (images, icons, media)
├── changelog/           # Timestamped change logs
├── context/             # Chronological execution records
├── css/                 # Stylesheets
├── deprecated/          # Outdated versions with deprecation logs
├── docs/                # Static documentation
├── js/                  # JavaScript modules
├── logs/                # Runtime logs, reviews, test results
├── scripts/             # Utility scripts
├── tests/               # Test files and validation scripts
├── .git/                # Git version control (hidden)
├── .gitignore           # Git ignore patterns
├── index.html           # Main application entry point
├── README.md            # Primary project documentation
└── [various test HTML files and documentation]
```

---

## Directory Details

### `/assets`
**Purpose:** Static assets for the application

**Contents:**
- Images and graphics
- Icons and logos
- SVG files
- Placeholder images
- Media files

**Usage:**
- Referenced by HTML and CSS
- Cacheable static content
- No dynamic generation

**Notes:**
- Keep organized by type (icons/, images/, etc.)
- Optimize images for web delivery
- Use descriptive filenames

---

### `/changelog`
**Purpose:** Timestamped change logs documenting development history

**Contents:**
- `2025-10-09_changes.md` - October 9th session changes
- Future dated change logs

**Naming Convention:**
- Format: `YYYY-MM-DD_changes.md`
- One file per major development session
- Chronologically ordered

**Usage:**
- Track changes over time
- Document features, fixes, and breaking changes
- Reference for release notes
- Audit trail for development

**Best Practices:**
- Create new file for each session
- Include file counts and line counts
- Document breaking changes clearly
- Link to related commits

---

### `/context`
**Purpose:** Chronological execution records and session analysis

**Contents:**
- `2025-10-09_initial_analysis.md` - Session analysis and findings
- Future context files from development sessions

**Naming Convention:**
- Format: `YYYY-MM-DD_description.md`
- Descriptive names for easy reference

**Usage:**
- Document thought process and decisions
- Record API investigations
- Track problem-solving approaches
- Preserve institutional knowledge

**Best Practices:**
- Create at start of major sessions
- Document discoveries and insights
- Include code snippets and examples
- Reference external resources

---

### `/css`
**Purpose:** Stylesheets for visual presentation

**Contents:**
- `styles.css` - Main desktop styles
- `responsive.css` - Mobile and tablet responsive styles
- Future component-specific stylesheets

**Organization:**
- Desktop-first approach
- Responsive overrides in separate file
- CSS variables for theming
- Modular component styles

**Usage:**
- Imported in `index.html` and test files
- Maintain visual consistency
- Responsive design implementation

**Best Practices:**
- Use CSS variables for colors and spacing
- Keep responsive styles separate
- Comment complex selectors
- Minimize specificity conflicts

---

### `/deprecated`
**Purpose:** Archive for outdated code and deprecated features

**Contents:**
- Old database files (if any)
- Deprecated API implementations
- Outdated components
- Deprecation logs explaining why code was removed

**Naming Convention:**
- Keep original filename
- Add deprecation log: `DEPRECATED_filename.md`
- Include deprecation date

**Usage:**
- Reference for migration
- Understand historical decisions
- Prevent accidental reintroduction
- Compliance and audit requirements

**Best Practices:**
- Always include deprecation reason
- Document migration path
- Set removal date
- Never use in production

---

### `/docs`
**Purpose:** Static documentation and guides

**Contents:**
- `STRUCTURE.md` (this file) - Project structure documentation
- `LOGS.md` - Logging system documentation
- `SUPABASE_SETUP.md` - Supabase setup guide
- `HANDOFF.md` - Project handoff documentation
- `FINAL_CHECKLIST.md` - Pre-deployment checklist
- Future documentation files

**Organization:**
- One topic per file
- Clear, descriptive filenames
- Cross-reference related docs

**Usage:**
- Onboarding new developers
- Reference during development
- Production setup guides
- Troubleshooting resources

**Best Practices:**
- Keep docs updated with code changes
- Use markdown for formatting
- Include code examples
- Add table of contents for long docs

---

### `/js`
**Purpose:** JavaScript modules and application logic

**Contents:**

#### Core Application Files
- `app.js` - Main application logic
- `data.js` - Static listing data (legacy)
- `config.js` - Application configuration
- `config.local.js` - Local environment config (git-ignored)

#### Database/API Integration
- `supabase-api.js` (585 lines) - Supabase API client
- `bubble-api.js` - Bubble.io API integration
- `database.js` - Generic database interface
- `database-optimized.js` - Optimized database operations
- `local-database.js` - IndexedDB local storage
- `load-database-data.js` - Database data loading
- `load-real-data.js` - Real data loading utilities

#### Utilities
- `logger.js` (349 lines) - Logging system
- `image-handler.js` - Image loading and caching

**Organization:**
- One module per file
- Clear separation of concerns
- Export pattern for reusability

**Usage:**
- Imported via `<script>` tags
- Module pattern for encapsulation
- Global variables on `window` object when needed

**Best Practices:**
- Use descriptive function names
- Comment complex logic
- Handle errors gracefully
- Keep modules focused and cohesive

---

### `/logs`
**Purpose:** Runtime logs, security reviews, code reviews, test results

**Contents:**
- `stdout_{timestamp}.log` - Standard output logs
- `stderr_{timestamp}.log` - Error output logs
- `runtime_{timestamp}.log` - Application runtime logs
- `security_review_{timestamp}.log` - Security analysis results
- `code_review_{timestamp}.log` - Code quality reviews
- `test_results_{timestamp}.log` - Test execution results

**Naming Convention:**
- Format: `{type}_{timestamp}.log`
- Timestamp: `YYYY-MM-DD` or `YYYY-MM-DD_HHmmss`
- Type: Descriptive category

**Usage:**
- Debugging and troubleshooting
- Performance analysis
- Security audits
- Quality assurance
- Compliance and audit trails

**Best Practices:**
- Automated log rotation
- Do not commit logs to git (ignored)
- Review logs regularly
- Archive old logs if needed
- Use consistent timestamp format

**Log Levels:**
- DEBUG: Detailed diagnostic information
- INFO: General informational messages
- WARN: Warning messages (non-critical issues)
- ERROR: Error messages (critical issues)

---

### `/scripts`
**Purpose:** Utility scripts for development and maintenance

**Contents:**
- `clean-repo.sh` - Repository cleanup script
- Future automation scripts

**Organization:**
- Shell scripts for Unix/Mac
- Batch files for Windows (if needed)
- Documentation in script headers

**Usage:**
- Run manually or via CI/CD
- Automate repetitive tasks
- Maintenance operations

**Best Practices:**
- Make scripts executable (`chmod +x`)
- Include usage instructions in header
- Use `--dry-run` for safety
- Test before running on production
- Version control all scripts

---

### `/tests`
**Purpose:** All test files and validation scripts

**Contents:**

#### HTML Test Files
- `test-supabase-api.html` - Supabase API tests (18 tests)
- `test-logger.html` - Logger system tests (15 tests)
- `test-integration.html` - Integration tests (10 tests)

#### Validation Scripts
- `run-validation.js` (445 lines) - Automated validation (57 checks)

#### Documentation
- `README.md` (274 lines) - Test suite documentation

**Organization:**
- Browser-based HTML tests
- Node.js validation scripts
- Comprehensive documentation

**Usage:**
- Open HTML files in browser to run tests
- Run validation script with Node.js
- Export test results for reporting
- CI/CD integration (future)

**Best Practices:**
- Run tests before commits
- Keep tests updated with code changes
- Document test coverage
- Export results for records

---

## Root Level Files

### Configuration Files

#### `.gitignore` (240 lines)
**Purpose:** Specify files to exclude from version control

**Includes:**
- Node modules and dependencies
- Environment files (config.local.js)
- Database files (*.db, *.sqlite)
- Log files (logs/*)
- OS-specific files (.DS_Store)
- IDE files (.vscode/, .idea/)
- Build artifacts

**Best Practices:**
- Keep comprehensive and up-to-date
- Comment sections for clarity
- Never commit sensitive data

---

### HTML Files

#### `index.html`
**Purpose:** Main application entry point

**Features:**
- Complete listing search interface
- Responsive design
- Google Maps integration
- Filter and sort functionality

**Usage:**
- Open directly in browser
- Serve via local development server
- Deploy to web hosting

---

#### Test HTML Files (Root Level)
- `test-bubble-api.html` - Bubble API testing
- `test-api-simple.html` - Simple API tests
- `test-listingoptimized.html` - Optimized listing tests
- `test-database-sync.html` - Database sync tests
- `test.html` - General testing

**Note:** These may be candidates for consolidation or deprecation in favor of `/tests` directory.

---

### Documentation Files

#### `README.md`
**Purpose:** Primary project documentation

**Sections:**
- Features overview
- Setup instructions
- File structure
- Testing guide
- Customization tips
- Browser support

**Usage:**
- First stop for new developers
- GitHub project landing page
- Quick reference guide

---

#### Other Documentation
- `ENV_SETUP_GUIDE.md` - Environment setup
- `DATABASE_SCHEMA.md` - Database structure
- `BUBBLE_SETUP.md` - Bubble.io setup
- `BUBBLE_API_FIELDS.md` - API field reference
- `README_DEPLOYMENT.md` - Deployment guide
- `GITHUB_AUTH.md` - GitHub authentication
- `comprehensive-test-results.md` - Test results
- `original-vs-local-comparison.md` - Comparison docs
- `test-results-summary.md` - Test summary

**Note:** Many of these could be consolidated into `/docs` directory for better organization.

---

### Build and Configuration Files

#### `build-cloudflare.js`
**Purpose:** Cloudflare deployment build script

**Usage:**
- Generate optimized build for Cloudflare Pages
- Bundle and minify assets

---

#### `parallel-test.js` & `sequential-mcp-test.js`
**Purpose:** MCP (Model Context Protocol) testing scripts

**Usage:**
- Test MCP integrations
- Development and debugging

---

## File Organization Best Practices

### Naming Conventions

1. **Files:** `lowercase-with-hyphens.js`
2. **Directories:** `lowercase/` (no hyphens)
3. **Logs:** `type_YYYY-MM-DD.log`
4. **Changelogs:** `YYYY-MM-DD_changes.md`
5. **Context:** `YYYY-MM-DD_description.md`

### Directory Guidelines

1. **Flat Structure:** Avoid deep nesting (max 2-3 levels)
2. **Clear Naming:** Directory names indicate purpose
3. **Separation:** Keep similar files together
4. **Documentation:** README.md in directories with many files

### Code Organization

1. **Modularity:** One module/component per file
2. **Dependencies:** Clear import/export patterns
3. **Configuration:** Environment-specific in config.local.js
4. **Comments:** Explain complex logic and decisions

### Documentation Standards

1. **Markdown:** Use `.md` for all documentation
2. **Headers:** Clear hierarchy with # ## ###
3. **Code Blocks:** Use ``` for code examples
4. **Links:** Cross-reference related documentation

---

## Adding New Files

### Process

1. **Determine Category:** Which directory fits best?
2. **Follow Naming:** Use established conventions
3. **Update Documentation:** Add to this file if significant
4. **Add to .gitignore:** If file contains sensitive data
5. **Create Tests:** If file contains logic
6. **Document Usage:** Comment code or create guide

### Checklist

- [ ] File in correct directory
- [ ] Follows naming convention
- [ ] Added to .gitignore if sensitive
- [ ] Documented in relevant README
- [ ] Tests created (if applicable)
- [ ] Updated STRUCTURE.md (if significant)

---

## Cleanup and Maintenance

### Regular Tasks

1. **Remove Unused Files:** Archive or delete
2. **Consolidate Documentation:** Move to `/docs`
3. **Update .gitignore:** Add new patterns as needed
4. **Archive Old Logs:** Move to external storage
5. **Review Deprecated:** Remove after grace period

### Scripts

- `scripts/clean-repo.sh` - Automated cleanup
  - Removes database files
  - Cleans log files
  - Archives deprecated code

---

## Future Improvements

### Planned Organization Changes

1. **Consolidate Documentation:** Move all .md files to `/docs`
2. **Organize Tests:** Move all test HTML to `/tests`
3. **Component Structure:** Create `/js/components` for UI
4. **Utilities:** Create `/js/utils` for helpers
5. **Constants:** Create `/js/constants` for config

### Tool Integration

1. **Module Bundler:** Webpack or Rollup
2. **Linting:** ESLint for code quality
3. **Testing:** Jest or Mocha for unit tests
4. **Documentation:** JSDoc for API docs

---

## Related Documentation

- [README.md](../README.md) - Main project documentation
- [LOGS.md](LOGS.md) - Logging system documentation
- [SUPABASE_SETUP.md](SUPABASE_SETUP.md) - Supabase configuration
- [tests/README.md](../tests/README.md) - Test suite guide
- [changelog/2025-10-09_changes.md](../changelog/2025-10-09_changes.md) - Recent changes

---

## Summary

The Split Lease Search Lite project follows a clear organizational structure:

- **Source Code:** `/js`, `/css`, `/assets`
- **Testing:** `/tests` with comprehensive suite
- **Documentation:** `/docs`, `/context`, `/changelog`
- **Operations:** `/logs`, `/scripts`
- **Legacy:** `/deprecated`

This structure supports:
- Easy navigation and file discovery
- Clear separation of concerns
- Scalability for future growth
- Maintainability over time

---

**Last Updated:** 2025-10-09
**Version:** 1.0.0
**Maintained By:** Development Team
