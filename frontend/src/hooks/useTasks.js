import { useState, useEffect } from "react";
import api from "../api/axios";
import { DEMO_TASKS } from "../demo/demoData";

const useTasks = (
  fetchTransactions,
  isDemo = false,
  demoTransactionHelpers = null,
) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (isDemo) {
      setTasks(DEMO_TASKS.map((t) => ({ ...t })));
      setLoading(false);
      return;
    }

    const fetchTasks = async () => {
      try {
        const { data } = await api.get("/tasks");
        setTasks(data);
      } catch (error) {
        console.error("Failed to fetch tasks", error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [isDemo]);

  const handleComplete = async (id, currentStatus) => {
    if (isDemo) {
      if (!currentStatus) {
        setTasks((prev) => {
          const task = prev.find((t) => t.id === id);
          if (task) {
            demoTransactionHelpers?.addTransaction({
              type: "earned",
              points: task.points,
              task_id: id,
            });
          }
          return prev.map((t) => (t.id === id ? { ...t, is_done: true } : t));
        });
      } else {
        demoTransactionHelpers?.removeTransaction(id);
        setTasks((prev) =>
          prev.map((t) => (t.id === id ? { ...t, is_done: false } : t)),
        );
      }
      return;
    }

    try {
      await api.put(`/tasks/${id}`, { is_done: !currentStatus });

      if (!currentStatus) {
        const task = tasks.find((t) => t.id === id);
        await api.post("/transactions", {
          type: "earned",
          points: task.points,
          task_id: id,
        });
      } else {
        await api.delete(`/transactions/task/${id}`);
      }

      setTasks(
        tasks.map((task) =>
          task.id === id ? { ...task, is_done: !task.is_done } : task,
        ),
      );

      await fetchTransactions();
    } catch (error) {
      console.error("Failed to complete task", error);
    }
  };

  return { tasks, loading, handleComplete };
};

export default useTasks;
