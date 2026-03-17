import { useState, useEffect } from "react";
import api from "../api/axios";
import useTransactions from "../hooks/useTransactions";
import useAuth from "../hooks/useAuth";
import LoadingScreen from "../components/LoadingScreen";
import StatsBar from "../components/StatsBar";
import DashboardHeader from "../components/DashboardHeader";
import RewardCard from "../components/RewardCard";

const ParentDashboard = () => {
  const { handleLogout } = useAuth();
  const [rewards, setRewards] = useState([]);
  const [loading, setLoading] = useState(true);
  const { earnedPoints, redeemedPoints, leftPoints, fetchTransactions } =
    useTransactions();

  useEffect(() => {
    const fetchRewards = async () => {
      try {
        const { data } = await api.get("/rewards");
        setRewards(data);
      } catch (error) {
        console.error("Failed to fetch rewards", error);
      } finally {
        setLoading(false);
      }
    };
    fetchRewards();
  }, []);

  const handleRedeem = async (cost) => {
    try {
      await api.post("/transactions", { type: "redeemed", points: cost });
      await fetchTransactions();
    } catch (error) {
      console.error("Failed to redeem reward", error);
    }
  };

  if (loading) return <LoadingScreen />;

  return (
    <div className="min-h-screen bg-neutral-800 flex justify-center py-10">
      <div className="w-full max-w-2xl px-4">
        {/* header */}
        <DashboardHeader
          name="Siddhardha"
          subtitle="Redeem Ishitha's rewards"
          onLogout={handleLogout}
        />

        {/* Stats Section*/}
        <StatsBar
          earned={earnedPoints}
          redeemed={redeemedPoints}
          left={leftPoints}
        />

        {/* Today's Tasks Section */}
        <div className="flex flex-col gap-4 mt-10 text-white">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold">Rewards</h1>
          </div>
          {/* Task List */}
          <div className="flex flex-col gap-2">
            {/* map Through Rewards */}
            {rewards.map((reward) => (
              <RewardCard
                key={reward.id}
                reward={reward}
                canAfford={leftPoints >= reward.cost}
                onRedeem={handleRedeem}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ParentDashboard;
