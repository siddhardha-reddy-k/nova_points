import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ children, role }) => {
  const user = sessionStorage.getItem("user");

  if (!user) return <Navigate to="/" />;
  if (user !== role) return <Navigate to="/" />;

  return children;
};

export default ProtectedRoute;
