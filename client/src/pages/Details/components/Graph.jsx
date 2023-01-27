import axios from "axios";
import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useState } from "react";

import style from "./Graph.module.css";

export default function Graph({ symbol, props }) {
  const [data, setData] = useState([]);
  console.log(props);

  useEffect(() => {
    (async () => {
      if (props) {
        if (props.type === "real-time") {
          const { data } = await axios.get(
            `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${props.interval}&apikey=9fd2b8b5aa8842178d1e029a6320df21`
          );
          console.log(data);
          setData(data.values);
        } else {
          console.log("first");
          const { data } = await axios.get(
            `https://api.twelvedata.com/time_series?start_date=${props.from}&end_date=${props.to}&symbol=${symbol}&interval=1day&apikey=9fd2b8b5aa8842178d1e029a6320df21`
          );
          setData(data.values);
        }
      }
    })();
  }, [symbol, props]);

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
      accessibility: {
        rangeDescription: "Range: 0 to 1000",
      },
    },

    plotOptions: {
      series: {
        label: {
          connectorAllowed: false,
        },
        pointStart: 0,
      },
    },

    series: [
      {
        name: symbol,
        data: data.map((el) => parseInt(el.close)),
      },
    ],

    responsive: {
      rules: [
        {
          condition: {
            maxWidth: 500,
          },
          chartOptions: {
            legend: {
              layout: "horizontal",
              align: "center",
              verticalAlign: "bottom",
            },
          },
        },
      ],
    },

    accessibility: {
      enabled: false,
    },
  };

  return (
    data.length > 0 && (
      <div className={style.graph}>
        <HighchartsReact class="graph" highcharts={Highcharts} options={options} />
      </div>
    )
  );
}
