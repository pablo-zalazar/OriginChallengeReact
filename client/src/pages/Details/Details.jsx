import axios from "axios";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Header from "../../components/Header/Header";
import { getLocalStorageData, removeLocalStorageData } from "../../services/localStorage";
import Graph from "./components/Graph";
import style from "./Details.module.css";

export default function Details() {
  const { name, symbol, currency } = getLocalStorageData("action");
  const [loading, setLoading] = useState(true);
  // const [showGraph, setShowGraph] = useState(false);
  const [error, setError] = useState("");

  const [graphType, setGraphType] = useState("");
  const [interval, setInterval] = useState("1min");
  const [dateInterval, setDateInterval] = useState({ from: "", to: "" });
  const [props, setProps] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    console.log("first");
    if (!name || !symbol || !currency) {
      navigate("/home", { replace: true });
    } else {
      setLoading(false);
    }
  }, [name, symbol, currency]);

  const handleGenerateGraph = () => {
    if (!graphType) setError("Seleccione una opcion de grafico");
    else if (graphType === "historical") {
      if (!dateInterval.from || !dateInterval.to) {
        setError("Seleccione dos fechas");
      } else {
        setError("");
        setProps({ type: graphType, from: dateInterval.from, to: dateInterval.to });
        setDateInterval({ from: "", to: "" });
      }
    } else {
      setError("");
      setProps({ type: graphType, interval });
    }
  };

  return loading ? (
    <p>Cargando</p>
  ) : (
    <div className={style.container}>
      <div>
        <Header text={`${symbol} - ${name} - ${currency}`} />
        <Link to="/home">Volver</Link>
      </div>

      <div className={style.options}>
        <div>
          <input type="radio" name="type" value="real-time" onChange={(e) => setGraphType(e.target.value)} />
          <label>Tiempo Real</label>
        </div>

        <div>
          <label>Intervalo</label>
          <select value={interval} onChange={(e) => setInterval(e.target.value)}>
            <option value="1min">1 min</option>
            <option value="5min">5 min</option>
            <option value="15min">15 min</option>
          </select>
        </div>

        <div>
          <input type="radio" name="type" value="historical" onChange={(e) => setGraphType(e.target.value)} />
          <label>Histórico</label>
          <input type="date" value={dateInterval.from} onChange={(e) => setDateInterval({ ...dateInterval, from: e.target.value })} />
          <input type="date" value={dateInterval.to} onChange={(e) => setDateInterval({ ...dateInterval, to: e.target.value })} />
        </div>

        <div className={style.action}>
          <button onClick={handleGenerateGraph}>Graficar</button>
          {error && <p className={style.error}>{error}</p>}
        </div>
      </div>
      {<Graph symbol={symbol} props={props} />}
    </div>
  );
}
