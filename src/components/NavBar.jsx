import React from "react";
import LogoImg from "../assets/Logo.svg?url";
import { Link, useLocation } from "react-router-dom";

const NavBar = () => {
  const location = useLocation();
  return (
    <div className="flex items-center bg-[#E6B09C] w-full">
      <img src={LogoImg} alt="404 errors logo" className="w-14 h-12 object-contain mr-3" />
      <Link to="/" className={navBtnClass + (location.pathname === "/" ? " bg-[#B04A3A]" : "")}>
        <span className={navBtnTextClass}>Головна</span>
      </Link>
      <Link to="/calculation" className={navBtnClass + (location.pathname === "/map" ? " bg-[#B04A3A]" : "")}>
        <span className={navBtnTextClass}>Обрахунок</span>
      </Link>
    </div>
  );
};

const navBtnClass =
  "bg-[#D97E73] mr-5 text-[#B04A3A] hover:text-black rounded-md px-6 py-2 font-bold text-sm min-w-[180px]transition-colors";
const navBtnTextClass = "font-bold text-white hover:text-[#B04A3A] transition-colors mr-2";

export default NavBar;
