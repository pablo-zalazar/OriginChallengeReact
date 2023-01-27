import { useNavigate } from "react-router-dom";
import { setLocalStorageData } from "../../../../services/localStorage";
import style from "./ActionTable.module.css";

export default function ActionsTable({ userActions, removeAction }) {
  const navigate = useNavigate();

  const handleAddAction = (values) => {
    setLocalStorageData("action", values);
    navigate("/details", { replace: true });
  };

  return (
    <table>
      <thead>
        <tr>
          <th>Símbolo</th>
          <th>Nombre</th>
          <th>Moneda</th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {userActions.length > 0 &&
          userActions.map((action) => (
            <tr key={action.symbol}>
              <td>
                <button onClick={() => handleAddAction({ name: action.name, symbol: action.symbol, currency: action.currency })}>
                  {action.symbol}
                </button>
              </td>
              <td>{action.name}</td>
              <td>{action.currency}</td>
              <td>
                <button onClick={() => removeAction(action.symbol)}>Eliminar</button>
              </td>
            </tr>
          ))}
      </tbody>
    </table>
  );
}
