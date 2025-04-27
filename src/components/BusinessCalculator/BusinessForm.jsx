import React, { useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const BusinessForm = ({ onCalculate, loading, setLoading }) => {
  const [businessData, setBusinessData] = useState({
    businessType: "",
    squareMeters: "",
    employeesCount: "",
    investmentAmount: "",
  });

  const [formErrors, setFormErrors] = useState({});
  const [showMinimumInvestmentMessage, setShowMinimumInvestmentMessage] = useState(false);
  const [showMinimumSquareMetersMessage, setShowMinimumSquareMetersMessage] = useState(false);
  const [showMinimumEmployeesMessage, setShowMinimumEmployeesMessage] = useState(false);

  const MINIMUM_INVESTMENT = 10000;
  const MINIMUM_SQUARE_METERS = 20;
  const MINIMUM_EMPLOYEES = 1;

  const handleInputChange = (field, value) => {
    if (["investmentAmount", "squareMeters", "employeesCount"].includes(field)) {
      if (value === "" || /^\d*$/.test(value)) {
        setBusinessData((prev) => ({
          ...prev,
          [field]: value,
        }));

        if (field === "investmentAmount") {
          setShowMinimumInvestmentMessage(false);
        } else if (field === "squareMeters") {
          setShowMinimumSquareMetersMessage(false);
        } else if (field === "employeesCount") {
          setShowMinimumEmployeesMessage(false);
        }
      }
    } else {
      setBusinessData((prev) => ({
        ...prev,
        [field]: value,
      }));
    }

    if (formErrors[field]) {
      setFormErrors((prev) => ({
        ...prev,
        [field]: "",
      }));
    }
  };

  const validateForm = () => {
    const errors = {};

    if (!businessData.businessType) {
      errors.businessType = "Виберіть тип бізнесу";
    }

    if (
      !businessData.investmentAmount ||
      isNaN(Number(businessData.investmentAmount)) ||
      Number(businessData.investmentAmount) < MINIMUM_INVESTMENT
    ) {
      errors.investmentAmount = "Введіть коректну суму інвестицій";
      setShowMinimumInvestmentMessage(true);
    } else {
      setShowMinimumInvestmentMessage(false);
    }

    if (
      !businessData.squareMeters ||
      isNaN(Number(businessData.squareMeters)) ||
      Number(businessData.squareMeters) < MINIMUM_SQUARE_METERS
    ) {
      errors.squareMeters = "Введіть коректну площу приміщення";
      setShowMinimumSquareMetersMessage(true);
    } else {
      setShowMinimumSquareMetersMessage(false);
    }

    if (
      !businessData.employeesCount ||
      isNaN(Number(businessData.employeesCount)) ||
      Number(businessData.employeesCount) < MINIMUM_EMPLOYEES
    ) {
      errors.employeesCount = "Введіть коректну кількість співробітників";
      setShowMinimumEmployeesMessage(true);
    } else {
      setShowMinimumEmployeesMessage(false);
    }

    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) return;

    setLoading(true);

    try {
      const payload = {
        businessType: businessData.businessType,
        squareMeters: Number(businessData.squareMeters),
        employeesCount: Number(businessData.employeesCount),
        investmentAmount: Number(businessData.investmentAmount),
      };

      const response = await fetch("https://404errors-server-production.up.railway.app/business-calculator", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();

      if (Array.isArray(data)) {
        const processedData = data.map((item) => ({
          ...item,
          lostAmountDueToAlerts: item.lostAmountDueToAlerts ?? 0,
        }));
        onCalculate(processedData);
      } else {
        onCalculate(data);
      }
    } catch (error) {
      console.error("Error calculating business metrics:", error);
      setFormErrors((prev) => ({
        ...prev,
        api: "Помилка з'єднання з сервером. Будь ласка, спробуйте пізніше.",
      }));
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full max-w-5xl border-4 border-[#265DAB] bg-white rounded-2xl p-6 flex flex-col gap-4">
      <div className="flex flex-wrap gap-4 justify-center">
        <div className="flex flex-col" style={{ minHeight: "85px" }}>
          <label className="text-sm font-medium text-gray-700 mb-1 ml-1">Тип бізнесу</label>
          <Select onValueChange={(value) => handleInputChange("businessType", value)} value={businessData.businessType}>
            <SelectTrigger
              className={`w-[230px] sm:w-[280px] border-2 bg-white ${
                formErrors.businessType ? "border-red-500" : "border-[#265DAB]"
              }`}
            >
              <SelectValue placeholder="Наприклад: Кав'ярня" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="Coffee">Кав'ярня</SelectItem>
              <SelectItem value="Restaurant">Ресторан</SelectItem>
              <SelectItem value="Grocery">Продуктовий магазин</SelectItem>
              <SelectItem value="Clothes">Магазин одягу</SelectItem>
              <SelectItem value="Bakery">Пекарня</SelectItem>
            </SelectContent>
          </Select>
          <div style={{ minHeight: "40px" }}>
            {formErrors.businessType && <p className="text-red-500 text-xs mt-1">{formErrors.businessType}</p>}
          </div>
        </div>

        <div className="flex flex-col" style={{ minHeight: "85px" }}>
          <label className="text-sm font-medium text-gray-700 mb-1 ml-1">Сума інвестицій</label>
          <Input
            type="text"
            placeholder="Наприклад: 15000"
            className={`w-[230px] sm:w-[280px] border-2 bg-white ${
              formErrors.investmentAmount ? "border-red-500" : "border-[#265DAB]"
            }`}
            value={businessData.investmentAmount}
            onChange={(e) => handleInputChange("investmentAmount", e.target.value)}
          />
          <div style={{ minHeight: "40px" }}>
            {formErrors.investmentAmount && <p className="text-red-500 text-xs mt-1">{formErrors.investmentAmount}</p>}
            {showMinimumInvestmentMessage && (
              <p className="text-amber-600 text-xs mt-1 animate-pulse">
                Мінімальна сума інвестицій - ${MINIMUM_INVESTMENT}.
              </p>
            )}
          </div>
        </div>
      </div>

      <div className="flex flex-wrap gap-4 justify-center mt-1">
        <div className="flex flex-col" style={{ minHeight: "85px" }}>
          <label className="text-sm font-medium text-gray-700 mb-1 ml-1">Площа приміщення (м²)</label>
          <Input
            type="text"
            placeholder="Наприклад: 50"
            className={`w-[230px] sm:w-[280px] border-2 bg-white ${
              formErrors.squareMeters ? "border-red-500" : "border-[#265DAB]"
            }`}
            value={businessData.squareMeters}
            onChange={(e) => handleInputChange("squareMeters", e.target.value)}
          />
          <div style={{ minHeight: "40px" }}>
            {formErrors.squareMeters && <p className="text-red-500 text-xs mt-1">{formErrors.squareMeters}</p>}
            {showMinimumSquareMetersMessage && (
              <p className="text-amber-600 text-xs mt-1 animate-pulse">
                Мінімальна площа - {MINIMUM_SQUARE_METERS} м².
              </p>
            )}
          </div>
        </div>

        <div className="flex flex-col" style={{ minHeight: "85px" }}>
          <label className="text-sm font-medium text-gray-700 mb-1 ml-1">Кількість співробітників</label>
          <Input
            type="text"
            placeholder="Наприклад: 2"
            className={`w-[230px] sm:w-[280px] border-2 bg-white ${
              formErrors.employeesCount ? "border-red-500" : "border-[#265DAB]"
            }`}
            value={businessData.employeesCount}
            onChange={(e) => handleInputChange("employeesCount", e.target.value)}
          />
          <div style={{ minHeight: "40px" }}>
            {formErrors.employeesCount && <p className="text-red-500 text-xs mt-1">{formErrors.employeesCount}</p>}
            {showMinimumEmployeesMessage && (
              <p className="text-amber-600 text-xs mt-1 animate-pulse">Мінімум {MINIMUM_EMPLOYEES} співробітник.</p>
            )}
          </div>
        </div>
      </div>

      {formErrors.api && (
        <div className="text-center">
          <p className="text-red-500 text-sm">{formErrors.api}</p>
        </div>
      )}

      <div className="flex justify-center mt-2">
        <Button
          onClick={handleSubmit}
          className="bg-[#265DAB] text-white px-8 py-2 text-base hover:bg-[#1e4b8a]"
          disabled={loading}
        >
          {loading ? (
            <>
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
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
              Обробка...
            </>
          ) : (
            "Обрахувати втрати"
          )}
        </Button>
      </div>
    </div>
  );
};

export default BusinessForm;
