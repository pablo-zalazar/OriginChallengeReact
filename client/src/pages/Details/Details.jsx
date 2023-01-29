import { useState } from "react";
import { Link, useParams } from "react-router-dom";
import Header from "../../components/Header/Header";
import { chartTypes } from "./components/config";
import RealTimeChart from "./components/RealTimeChart";
import HistoricalChart from "./components/HistoricalChart";

import style from "./Details.module.css";
import { isEmpty } from "../../utils/isEmpty";
import { DetailsForm } from "./components/DetailsForm/DetailsForm";

export default function Details() {
  const { name, symbol, currency } = useParams();

  const [chartData, setChartData] = useState({});

  return (
    <div className={style.container}>
      <div className={style.header}>
        <Header text={`${symbol} - ${name} - ${currency}`} />
        <Link to="/home">Volver</Link>
      </div>

      <DetailsForm handleGenerateGraph={setChartData} />

      {!isEmpty(chartData) && (
        <>
          {chartData.type === chartTypes.historical ? (
            <HistoricalChart title={`Grafico historico de ${symbol}`} symbol={symbol} {...chartData} />
          ) : chartData.type === chartTypes.realTime ? (
            <RealTimeChart title={`Grafico en vivo de ${symbol}`} symbol={symbol} {...chartData} />
          ) : null}
        </>
      )}
    </div>
  );
}
