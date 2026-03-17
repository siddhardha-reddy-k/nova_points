# Nova Points 🌟

A family points management app where a child earns points by completing daily tasks, and a parent redeems those points for rewards.

## Tech Stack

**Frontend** — React + Vite, Tailwind CSS, Framer Motion  
**Backend** — Node.js, Express.js  
**Database** — PostgreSQL

## Features

- 👧 **Child view** — see daily tasks, tap to mark complete, earn points automatically
- 👨 **Parent view** — view points balance, redeem rewards
- 🔐 PIN-based login (no passwords stored in the DB)
- 🔄 Real-time points update after each task or redemption

## Project Structure

```
nova-points/
├── backend/
│   ├── routes/
│   │   ├── tasks.js
│   │   ├── rewards.js
│   │   └── transactions.js
│   ├── db.js
│   └── index.js
└── frontend/
    └── src/
        ├── api/
        │   └── axios.js
        ├── hooks/
        │   ├── useAuth.js
        │   ├── useTransactions.js
        │   └── useTasks.js
        ├── components/
        │   ├── ProtectedRoute.jsx
        │   ├── DashboardHeader.jsx
        │   ├── StatsBar.jsx
        │   ├── LoadingScreen.jsx
        │   ├── TaskCard.jsx
        │   └── RewardCard.jsx
        └── pages/
            ├── Login.jsx
            ├── ChildDashboard.jsx
            └── ParentDashboard.jsx
```

## Getting Started

### Prerequisites

- Node.js
- PostgreSQL

### Backend Setup

```bash
cd backend
npm install
```

Create a `.env` file in `backend/`:

```env
DATABASE_URL=your_postgresql_connection_string
PORT=5000
```

Start the backend:

```bash
npm run dev
```

### Frontend Setup

```bash
cd frontend
npm install
```

Create a `.env` file in `frontend/`:

```env
VITE_API_URL=http://localhost:5000
VITE_CHILD_PIN=your_child_pin
VITE_PARENT_PIN=your_parent_pin
```

Start the frontend:

```bash
npm run dev
```

## Database Schema

The full schema is in [`backend/db/schema.sql`](./backend/db/schema.sql).

To set up the database, run the schema file against your PostgreSQL instance:

```bash
psql -U your_user -d your_database -f backend/db/schema.sql
```

**Tables:**
| Table | Description |
|---|---|
| `tasks` | Daily tasks assigned to the child, each with a point value |
| `rewards` | Rewards the parent can redeem using earned points |
| `transactions` | Log of all earned and redeemed point events |
