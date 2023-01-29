import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useEffect, useRef, useState, useCallback } from "react";
import Loader from "../../../components/Loader/Loader";
import { getIntervalApiValues } from "../../../services/apiCalls";
import { isEmpty } from "../../../utils/isEmpty";
import { chartBaseOptions, chartIntervals } from "./config";

export default function RealTimeChart({ title, symbol, interval }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const newInterval = useRef();

  const fetchData = useCallback(async () => {
    try {
      const { values } = await getIntervalApiValues(symbol, interval);
      setData(values);
    } catch (error) {
      setError("Error al realizar el grafico, volver a interlo luego");
    }
  }, [symbol, interval]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);

      newInterval.current = setInterval(() => {
        fetchData();
      }, chartIntervals[interval]);
    })();

    return () => clearInterval(newInterval.current);
  }, [title, symbol, interval, fetchData]);

  const options = {
    ...chartBaseOptions,
    title: {
      text: title,
    },
    series: [
      {
        name: symbol,
        data: data?.map((el) => [Date.parse(el.datetime), parseInt(el.close)]),
      },
    ],
  };

  if (loading) {
    return <Loader />;
  }

  if (error) {
    return <h2>{error}</h2>;
  }

  return (
    <>
      {!isEmpty(data) && (
        <div>
          <HighchartsReact
            highcharts={Highcharts}
            options={options}
            containerProps={{ style: { height: "100%", maxWidth: "700px", margin: "0 auto" } }}
          />
        </div>
      )}
    </>
  );
}
