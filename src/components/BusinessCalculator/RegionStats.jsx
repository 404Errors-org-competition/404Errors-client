import React from "react";

const RegionStats = ({ region, animating }) => {
  const hasActualData =
    region &&
    (region.monthlyEarnings !== undefined ||
      region.lostDueToAlerts !== undefined ||
      region.paybackPeriodMonths !== undefined);

  if (!region || !hasActualData) {
    return (
      <div
        className="flex-1 border border-gray-300 rounded-md p-5 shadow-sm bg-gray-50 flex items-center justify-center"
        style={{ minHeight: "300px" }}
      >
        <div className="text-gray-500 text-center">
          {!region ? "Виберіть область для перегляду деталей" : "Обрахуйте дані для перегляду результатів"}
        </div>
      </div>
    );
  }

  return (
    <div
      className={`flex-1 border border-gray-300 rounded-md p-5 transition-opacity duration-500 shadow-sm bg-gray-50
        ${animating ? "opacity-0" : "opacity-100"} flex flex-col items-center lg:items-stretch`}
      style={{ minHeight: "300px" }}
    >
      <div className="text-center font-semibold mb-4 text-lg text-[#265DAB] border-b pb-2 w-full">{region.name}</div>

      <div className="space-y-3 w-full max-w-md">
        <div className="flex flex-col p-2 rounded-md bg-white border border-gray-100">
          <div className="text-gray-600 text-sm">Чистий заробіток за місяць:</div>
          {region.monthlyEarnings ? (
            <div className="font-semibold text-lg text-emerald-600">~{region.monthlyEarnings}$</div>
          ) : (
            <div className="flex items-center h-8 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          )}
        </div>

        <div className="flex flex-col p-2 rounded-md bg-white border border-gray-100">
          <div className="text-gray-600 text-sm">Втрачена сума через тривоги:</div>
          {region.lostDueToAlerts ? (
            <div className="font-semibold text-lg text-red-500">~{region.lostDueToAlerts}$</div>
          ) : (
            <div className="flex items-center h-8 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          )}
        </div>

        <div className="flex flex-col p-2 rounded-md bg-white border border-gray-100">
          <div className="text-gray-600 text-sm">Кількість часу на окуп бізнесу:</div>
          {region.paybackPeriodMonths ? (
            <div className="font-semibold text-lg">~{region.paybackPeriodMonths} місяців</div>
          ) : (
            <div className="flex items-center h-8 animate-pulse">
              <div className="h-4 bg-gray-200 rounded w-24"></div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default RegionStats;
