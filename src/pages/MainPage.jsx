import React, { useState, useEffect, useRef } from "react";
import BusinessForm from "@/components/BusinessCalculator/BusinessForm";
import RegionList from "@/components/BusinessCalculator/RegionList";
import RegionStats from "@/components/BusinessCalculator/RegionStats";
import ProfitLossChart from "@/components/BusinessCalculator/ProfitLossChart";
import RegionComparison from "@/components/BusinessCalculator/RegionComparison";
import RegionFilters from "@/components/BusinessCalculator/RegionFilters";

const regionsData = [
  { id: 1, name: "Донецька область", alertsPercentage: 45, regionCategory: "east" },
  { id: 2, name: "Луганська область", alertsPercentage: 42, regionCategory: "east" },
  { id: 3, name: "Дніпропетровська область", alertsPercentage: 12, regionCategory: "east" },
  { id: 4, name: "Запорізька область", alertsPercentage: 12, regionCategory: "east" },
  { id: 5, name: "Волинська область", alertsPercentage: 11, regionCategory: "west" },
  { id: 6, name: "Київська область", alertsPercentage: 10, regionCategory: "central" },
  { id: 7, name: "Вінницька область", alertsPercentage: 9, regionCategory: "central" },
  { id: 8, name: "Одеська область", alertsPercentage: 30, regionCategory: "central" },
  { id: 9, name: "Рівненська область", alertsPercentage: 10, regionCategory: "west" },
  { id: 10, name: "Сумська область", alertsPercentage: 36, regionCategory: "east" },
  { id: 11, name: "Тернопільська область", alertsPercentage: 9, regionCategory: "west" },
  { id: 12, name: "Хмельницька область", alertsPercentage: 19, regionCategory: "west" },
  { id: 13, name: "Черкаська область", alertsPercentage: 9, regionCategory: "central" },
  { id: 14, name: "Чернівецька область", alertsPercentage: 9, regionCategory: "west" },
  { id: 15, name: "Чернігівська область", alertsPercentage: 9, regionCategory: "central" },
  { id: 16, name: "Івано-Франківська область", alertsPercentage: 8, regionCategory: "west" },
  { id: 17, name: "Миколаївська область", alertsPercentage: 8, regionCategory: "central" },
  { id: 18, name: "Львівська область", alertsPercentage: 7, regionCategory: "west" },
  { id: 19, name: "Житомирська область", alertsPercentage: 6, regionCategory: "central" },
  { id: 20, name: "Закарпатська область", alertsPercentage: 6, regionCategory: "west" },
  { id: 21, name: "Кіровоградська область", alertsPercentage: 14, regionCategory: "central" },
  { id: 22, name: "Полтавська область", alertsPercentage: 18, regionCategory: "central" },
  { id: 23, name: "Крим", alertsPercentage: 45, regionCategory: "east" },
  { id: 24, name: "Севастополь", alertsPercentage: 45, regionCategory: "east" },
];

const regionCategoryNames = {
  west: "Західна Україна",
  central: "Центральна Україна",
  east: "Східна Україна",
};

const regionNameMap = {
  Donetsk: "Донецька область",
  Luhansk: "Луганська область",
  Dnipropetrovsk: "Дніпропетровська область",
  Zaporizhzhia: "Запорізька область",
  Volyn: "Волинська область",
  Kyiv: "Київська область",
  Vinnytsia: "Вінницька область",
  Odesa: "Одеська область",
  Rivne: "Рівненська область",
  Sumy: "Сумська область",
  Ternopil: "Тернопільська область",
  Khmelnytskyi: "Хмельницька область",
  Cherkasy: "Черкаська область",
  Chernivtsi: "Чернівецька область",
  Chernihiv: "Чернігівська область",
  "Ivano-Frankivsk": "Івано-Франківська область",
  Mykolaiv: "Миколаївська область",
  Lviv: "Львівська область",
  Zhytomyr: "Житомирська область",
  Zakarpattia: "Закарпатська область",
  Kirovohrad: "Кіровоградська область",
  Poltava: "Полтавська область",
  Crimea: "Крим",
  Sevastopol: "Севастополь",
};

const MainPage = () => {
  const [allRegions, setAllRegions] = useState([]);
  const [selectedRegion, setSelectedRegion] = useState(null);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [filteredRegions, setFilteredRegions] = useState([]);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("paybackAsc");
  const [activeTab, setActiveTab] = useState("list");
  const [loading, setLoading] = useState(false);
  const [calculationData, setCalculationData] = useState(null);
  const [calculationComplete, setCalculationComplete] = useState(false);

  const comparisonSectionRef = useRef(null);

  useEffect(() => {
    const initialRegions = regionsData.map((region) => ({
      ...region,
      monthlyEarnings: null,
      lostDueToAlerts: null,
      paybackPeriodMonths: null,
    }));

    setAllRegions(initialRegions);
    setFilteredRegions(initialRegions);
  }, []);

  useEffect(() => {
    if (!calculationData || !Array.isArray(calculationData) || calculationData.length === 0) return;

    const updatedRegions = regionsData.map((baseRegion) => {
      const apiRegion = calculationData.find((r) => regionNameMap[r.region] === baseRegion.name);

      if (!apiRegion) {
        return { ...baseRegion, monthlyEarnings: null, lostDueToAlerts: null, paybackPeriodMonths: null };
      }

      const totalIncome = apiRegion.netIncomePerMonth + apiRegion.lostAmountDueToAlerts;
      const alertsPercentage =
        totalIncome > 0
          ? Math.round((apiRegion.lostAmountDueToAlerts / totalIncome) * 100)
          : baseRegion.alertsPercentage;

      const regionCategory = baseRegion.regionCategory;

      return {
        id: baseRegion.id,
        name: baseRegion.name,
        monthlyEarnings: apiRegion.netIncomePerMonth > 0 ? Math.round(apiRegion.netIncomePerMonth) : 0,
        lostDueToAlerts: Math.round(apiRegion.lostAmountDueToAlerts),
        paybackPeriodMonths: apiRegion.paybackPeriodMonths || null,
        alertsPercentage: alertsPercentage,
        regionCategory: regionCategory,
      };
    });

    const regionGroups = {
      west: updatedRegions.filter((r) => r.regionCategory === "west"),
      central: updatedRegions.filter((r) => r.regionCategory === "central"),
      east: updatedRegions.filter((r) => r.regionCategory === "east"),
    };

    console.log("Згруповані дані за регіонами:", regionGroups);

    setSelectedRegion(null);

    setAllRegions(updatedRegions);
    setFilteredRegions(applyFiltersAndSort(updatedRegions, filter, sortBy));
    setCalculationComplete(true);
  }, [calculationData, filter, sortBy]);

  const applyFiltersAndSort = (regions, filter, sortBy) => {
    let result = [...regions];

    result = result.filter((r) => r.monthlyEarnings !== null && r.monthlyEarnings >= 0);

    if (filter === "west") {
      result = result.filter((r) => r.regionCategory === "west");
    } else if (filter === "central") {
      result = result.filter((r) => r.regionCategory === "central");
    } else if (filter === "east") {
      result = result.filter((r) => r.regionCategory === "east");
    }

    if (filter === "earningsAsc") {
      result.sort((a, b) => a.monthlyEarnings - b.monthlyEarnings);
    } else if (sortBy === "earningsDesc") {
      result.sort((a, b) => b.monthlyEarnings - a.monthlyEarnings);
    } else if (sortBy === "paybackAsc") {
      result.sort((a, b) => {
        if (a.paybackPeriodMonths === null) return 1;
        if (b.paybackPeriodMonths === null) return -1;
        return a.paybackPeriodMonths - b.paybackPeriodMonths;
      });
    } else if (sortBy === "paybackDesc") {
      result.sort((a, b) => {
        if (a.paybackPeriodMonths === null) return 1;
        if (b.paybackPeriodMonths === null) return -1;
        return b.paybackPeriodMonths - a.paybackPeriodMonths;
      });
    }

    return result;
  };

  useEffect(() => {
    if (allRegions.length === 0) return;

    const result = applyFiltersAndSort(allRegions, filter, sortBy);
    setFilteredRegions(result);

    const currentRegionExists = result.some((r) => r.id === selectedRegion?.id);
    if (result.length > 0 && !currentRegionExists) {
      setSelectedRegion(result[0]);
    }
  }, [filter, sortBy, allRegions, selectedRegion?.id]);

  const handleRegionSelect = (region) => {
    setAnimating(true);
    setSelectedRegion(region);
    setTimeout(() => {
      setAnimating(false);
    }, 500);
  };

  const handleAddToComparison = (region) => {
    const isSelected = selectedRegions.some((r) => r.id === region.id);
    if (!isSelected) {
      setSelectedRegions((prevSelected) => [...prevSelected, region]);
      if (selectedRegions.length === 1) {
        setShowComparison(true);
        setTimeout(() => {
          scrollToComparison();
        }, 300);
      }
    }
  };

  const handleViewDetails = () => {
    setActiveTab("details");
  };

  const handleFilterChange = (value) => {
    setFilter(value);
  };

  const handleSortChange = (value) => {
    setSortBy(value);
  };

  const handleCompareClick = () => {
    setShowComparison(true);
    setTimeout(() => {
      scrollToComparison();
    }, 300);
  };

  const scrollToComparison = () => {
    if (comparisonSectionRef.current) {
      comparisonSectionRef.current.scrollIntoView({
        behavior: "smooth",
        block: "start",
      });
    }
  };

  const handleCalculate = (data) => {
    setCalculationData(data);
  };

  const LoadingSpinner = () => (
    <div className="flex flex-col items-center justify-center h-full w-full py-16">
      <svg
        className="animate-spin h-12 w-12 text-[#265DAB] mb-4"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
        <path
          className="opacity-75"
          fill="currentColor"
          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
        ></path>
      </svg>
      <span className="text-gray-600">Завантаження даних...</span>
    </div>
  );

  return (
    <div className="min-h-screen bg-[#FAF4E8] flex flex-col items-center p-4 sm:p-6 md:p-8 gap-6 sm:gap-8">
      <BusinessForm onCalculate={handleCalculate} loading={loading} setLoading={setLoading} />

      <div className="w-full max-w-5xl bg-white border-4 border-[#265DAB] rounded-2xl p-4 sm:p-6">
        <div className="text-center font-medium mb-4 text-base sm:text-lg">
          Рекомендовані регіони для відкриття бізнесу (за мінімальною частотою повітряних тривог)
        </div>

        {calculationComplete && (
          <>
            <RegionFilters
              onFilterChange={handleFilterChange}
              onSortChange={handleSortChange}
              onCompareSelected={handleCompareClick}
              selectedRegions={selectedRegions}
            />

            <div className="flex border-b border-gray-200 mb-4 lg:hidden">
              <button
                onClick={() => setActiveTab("list")}
                className={`flex-1 py-2 px-4 text-center text-sm font-medium ${
                  activeTab === "list"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Список регіонів
              </button>
              <button
                onClick={() => setActiveTab("details")}
                className={`flex-1 py-2 px-4 text-center text-sm font-medium ${
                  activeTab === "details"
                    ? "border-b-2 border-blue-500 text-blue-600"
                    : "text-gray-500 hover:text-gray-700"
                }`}
              >
                Деталі регіону
              </button>
            </div>

            <div className="flex flex-col lg:flex-row gap-6 mb-6">
              <div className={`flex-1 ${activeTab !== "list" ? "hidden lg:block" : ""}`}>
                <RegionList
                  regions={filteredRegions}
                  selectedRegion={selectedRegion}
                  selectedRegions={selectedRegions}
                  onRegionSelect={handleRegionSelect}
                  onViewDetails={handleViewDetails}
                  isMobile={activeTab === "list"}
                  onAddToComparison={handleAddToComparison}
                />
              </div>

              <div className={`flex-1 flex flex-col ${activeTab !== "details" ? "hidden lg:block" : ""}`}>
                {selectedRegion && (
                  <>
                    <RegionStats region={selectedRegion} animating={animating} />
                    <ProfitLossChart region={selectedRegion} />
                  </>
                )}
              </div>
            </div>
          </>
        )}

        {!calculationComplete && !loading && (
          <div className="flex flex-col items-center justify-center py-16">
            <div className="text-center text-gray-600 mb-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-12 w-12 mx-auto mb-3 text-gray-400"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                />
              </svg>
              <p className="text-lg font-medium">Заповніть форму для отримання результатів</p>
              <p className="text-sm mt-2">
                Для перегляду рекомендованих регіонів та детальної інформації, спочатку введіть дані про ваш бізнес та
                натисніть "Обрахувати втрати"
              </p>
            </div>
          </div>
        )}

        {loading ? <LoadingSpinner /> : null}

        {showComparison && selectedRegions.length >= 2 && calculationComplete && (
          <div ref={comparisonSectionRef} className="mb-6 scroll-mt-8">
            <RegionComparison regions={allRegions} selectedRegions={selectedRegions} />
          </div>
        )}

        <div className="bg-gray-100 p-3 sm:p-4 rounded-md mt-4">
          <h3 className="font-medium text-gray-700 mb-2">Як використовувати інструмент</h3>
          <p className="text-sm text-gray-600">
            Заповніть інформацію про бізнес у формі вгорі та натисніть "Обрахувати втрати".
            <br />
            Після розрахунку ви побачите рекомендовані регіони, натисніть на область для деталей.
            <br />
            Ви можете обрати кілька областей для порівняння, натиснувши "Порівняти з іншою областю".
          </p>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
