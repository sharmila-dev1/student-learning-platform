This file records the relevant errors observed during development. No secrets, credentials, access tokens, or production database connection strings should be added here.

## 1. Deployed `/api/courses` returned HTTP 500

**Observed message**
```
Get courses error: Operation `courses.find()` buffering timed out after 10000ms
```

**Impact:** The deployed home page loaded, but the Courses page showed an internal server error.

**Diagnosis:** The Vercel backend entry point imported `server.js`. The database connection was inside a direct-execution guard in `server.js`, so the connection wasn't initiated by that import path before the course controller queried MongoDB.

**Fix:** The Vercel entry point was updated to await the database connection before forwarding requests to Express. The database helper was changed to allow errors to propagate to the entry point.

**Verification:** The developer reported that the deployed Courses page/API worked after the change.

## 2. MongoDB Memory Server test setup timeout
**Observed messages**
```
Error: Hook timed out in 10000ms.
```
and, after raising the hook timeout:
```
Error: Hook timed out in 30000ms.
```

**Location:** `backend/tests/courses.test.js`, in the `beforeAll` setup that creates MongoDB Memory Server and connects Mongoose.

**Investigation note:** Startup can be slow if the MongoDB binary needs to be downloaded or if the environment blocks the download. Raising the timeout alone did not resolve the first repeat attempt.

**Test separation:** The frontend Vitest configuration was updated to discover only tests under `src/`. This prevents the frontend test command from attempting to run backend tests.

**Final reported status:** The developer subsequently reported that the frontend tests passed and the backend tests passed when run separately.
