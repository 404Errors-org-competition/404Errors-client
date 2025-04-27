import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const ProfitLossChart = ({ region }) => {
  if (!region || region.alertsPercentage === undefined) {
    return null;
  }

  const chartOptions = useMemo(() => {
    return {
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
        background: "transparent",
      },
      labels: ["Чистий заробіток", "Втрати через тривоги"],
      colors: ["#008000", "#e03131"],
      legend: {
        position: "bottom",
        horizontalAlign: "center",
        fontSize: "13px",
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
        formatter: function (seriesName, opts) {
          return [seriesName, " - ", opts.w.globals.series[opts.seriesIndex] + "%"];
        },
      },
      stroke: {
        width: 2,
        colors: ["#fff"],
      },
      tooltip: {
        y: {
          formatter: function (value) {
            return value + "%";
          },
        },
        style: {
          fontSize: "12px",
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
          expandOnClick: true,
        },
      },
      dataLabels: {
        enabled: false,
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              height: 240,
            },
            legend: {
              position: "bottom",
              fontSize: "12px",
              itemMargin: {
                horizontal: 8,
                vertical: 3,
              },
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "70%",
                  labels: {
                    value: {
                      fontSize: "18px",
                    },
                    total: {
                      fontSize: "12px",
                    },
                  },
                },
                offsetX: 0,
                offsetY: 0,
              },
            },
          },
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 200,
            },
            legend: {
              fontSize: "11px",
              itemMargin: {
                horizontal: 5,
                vertical: 2,
              },
              offsetY: -5,
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "75%",
                  labels: {
                    value: {
                      fontSize: "16px",
                      offsetY: 2,
                    },
                    name: {
                      fontSize: "10px",
                      offsetY: -2,
                    },
                    total: {
                      fontSize: "10px",
                      offsetY: 0,
                    },
                  },
                },
                offsetX: 0,
              },
            },
          },
        },
        {
          breakpoint: 376,
          options: {
            chart: {
              height: 180,
            },
            legend: {
              fontSize: "9px",
              itemMargin: {
                horizontal: 3,
                vertical: 1,
              },
              formatter: function (seriesName, opts) {
                if (seriesName === "Чистий заробіток")
                  return "Прибуток: " + opts.w.globals.series[opts.seriesIndex] + "%";
                if (seriesName === "Втрати через тривоги")
                  return "Втрати: " + opts.w.globals.series[opts.seriesIndex] + "%";
                return seriesName + ": " + opts.w.globals.series[opts.seriesIndex] + "%";
              },
              offsetY: -8,
            },
            plotOptions: {
              pie: {
                donut: {
                  size: "78%",
                  labels: {
                    value: {
                      fontSize: "14px",
                      offsetY: 2,
                    },
                    name: {
                      fontSize: "9px",
                      offsetY: -2,
                    },
                    total: {
                      fontSize: "9px",
                      offsetY: 0,
                      label: "Втрати",
                    },
                  },
                },
                offsetX: 0,
              },
            },
          },
        },
      ],
    };
  }, [region.alertsPercentage]);

  const chartSeries = useMemo(
    () => [100 - region.alertsPercentage, region.alertsPercentage],
    [region.alertsPercentage]
  );

  return (
    <div className="mt-4 sm:mt-5 pt-2 border-t w-full text-center">
      <div className="text-center text-[10px] xs:text-xs sm:text-sm text-gray-600 mb-1 sm:mb-2">
        Співвідношення втрат та прибутку
      </div>
      <div className="chart-container" style={{ width: "100%", maxWidth: "100%" }}>
        <ReactApexChart
          options={chartOptions}
          series={chartSeries}
          type="donut"
          height={220}
          key={`donut-chart-${region.id}`}
        />
      </div>
    </div>
  );
};

export default ProfitLossChart;
