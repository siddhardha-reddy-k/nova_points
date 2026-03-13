import { IoMdArrowRoundBack } from "react-icons/io";
import { motion, AnimatePresence } from "framer-motion";
import { useState } from "react";

const Login = () => {
  const [login, setLogin] = useState(false);

  const handleLogin = () => {
    setLogin((prevLogin) => !prevLogin);
  };
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-neutral-800 font-mono">
        <div className="bg-neutral-600 p-8 rounded-lg shadow-md w-120 text-white">
          {/* Header */}
          <div className="mb-6 text-center">
            <h1 className="text-4xl font-bold ">Nova Points - Login</h1>
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
                  className="flex gap-4 border-2 border-white rounded-lg p-3"
                  onClick={handleLogin}
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
                  className="flex gap-4 border-2 border-white rounded-lg p-3"
                  onClick={handleLogin}
                >
                  <div className="bg-secondary rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl ">
                    S
                  </div>
                  <div className="flex flex-col text-left">
                    <div className="text-2xl font-medium">Sid</div>
                    <div className="text-sm font-light">Manage rewards</div>
                  </div>
                </button>
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
                  className="flex justify-start w-full gap-2 mb-6"
                  onClick={handleLogin}
                >
                  <IoMdArrowRoundBack className="text-2xl" />
                  <h1 className="text-xl font-medium">Back</h1>
                </button>
                <h2 className="text-4xl font-bold mb-5 text-center ">Login</h2>
                <input
                  type="password"
                  inputMode="numeric"
                  maxLength={4}
                  placeholder="Enter PIN"
                  onKeyDown={(e) => {
                    if (
                      !/[0-9]/.test(e.key) &&
                      !["Backspace", "Delete", "Tab", "Enter"].includes(e.key)
                    ) {
                      e.preventDefault();
                    }
                  }}
                  className="w-full border border-white rounded-lg px-4 py-3 text-white placeholder-white/60 focus:outline-none focus:border-primary text-center text-xl tracking-[0.5em]"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>
    </>
  );
};

export default Login;
