import { createContext, useState } from "react";
import useServices from "../hooks/useServices";

const UserContext = createContext();
const localStorageUser = JSON.parse(localStorage.getItem("user"));
const initialUser = localStorageUser || null;
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  const { users } = useServices();

  const loginContext = async (values) => {
    try {
      const { data } = await users.login(values);
      setUser(data);
      localStorage.setItem("user", JSON.stringify(data));
    } catch (error) {
      throw new Error(error.response.data.msg);
    }
  };

  const addActionContext = (data) => {};

  const removeActionContext = (data) => {};

  const data = { user, loginContext, addActionContext, removeActionContext };
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
export { UserProvider };
export default UserContext;
