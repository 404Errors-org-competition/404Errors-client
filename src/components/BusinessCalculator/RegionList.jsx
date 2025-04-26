import React from "react";

const RegionList = ({ regions, selectedRegion, onRegionSelect }) => {
  return (
    <div className="flex-1 flex flex-col items-center lg:items-start">
      <div className="font-medium mb-3 text-[#265DAB] text-center lg:text-left">
        Оберіть область для детального аналізу:
      </div>
      <ol className="flex flex-col gap-2 w-full max-w-md">
        {regions.map((region) => (
          <li
            key={region.id}
            onClick={() => onRegionSelect(region)}
            className={`py-3 px-4 rounded-md cursor-pointer transition-all duration-300 flex items-center
              ${
                selectedRegion?.id === region.id
                  ? "bg-blue-100 border-l-4 border-[#265DAB] shadow-md"
                  : "bg-gray-200 hover:bg-gray-300 hover:shadow-sm"
              }`}
          >
            <div
              className={`flex items-center justify-center rounded-full size-7 mr-3 font-medium
              ${selectedRegion?.id === region.id ? "bg-[#265DAB] text-white" : "bg-gray-300 text-gray-700"}`}
            >
              {region.id}
            </div>
            <span className="font-medium">{region.name}</span>
          </li>
        ))}
      </ol>
    </div>
  );
};

export default RegionList;
