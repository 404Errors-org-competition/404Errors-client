import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Button } from "@/components/ui/button";

const RegionFilters = ({ onFilterChange, onSortChange, onCompareSelected, selectedRegions }) => {
  const sortOptions = [
    { value: "alertsAsc", label: "За % втрат (зростання)" },
    { value: "alertsDesc", label: "За % втрат (спадання)" },
    { value: "earningsAsc", label: "За доходом (зростання)" },
    { value: "earningsDesc", label: "За доходом (спадання)" },
    { value: "paybackAsc", label: "За окупністю (зростання)" },
    { value: "paybackDesc", label: "За окупністю (спадання)" },
  ];

  const filters = [
    { value: "all", label: "Всі регіони" },
    { value: "lowRisk", label: "Низький ризик (до 25%)" },
    { value: "mediumRisk", label: "Середній ризик (25-35%)" },
    { value: "highRisk", label: "Високий ризик (понад 35%)" },
  ];

  return (
    <div className="flex flex-wrap gap-4 mb-4 items-center">
      <div className="flex-grow min-w-[250px] sm:min-w-0">
        <label className="block text-sm text-gray-600 mb-1">Фільтр регіонів</label>
        <Select onValueChange={onFilterChange} defaultValue="all">
          <SelectTrigger className="w-full border border-gray-300">
            <SelectValue placeholder="Виберіть фільтр" />
          </SelectTrigger>
          <SelectContent>
            {filters.map((filter) => (
              <SelectItem key={filter.value} value={filter.value}>
                {filter.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="flex-grow min-w-[250px] sm:min-w-0">
        <label className="block text-sm text-gray-600 mb-1">Сортування</label>
        <Select onValueChange={onSortChange} defaultValue="alertsAsc">
          <SelectTrigger className="w-full border border-gray-300">
            <SelectValue placeholder="Виберіть спосіб сортування" />
          </SelectTrigger>
          <SelectContent>
            {sortOptions.map((option) => (
              <SelectItem key={option.value} value={option.value}>
                {option.label}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
    </div>
  );
};

export default RegionFilters;
