export const chartTypes = {
  realTime: "real-time",
  historical: "historical",
};

export const chartIntervals = {
  "1min": 60000,
  "5min": 300000,
  "15min": 900000,
};

export const chartBaseOptions = {
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

  accessibility: {
    enabled: false,
  },
};
