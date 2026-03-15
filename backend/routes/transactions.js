import { Router } from "express";
import pool from "../db.js";

const router = Router();

router.get("/", async (req, res) => {
  try {
    const result = await pool.query(
      "SELECT * FROM transactions ORDER BY created_at DESC",
    );
    res.json(result.rows);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.post("/", async (req, res) => {
  try {
    const { type, points, task_id } = req.body;
    const result = await pool.query(
      "INSERT INTO transactions (type, points, task_id) VALUES ($1, $2, $3) RETURNING *",
      [type, points, task_id],
    );
    res.json(result.rows[0]);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    await pool.query("DELETE FROM transactions WHERE id = $1", [id]);
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.delete("/task/:task_id", async (req, res) => {
  try {
    const { task_id } = req.params;
    await pool.query(
      "DELETE FROM transactions WHERE task_id = $1 AND type = $2",
      [task_id, "earned"],
    );
    res.json({ message: "Transaction deleted" });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

export default router;
