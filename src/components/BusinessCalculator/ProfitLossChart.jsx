import React from "react";
import ReactApexChart from "react-apexcharts";

const ProfitLossChart = ({ region }) => {
  const chartOptions = {
    chart: {
      animations: {
        enabled: true,
        easing: "easeinout",
        speed: 800,
        animateGradually: {
          enabled: true,
          delay: 150,
        },
        dynamicAnimation: {
          enabled: true,
          speed: 350,
        },
      },
    },
    labels: ["Чистий заробіток", "Втрати через тривоги"],
    colors: ["#008000", "#e03131"],
    legend: {
      position: "bottom",
      formatter: function (seriesName, opts) {
        return [seriesName, " - ", opts.w.globals.series[opts.seriesIndex] + "%"];
      },
    },
    tooltip: {
      y: {
        formatter: function (value) {
          return value + "%";
        },
      },
    },
    plotOptions: {
      pie: {
        donut: {
          size: "65%",
          labels: {
            show: true,
            total: {
              show: true,
              showAlways: true,
              label: "Втрати",
              formatter: function (w) {
                return region.alertsPercentage + "%";
              },
            },
            value: {
              fontSize: "22px",
              show: true,
              formatter: function (val) {
                return val + "%";
              },
            },
          },
        },
      },
    },
    dataLabels: {
      enabled: false,
    },
    responsive: [
      {
        breakpoint: 480,
        options: {
          chart: {
            height: 250,
          },
          legend: {
            position: "bottom",
          },
        },
      },
    ],
  };

  const chartSeries = [100 - region.alertsPercentage, region.alertsPercentage];

  return (
    <div className="mt-5 pt-2 border-t w-full text-center">
      <div className="text-center text-sm text-gray-600 mb-2">Співвідношення втрат та прибутку</div>
      <ReactApexChart options={chartOptions} series={chartSeries} type="donut" height={250} />
    </div>
  );
};

export default ProfitLossChart;
