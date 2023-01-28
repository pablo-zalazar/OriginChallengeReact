import axios from "axios";

export const getAllApiValues = async () => {
  const { data } = await axios.get("https://api.twelvedata.com/stocks?source=docs&exchange=NYSE");
  return data;
};

export const getIntervalApiValues = async (symbol, interval) => {
  const { data } = await axios.get(
    `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=${interval}&apikey=9fd2b8b5aa8842178d1e029a6320df21`
  );
  return data;
};

export const getDateApiValues = async (symbol, from, to) => {
  const { data } = await axios.get(
    `https://api.twelvedata.com/time_series?symbol=${symbol}&interval=1day&start_date=${from}%2009:48:00&end_date=${to}%2019:48:00&apikey=9fd2b8b5aa8842178d1e029a6320df21`
  );
  return data;
};
