import React, { useMemo } from "react";
import ReactApexChart from "react-apexcharts";

const RegionComparison = ({ regions, selectedRegions }) => {
  if (!selectedRegions || selectedRegions.length === 0) {
    return null;
  }

  const sortedRegions = useMemo(() => {
    return [...selectedRegions].sort((a, b) => a.alertsPercentage - b.alertsPercentage);
  }, [selectedRegions]);

  const barChartOptions = useMemo(() => {
    return {
      chart: {
        type: "bar",
        height: 350,
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
        toolbar: {
          show: false,
        },
        id: "bar-chart",
        stacked: false,
      },
      plotOptions: {
        bar: {
          horizontal: false,
          columnWidth: "70%",
          borderRadius: 4,
          distributed: false,
        },
      },
      dataLabels: {
        enabled: false,
      },
      stroke: {
        show: true,
        width: 2,
        colors: ["transparent"],
      },
      xaxis: {
        categories: sortedRegions.map((region) => region.name.replace(" область", "")),
        labels: {
          style: {
            fontSize: "12px",
          },
          trim: true,
          hideOverlappingLabels: true,
          rotate: -45,
          maxHeight: 120,
        },
        tickPlacement: "on",
      },
      yaxis: [
        {
          title: {
            text: "Заробіток ($)",
            style: {
              fontSize: "12px",
            },
          },
          labels: {
            formatter: (val) => `$${val}`,
            style: {
              fontSize: "11px",
            },
          },
        },
        {
          opposite: true,
          title: {
            text: "Втрати (%)",
            style: {
              fontSize: "12px",
            },
          },
          labels: {
            formatter: (val) => `${val}%`,
            style: {
              fontSize: "11px",
            },
          },
        },
      ],
      colors: ["#10b981", "#ef4444", "#3b82f6"],
      legend: {
        position: "top",
        fontSize: "13px",
        horizontalAlign: "center",
        itemMargin: {
          horizontal: 10,
          vertical: 5,
        },
        onItemClick: {
          toggleDataSeries: true,
        },
        onItemHover: {
          highlightDataSeries: true,
        },
      },
      tooltip: {
        y: {
          formatter: function (val, { seriesIndex }) {
            if (seriesIndex === 0) return `$${val}`;
            if (seriesIndex === 1) return `$${val}`;
            return `${val}%`;
          },
        },
        shared: true,
        intersect: false,
      },
      theme: {
        palette: "palette3",
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              height: 300,
            },
            plotOptions: {
              bar: {
                columnWidth: "90%",
              },
            },
            legend: {
              position: "bottom",
              fontSize: "11px",
              offsetY: 5,
              itemMargin: {
                horizontal: 8,
                vertical: 5,
              },
            },
            yaxis: [
              {
                title: {
                  text: "$",
                  style: {
                    fontSize: "11px",
                  },
                },
                labels: {
                  style: {
                    fontSize: "10px",
                  },
                },
              },
              {
                opposite: true,
                title: {
                  text: "%",
                  style: {
                    fontSize: "11px",
                  },
                },
                labels: {
                  style: {
                    fontSize: "10px",
                  },
                },
              },
            ],
          },
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 250,
            },
            plotOptions: {
              bar: {
                columnWidth: "100%",
                borderRadius: 2,
              },
            },
            xaxis: {
              labels: {
                rotate: -90,
                offsetY: 0,
                style: {
                  fontSize: "9px",
                },
              },
            },
            yaxis: [
              {
                labels: {
                  formatter: (val) => `$${val}`,
                  style: {
                    fontSize: "9px",
                  },
                },
              },
              {
                labels: {
                  formatter: (val) => `${val}%`,
                  style: {
                    fontSize: "9px",
                  },
                },
              },
            ],
            legend: {
              fontSize: "10px",
            },
          },
        },
        {
          breakpoint: 376,
          options: {
            chart: {
              height: 220,
            },
            plotOptions: {
              bar: {
                columnWidth: "100%",
                borderRadius: 1,
              },
            },
            xaxis: {
              labels: {
                rotate: -90,
                offsetY: 0,
                style: {
                  fontSize: "8px",
                },
                formatter: function (value) {
                  if (value.length > 8) {
                    return value.substring(0, 6) + "...";
                  }
                  return value;
                },
              },
            },
            yaxis: [
              {
                labels: {
                  formatter: (val) => `$${val}`,
                  style: {
                    fontSize: "8px",
                  },
                },
                title: {
                  text: "",
                },
              },
              {
                labels: {
                  formatter: (val) => `${val}%`,
                  style: {
                    fontSize: "8px",
                  },
                },
                title: {
                  text: "",
                },
              },
            ],
            legend: {
              fontSize: "9px",
              position: "bottom",
              itemMargin: {
                horizontal: 4,
                vertical: 2,
              },
              formatter: function (seriesName) {
                if (seriesName === "Місячний дохід") return "Дохід";
                if (seriesName === "Втрати через тривоги") return "Втрати";
                if (seriesName === "Відсоток втрат") return "% втрат";
                return seriesName;
              },
            },
          },
        },
      ],
    };
  }, [sortedRegions]);

  const barChartSeries = useMemo(() => {
    return [
      {
        name: "Місячний дохід",
        data: sortedRegions.map((region) => region.monthlyEarnings),
        type: "column",
      },
      {
        name: "Втрати через тривоги",
        data: sortedRegions.map((region) => region.lostDueToAlerts),
        type: "column",
      },
      {
        name: "Відсоток втрат",
        data: sortedRegions.map((region) => region.alertsPercentage),
        type: "line",
      },
    ];
  }, [sortedRegions]);

  const radialChartOptions = useMemo(() => {
    const maxPayback = Math.max(...sortedRegions.map((r) => r.paybackPeriodMonths));

    return {
      chart: {
        type: "radialBar",
        height: 300,
        id: "radial-chart",
        animations: {
          enabled: true,
          easing: "easeinout",
          speed: 800,
        },
      },
      plotOptions: {
        radialBar: {
          offsetY: 0,
          startAngle: 0,
          endAngle: 270,
          hollow: {
            margin: 5,
            size: "30%",
            background: "transparent",
            image: undefined,
          },
          dataLabels: {
            name: {
              show: true,
              fontSize: "14px",
            },
            value: {
              show: true,
              fontSize: "14px",
              formatter: function (val, opts) {
                const regionIndex = opts.seriesIndex;
                return sortedRegions[regionIndex].paybackPeriodMonths + " міс";
              },
            },
            total: {
              show: true,
              label: "Всього",
              formatter: function () {
                return sortedRegions.length;
              },
            },
          },
          track: {
            background: "#f1f1f1",
            strokeWidth: "80%",
          },
        },
      },
      colors: ["#1d4ed8", "#2563eb", "#3b82f6", "#60a5fa", "#93c5fd"],
      labels: sortedRegions.map((region) => region.name.replace(" область", "")),
      legend: {
        show: true,
        fontSize: "12px",
        position: "bottom",
        horizontalAlign: "center",
        offsetX: 0,
        offsetY: 0,
        itemMargin: {
          horizontal: 5,
          vertical: 3,
        },
        formatter: function (seriesName, opts) {
          return seriesName + ": " + sortedRegions[opts.seriesIndex].paybackPeriodMonths + " міс";
        },
      },
      responsive: [
        {
          breakpoint: 768,
          options: {
            chart: {
              height: 280,
            },
            plotOptions: {
              radialBar: {
                hollow: {
                  size: "25%",
                },
                dataLabels: {
                  name: {
                    fontSize: "11px",
                  },
                  value: {
                    fontSize: "11px",
                  },
                },
                track: {
                  strokeWidth: "90%",
                  margin: 5,
                },
              },
            },
            legend: {
              fontSize: "11px",
              horizontalAlign: "center",
              offsetY: 5,
              itemMargin: {
                horizontal: 3,
                vertical: 2,
              },
              formatter: function (seriesName, opts) {
                return (
                  sortedRegions[opts.seriesIndex].name.substring(0, 10) +
                  ": " +
                  sortedRegions[opts.seriesIndex].paybackPeriodMonths +
                  " міс"
                );
              },
            },
          },
        },
        {
          breakpoint: 480,
          options: {
            chart: {
              height: 240,
            },
            plotOptions: {
              radialBar: {
                hollow: {
                  size: "20%",
                },
                track: {
                  strokeWidth: "95%",
                  margin: 3,
                },
                dataLabels: {
                  name: {
                    fontSize: "10px",
                    offsetY: -2,
                  },
                  value: {
                    fontSize: "10px",
                    offsetY: 2,
                  },
                  total: {
                    show: true,
                    fontSize: "10px",
                    label: "Регіони",
                  },
                },
              },
            },
            legend: {
              fontSize: "9px",
              horizontalAlign: "center",
              position: "bottom",
              offsetX: 0,
              offsetY: 0,
              itemMargin: {
                horizontal: 2,
                vertical: 1,
              },
              formatter: function (seriesName, opts) {
                const shortName = sortedRegions[opts.seriesIndex].name.split(" ")[0];
                return shortName + ": " + sortedRegions[opts.seriesIndex].paybackPeriodMonths + " міс";
              },
            },
          },
        },
      ],
    };
  }, [sortedRegions]);

  const radialChartSeries = useMemo(() => {
    const maxPayback = Math.max(...sortedRegions.map((r) => r.paybackPeriodMonths));
    return sortedRegions.map((region) => (region.paybackPeriodMonths / maxPayback) * 100);
  }, [sortedRegions]);

  return (
    <div className="w-full border border-gray-200 rounded-lg p-3 sm:p-4 md:p-5 bg-white shadow-sm mb-6 sm:mb-8">
      <h2 className="text-base sm:text-lg font-semibold text-[#265DAB] text-center mb-3 sm:mb-4 border-b pb-2">
        Порівняння вибраних регіонів
      </h2>

      <div className="overflow-x-auto -mx-3 sm:-mx-4 px-3 sm:px-4">
        <div className="min-w-[400px] md:min-w-[600px] mb-4 sm:mb-6">
          <table className="w-full text-xs text-left text-gray-600">
            <thead className="text-[10px] sm:text-xs uppercase bg-gray-100">
              <tr>
                <th className="px-1 py-1 sm:py-2 sm:px-2 md:px-4">Регіон</th>
                <th className="px-1 py-1 sm:py-2 sm:px-2 md:px-4">Міс. дохід</th>
                <th className="px-1 py-1 sm:py-2 sm:px-2 md:px-4">Втрати</th>
                <th className="px-1 py-1 sm:py-2 sm:px-2 md:px-4">% втрат</th>
                <th className="px-1 py-1 sm:py-2 sm:px-2 md:px-4">Окупність</th>
              </tr>
            </thead>
            <tbody>
              {sortedRegions.map((region) => (
                <tr key={region.id} className="border-b">
                  <td className="px-1 py-1 sm:py-2 sm:px-2 md:px-4 font-medium">{region.name}</td>
                  <td className="px-1 py-1 sm:py-2 sm:px-2 md:px-4 text-emerald-600">${region.monthlyEarnings}</td>
                  <td className="px-1 py-1 sm:py-2 sm:px-2 md:px-4 text-red-500">${region.lostDueToAlerts}</td>
                  <td className="px-1 py-1 sm:py-2 sm:px-2 md:px-4">{region.alertsPercentage}%</td>
                  <td className="px-1 py-1 sm:py-2 sm:px-2 md:px-4">{region.paybackPeriodMonths} міс</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-3 sm:gap-4 lg:gap-6 mt-3 sm:mt-4 md:mt-6">
        <div className="border rounded p-2 sm:p-3 md:p-4 overflow-hidden">
          <h3 className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-1 sm:mb-2 text-center">
            Доходи та втрати по регіонах
          </h3>
          <div
            className="chart-container"
            style={{ minHeight: "200px", width: "100%", overflowX: "auto", overflowY: "hidden" }}
          >
            <div style={{ minWidth: selectedRegions.length > 2 ? "350px" : "100%", height: "100%" }}>
              <ReactApexChart
                key={`bar-chart-${selectedRegions.length}`}
                options={barChartOptions}
                series={barChartSeries}
                type="line"
                height={250}
              />
            </div>
          </div>
        </div>
        <div className="border rounded p-2 sm:p-3 md:p-4 overflow-hidden">
          <h3 className="text-[10px] sm:text-xs md:text-sm font-medium text-gray-700 mb-1 sm:mb-2 text-center">
            Порівняння термінів окупності
          </h3>
          <div className="chart-container" style={{ minHeight: "200px", width: "100%" }}>
            <ReactApexChart
              key={`radial-chart-${selectedRegions.length}`}
              options={radialChartOptions}
              series={radialChartSeries}
              type="radialBar"
              height={250}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegionComparison;
