import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  const user = sessionStorage.getItem("user");

  const handleLogout = () => {
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    navigate("/");
  };

  return { user, handleLogout };
};

export default useAuth;
