import { createContext, useState } from "react";
import useServices from "../hooks/useServices";
import { getLocalStorageData, setLocalStorageData } from "../services/localStorage";

const UserContext = createContext();
const localStorageUser = getLocalStorageData("user");
const initialUser = localStorageUser || null;
const UserProvider = ({ children }) => {
  const [user, setUser] = useState(initialUser);
  const { users } = useServices();

  const loginContext = async (values) => {
    try {
      const { data } = await users.login(values);
      setUser(data);
      setLocalStorageData("user", data);
    } catch (error) {
      throw new Error(error.response.data.msg);
    }
  };

  const signUpContext = async (values) => {
    try {
      await users.signup(values);
    } catch (error) {
      throw new Error(error.response.data.msg);
    }
  };

  const addActionContext = async (values) => {
    try {
      const { data } = await users.addAction(values);
      setUser(data);
      setLocalStorageData("user", data);
    } catch (error) {
      throw new Error(error.response.data.msg);
    }
  };

  const removeActionContext = async (values) => {
    try {
      const { data } = await users.removeAction(values);
      setUser(data);
      setLocalStorageData("user", data);
    } catch (error) {
      throw new Error(error.response.data.msg);
    }
  };

  const data = { user, loginContext, signUpContext, addActionContext, removeActionContext };
  return <UserContext.Provider value={data}>{children}</UserContext.Provider>;
};
export { UserProvider };
export default UserContext;
