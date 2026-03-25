const useDemoMode = () => {
  const isDemo = sessionStorage.getItem("demo") === "true";
  return { isDemo };
};

export default useDemoMode;
