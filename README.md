# Nova Points 🌟

A family points app where a child earns points by completing daily tasks, and a parent redeems those points for rewards.

---

## Tech Stack

| Layer    | Technology                                       |
| -------- | ------------------------------------------------ |
| Frontend | React 19, Vite, Tailwind CSS v4, Framer Motion   |
| Backend  | Node.js, Express.js (Dockerized)                 |
| Database | PostgreSQL via Google Cloud SQL                  |
| Hosting  | Google Cloud Run (backend), Hostinger (frontend) |
| Auth     | JWT + bcrypt PIN hashing                         |

---

## Features

- **Child view** — see daily tasks, tap to complete, earn points automatically
- **Parent view** — view points balance, redeem rewards
- **PIN-based login** — PINs are bcrypt-hashed and stored securely in the DB
- **JWT authentication** — stateless tokens, verified on every protected request
- **Real-time balance** — points update instantly after each task or redemption
- **Protected routes** — both frontend and backend enforce authentication

---

## Project Structure

```
nova-points/
├── backend/
│   ├── routes/
│   │   ├── auth.js          # Login route, JWT signing
│   │   ├── tasks.js         # Task CRUD
│   │   ├── rewards.js       # Rewards list
│   │   └── transactions.js  # Earned / redeemed points
│   ├── db.js                # PostgreSQL pool
│   ├── index.js             # Express app, JWT middleware
│   └── Dockerfile
└── frontend/
    └── src/
        ├── api/axios.js     # Axios instance + token interceptor
        ├── components/      # TaskCard, RewardCard, StatsBar, etc.
        ├── hooks/           # useAuth, useTasks, useTransactions
        └── pages/           # Login, ChildDashboard, ParentDashboard
```

---

## Database Schema

```sql
CREATE TABLE users (
  id       SERIAL PRIMARY KEY,
  role     VARCHAR(10) CHECK (role IN ('child', 'parent')),
  pin_hash TEXT NOT NULL
);

CREATE TABLE tasks (
  id      SERIAL PRIMARY KEY,
  label   VARCHAR(50),
  points  INT,
  is_done BOOLEAN DEFAULT FALSE
);

CREATE TABLE rewards (
  id    SERIAL PRIMARY KEY,
  label VARCHAR(50),
  cost  INT
);

CREATE TABLE transactions (
  id         SERIAL PRIMARY KEY,
  type       VARCHAR(10) CHECK (type IN ('earned', 'redeemed')),
  points     INT,
  task_id    INT REFERENCES tasks(id),
  created_at TIMESTAMP DEFAULT NOW()
);
```

---

## Local Development

### Prerequisites

- Node.js 18+
- Access to a PostgreSQL database (local or Cloud SQL via proxy)

### Backend

```bash
cd backend
npm install
```

Create `backend/.env`:

```env
DATABASE_URL=your_postgresql_connection_string
PORT=3000
JWT_SECRET=your_secret_key
```

```bash
npm run dev
```

### Frontend

```bash
cd frontend
npm install
```

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3000
```

```bash
npm run dev
```

---

## Seeding Users

Generate bcrypt hashes for your PINs locally:

```js
// hashonly.js
import bcrypt from "bcrypt";
console.log("child:", await bcrypt.hash("YOUR_PIN", 10));
console.log("parent:", await bcrypt.hash("YOUR_PIN", 10));
```

```bash
node hashonly.js
```

Then insert into Cloud SQL Studio:

```sql
INSERT INTO users (role, pin_hash) VALUES
  ('child',  '$2b$10$...'),
  ('parent', '$2b$10$...');
```

---

## Google Cloud Deployment

### Backend (Cloud Run)

1. Push `backend/` changes to GitHub
2. Go to **Cloud Run → Create Service**
3. Select **Continuously deploy from repository** → point to `/backend/Dockerfile`
4. Under **Connections**, attach your **Cloud SQL instance**
5. Under **Variables & Secrets**, add:
   - `DATABASE_URL` → `postgres://USER:PASSWORD@/DBNAME?host=/cloudsql/PROJECT:REGION:INSTANCE`
   - `JWT_SECRET` → your secret key
6. Ensure the service account has **Cloud SQL Client** role → Deploy

### Frontend (Hostinger / Vercel / Render)

1. In your hosting provider's dashboard, set the environment variable:
   - `VITE_API_URL` → your Cloud Run URL
2. Redeploy the frontend

---

## Authentication Flow

1. User selects their profile and enters their PIN
2. Frontend sends `POST /auth/login` with `{ role, pin }`
3. Backend checks the bcrypt hash against the DB
4. On match, a signed JWT is returned (`expiresIn: 7d`)
5. Token is stored in `sessionStorage` and attached to every API request via an Axios interceptor
6. Protected routes verify the token on each request — no DB lookup needed
7. On logout or 401 response, token is cleared and user is redirected to login

---

## Environment Variables Reference

| Variable       | Where    | Description                                     |
| -------------- | -------- | ----------------------------------------------- |
| `DATABASE_URL` | Backend  | PostgreSQL connection string                    |
| `JWT_SECRET`   | Backend  | Secret used to sign JWTs                        |
| `PORT`         | Backend  | Server port (default 3000, Cloud Run uses 8080) |
| `VITE_API_URL` | Frontend | Backend base URL                                |
