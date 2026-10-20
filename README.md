# Expense Tracker

A full-stack expense tracker built with the PERN stack (PostgreSQL, Express, React, Node.js). Users can sign up, log in, and open a protected dashboard. The goal of the app is to record where a user's income comes from (salary, profit, committee) and where the money is spent (bike, household, bills), with every user seeing only their own data.

## Status

| Feature | Status |
| --- | --- |
| Signup and login (JWT, bcrypt) | Done |
| Request validation with Zod (backend and frontend, including confirm password) | Done |
| Auth middleware and protected dashboard endpoint | Done |
| Signup and login pages (React + Tailwind) | Done |
| Route guards (public and protected routes, token expiry check) | Done |
| Dashboard layout (sidebar, header, reusable layout) | Done |
| API testing with Postman (signup and login cases) | In progress |
| Categories (income / expense) | In progress |
| Transactions (add, edit, delete, list) | In progress |
| Summary (total income, expenses, balance) | Planned |

## Tech Stack

**Backend:** Node.js, Express, PostgreSQL (`pg`, no ORM), Zod, bcrypt, jsonwebtoken, cors, dotenv

**Frontend:** React (Vite), Tailwind CSS, React Router, Axios, React Toastify, Zod, CryptoJS, React Icons

## Features

- Signup and login with hashed passwords (bcrypt) and JWT authentication
- Zod validation on both the backend (the real security layer) and the frontend (faster feedback, no request is sent for invalid data)
- Confirm password is checked on the backend as well as the frontend
- Same error message for a wrong email and a wrong password, so nobody can find out which emails are registered
- Axios instance with a request interceptor that attaches the token to every request
- Token and user are stored encrypted (AES) in `localStorage`
- `PublicRoute` and `ProtectedRoute` guards: logged-in users are sent away from login and signup, logged-out users are sent away from the dashboard (with `replace`, so the Back button does not loop)
- Reusable dashboard layout: sidebar and header are written once and pages render inside an `Outlet`
- Menu items come from one `navLinks` constant, so adding a page is one link and one route
- Theme colors defined once in Tailwind (`@theme`)

## Authentication Flow

1. The user logs in. The backend checks the password with `bcrypt.compare` and signs a JWT (payload: `id` and `email`).
2. The frontend encrypts the token and the user with AES and saves them in `localStorage`.
3. For every request, the axios interceptor decrypts the token and sends the real JWT in the `Authorization: Bearer <token>` header.
4. The backend `authMiddleware` verifies the signature and the expiry with `jwt.verify`. An invalid or expired token returns `401`.
5. The frontend reads only the `exp` of the token to send an expired session straight to the login page. The backend remains the final authority.

### Security notes

- Only the backend can create a token, because the signing secret never leaves the server.
- Encrypting the token in `localStorage` hides it from casual inspection, but the key lives in the frontend bundle and XSS can still reach the token. It is obfuscation, not a replacement for real protection.
- The more secure option is an `httpOnly` cookie, which JavaScript cannot read. It is planned as a separate branch.
- Passwords are never stored or returned in plain text.

## Project Structure

```
backend/
  config/         database connection
  controllers/    request handlers
  db/             schema.sql
  middlewares/    validate, authMiddleware
  models/         SQL queries
  routes/         API routes
  validators/     Zod schemas
  app.js
frontend/
  src/
    apis/         axios instance and interceptor
    components/   Header, Sidebar, ProtectedRoute, PublicRoute
    constants/    navLinks
    layout/       DashboardLayout
    pages/        Signup, Login, Dashboard, Categories, Transactions
    utils/        auth helpers (encrypted storage, token check)
    validators/   Zod schemas
    App.jsx
docs/
  postman/        Postman collection and environment
```

## Getting Started

### Prerequisites

- Node.js 18+
- PostgreSQL

### 1. Database

Create a database, then run the schema:

```bash
psql -U postgres -d your_db_name -f backend/db/schema.sql
```

### 2. Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```
PORT=5000
CLIENT_URL=http://localhost:5173
DATABASE_URL=postgresql://postgres:yourpassword@localhost:5432/your_db_name
JWT_SECRET=your_long_random_secret
JWT_EXPIRES_IN=1d
```

```bash
node app.js
```

### 3. Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```
VITE_BACKEND_URL=http://localhost:5000/api
VITE_STORAGE_KEY=a_different_random_string
```

`VITE_STORAGE_KEY` must be different from `JWT_SECRET`. Never put the backend secret in a `VITE_` variable, because everything with that prefix ends up in the browser bundle.

```bash
npm run dev
```

Open `http://localhost:5173`.

## API Endpoints

Base URL: `http://localhost:5000/api`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/auth/signup` | No | Create a new account |
| POST | `/auth/login` | No | Log in and receive a JWT and the user |
| GET | `/dashboard` | Yes | Get the logged-in user's data |

Categories and transactions endpoints are being added.

### Example: signup

```json
POST /auth/signup
{
  "firstName": "Ali",
  "lastName": "Khan",
  "email": "ali@example.com",
  "password": "12345678",
  "confirmPassword": "12345678",
  "phoneNo": "03001234567"
}
```

### Validation rules

| Field | Rule |
| --- | --- |
| `firstName`, `lastName` | 2 to 50 characters |
| `email` | Valid email, up to 255 characters, saved in lowercase |
| `password` | 8 to 72 characters |
| `confirmPassword` | Must match `password` |
| `phoneNo` | Optional, 10 to 15 digits with an optional leading `+`, no spaces or dashes |

### Status codes

| Code | Meaning |
| --- | --- |
| `200` / `201` | Success (login / signup) |
| `400` | Validation failed |
| `401` | Wrong credentials, or a missing, invalid or expired token |
| `409` | Email already registered |
| `500` | Server error |

## API Testing

The Postman collection and environment are in `docs/postman/`. Import both files, select the `Local` environment and run the `Auth` folder. Test cases cover required fields, length boundaries, invalid formats, duplicate email, password mismatch, wrong credentials and token checks on the dashboard endpoint.

## Database Design

- `users`: account details (id, name, email, hashed password, phone, timestamps)
- `categories`: `id`, `name`, `type` (`income` or `expense`), for example Salary, Profit, Committee, Bike, Household, Bills
- `transactions`: `user_id`, `category_id`, `amount`, `note`, `transaction_date`, linked to users and categories with foreign keys

Every transaction query is filtered by the logged-in user's id, which always comes from the token and never from the request body.

## Roadmap

- Finish and test the categories and transactions APIs
- Summary endpoint (total income, total expenses, balance, per-category breakdown)
- Categories and transactions pages connected to the API
- Dashboard cards with real totals
- httpOnly cookie authentication (separate branch)

## Author

Your Name - [GitHub](https://github.com/your-username)
