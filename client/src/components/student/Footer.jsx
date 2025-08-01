import React from "react";
import { assets } from "../../assets/assets";

const Footer = () => {
  return (
    <footer className="bg-gray-900 md:px-36 text-left w-full mt-10">
      <div className="flex flex-col md:flex-row items-start px-8 md:px-0 justify-center gap-10 md:gap-32 py-10 border-b border-white/30">
        <div className="flex flex-col md:items-start items-center w-full">
          <img src={assets.logo_dark} alt="logo" />
          <p className="mt-6 text-center md:text-left text-sm text-white/80">
            Lorem Ipsum is simple dummy text of the printing and typesetting
            industry.Lorem Ipsum has been the industry's standerd dummy text.
          </p>
        </div>
         
        <div className="flex flex-col md:">
          <h2>Company</h2>
          <ul>
            <li><a href="#">Home</a></li>
            <li><a href="#">About us</a></li>
            <li><a href="#">Contact us</a></li>
            <li><a href="#">Privacy policy</a></li>
          </ul>
        </div>
        <div></div>
      </div>
      <p className="py-4 text-center text-xs md:text-sm text-white/60">
        Copyright 2025 @ E-Learning. All Rigth Reserved.
      </p>
    </footer>
  );
};

export default Footer;
