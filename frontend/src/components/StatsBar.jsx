const StatsBar = ({ earned, redeemed, left }) => {
  return (
    <div className="flex gap-4 items-center justify-between mt-10 text-white">
      {/* Earned points */}
      <div className="flex flex-1 flex-col gap-2 items-center bg-neutral-700 p-2 rounded-lg">
        <p className="text-2xl font-bold">{earned}</p>
        <p className="text-sm font-light">Earned</p>
      </div>
      {/* Redeemed points */}
      <div className="flex flex-1 flex-col gap-2 items-center bg-neutral-700 p-2 rounded-lg">
        <p className="text-2xl font-bold">{redeemed}</p>
        <p className="text-sm font-light">Redeemed</p>
      </div>
      {/* Points left */}
      <div className="flex flex-1 flex-col gap-2 items-center bg-secondary p-2 rounded-lg">
        <p className="text-2xl font-bold">{left}</p>
        <p className="text-sm font-light">Total points Left</p>
      </div>
    </div>
  );
};

export default StatsBar;
