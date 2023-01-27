import { useContext } from "react";
import UserContext from "../../context/userContext";
import style from "./Header.module.css";

export default function Header({ text }) {
  const { user } = useContext(UserContext);

  return (
    <header>
      <p>{text}</p>
      <p>Usuario: {user.username}</p>
    </header>
  );
}
