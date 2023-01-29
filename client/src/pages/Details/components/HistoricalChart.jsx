import Highcharts from "highcharts";
import HighchartsReact from "highcharts-react-official";
import { useCallback, useEffect, useState } from "react";
import Loader from "../../../components/Loader/Loader";
import { getDateApiValues } from "../../../services/apiCalls";
import { isEmpty } from "../../../utils/isEmpty";
import { chartBaseOptions } from "./config";

export default function HistoricalChart({ title, symbol, from, to }) {
  const [data, setData] = useState();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const fetchData = useCallback(async () => {
    try {
      const { values } = await getDateApiValues(symbol, from, to);
      setData(values);
    } catch (error) {
      setError("Error al realizar el grafico, volver a interlo luego");
    }
  }, [symbol, from, to]);

  useEffect(() => {
    (async () => {
      setLoading(true);
      await fetchData();
      setLoading(false);
    })();
  }, [title, symbol, from, to, fetchData]);

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
