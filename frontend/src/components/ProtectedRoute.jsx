import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = sessionStorage.getItem("user");
  const isDemo = sessionStorage.getItem("demo") === "true";

  if (!user || user !== role) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
