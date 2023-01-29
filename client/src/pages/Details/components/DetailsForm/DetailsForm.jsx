import { useState } from "react";
import { chartIntervals, chartTypes } from "../config";
import style from "./DetailsForm.module.css";

export const DetailsForm = ({ handleGenerateGraph }) => {
  const [type, setType] = useState("");
  const [interval, setInterval] = useState("1min");
  const [from, setFrom] = useState("");
  const [to, setTo] = useState("");

  const [error, setError] = useState("");

  const handleValidateForm = () => {
    if (!type) return setError("Seleccione una opcion de grafico");

    if (type === chartTypes.realTime) {
      if (!interval) {
        return setError("Seleccione un intervalo");
      }
    }

    if (type === chartTypes.historical) {
      if (!from || !to) {
        return setError("Seleccione dos fechas");
      }
      if (Date.parse(from) > Date.parse(to)) {
        return setError("La primera fecha debe ser menor a la segunda");
      }
    }

    setError("");
    handleGenerateGraph({
      type,
      interval,
      from,
      to,
    });
  };

  return (
    <div className={style.container}>
      <div className={style.types}>
        <div>
          <input type="radio" name="type" id="radioRealTime" value={chartTypes.realTime} onChange={(e) => setType(e.target.value)} />
          <label htmlFor="radioRealTime">Tiempo Real</label>
        </div>
        <div>
          <input type="radio" name="type" id="radioHistorico" value={chartTypes.historical} onChange={(e) => setType(e.target.value)} />
          <label htmlFor="radioHistorico">Histórico</label>
        </div>
      </div>

      {type ? (
        type === "real-time" ? (
          <div>
            <label>Intervalo</label>
            <select value={interval} onChange={(e) => setInterval(e.target.value)}>
              {Object.keys(chartIntervals).map((interval) => (
                <option key={interval} value={interval}>
                  {interval}
                </option>
              ))}
            </select>
          </div>
        ) : (
          <div className={style.historic}>
            <label>Fechas</label>
            <input type="date" value={from} onChange={(e) => setFrom(e.target.value)} />
            <input type="date" value={to} onChange={(e) => setTo(e.target.value)} />
          </div>
        )
      ) : null}

      <div className={style.action}>
        <button disabled={!type ? true : false} onClick={handleValidateForm}>
          Graficar
        </button>
        {error && <p className={style.error}>{error}</p>}
      </div>
    </div>
  );
};
