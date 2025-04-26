import React, { useState } from "react";
import InfoCard from "../components/InfoCard";
import MapComponent from "../components/MapComponent";

const MainPage = () => {
  return (
    <div className="flex-1 flex flex-col items-center justify-start w-full">
      <InfoCard>Інформація про проєкт: тут буде короткий опис або інструкція для користувача.</InfoCard>
      <MapComponent />
    </div>
  );
};

export default MainPage;
