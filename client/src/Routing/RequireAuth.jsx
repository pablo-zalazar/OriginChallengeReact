import { Navigate, Outlet } from "react-router-dom";
import { getLocalStorageData } from "../services/localStorage";

const RequireAuth = () => {
  const user = getLocalStorageData("user");
  if (user) return <Outlet />;
  else return <Navigate to="/" />;
};

export default RequireAuth;
