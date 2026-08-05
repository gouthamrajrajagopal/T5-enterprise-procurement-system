# Premium Employee Module

## Run
1. Start Spring Boot backend on http://localhost:8080
2. Open a terminal in `frontend`
3. Run `npm install`
4. Run `npm run dev`

## Test account
Log in using an EMPLOYEE account created through `/auth/register`.

## Included routes
- `/employee/dashboard`
- `/employee/raise-request`
- `/employee/my-requests`
- `/employee/request/:id`

## Backend APIs used
- `POST /auth/login`
- `POST /api/requisitions`
- `GET /api/requisitions/my`
- `GET /api/requisitions/{id}`
- `GET /api/approvals/workflow/{id}`
- `DELETE /api/requisitions/{id}`
