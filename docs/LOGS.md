# Logging System Documentation

**Split Lease Search Lite - Comprehensive Logging Guide**

## Overview

The Split Lease Search Lite application includes a professional logging system (`js/logger.js`) that provides structured logging, performance tracking, and debugging capabilities. This document covers all aspects of the logging system.

---

## Table of Contents

1. [Logger API](#logger-api)
2. [Log Levels](#log-levels)
3. [Log File Locations](#log-file-locations)
4. [Usage Examples](#usage-examples)
5. [Performance Tracking](#performance-tracking)
6. [Log History](#log-history)
7. [Export Functionality](#export-functionality)
8. [Configuration](#configuration)
9. [Best Practices](#best-practices)
10. [Troubleshooting](#troubleshooting)

---

## Logger API

### Initialization

The logger is automatically initialized and available globally:

```javascript
// Logger is available as window.Logger
const logger = window.Logger;
```

### Core Methods

```javascript
// Log at different levels
Logger.debug(message, data);    // Detailed diagnostic info
Logger.info(message, data);     // General information
Logger.warn(message, data);     // Warning messages
Logger.error(message, data);    // Error messages

// Performance tracking
Logger.startTimer(label);       // Start a timer
Logger.endTimer(label);         // End timer and log duration

// History management
Logger.getHistory(level);       // Get log history, optionally filtered
Logger.getErrors();             // Get error-only history
Logger.clearHistory();          // Clear all history

// Export logs
Logger.exportLogs(format);      // Export as 'json' or 'csv'

// Configuration
Logger.setLevel(level);         // Set minimum log level
Logger.enable();                // Enable logging
Logger.disable();               // Disable logging
Logger.getSystemInfo();         // Get system information
```

---

## Log Levels

The logger supports four log levels in order of severity:

### 1. DEBUG
**Purpose:** Detailed diagnostic information

**Use When:**
- Tracking function execution flow
- Inspecting variable values
- Debugging complex logic
- Development and troubleshooting

**Example:**
```javascript
Logger.debug('Fetching listings from API', {
    endpoint: '/api/listings',
    filters: { borough: 'Manhattan' }
});
```

**Output:**
```
[2025-10-09 14:23:45] [DEBUG] Fetching listings from API
{ endpoint: '/api/listings', filters: { borough: 'Manhattan' } }
```

---

### 2. INFO
**Purpose:** General informational messages

**Use When:**
- Normal application operations
- Successful API calls
- User actions
- State changes

**Example:**
```javascript
Logger.info('Supabase API initialized successfully', {
    listings: 134,
    cacheEnabled: true
});
```

**Output:**
```
[2025-10-09 14:23:46] [INFO] Supabase API initialized successfully
{ listings: 134, cacheEnabled: true }
```

---

### 3. WARN
**Purpose:** Warning messages for potentially problematic situations

**Use When:**
- Deprecated features used
- Non-critical failures
- Performance concerns
- Configuration issues

**Example:**
```javascript
Logger.warn('Using fallback data source', {
    reason: 'Supabase key not configured',
    fallback: 'static data'
});
```

**Output:**
```
[2025-10-09 14:23:47] [WARN] Using fallback data source
{ reason: 'Supabase key not configured', fallback: 'static data' }
```

---

### 4. ERROR
**Purpose:** Error messages for critical issues

**Use When:**
- API failures
- Exceptions and errors
- Critical system failures
- Data validation errors

**Example:**
```javascript
Logger.error('Failed to fetch listings', {
    error: error.message,
    statusCode: 403,
    endpoint: '/api/listings'
});
```

**Output:**
```
[2025-10-09 14:23:48] [ERROR] Failed to fetch listings
{ error: 'Unauthorized', statusCode: 403, endpoint: '/api/listings' }
```

---

## Log File Locations

All logs are stored in the `logs/` directory with timestamped filenames.

### Standard Log Files

#### `logs/stdout_{timestamp}.log`
**Purpose:** Standard output logs from application runtime

**Contents:**
- Normal application output
- Print statements
- Console logs

**Format:** Plain text
**Rotation:** Daily or by file size
**Retention:** 30 days recommended

---

#### `logs/stderr_{timestamp}.log`
**Purpose:** Error output logs

**Contents:**
- Error messages
- Exception stack traces
- System errors

**Format:** Plain text
**Rotation:** Daily or by file size
**Retention:** 90 days recommended

---

#### `logs/runtime_{timestamp}.log`
**Purpose:** Application runtime logs

**Contents:**
- Application lifecycle events
- Performance metrics
- System state changes
- All log levels (DEBUG, INFO, WARN, ERROR)

**Format:** Structured text with timestamps
**Rotation:** Daily
**Retention:** 30 days recommended

---

### Specialized Log Files

#### `logs/security_review_{timestamp}.log`
**Purpose:** Security analysis and review results

**Contents:**
- Security vulnerabilities found
- Code security analysis
- Dependency vulnerabilities
- Recommendations

**Format:** Structured markdown or text
**Rotation:** Per review session
**Retention:** Indefinite (archive)

**Example:**
```
Security Review - 2025-10-09
============================

[MEDIUM] Hardcoded API Key
File: js/database-optimized.js:13
Issue: API key hardcoded in source
Recommendation: Use environment variables

[INFO] .gitignore Enhanced
Change: Added 160 new patterns
Impact: Improved protection of sensitive files
```

---

#### `logs/code_review_{timestamp}.log`
**Purpose:** Code quality review results

**Contents:**
- Code quality metrics
- Architecture analysis
- Best practice violations
- Improvement recommendations

**Format:** Structured markdown or text
**Rotation:** Per review session
**Retention:** Indefinite (archive)

**Example:**
```
Code Review - 2025-10-09
=======================

Files Reviewed: 15
Total Lines: 4,524
Quality Score: 85/100

[PASS] Modular structure
[PASS] Clear naming conventions
[WARN] Test coverage at 60% (target: 80%)
[SUGGESTION] Add JSDoc comments
```

---

#### `logs/test_results_{timestamp}.log`
**Purpose:** Test execution results

**Contents:**
- Test suite results
- Pass/fail counts
- Performance metrics
- Error details

**Format:** Structured text with test results
**Rotation:** Per test run
**Retention:** 30 days recommended

**Example:**
```
Test Results - 2025-10-09 14:30:00
==================================

Test Suite: Supabase API
Tests Run: 18
Passed: 18
Failed: 0
Duration: 1,245ms

✓ API initialization
✓ Fetch all listings (134 results)
✓ Borough filter - Manhattan (45 listings)
...
```

---

## Naming Conventions

### Timestamp Format
- **Date-based:** `YYYY-MM-DD` (e.g., `2025-10-09`)
- **Date-time-based:** `YYYY-MM-DD_HHmmss` (e.g., `2025-10-09_143045`)

### Log File Patterns
```
logs/stdout_2025-10-09.log
logs/stderr_2025-10-09.log
logs/runtime_2025-10-09_143045.log
logs/security_review_2025-10-09.log
logs/code_review_2025-10-09.log
logs/test_results_2025-10-09_143045.log
```

---

## Usage Examples

### Basic Logging

```javascript
// Simple message
Logger.info('Application started');

// With data
Logger.info('User action', {
    action: 'search',
    filters: { borough: 'Brooklyn', bedrooms: 2 }
});

// Debug with detailed data
Logger.debug('API response', {
    status: 200,
    data: responseData,
    headers: responseHeaders
});

// Warning for non-critical issues
Logger.warn('Cache miss', {
    key: 'listings_manhattan',
    willFetchFromAPI: true
});

// Error with exception details
try {
    // ... some code
} catch (error) {
    Logger.error('Operation failed', {
        error: error.message,
        stack: error.stack,
        context: { userId: 123 }
    });
}
```

---

### Performance Tracking

```javascript
// Start a timer
Logger.startTimer('api-fetch');

// Perform operation
const data = await fetchFromAPI();

// End timer and log duration
Logger.endTimer('api-fetch');
// Output: [INFO] Timer 'api-fetch' completed in 245ms
```

#### Advanced Performance Tracking

```javascript
// Multiple timers
Logger.startTimer('total-operation');
Logger.startTimer('step-1');

// Step 1
await doStep1();
Logger.endTimer('step-1');

Logger.startTimer('step-2');
// Step 2
await doStep2();
Logger.endTimer('step-2');

Logger.endTimer('total-operation');

// Output:
// [INFO] Timer 'step-1' completed in 120ms
// [INFO] Timer 'step-2' completed in 95ms
// [INFO] Timer 'total-operation' completed in 215ms
```

---

### History Management

```javascript
// Get all logs
const allLogs = Logger.getHistory();
console.log(`Total logs: ${allLogs.length}`);

// Get only errors
const errors = Logger.getErrors();
console.log(`Total errors: ${errors.length}`);

// Get specific level
const warnings = Logger.getHistory('WARN');
console.log(`Total warnings: ${warnings.length}`);

// Clear history
Logger.clearHistory();
console.log('Log history cleared');
```

---

### Export Functionality

```javascript
// Export as JSON
const jsonLogs = Logger.exportLogs('json');
// Downloads: logs_export_2025-10-09_143045.json

// Export as CSV
const csvLogs = Logger.exportLogs('csv');
// Downloads: logs_export_2025-10-09_143045.csv
```

#### JSON Export Format
```json
{
  "exportDate": "2025-10-09T14:30:45.123Z",
  "totalLogs": 245,
  "systemInfo": {
    "browser": "Chrome",
    "version": "120.0",
    "platform": "Windows"
  },
  "logs": [
    {
      "timestamp": "2025-10-09T14:23:45.123Z",
      "level": "INFO",
      "message": "Application started",
      "data": null
    },
    ...
  ]
}
```

#### CSV Export Format
```csv
Timestamp,Level,Message,Data
2025-10-09T14:23:45.123Z,INFO,Application started,
2025-10-09T14:23:46.456Z,DEBUG,Fetching data,"{\"endpoint\": \"/api/listings\"}"
...
```

---

## Configuration

### Set Log Level

Control which logs are displayed based on severity:

```javascript
// Show all logs (DEBUG and above)
Logger.setLevel('DEBUG');

// Show INFO and above (hide DEBUG)
Logger.setLevel('INFO');

// Show WARN and above (hide DEBUG and INFO)
Logger.setLevel('WARN');

// Show only ERROR
Logger.setLevel('ERROR');
```

**Log Level Hierarchy:**
```
ERROR > WARN > INFO > DEBUG
```

If you set level to `INFO`, you'll see:
- ✅ INFO
- ✅ WARN
- ✅ ERROR
- ❌ DEBUG (hidden)

---

### Enable/Disable Logger

```javascript
// Disable all logging
Logger.disable();
console.log(Logger.isEnabled); // false

// Enable logging
Logger.enable();
console.log(Logger.isEnabled); // true
```

**Use Cases:**
- Disable in production for performance
- Enable for debugging specific issues
- Toggle via environment variables

---

### System Information

```javascript
const sysInfo = Logger.getSystemInfo();
console.log(sysInfo);

// Output:
// {
//   browser: "Chrome",
//   version: "120.0.6099.130",
//   platform: "Win32",
//   userAgent: "Mozilla/5.0 ...",
//   language: "en-US",
//   timestamp: "2025-10-09T14:30:45.123Z"
// }
```

---

## Best Practices

### 1. Use Appropriate Log Levels

```javascript
// ✅ GOOD: Use DEBUG for detailed diagnostics
Logger.debug('Function called', { params: { id: 123, action: 'update' } });

// ❌ BAD: Using INFO for everything
Logger.info('Function called', { params: { id: 123, action: 'update' } });
```

### 2. Include Context in Data

```javascript
// ✅ GOOD: Rich context
Logger.error('API call failed', {
    endpoint: '/api/listings',
    method: 'GET',
    statusCode: 500,
    error: error.message,
    timestamp: new Date().toISOString()
});

// ❌ BAD: Minimal context
Logger.error('Error', error.message);
```

### 3. Use Performance Timers

```javascript
// ✅ GOOD: Track performance
Logger.startTimer('database-query');
const results = await db.query();
Logger.endTimer('database-query');

// ❌ BAD: Manual timing
const start = Date.now();
const results = await db.query();
console.log(`Took ${Date.now() - start}ms`);
```

### 4. Sanitize Sensitive Data

```javascript
// ✅ GOOD: Remove sensitive data
Logger.info('User authenticated', {
    userId: user.id,
    email: user.email.replace(/(.{2}).*@/, '$1***@')
});

// ❌ BAD: Logging sensitive data
Logger.info('User authenticated', {
    userId: user.id,
    email: user.email,
    password: user.password  // NEVER LOG PASSWORDS!
});
```

### 5. Clean Up History

```javascript
// ✅ GOOD: Clear history periodically
if (Logger.getHistory().length > 1000) {
    Logger.clearHistory();
    Logger.info('Log history cleared due to size limit');
}

// ❌ BAD: Let history grow indefinitely
// (Can cause memory issues)
```

---

## Production Considerations

### Log Level in Production

```javascript
// Set based on environment
if (window.ENV?.PRODUCTION) {
    Logger.setLevel('WARN');  // Only warnings and errors
} else {
    Logger.setLevel('DEBUG');  // All logs in development
}
```

### Performance Impact

- **DEBUG:** ~1ms per log (negligible)
- **INFO:** ~0.5ms per log
- **WARN/ERROR:** ~0.5ms per log
- **History Storage:** ~100 bytes per log entry

**Recommendation:** In production, set level to WARN to reduce overhead.

### Storage Limits

Browser memory limits for history:
- **Recommended:** Max 1,000 log entries
- **Maximum:** Max 10,000 log entries
- **Action:** Clear history when limit reached

```javascript
const MAX_LOGS = 1000;
if (Logger.getHistory().length > MAX_LOGS) {
    Logger.exportLogs('json');  // Save before clearing
    Logger.clearHistory();
}
```

---

## Troubleshooting

### Logger Not Working

**Problem:** Logs not appearing in console

**Solutions:**
1. Check if logger is enabled:
   ```javascript
   console.log(Logger.isEnabled);  // Should be true
   Logger.enable();
   ```

2. Check log level:
   ```javascript
   Logger.setLevel('DEBUG');  // Show all logs
   ```

3. Verify browser console is open

4. Check for JavaScript errors:
   ```javascript
   console.log(window.Logger);  // Should be defined
   ```

---

### Performance Issues

**Problem:** Application running slowly with logging enabled

**Solutions:**
1. Reduce log level:
   ```javascript
   Logger.setLevel('WARN');  // Only warnings and errors
   ```

2. Clear history regularly:
   ```javascript
   setInterval(() => {
       if (Logger.getHistory().length > 1000) {
           Logger.clearHistory();
       }
   }, 60000);  // Every minute
   ```

3. Disable in production:
   ```javascript
   if (window.ENV?.PRODUCTION) {
       Logger.disable();
   }
   ```

---

### Export Not Working

**Problem:** Export button doesn't download file

**Solutions:**
1. Check browser download permissions
2. Verify popup blocker isn't blocking download
3. Try different format:
   ```javascript
   // Try CSV instead of JSON
   Logger.exportLogs('csv');
   ```

4. Check browser console for errors

---

### Memory Issues

**Problem:** Browser consuming too much memory

**Solutions:**
1. Clear log history:
   ```javascript
   Logger.clearHistory();
   ```

2. Reduce history limit:
   ```javascript
   // In logger.js, modify maxHistorySize
   this.maxHistorySize = 500;  // Default is 1000
   ```

3. Export and clear regularly:
   ```javascript
   setInterval(() => {
       Logger.exportLogs('json');
       Logger.clearHistory();
   }, 3600000);  // Every hour
   ```

---

## Integration Examples

### With Supabase API

```javascript
// In supabase-api.js
async fetchListings() {
    Logger.startTimer('supabase-fetch');
    Logger.debug('Fetching listings from Supabase', {
        endpoint: this.baseUrl
    });

    try {
        const response = await fetch(this.endpoint, this.options);

        if (!response.ok) {
            Logger.error('Supabase fetch failed', {
                status: response.status,
                statusText: response.statusText
            });
            throw new Error(`HTTP ${response.status}`);
        }

        const data = await response.json();
        Logger.info('Listings fetched successfully', {
            count: data.length,
            cached: false
        });

        Logger.endTimer('supabase-fetch');
        return data;

    } catch (error) {
        Logger.error('Supabase error', {
            error: error.message,
            stack: error.stack
        });
        Logger.endTimer('supabase-fetch');
        throw error;
    }
}
```

---

### With Test Suite

```javascript
// In test files
function runTests() {
    Logger.info('Starting test suite', { suite: 'Supabase API' });
    Logger.startTimer('test-suite');

    tests.forEach(test => {
        Logger.debug('Running test', { name: test.name });

        try {
            test.run();
            Logger.info('Test passed', { name: test.name });
        } catch (error) {
            Logger.error('Test failed', {
                name: test.name,
                error: error.message
            });
        }
    });

    Logger.endTimer('test-suite');
    Logger.info('Test suite completed');
}
```

---

## Related Documentation

- [STRUCTURE.md](STRUCTURE.md) - Project structure (includes /logs directory)
- [SUPABASE_SETUP.md](SUPABASE_SETUP.md) - Supabase setup (uses logger)
- [tests/README.md](../tests/README.md) - Test suite (test-logger.html)
- [js/logger.js](../js/logger.js) - Logger source code

---

## Summary

The logging system provides:

- **Four log levels**: DEBUG, INFO, WARN, ERROR
- **Performance tracking**: Built-in timers
- **History management**: Store and filter logs
- **Export capability**: JSON and CSV formats
- **Configuration**: Enable/disable, set levels
- **System info**: Browser and environment details

**Key Files:**
- `js/logger.js` - Logger implementation (349 lines)
- `logs/*.log` - Log output files
- `tests/test-logger.html` - Logger test suite (15 tests)

**Usage:**
```javascript
Logger.info('Message', { data });
Logger.startTimer('label');
Logger.endTimer('label');
Logger.exportLogs('json');
```

---

**Last Updated:** 2025-10-09
**Version:** 1.0.0
**Author:** Development Team
