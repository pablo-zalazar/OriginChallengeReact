import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import UserContext from "../context/userContext";

const RequireAuth = () => {
  const { user } = useContext(UserContext);
  if (user) return <Outlet />;
  else return <Navigate to="/" />;
};

export default RequireAuth;
