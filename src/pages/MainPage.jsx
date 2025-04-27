import React, { useState, useEffect, useRef } from "react";
import BusinessForm from "@/components/BusinessCalculator/BusinessForm";
import RegionList from "@/components/BusinessCalculator/RegionList";
import RegionStats from "@/components/BusinessCalculator/RegionStats";
import ProfitLossChart from "@/components/BusinessCalculator/ProfitLossChart";
import RegionComparison from "@/components/BusinessCalculator/RegionComparison";
import RegionFilters from "@/components/BusinessCalculator/RegionFilters";

const MainPage = () => {
  //TEMPORARY DATA
  const allRegions = [
    {
      id: 1,
      name: "Луганська область",
      monthlyEarnings: 3400,
      lostDueToAlerts: 500,
      paybackPeriodMonths: 24,
      alertsPercentage: 25,
    },
    {
      id: 2,
      name: "Запорізька область",
      monthlyEarnings: 2900,
      lostDueToAlerts: 850,
      paybackPeriodMonths: 30,
      alertsPercentage: 38,
    },
    {
      id: 3,
      name: "Львівська область",
      monthlyEarnings: 3100,
      lostDueToAlerts: 650,
      paybackPeriodMonths: 26,
      alertsPercentage: 30,
    },
    {
      id: 4,
      name: "Одеська область",
      monthlyEarnings: 3600,
      lostDueToAlerts: 750,
      paybackPeriodMonths: 22,
      alertsPercentage: 28,
    },
    {
      id: 5,
      name: "Київська область",
      monthlyEarnings: 4200,
      lostDueToAlerts: 950,
      paybackPeriodMonths: 20,
      alertsPercentage: 33,
    },
    {
      id: 6,
      name: "Харківська область",
      monthlyEarnings: 3100,
      lostDueToAlerts: 920,
      paybackPeriodMonths: 28,
      alertsPercentage: 42,
    },
    {
      id: 7,
      name: "Закарпатська область",
      monthlyEarnings: 2800,
      lostDueToAlerts: 320,
      paybackPeriodMonths: 23,
      alertsPercentage: 18,
    },
    {
      id: 8,
      name: "Івано-Франківська область",
      monthlyEarnings: 2950,
      lostDueToAlerts: 380,
      paybackPeriodMonths: 24,
      alertsPercentage: 22,
    },
  ];

  const [selectedRegion, setSelectedRegion] = useState(allRegions[0]);
  const [selectedRegions, setSelectedRegions] = useState([]);
  const [animating, setAnimating] = useState(false);
  const [showComparison, setShowComparison] = useState(false);
  const [filteredRegions, setFilteredRegions] = useState(allRegions);
  const [filter, setFilter] = useState("all");
  const [sortBy, setSortBy] = useState("alertsAsc");
  const [activeTab, setActiveTab] = useState("list");

  const comparisonSectionRef = useRef(null);

  useEffect(() => {
    let result = [...allRegions];

    if (filter === "lowRisk") {
      result = result.filter((r) => r.alertsPercentage <= 25);
    } else if (filter === "mediumRisk") {
      result = result.filter((r) => r.alertsPercentage > 25 && r.alertsPercentage <= 35);
    } else if (filter === "highRisk") {
      result = result.filter((r) => r.alertsPercentage > 35);
    }

    if (sortBy === "alertsAsc") {
      result.sort((a, b) => a.alertsPercentage - b.alertsPercentage);
    } else if (sortBy === "alertsDesc") {
      result.sort((a, b) => b.alertsPercentage - a.alertsPercentage);
    } else if (sortBy === "earningsAsc") {
      result.sort((a, b) => a.monthlyEarnings - b.monthlyEarnings);
    } else if (sortBy === "earningsDesc") {
      result.sort((a, b) => b.monthlyEarnings - a.monthlyEarnings);
    } else if (sortBy === "paybackAsc") {
      result.sort((a, b) => a.paybackPeriodMonths - b.paybackPeriodMonths);
    } else if (sortBy === "paybackDesc") {
      result.sort((a, b) => b.paybackPeriodMonths - a.paybackPeriodMonths);
    }

    setFilteredRegions(result);

    const currentRegionExists = result.some((r) => r.id === selectedRegion?.id);
    if (result.length > 0 && !currentRegionExists) {
      setSelectedRegion(result[0]);
    }
  }, [filter, sortBy, selectedRegion?.id]);

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

  const handleCalculate = () => {
    console.log("Calculating...");
  };

  return (
    <div className="min-h-screen bg-[#FAF4E8] flex flex-col items-center p-4 sm:p-6 md:p-8 gap-6 sm:gap-8">
      <BusinessForm onCalculate={handleCalculate} />

      <div className="w-full max-w-5xl bg-white border-4 border-[#265DAB] rounded-2xl p-4 sm:p-6">
        <div className="text-center font-medium mb-4 text-base sm:text-lg">
          Рекомендовані регіони для відкриття бізнесу (за мінімальною частотою повітряних тривог)
        </div>

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
              activeTab === "list" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"
            }`}
          >
            Список регіонів
          </button>
          <button
            onClick={() => setActiveTab("details")}
            className={`flex-1 py-2 px-4 text-center text-sm font-medium ${
              activeTab === "details" ? "border-b-2 border-blue-500 text-blue-600" : "text-gray-500 hover:text-gray-700"
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
            <RegionStats region={selectedRegion} animating={animating} />
            <ProfitLossChart region={selectedRegion} />
          </div>
        </div>

        {showComparison && selectedRegions.length >= 2 && (
          <div ref={comparisonSectionRef} className="mb-6 scroll-mt-8">
            <RegionComparison regions={allRegions} selectedRegions={selectedRegions} />
          </div>
        )}

        <div className="bg-gray-100 p-3 sm:p-4 rounded-md mt-4">
          <h3 className="font-medium text-gray-700 mb-2">Як використовувати інструмент</h3>
          <p className="text-sm text-gray-600">
            Натисніть на області в списку для перегляду детальної статистики.
            <br />
            Ви можете обрати кілька областей для порівняння, натиснувши кнопку "Порівняти з іншою областю".
            <br />
            Після вибору порівняння двох областей ви зможете побачити детальнішу інформацію..
          </p>
        </div>

        <div className="text-right mt-5 text-gray-500 text-sm">Vailen</div>
      </div>
    </div>
  );
};

export default MainPage;
