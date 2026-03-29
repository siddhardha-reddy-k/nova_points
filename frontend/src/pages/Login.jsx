import { IoMdArrowRoundBack } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import api from "../api/axios";

const Login = () => {
  const navigate = useNavigate();
  const [login, setLogin] = useState(false);

  const [selectedUser, setSelectedUser] = useState(null);
  const [pin, setPin] = useState("");
  const [error, setError] = useState("");

  const handleLogin = () => {
    setLogin((prev) => !prev);
  };

  const handleSubmit = async () => {
    try {
      const { data } = await api.post("/auth/login", {
        role: selectedUser,
        pin: pin.trim(),
      });

      sessionStorage.setItem("token", data.token);
      sessionStorage.setItem("user", data.role);

      navigate(
        data.role === "child" ? "/child-dashboard" : "/parent-dashboard",
      );
    } catch {
      setError("Wrong PIN, try again");
      setPin("");
    }
  };

  return (
    <>
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
          </div>

          {/* User Selection */}
          <AnimatePresence mode="wait">
            {!login && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="flex flex-col gap-4 m-2"
              >
                <button
                  className="flex gap-4 border-2 border-white rounded-lg p-3 cursor-pointer"
                  onClick={() => {
                    setSelectedUser("child");
                    setLogin(true);
                  }}
                >
                  <div className="bg-secondary rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl ">
                    I
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="text-2xl font-medium">Ishitha</div>
                    <div className="text-sm font-light">
                      Check off your Tasks
                    </div>
                  </div>
                </button>
                <button
                  className="flex gap-4 border-2 border-white rounded-lg p-3 cursor-pointer"
                  onClick={() => {
                    setSelectedUser("parent");
                    setLogin(true);
                  }}
                >
                  <div className="bg-secondary rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl ">
                    S
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="text-2xl font-medium">Sid</div>
                    <div className="text-sm font-light">Manage rewards</div>
                  </div>
                </button>

                {/* Try Demo */}
                <div className="mt-2 border-t border-white/20 pt-4 flex flex-col items-center gap-2">
                  <p className="text-sm text-white/50">Just visiting?</p>
                  <button
                    onClick={() => navigate("/demo")}
                    className="w-full border border-amber-400 text-amber-400 rounded-lg py-2 text-sm font-semibold hover:bg-amber-400/10 transition-colors cursor-pointer"
                  >
                    Try Demo
                  </button>
                </div>
              </motion.div>
            )}

            {/* Login */}
            {login && (
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.3 }}
                className={`flex flex-col items-center justify-center ${!login && "hidden"}`}
              >
                <button
                  className="flex justify-start w-full gap-2 mb-6 cursor-pointer"
                  onClick={handleLogin}
                >
                  <IoMdArrowRoundBack className="text-2xl" />
                  <h1 className="text-xl font-medium">Back</h1>
                </button>
                <input
                  type="password"
                  inputMode="text"
                  maxLength={6}
                  placeholder="Enter PIN"
                  value={pin}
                  onChange={(e) => {
                    setPin(e.target.value);
                    setError("");
                  }}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") handleSubmit();
                  }}
                  className="w-full bg-neutral-200 rounded-lg px-4 py-3 text-black placeholder-black/70 focus:outline-none focus:border-primary text-center text-xl tracking-[0.5em]"
                />
                {error && <p className="text-red-400 text-xl mt-2">{error}</p>}
                <button
                  onClick={handleSubmit}
                  className="w-full bg-secondary text-2xl text-white py-3 rounded-lg mt-4 font-medium cursor-pointer"
                >
                  Login
                </button>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Login;
