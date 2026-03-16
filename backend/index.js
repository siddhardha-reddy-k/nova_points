import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import tasksRouter from "./routes/tasks.js";
import rewardsRouter from "./routes/rewards.js";
import transactionsRouter from "./routes/transactions.js";

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

app.use("/tasks", tasksRouter);
app.use("/rewards", rewardsRouter);
app.use("/transactions", transactionsRouter);

const PORT = process.env.PORT || 3000;

app.get("/", (req, res) => {
  res.send("Port is running");
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
