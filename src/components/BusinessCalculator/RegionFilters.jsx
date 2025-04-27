import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const RegionFilters = ({ onFilterChange, onSortChange, onCompareSelected, selectedRegions }) => {
  const sortOptions = [
    { value: "paybackAsc", label: "За окупністю (зростання)" },
    { value: "paybackDesc", label: "За окупністю (спадання)" },
    { value: "earningsAsc", label: "За доходом (зростання)" },
    { value: "earningsDesc", label: "За доходом (спадання)" },
  ];

  const filters = [
    { value: "all", label: "Всі регіони" },
    { value: "west", label: "Західна Україна" },
    { value: "central", label: "Центральна Україна" },
    { value: "east", label: "Східна Україна" },
  ];

  return (
    <div>
      {/* Пояснювальний текст над фільтрами */}
      <div className="mb-3 p-3 bg-blue-50 border border-blue-100 rounded-lg text-sm text-gray-700">
        <p className="font-medium mb-1">Як користуватись фільтрами:</p>
        <ul className="list-disc pl-5 space-y-1">
          <li>
            <span className="font-medium">Фільтр регіонів</span> - дозволяє обрати області за географічним розташуванням
            (Західна, Центральна, Східна Україна)
          </li>
          <li>
            <span className="font-medium">Сортування</span> - змінює порядок відображення областей за обраним критерієм
            (окупність, дохід)
          </li>
        </ul>
      </div>

      <div className="flex flex-wrap gap-4 mb-4 items-center">
        <div className="flex-grow min-w-[250px] sm:min-w-0">
          <label className="block text-sm text-gray-600 mb-1">Фільтр регіонів</label>
          <Select onValueChange={onFilterChange} defaultValue="all">
            <SelectTrigger className="w-full border border-gray-300">
              <SelectValue placeholder="Виберіть регіон" />
            </SelectTrigger>
            <SelectContent>
              {filters.map((filter) => (
                <SelectItem key={filter.value} value={filter.value}>
                  {filter.label}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
          <p className="text-xs text-gray-500 mt-1">Оберіть області за географічним розташуванням</p>
        </div>

        <div className="flex-grow min-w-[250px] sm:min-w-0">
          <label className="block text-sm text-gray-600 mb-1">Сортування</label>
          <Select onValueChange={onSortChange} defaultValue="paybackAsc">
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
          <p className="text-xs text-gray-500 mt-1">Змінює порядок областей для швидкого пошуку найкращих варіантів</p>
        </div>
      </div>
    </div>
  );
};

export default RegionFilters;
