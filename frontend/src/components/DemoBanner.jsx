import { motion } from "framer-motion";

const DemoBanner = () => {
  return (
    <motion.div
      initial={{ y: -40, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ type: "spring", stiffness: 260, damping: 20 }}
      className="fixed top-0 left-0 right-0 z-50 flex items-center justify-center gap-2 bg-amber-400 py-2 text-sm font-semibold text-amber-900 shadow-md"
    >
      <span>
        Demo Mode — changes are saved in browser only and are reset upon session
        end.
      </span>
    </motion.div>
  );
};

export default DemoBanner;
