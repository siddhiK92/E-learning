import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="w-full border-t border-gray-300 bg-white px-8 py-4">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between">

        {/* Left: Logo + Divider + Copyright */}
        <div className="flex items-center gap-4">
          {/* <img src={assets.logo} alt="Logo" className="hidden md:block w-20" /> */}
          <div className="hidden md:block h-6 w-px bg-gray-400" />
          <p className="text-center text-xs md:text-sm text-gray-500 py-2 md:py-0">
            Copyright 2025 © GreatStack. All Rights Reserved.
          </p>
        </div>

        {/* Right: Social Media Icons */}
        {/* <div className="flex items-center gap-4 mt-4 md:mt-0">
          <a href="#" aria-label="Facebook" className="hover:opacity-75 transition-opacity">
            <img src={assets.facebook_icon} alt="Facebook" className="w-5 h-5" />
          </a>
          <a href="#" aria-label="Twitter" className="hover:opacity-75 transition-opacity">
            <img src={assets.twitter_icon} alt="Twitter" className="w-5 h-5" />
          </a>
          <a href="#" aria-label="Instagram" className="hover:opacity-75 transition-opacity">
            <img src={assets.instagram_icon} alt="Instagram" className="w-5 h-5" />
          </a>
        </div> */}

      </div>
    </footer>
  );
};

export default Footer;
