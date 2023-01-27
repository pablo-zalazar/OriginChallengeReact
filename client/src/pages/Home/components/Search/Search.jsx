import { useState } from "react";
import style from "./Search.module.css";

export default function Search({ apiActions, addAction, userActions }) {
  const [selectedOption, setSelectedOption] = useState("");

  const handleAdd = () => {
    addAction(selectedOption);
    setSelectedOption("");
  };

  return (
    <div className={style.container}>
      <p>Símbolo</p>
      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        <option value="">Seleccionar símbolo</option>
        {apiActions.map(
          (action) =>
            !userActions.includes(action.symbol) && (
              <option key={action.symbol} value={action.symbol}>
                {action.symbol}
              </option>
            )
        )}
      </select>
      <button disabled={selectedOption ? false : true} onClick={handleAdd}>
        Agregar
      </button>
    </div>
  );
}
