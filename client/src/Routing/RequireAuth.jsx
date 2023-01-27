import { useContext } from "react";
import { useLocation, Navigate, Outlet } from "react-router-dom";
import UserContext from "../context/userContext";
import { getUserLogged } from "../services/localStorage";

const RequireAuth = () => {
  const { user } = useContext(UserContext);
  console.log(user);
  if (user) return <Outlet />;
  else return <Navigate to="/" />;
};

export default RequireAuth;
