import { FaCircle, FaCheckCircle } from "react-icons/fa";
import { motion } from "framer-motion";

const TaskCard = ({ task, onToggle }) => {
  return (
    <motion.div
      className="flex items-center justify-between border border-neutral-400 px-4 py-3 rounded-lg cursor-pointer select-none"
      onClick={() => onToggle(task.id, task.is_done)}
      whileTap={{ scale: 0.97, backgroundColor: "#363636" }}
      transition={{ duration: 0.1 }}
    >
      {/* Left: checkbox icon + task label */}
      <div className="flex items-center gap-3">
        <div>
          {!task.is_done ? (
            <FaCircle className="text-transparent text-2xl border-2 border-white rounded-full" />
          ) : (
            <FaCheckCircle className="text-greenlight text-2xl border-2 border-greenlight rounded-full" />
          )}
        </div>
        <p className={`text-lg font-light ${task.is_done && "text-greentext line-through"}`}>
          {task.label}
        </p>
      </div>

      {/* Right: points badge */}
      <div className={`px-4 py-2 rounded-lg ${!task.is_done ? "bg-secondary" : "bg-greendark"}`}>
        <p className="text-sm font-medium text-white">{task.points} pts</p>
      </div>
    </motion.div>
  );
};

export default TaskCard;
