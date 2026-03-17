const DashboardHeader = ({ name, subtitle, onLogout }) => {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-3">
        <img
          src="/nova-logo.png"
          alt="Nova Points"
          className="w-15 h-15 rounded-full"
        />
        <div className="flex flex-col gap-1 text-white">
          <h1 className="text-4xl font-bold">Hey {name}! ✦</h1>
          <p className="text-sm font-light">{subtitle}</p>
        </div>
      </div>
      <div>
        <button
          onClick={onLogout}
          className="bg-transparent border-[0.5px] border-neutral-400 text-white px-4 py-2 rounded-lg cursor-pointer"
        >
          Log out
        </button>
      </div>
    </div>
  );
};

export default DashboardHeader;
