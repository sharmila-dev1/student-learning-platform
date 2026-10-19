## 1. Purpose
The objective was to exercise frontend components and backend REST endpoints, verify important request handling and authorization behavior, debug a deployment failure, and record a performance optimization.

## 2. Tools
- Vitest: test runner
- React Testing Library and jest-dom: frontend component rendering and assertions
- jsdom: browser-like test environment for frontend tests
- Supertest: HTTP requests against the Express application without starting a separate listener
- MongoDB Memory Server and Mongoose: isolated database for course endpoint tests
- Browser Developer Tools and Vercel Runtime Logs: investigation of deployed API failures

## 3. Automated test cases

### Frontend
| Test | Rationale | Expected result |
|---|---|---|
| Welcome heading renders | Confirms the React Testing Library and jsdom setup can render and inspect a component | Heading “Welcome to LearnHub” is present |

Source: `src/tests/example.test.jsx`.

### Backend
| Test | Rationale | Expected result |
|------|-----|------|
| Root endpoint status | Confirms the API app responds | HTTP 200 |
| Root endpoint JSON | Confirms response format | JSON content type |
| Unknown route | Confirms unknown paths are handled | HTTP 404 |
| Registration with empty body | Checks basic request validation | Rejected with HTTP 400 or 422 |
| Login with empty body | Checks missing credentials are rejected | Rejected |
| Course listing | Confirms course retrieval and response structure | HTTP 200, count, array, test course |
| Create course without authentication | Checks protected route access | HTTP 401 or 403 |
| Create course with invalid token | Checks invalid authentication is rejected | Rejected |
| Invalid course ID | Checks malformed/nonexistent ID handling | HTTP 400 or 404 |
| Update without authentication | Checks update route protection | HTTP 401 or 403 |
| Delete without authentication | Checks delete route protection | HTTP 401 or 403 |

Sources: `backend/tests/app.test.js` and `backend/tests/courses.test.js`.

## 4. Execution commands
From the project root:
```
npm install
npm run test:run
```

From the backend directory:
```
cd backend
npm install
npm run test:run
```

For the production frontend build:
```
npm run build
```

## 5. Observed issues and resolutions

### Issue A — deployed course API returned HTTP 500
**Observed error:** `Operation courses.find() buffering timed out after 10000ms`.

**Investigation:** Browser Network tools identified the failing request as `/api/courses`. The Vercel configuration routed requests to the backend `index.js`. That entry point imported `server.js`, but `server.js` called `connectDB()` only when run directly. Under an import, the direct-execution guard did not run.

**Resolution:** The backend Vercel entry point was changed to call and await `connectDB()` before forwarding the request to the Express app. The database helper was adjusted to propagate connection errors. The developer then confirmed the deployed Courses page and API worked.

**Lesson:** A traditional long-running server startup flow and a serverless function entry point are not interchangeable. Database initialization must happen in the request-serving path and should reuse a connection where possible.

### Issue B — backend course test setup hook timed out
**Observed error:** `Hook timed out in 10000ms` at `MongoMemoryServer.create()` and then a repeat timeout at 30000ms.

**Resolution/status:** The frontend test configuration was restricted to files under `src/`, which stopped the frontend test command from discovering backend tests. The developer subsequently reported that frontend tests passed and later reported that the backend test command passed when run separately. The timeout can still occur on environments where MongoDB Memory Server cannot download or launch its binary, so review the latest terminal output if it recurs.

**Lesson:** Separate test commands and configuration scopes help avoid mixing browser-like frontend tests with Node/database backend tests.

## 6. Manual integration checks
The deployed website was tested and that the course page loaded after the deployment fix. For future check:

1. Register a new test student.
2. Log in and verify dashboard access.
3. Browse courses and open course details.
4. Enroll and verify My Courses.
5. Open lessons and verify progress behavior.
6. Complete a quiz and inspect results.
7. Log in as an admin and test course creation/update/deletion.
8. Inspect browser Network/Console and Vercel runtime logs for failures.

## 7. Conclusion
The test suite covers a basic frontend render, API availability and response shape, invalid routes, basic auth input rejection, course retrieval, malformed course IDs, and authorization protection for course mutations. The deployed MongoDB connection issue was corrected and verified the course page worked. 