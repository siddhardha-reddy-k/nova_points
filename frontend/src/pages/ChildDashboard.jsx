import useTransactions from "../hooks/useTransactions";
import useAuth from "../hooks/useAuth";
import useTasks from "../hooks/useTasks";
import useDemoMode from "../hooks/useDemoMode";
import LoadingScreen from "../components/LoadingScreen";
import StatsBar from "../components/StatsBar";
import DashboardHeader from "../components/DashboardHeader";
import TaskCard from "../components/TaskCard";
import DemoBanner from "../components/DemoBanner";

const ChildDashboard = () => {
  const { handleLogout } = useAuth();
  const { isDemo } = useDemoMode();
  const {
    earnedPoints,
    redeemedPoints,
    leftPoints,
    fetchTransactions,
    addTransaction,
    removeTransaction,
  } = useTransactions(isDemo);

  const { tasks, loading, handleComplete } = useTasks(
    fetchTransactions,
    isDemo,
    { addTransaction, removeTransaction },
  );

  if (loading) return <LoadingScreen />;

  return (
    <div className={`min-h-screen bg-neutral-800 flex justify-center py-10 ${isDemo ? "pt-16" : ""}`}>
      {isDemo && <DemoBanner />}
      <div className="w-full max-w-2xl px-4">
        {/* header */}
        <DashboardHeader
          name={isDemo ? "Demo Child" : "Ishitha"}
          subtitle="Complete your tasks to earn nova points"
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
            <h1 className="text-2xl font-bold">Today's Tasks</h1>
          </div>
          {/* Task List */}
          <div className="flex flex-col gap-2">
            {tasks.map((task) => (
              <TaskCard key={task.id} task={task} onToggle={handleComplete} />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChildDashboard;
