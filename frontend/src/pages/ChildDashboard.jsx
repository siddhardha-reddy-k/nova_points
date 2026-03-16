import { FaCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { useState, useEffect } from "react";
import { motion } from "framer-motion";
import api from "../api/axios";
import { useNavigate } from "react-router-dom";

const ChildDashboard = () => {
  const navigate = useNavigate();
  const [tasks, setTasks] = useState([]);
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    navigate("/");
  };

  // fetch tasks from the backend
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const { data } = await api.get("/tasks");
        setTasks(data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, []);

  useEffect(() => {
    const fetchTransactions = async () => {
      try {
        const { data } = await api.get("/transactions");
        setTransactions(data);
      } catch (error) {
        console.error("Failed to fetch transactions", error);
      }
    };
    fetchTransactions();
  }, []);

  const earnedPoints = transactions
    .filter((t) => t.type === "earned")
    .reduce((total, t) => total + t.points, 0);

  const redeemedPoints = transactions
    .filter((t) => t.type === "redeemed")
    .reduce((total, t) => total + t.points, 0);

  const leftPoints = earnedPoints - redeemedPoints;

  // upadate task status
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

      const { data } = await api.get("/transactions");
      setTransactions(data);
    } catch (error) {
      console.error("Failed to complete task", error);
    }
  };

  if (loading)
    return (
      <div className="min-h-screen bg-neutral-800 flex items-center justify-center">
        <p className="text-white text-lg font-light">Loading...</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-neutral-800 flex justify-center py-10">
      <div className="w-full max-w-2xl px-4">
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2 text-white">
            <h1 className="text-4xl font-bold">Hey Ishitha! ✦</h1>
            <p className="text-sm font-light">
              Complete your tasks to earn nova points
            </p>
          </div>
          <div>
            <button
              onClick={handleLogout}
              className="bg-transparent border-[0.5px] border-neutral-400 text-white px-4 py-2 rounded-lg cursor-pointer"
            >
              Log out
            </button>
          </div>
        </div>

        {/* Stats Section*/}
        <div className="flex gap-4 items-center justify-between mt-10 text-white">
          {/* Earned points */}
          <div className="flex flex-1 flex-col gap-2 items-center bg-neutral-700 p-2 rounded-lg">
            <p className="text-2xl font-bold">{earnedPoints}</p>
            <p className="text-sm font-light">Earned</p>
          </div>
          {/* Redeemed points */}
          <div className="flex flex-1 flex-col gap-2 items-center bg-neutral-700 p-2 rounded-lg">
            <p className="text-2xl font-bold">{redeemedPoints}</p>
            <p className="text-sm font-light">Redeemed</p>
          </div>
          {/* Left points */}
          <div className="flex flex-1 flex-col gap-2 items-center bg-secondary p-2 rounded-lg">
            <p className="text-2xl font-bold">{leftPoints}</p>
            <p className="text-sm font-light">Total points Left</p>
          </div>
        </div>

        {/* Today's Tasks Section */}
        <div className="flex flex-col gap-4 mt-10 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Today's Tasks</h1>
          </div>
          {/* Task List */}
          <div className="flex flex-col gap-2">
            {/* map Through Tasks */}

            {tasks.map((task) => (
              <motion.div
                className="flex items-center justify-between border border-neutral-400 px-4 py-3 rounded-lg cursor-pointer select-none"
                onClick={() => handleComplete(task.id, task.is_done)}
                whileTap={{ scale: 0.97, backgroundColor: "#363636" }}
                transition={{ duration: 0.1 }}
                key={task.id}
              >
                <div className="flex items-center gap-3">
                  <div>
                    {!task.is_done ? (
                      <FaCircle className="text-transparent text-2xl border-2 border-white rounded-full" />
                    ) : (
                      <FaCheckCircle className="text-greenlight text-2xl border-2 border-greenlight rounded-full" />
                    )}
                  </div>
                  <p
                    className={`text-lg font-light ${task.is_done && "text-greentext line-through"}`}
                  >
                    {task.label}
                  </p>
                </div>
                <div
                  className={`px-4 py-2 rounded-lg ${!task.is_done ? "bg-secondary" : "bg-greendark"} `}
                >
                  <p className={`text-sm font-medium text-white`}>
                    {task.points} pts
                  </p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildDashboard;
