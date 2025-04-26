import React from "react";
import UkraineMap from "../assets/Ukraine_Map.svg?url";

const MapComponent = () => {
  return (
    <div className="bg-[#e0e0e0] relative my-5 mx-auto rounded-lg flex items-center justify-center">
      <img src={UkraineMap} alt="Map of Ukraine" className="w-full h-[600px] object-contain" />
    </div>
  );
};

export default MapComponent;
