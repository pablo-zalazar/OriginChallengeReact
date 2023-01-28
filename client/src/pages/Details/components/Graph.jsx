import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState } from "react";
import { getIntervalApiValues, getDateApiValues } from "../../../services/apiCalls";
import style from "./Graph.module.css";

export default function Graph({ symbol, props }) {
  const [data, setData] = useState([]);
  const newInterval = useRef();
  console.log(props);

  const fetchData = async (interval) => {
    console.log("fetching");
    const { values } = await getIntervalApiValues(symbol, interval);
    setData(values);
  };

  useEffect(() => {
    (async () => {
      if (props) {
        if (props.type === "real-time") {
          fetchData(props.interval);
          newInterval.current = setInterval(
            () => {
              fetchData(props.interval);
            },
            props.interval === "1min" ? 60000 : props.interval === "5min" ? 300000 : 900000
          );
        } else {
          const { values } = await getDateApiValues(symbol, props.from, props.to);
          setData(values);
        }
      }
    })();
    return () => clearInterval(newInterval.current);
  }, [props]);

  const options = {
    title: {
      text: symbol,
    },

    yAxis: {
      title: {
        text: "Cotización",
      },
    },

    xAxis: {
      title: {
        text: "Intervalo",
      },
      type: "datetime",
    },

    series: [
      {
        name: symbol,
        data: data.map((el) => [Date.parse(el.datetime), parseInt(el.close)]),
      },
    ],

    accessibility: {
      enabled: false,
    },
  };

  return (
    data.length > 0 && (
      <div className={style.graph}>
        <HighchartsReact highcharts={Highcharts} options={options} />
      </div>
    )
  );
}
