import { FaCircle } from "react-icons/fa";
import { FaCheckCircle } from "react-icons/fa";
import { useState } from "react";
import { motion } from "framer-motion";

const ChildDashboard = () => {
  const [tasks, setTasks] = useState([
    { id: 1, label: "Wake up on time", pts: 5, done: false },
    { id: 2, label: "Make bed", pts: 5, done: false },
    { id: 3, label: "Brush teeth", pts: 3, done: false },
    { id: 4, label: "Complete homework", pts: 10, done: false },
    { id: 5, label: "Go to bed on time", pts: 7, done: false },
  ]);

  const earnedPoints = tasks
    .filter((task) => task.done)
    .reduce((total, task) => total + task.pts, 0);

  const redeemedPoints = 0;
  const leftPoints = earnedPoints - redeemedPoints;

  const handleComplete = (id) => {
    setTasks((prevTasks) =>
      prevTasks.map((task) =>
        task.id === id ? { ...task, done: !task.done } : task,
      ),
    );
  };

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
            <button className="bg-transparent border-[0.5px] border-neutral-400 text-white px-4 py-2 rounded-lg">
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
          {/* Total points */}
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
                onClick={() => handleComplete(task.id)}
                whileTap={{ scale: 0.97, backgroundColor: "#363636" }}
                transition={{ duration: 0.1 }}
                key={task.id}
              >
                <div className="flex items-center gap-3">
                  <div>
                    {!task.done ? (
                      <FaCircle className="text-transparent text-2xl border-2 border-white rounded-full" />
                    ) : (
                      <FaCheckCircle className="text-greenlight text-2xl border-2 border-greenlight rounded-full" />
                    )}
                  </div>
                  <p
                    className={`text-lg font-light ${task.done && "text-greentext line-through"}`}
                  >
                    {task.label}
                  </p>
                </div>
                <div
                  className={`px-4 py-2 rounded-lg ${!task.done ? "bg-secondary" : "bg-greendark"} `}
                >
                  <p className={`text-sm font-medium text-white`}>
                    {task.pts} pts
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
