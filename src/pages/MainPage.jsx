import React, { useState } from "react";
import BusinessForm from "@/components/BusinessCalculator/BusinessForm";
import RegionList from "@/components/BusinessCalculator/RegionList";
import RegionStats from "@/components/BusinessCalculator/RegionStats";
import ProfitLossChart from "@/components/BusinessCalculator/ProfitLossChart";

const MainPage = () => {
  // TEMPORARY VARIABLES, we will get them from the server
  const regions = [
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
  ];

  const [selectedRegion, setSelectedRegion] = useState(regions[0]);
  const [animating, setAnimating] = useState(false);

  const handleRegionSelect = (region) => {
    setAnimating(true);

    setTimeout(() => {
      setSelectedRegion(region);
      setAnimating(false);
    }, 500);
  };

  const handleCalculate = () => {
    console.log("Calculating...");
  };

  return (
    <div className="min-h-screen flex flex-col items-center p-6 sm:p-8 gap-8">
      <BusinessForm onCalculate={handleCalculate} />

      <div className="w-full max-w-5xl bg-white border-4 border-[#265DAB] rounded-2xl p-6">
        <div className="text-center font-medium mb-4 text-lg">
          Рекомендовані регіони для відкриття бізнесу (за мінімальною частотою повітряних тривог)
        </div>

        <div className="flex flex-col lg:flex-row gap-6">
          <RegionList regions={regions} selectedRegion={selectedRegion} onRegionSelect={handleRegionSelect} />

          <div className="flex-1 flex flex-col">
            <RegionStats region={selectedRegion} animating={animating} />
            <ProfitLossChart region={selectedRegion} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainPage;
