import React from "react";

const InfoCard = ({ children }) => (
  <div className="bg-[#D97E73] text-white rounded-xl py-8 my-8 w-[90%] mx-auto text-center text-lg font-bold min-h-[120px] flex items-center justify-center">
    {children}
  </div>
);

export default InfoCard;
