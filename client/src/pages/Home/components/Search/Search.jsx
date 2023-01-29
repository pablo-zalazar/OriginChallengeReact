import { useState, useMemo } from "react";
import style from "./Search.module.css";

export default function Search({ actions, addAction, userActions }) {
  const [selectedOption, setSelectedOption] = useState("");
  const [error, setError] = useState("");

  const handleAddAction = () => {
    if (!selectedOption) {
      return setError("Seleccione un simbolo");
    }

    addAction(selectedOption);
    setError("");
    setSelectedOption("");
  };

  const filteredActions = useMemo(() => actions.filter((action) => !userActions.includes(action.symbol)), [actions, userActions]);

  return (
    <div className={style.container}>
      <p>Símbolo</p>

      <select value={selectedOption} onChange={(e) => setSelectedOption(e.target.value)}>
        <option value="">Seleccionar símbolo</option>
        {filteredActions?.map(({ symbol }) => (
          <option key={symbol} value={symbol}>
            {symbol}
          </option>
        ))}
      </select>

      <div className={style.action}>
        <button onClick={handleAddAction} disabled={!selectedOption}>
          Agregar
        </button>
        {error && <p className={style.error}>{error}</p>}
      </div>
    </div>
  );
}
