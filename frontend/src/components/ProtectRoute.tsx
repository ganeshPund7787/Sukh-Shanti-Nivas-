import { Navigate, Outlet } from "react-router-dom";
import { useAppContext } from "../context/AppContext";

const ProtectRoute = () => {
  const { isLoggedIn } = useAppContext();
  return isLoggedIn ? <Outlet /> : <Navigate to={"/sign-in"} />;
};

export default ProtectRoute;
