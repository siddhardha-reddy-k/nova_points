import { useState, useEffect } from "react";
import api from "../api/axios";

const useTasks = (fetchTransactions) => {
  const [tasks, setTasks] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
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
  }, []);

  const handleComplete = async (id, currentStatus) => {
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
