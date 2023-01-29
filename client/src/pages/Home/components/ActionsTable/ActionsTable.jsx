import { useNavigate } from "react-router-dom";
import { isEmpty } from "../../../../utils/isEmpty";
import style from "./ActionTable.module.css";

export default function ActionsTable({ userActions, removeAction }) {
  const navigate = useNavigate();

  const handleViewAction = ({ symbol, name, currency }) => {
    navigate(`/details/${name}/${symbol}/${currency}`);
  };

  if (isEmpty(userActions)) {
    return <h2>No tiene acciones agregadas</h2>;
  }

  return (
    <div className={style.container}>
      <table className={style.table}>
        <thead>
          <tr>
            <th>Símbolo</th>
            <th>Nombre</th>
            <th>Moneda</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {userActions?.map(({ symbol, name, currency }) => (
            <tr key={symbol}>
              <td>
                <button onClick={() => handleViewAction({ name, symbol, currency })}>{symbol}</button>
              </td>
              <td>{name}</td>
              <td>{currency}</td>
              <td>
                <button onClick={() => removeAction(symbol)}>Eliminar</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
