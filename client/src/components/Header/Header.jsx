import { useContext } from "react";
import { BiDoorOpen } from "react-icons/bi";
import { Link, useNavigate } from "react-router-dom";
import UserContext from "../../context/userContext";
import { removeLocalStorageData } from "../../services/localStorage";
import style from "./Header.module.css";

export default function Header({ text }) {
  const { user } = useContext(UserContext);
  const navigate = useNavigate();

  const handleLogOut = () => {
    removeLocalStorageData("user");
    navigate("/");
  };

  return (
    <header className={style.header}>
      <p>{text}</p>
      <div>
        <p>Usuario: {user.username}</p>
        <button onClick={handleLogOut}>
          <BiDoorOpen />
        </button>
      </div>
    </header>
  );
}
