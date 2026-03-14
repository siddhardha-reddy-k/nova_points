import { motion } from "framer-motion";
import { useState } from "react";

const ParentDashboard = () => {
  const [redeemedPoints, setRedeemedPoints] = useState(0);

  const rewards = [
    {
      id: 1,
      name: "Reward 1",
      points: 10,
    },
    {
      id: 2,
      name: "Reward 2",
      points: 20,
    },
    {
      id: 3,
      name: "Reward 3",
      points: 30,
    },
  ];
  const earnedPoints = 100;
  const leftPoints = earnedPoints - redeemedPoints;

  const handleRedeem = (cost) => {
    setRedeemedPoints(redeemedPoints + cost);
  };

  return (
    <div className="min-h-screen bg-neutral-800 flex justify-center py-10">
      <div className="w-full max-w-2xl px-4">
        {/* header */}
        <div className="flex items-center justify-between">
          <div className="flex flex-col gap-2 text-white">
            <h1 className="text-4xl font-bold">Hey Siddhardha! ✦</h1>
            <p className="text-sm font-light">Redeem Ishitha's rewards</p>
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
            <h1 className="text-2xl font-bold">Rewards</h1>
          </div>
          {/* Task List */}
          <div className="flex flex-col gap-2">
            {/* map Through Rewards */}
            {rewards.map((reward) => (
              <div
                className={`flex items-center justify-between border border-neutral-400 px-4 py-3 rounded-lg ${leftPoints < reward.points ? "opacity-40 cursor-not-allowed" : ""}`}
                key={reward.id}
              >
                <div className="flex flex-col items-start">
                  <p className={`text-xl font-light`}>{reward.name}</p>
                  <p className={`text-sm font-light`}>
                    {reward.points} Points Required
                  </p>
                </div>
                <div className="flex items-center gap-4">
                  <div className={`px-4 py-2 rounded-lg bg-secondary`}>
                    <p className={`text-sm font-medium text-white`}>
                      {reward.points} pts
                    </p>
                  </div>
                  <motion.button
                    className={`bg-transparent border-[0.5px] text-sm border-neutral-400 text-white px-4 py-2 rounded-lg cursor-pointer select-none`}
                    whileTap={{ scale: 0.97, backgroundColor: "#363636" }}
                    transition={{ duration: 0.1 }}
                    onClick={() => handleRedeem(reward.points)}
                    disabled={leftPoints < reward.points}
                  >
                    Redeem
                  </motion.button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
