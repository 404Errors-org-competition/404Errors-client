import React from "react";

const RegionStats = ({ region, animating }) => {
  return (
    <div
      className={`flex-1 border border-gray-300 rounded-md p-5 transition-all duration-500 shadow-sm bg-gray-50
        ${animating ? "opacity-0 scale-95" : "opacity-100 scale-100"} flex flex-col items-center lg:items-stretch`}
    >
      <div className="text-center font-semibold mb-4 text-lg text-[#265DAB] border-b pb-2 w-full">{region.name}</div>

      <div className="space-y-3 w-full max-w-md">
        <div className="flex flex-col p-2 rounded-md bg-white border border-gray-100">
          <div className="text-gray-600 text-sm">Чистий заробіток за місяць:</div>
          <div className="font-semibold text-lg text-emerald-600">{region.monthlyEarnings}$</div>
        </div>

        <div className="flex flex-col p-2 rounded-md bg-white border border-gray-100">
          <div className="text-gray-600 text-sm">Втрачена сума через тривоги:</div>
          <div className="font-semibold text-lg text-red-500">{region.lostDueToAlerts}$</div>
        </div>

        <div className="flex flex-col p-2 rounded-md bg-white border border-gray-100">
          <div className="text-gray-600 text-sm">Кількість часу на окуп бізнесу:</div>
          <div className="font-semibold text-lg">~{region.paybackPeriodMonths} місяців</div>
        </div>
      </div>
    </div>
  );
};

export default RegionStats;
