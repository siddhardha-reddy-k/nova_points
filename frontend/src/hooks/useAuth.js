import { useNavigate } from "react-router-dom";

const useAuth = () => {
  const navigate = useNavigate();

  const user = sessionStorage.getItem("user");
  const isDemo = sessionStorage.getItem("demo") === "true";

  const handleLogout = () => {
    const wasDemo = sessionStorage.getItem("demo") === "true";
    sessionStorage.removeItem("user");
    sessionStorage.removeItem("token");
    sessionStorage.removeItem("demo");
    // Demo transactions are kept so points earned as child are visible as parent
    navigate(wasDemo ? "/demo" : "/");
  };

  return { user, isDemo, handleLogout };
};

export default useAuth;
