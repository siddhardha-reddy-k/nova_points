import { motion } from "framer-motion";

const RewardCard = ({ reward, canAfford, onRedeem }) => {
  return (
    <div
      className={`flex items-center justify-between border border-neutral-400 px-4 py-3 rounded-lg ${!canAfford ? "opacity-40 cursor-not-allowed" : ""}`}
    >
      {/* Left: reward name + cost required */}
      <div className="flex flex-col items-start">
        <p className="text-xl font-light">{reward.label}</p>
        <p className="text-sm font-light">{reward.cost} Points Required</p>
      </div>

      {/* Right: points badge + redeem button */}
      <div className="flex items-center gap-4">
        <div className="px-4 py-2 rounded-lg bg-secondary">
          <p className="text-sm font-medium text-white">{reward.cost} pts</p>
        </div>
        <motion.button
          className="bg-transparent border-[0.5px] text-sm border-neutral-400 text-white px-4 py-2 rounded-lg cursor-pointer select-none"
          whileTap={{ scale: 0.97, backgroundColor: "#363636" }}
          transition={{ duration: 0.1 }}
          onClick={() => onRedeem(reward.cost)}
          disabled={!canAfford}
        >
          Redeem
        </motion.button>
      </div>
    </div>
  );
};

export default RewardCard;
