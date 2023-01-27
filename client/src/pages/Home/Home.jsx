import { useContext, useEffect, useState } from "react";
import axios from "axios";
import Header from "../../components/Header/Header";
import UserContext from "../../context/userContext";
import ActionsTable from "./components/ActionsTable/ActionsTable";
import Search from "./components/Search/Search";
import style from "./Home.module.css";
import { removeLocalStorageData } from "../../services/localStorage";

export default function Home() {
  const [apiActions, setApiActions] = useState([]);
  const [userFavoriteActions, setUserFavoriteActions] = useState([]);

  const { user, addActionContext, removeActionContext } = useContext(UserContext);

  useEffect(() => {
    (async () => {
      const { data } = await axios.get("https://api.twelvedata.com/stocks?source=docs&exchange=NYSE");
      setApiActions(data.data);
    })();
    removeLocalStorageData("action");
  }, []);

  useEffect(() => {
    if (apiActions.length > 0) {
      const userActions = apiActions.filter((action) => user.favActions.includes(action.symbol));
      setUserFavoriteActions(userActions);
    }
  }, [apiActions, user.favActions]);

  const handleRemoveAction = async (action) => {
    await removeActionContext({ id: user.id, action });
  };

  const handleAddAction = async (action) => {
    if (action && !user.favActions.includes(action)) await addActionContext({ id: user.id, action });
  };

  return (
    <dic className={style.container}>
      <Header text="My Actions" />
      <div>
        <Search apiActions={apiActions} addAction={handleAddAction} userActions={user.favActions} />
        <ActionsTable userActions={userFavoriteActions} removeAction={handleRemoveAction} />
      </div>
    </dic>
  );
}
