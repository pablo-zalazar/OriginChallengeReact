import { useContext, useEffect, useState } from "react";
import Header from "../../components/Header/Header";
import UserContext from "../../context/userContext";
import ActionsTable from "./components/ActionsTable/ActionsTable";
import Search from "./components/Search/Search";
import style from "./Home.module.css";
import { getAllApiValues } from "../../services/apiCalls";
import { isEmpty } from "../../utils/isEmpty";
import Loader from "../../components/Loader/Loader";

export default function Home() {
  const { user, addActionContext, removeActionContext } = useContext(UserContext);

  const [actions, setActions] = useState([]);
  const [userFavoriteActions, setUserFavoriteActions] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    (async () => {
      setLoading(true);
      try {
        const { data } = await getAllApiValues();
        setActions(data);
        setLoading(false);
      } catch (error) {}
    })();
  }, []);

  useEffect(() => {
    if (!isEmpty(actions)) {
      const userActions = actions.filter((action) => user.favActions.includes(action.symbol));
      setUserFavoriteActions(userActions);
    }
  }, [actions, user.favActions]);

  const handleRemoveAction = async (action) => {
    await removeActionContext({ id: user.id, action });
  };

  const handleAddAction = async (action) => {
    if (action && !user.favActions.includes(action)) await addActionContext({ id: user.id, action });
  };

  return (
    <div className={style.container}>
      <Header text="My Actions" />

      {loading && <Loader />}

      {!loading && !isEmpty(actions) && (
        <div>
          <Search actions={actions} addAction={handleAddAction} userActions={user.favActions} />
          <ActionsTable userActions={userFavoriteActions} removeAction={handleRemoveAction} />
        </div>
      )}
    </div>
  );
}
