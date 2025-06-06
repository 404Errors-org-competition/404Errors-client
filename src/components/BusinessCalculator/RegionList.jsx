import React, { useState } from "react";

const RegionList = ({
  regions,
  selectedRegion,
  selectedRegions,
  onRegionSelect,
  onViewDetails,
  isMobile,
  onAddToComparison,
}) => {
  const [expandedRegionId, setExpandedRegionId] = useState(null);

  const handleRegionClick = (region) => {
    onRegionSelect(region);
    setExpandedRegionId(region.id === expandedRegionId ? null : region.id);
  };

  const handleCompareClick = (e, region) => {
    e.stopPropagation();
    onAddToComparison(region);
    setExpandedRegionId(null);
  };

  const getRegionCategoryName = (category) => {
    const categories = {
      west: "Західна Україна",
      central: "Центральна Україна",
      east: "Східна Україна",
    };
    return categories[category] || "Інший регіон";
  };

  const getRegionCategoryColor = (category) => {
    const colors = {
      west: "bg-blue-100 text-blue-800",
      central: "bg-yellow-100 text-yellow-800",
      east: "bg-red-100 text-red-800",
    };
    return colors[category] || "bg-gray-100 text-gray-800";
  };

  const filteredRegions = regions;

  return (
    <div className="flex-1 flex flex-col items-center lg:items-start">
      <div className="font-medium mb-3 text-[#265DAB] text-center lg:text-left">
        Оберіть область для детального аналізу:
      </div>
      <ol className="flex flex-col gap-2 w-full max-w-md">
        {filteredRegions.length === 0 ? (
          <li className="py-3 px-4 rounded-md bg-gray-100">
            <div className="flex items-center justify-center">
              <span className="text-gray-500 italic">Немає областей, що відповідають критеріям фільтра</span>
            </div>
          </li>
        ) : (
          filteredRegions.map((region, index) => {
            const isSelectedForComparison = selectedRegions?.some((r) => r.id === region.id);
            const isExpanded = expandedRegionId === region.id;
            const displayNumber = index + 1;

            return (
              <li
                key={region.id}
                className={`py-3 px-4 rounded-md cursor-pointer transition-all duration-300 flex flex-col
                  ${
                    selectedRegion?.id === region.id
                      ? "bg-blue-100 border-l-4 border-[#265DAB] shadow-md"
                      : isSelectedForComparison
                      ? "bg-green-50 border-l-4 border-green-500 shadow-sm"
                      : "bg-gray-200 hover:bg-gray-300 hover:shadow-sm"
                  }`}
              >
                <div onClick={() => handleRegionClick(region)} className="flex items-center justify-between w-full">
                  <div className="flex items-center">
                    <div
                      className={`flex items-center justify-center rounded-full size-7 mr-3 font-medium
                        ${
                          selectedRegion?.id === region.id
                            ? "bg-[#265DAB] text-white"
                            : isSelectedForComparison
                            ? "bg-green-500 text-white"
                            : "bg-gray-300 text-gray-700"
                        }`}
                    >
                      {displayNumber}
                    </div>
                    <div className="flex flex-col">
                      <span className="font-medium">{region.name}</span>
                      {region.regionCategory && (
                        <span
                          className={`text-xs px-2 py-0.5 rounded-full mt-1 inline-block ${getRegionCategoryColor(
                            region.regionCategory
                          )}`}
                        >
                          {getRegionCategoryName(region.regionCategory)}
                        </span>
                      )}
                    </div>
                  </div>

                  {isSelectedForComparison && (
                    <div className="ml-2 flex-shrink-0 flex items-center">
                      <span className="inline-flex items-center rounded-full bg-green-100 px-2 py-1 text-xs font-medium text-green-700">
                        Порівняння
                      </span>
                    </div>
                  )}
                </div>

                {isExpanded && !isSelectedForComparison && (
                  <div className="mt-3 pt-2 border-t border-gray-300 w-full flex justify-between">
                    <button
                      onClick={(e) => handleCompareClick(e, region)}
                      className="text-xs bg-green-500 hover:bg-green-600 text-white py-1 px-3 rounded flex items-center transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                      </svg>
                      Порівняти з іншою областю
                    </button>
                  </div>
                )}

                {isMobile && selectedRegion?.id === region.id && (
                  <div className="mt-3 pt-2 border-t border-gray-300 w-full flex justify-end">
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        onViewDetails();
                      }}
                      className="text-xs bg-blue-500 hover:bg-blue-600 text-white py-1 px-3 rounded flex items-center transition-colors duration-200"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="h-3 w-3 mr-1"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13 10V3L4 14h7v7l9-11h-7z"
                        />
                      </svg>
                      Переглянути деталі
                    </button>
                  </div>
                )}
              </li>
            );
          })
        )}
      </ol>
    </div>
  );
};

export default RegionList;
