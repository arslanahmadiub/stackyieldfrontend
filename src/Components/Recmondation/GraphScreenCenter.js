import React from "react";
import Chart from "react-apexcharts";

const GraphScreenCenter = () => {
  let series = [44, 55, 13, 43, 22];
  let options = {
    chart: {
      width: "2000px",
      type: "pie",
    },

    legend: {
      show: false,
    },
    dataLabels: {
      enabled: true,
    },
    chart: {
      toolbar: {
        show: false,
      },
    },
  };
  return <Chart options={options} series={series} type="pie" width="100%" />;
};

export default GraphScreenCenter;
