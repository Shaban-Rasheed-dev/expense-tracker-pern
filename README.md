# Expense Tracker

A full-stack expense tracker built with the PERN stack (PostgreSQL, Express, React, Node.js). Users can sign up, log in, and (in progress) record where their income comes from and where their money is spent. Each user only sees their own data.

## Status

| Feature | Status |
| --- | --- |
| Signup and login (JWT, bcrypt) | Done |
| Request validation (Zod) | Done |
| Auth middleware (protected routes) | Done |
| Signup and signin pages (React + Tailwind) | Done |
| Categories (income / expense) | In progress |
| Transactions (add, edit, delete, list) | Planned |
| Summary (total income, expenses, balance) | Planned |

## Tech Stack

**Backend:** Node.js, Express, PostgreSQL (`pg`, no ORM), Zod, bcrypt, jsonwebtoken, cors, dotenv

**Frontend:** React (Vite), Tailwind CSS, React Router, Axios, React Toastify

## Features

- Secure signup and login with hashed passwords and JWT authentication
- Token sent in the `Authorization: Bearer <token>` header and verified by middleware
- Input validation on the server with Zod, with clear error messages shown as toasts
- Axios instance with a request interceptor that attaches the token automatically
- Reusable theme colors defined once in Tailwind (`@theme`)

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
    apis/         axios instance
    pages/        Signup, Signin
    App.jsx
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
VITE_BACKEND_URL=http://localhost:5000/api/auth
```

```bash
npm run dev
```

Open `http://localhost:5173`.

## API Endpoints

Base URL: `http://localhost:5000/api/auth`

| Method | Endpoint | Auth | Description |
| --- | --- | --- | --- |
| POST | `/signup` | No | Create a new account |
| POST | `/login` | No | Log in and receive a JWT |
| GET | `/profile` | Yes | Get the logged-in user's profile |

### Example: signup

```json
POST /signup
{
  "firstName": "Ali",
  "lastName": "Khan",
  "email": "ali@example.com",
  "password": "12345678",
  "phoneNo": "03001234567"
}
```

`phoneNo` is optional.

## Database Design

- `users`: account details (id, name, email, hashed password, phone, timestamps)
- `categories` (planned): `id`, `name`, `type` (`income` or `expense`), for example Salary, Profit, Committee, Bike, Household, Bills
- `transactions` (planned): `user_id`, `category_id`, `amount`, `note`, `transaction_date`, linked to users and categories with foreign keys

## Roadmap

- Categories API
- Transactions API (every query scoped to the logged-in user)
- Summary endpoint (total income, total expenses, balance, per-category breakdown)
- Dashboard UI with protected routes

## Author

Shaban Rasheed
