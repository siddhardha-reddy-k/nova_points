# Nova Points 🌟

A family points management app where a child earns points by completing daily tasks, and a parent redeems those points for rewards.

## Tech Stack & Architecture

- **Frontend** — React + Vite, Tailwind CSS, Framer Motion
- **Backend** — Node.js, Express.js (Dockerized for **Google Cloud Run**)
- **Database** — PostgreSQL (**Google Cloud SQL** securely connected via Unix Sockets)

## Features

- 👧 **Child view** — see daily tasks, tap to mark complete, earn points automatically
- 👨 **Parent view** — view points balance, redeem rewards
- 🔐 PIN-based login (no passwords stored in the DB)
- 🔄 Real-time points update after each task or redemption
- ☁️ **Cloud Native** — Infrastructure successfully migrated and fully managed natively on Google Cloud.

## Getting Started Locally

### 1. Database Setup
Create your tables using the schema provided in `backend/db/schema.sql` natively in PostgreSQL (e.g. pasting into Cloud SQL Studio).

### 2. Backend Setup
Navigate into the backend and install dependencies:
```bash
cd backend
npm install
```

Create a `.env` file in `backend/` (this file is ignored by git):
```env
# If connecting locally, you can use a local DB or the old neon DB.
# For Cloud Run, this is managed in the Cloud Run Web UI!
DATABASE_URL=your_postgresql_connection_string
PORT=3000
```

Start the backend:
```bash
npm run dev
```

### 3. Frontend Setup
Navigate into the frontend:
```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:
```env
# Point this to your live Cloud Run URL, or localhost:3000 for local testing
VITE_API_URL=https://nova-points-backend-YOUR-URL.run.app
VITE_CHILD_PIN=2016
VITE_PARENT_PIN=0707
```

Start the frontend:
```bash
npm run dev
```

---

## 🚀 Google Cloud Deployment Instructions

### Backend Delivery (Cloud Run)
1. Push your `backend` changes to GitHub (it relies on the `Dockerfile`).
2. Navigate to **Google Cloud Run** -> **Create Service**.
3. Choose **Continuously deploy from a repository** -> select your GitHub repository -> point the source directory to `/backend/Dockerfile`.
4. **CRITICAL**: Go to the **Connections** tab inside the setup and explicitly select your **Cloud SQL instance**. (This attaches the secure internal Google Server tunnel).
5. Open **Variables & Secrets**, and inject your `DATABASE_URL` formatted for Unix sockets:
   `postgres://USER:PASSWORD@/DB_NAME?host=/cloudsql/PROJECT:REGION:INSTANCE`
6. Make sure the Service Account has `Cloud SQL Client` permissions and the `Cloud SQL Admin API` is enabled. Deploy!

### Frontend Delivery (Hosting)
Because your frontend protects its `.env` file from GitHub, pushing code to GitHub won't update your production frontend's backend link.
- Navigate to your hosting provider (Vercel, Render, Hostinger, etc.).
- Find your **Environment Variables** settings.
- Add or update `VITE_API_URL` to point exactly to your new Google Cloud Run URL.
- Redeploy your frontend site!
