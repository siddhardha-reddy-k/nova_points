import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const DemoLogin = () => {
  const navigate = useNavigate();

  const enterDemo = (role) => {
    if (role === "child") {
      sessionStorage.removeItem("demo_transactions");
    }
    sessionStorage.setItem("demo", "true");
    sessionStorage.setItem("user", role);
    navigate(role === "child" ? "/child-dashboard" : "/parent-dashboard");
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-neutral-800 font-mono">
      <div className="bg-neutral-600 p-8 rounded-lg shadow-md w-120 text-white">
        {/* Header */}
        <div className="mb-6 text-center flex flex-col items-center gap-3">
          <img
            src="/nova-logo.png"
            alt="Nova Points Logo"
            className="w-16 h-16 rounded-full"
          />
          <h1 className="text-4xl font-bold">Nova Points</h1>
          <div className="inline-flex items-center gap-2 bg-amber-400/20 border border-amber-400 text-amber-400 text-sm font-semibold px-3 py-1 rounded-full">
            Demo Mode
          </div>
        </div>

        <p className="text-center text-white/60 text-sm mb-5">
          Try the app as a child or parent — nothing is saved.
        </p>

        {/* Role Selection */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="flex flex-col gap-4"
        >
          <button
            onClick={() => enterDemo("child")}
            className="flex gap-4 border-2 border-amber-400 rounded-lg p-3 cursor-pointer hover:bg-amber-400/10 transition-colors"
          >
            <div className="bg-secondary rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl">
              I
            </div>
            <div className="flex flex-col text-left">
              <div className="text-2xl font-medium">Child (Demo)</div>
              <div className="text-sm font-light">
                Mark tasks &amp; earn points
              </div>
            </div>
          </button>

          <button
            onClick={() => enterDemo("parent")}
            className="flex gap-4 border-2 border-amber-400 rounded-lg p-3 cursor-pointer hover:bg-amber-400/10 transition-colors"
          >
            <div className="bg-secondary rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl">
              S
            </div>
            <div className="flex flex-col text-left">
              <div className="text-2xl font-medium">Parent (Demo)</div>
              <div className="text-sm font-light">Redeem rewards</div>
            </div>
          </button>

          <button
            onClick={() => navigate("/")}
            className="text-sm text-white/40 hover:text-white/70 text-center mt-2 transition-colors cursor-pointer"
          >
            ← Back to real login
          </button>
        </motion.div>
      </div>
    </div>
  );
};

export default DemoLogin;
