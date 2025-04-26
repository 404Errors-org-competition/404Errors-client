import React from "react";
import LogoImg from "../assets/Logo.png";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  return (
    <div className="flex items-center justify-start bg-[#115495] w-full px-4 py-2">
      <img src={LogoImg} alt="Logo" className="w-30 h-15 object-contain mr-3" />
      <div className="flex flex-wrap items-center">
        <Link to="/" className={`${navBtnClass}${location.pathname === "/" ? " bg-[#0A3A72]" : ""} mr-2 sm:mr-5`}>
          <span className={navBtnTextClass}>Головна</span>
        </Link>
        <Link
          to="/calculation"
          className={`${navBtnClass}${location.pathname === "/calculation" ? " bg-[#0A3A72]" : ""}`}
        >
          <span className={navBtnTextClass}>Обрахунок</span>
        </Link>
      </div>
    </div>
  );
};

const navBtnClass =
  "bg-[#2C70B7] hover:bg-[#3985D2] rounded-md px-4 sm:px-6 py-2 font-bold text-sm sm:min-w-[120px] md:min-w-[180px] transition-colors ";
const navBtnTextClass = "font-bold text-white hover:text-gray-100 transition-colors";

export default NavBar;
