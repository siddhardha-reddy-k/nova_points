import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import jwt from "jsonwebtoken";
import rateLimit from "express-rate-limit";
import tasksRouter from "./routes/tasks.js";
import rewardsRouter from "./routes/rewards.js";
import transactionsRouter from "./routes/transactions.js";
import authRouter from "./routes/auth.js";

dotenv.config();

const app = express();

app.use(
  cors({
    origin: [
      "http://localhost:5173",
      "https://nova-points.siddhardhareddy.com",
    ],
  }),
);
app.use(express.json());

const loginLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 10,
  message: { error: "Too many attempts, try again later" },
});

app.use("/auth", loginLimiter, authRouter);

function requireAuth(req, res, next) {
  const header = req.headers.authorization;
  const token = header?.split(" ")[1];

  if (!token) {
    return res.status(401).json({ error: "No token" });
  }

  try {
    req.user = jwt.verify(token, process.env.JWT_SECRET);
    next();
  } catch {
    res.status(401).json({ error: "Invalid token" });
  }
}

app.use("/tasks", requireAuth, tasksRouter);
app.use("/rewards", requireAuth, rewardsRouter);
app.use("/transactions", requireAuth, transactionsRouter);

const PORT = process.env.PORT || 3000;
app.get("/", (_, res) => res.send("Port is running"));
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
