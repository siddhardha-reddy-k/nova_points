const Login = () => {
  return (
    <>
      <div className="min-h-screen flex items-center justify-center bg-neutral-800 font-mono">
        <div className="bg-neutral-600 p-8 rounded-lg shadow-md w-120 text-white">
          {/* Header */}
          <div className="mb-5 text-center">
            <h1 className="text-4xl font-bold ">Nova Points - Login</h1>
          </div>

          {/* User Selection */}
          <div className="flex flex-col gap-4 m-2">
            <button className="flex gap-4 border-2 border-white rounded-lg p-3">
              <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl ">
                I
              </div>
              <div className="flex flex-col text-left">
                <div className="text-2xl font-medium">Ishitha</div>
                <div className="text-sm font-light">Check off your Tasks</div>
              </div>
            </button>
            <button className="flex gap-4 border-2 border-white rounded-lg p-2">
              <div className="bg-primary rounded-full w-12 h-12 flex items-center justify-center font-bold text-2xl ">
                S
              </div>
              <div className="flex flex-col text-left">
                <div className="text-2xl font-medium">Sid</div>
                <div className="text-sm font-light">Manage rewards</div>
              </div>
            </button>
          </div>

          <div className="flex flex-col items-center justify-center">
            <h2 className="text-4xl font-bold mb-6 text-center ">Login</h2>
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
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
