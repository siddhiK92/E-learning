import React from 'react';
import { assets } from '../../assets/assets';

const Footer = () => {
  return (
    <footer className="bg-gradient-to-r from-[#1c1c1c] to-[#2f2f2f] border-t border-gray-700 px-6 py-3">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center">
        
        {/* Left: Logo + Copyright */}
        <div className="flex items-center gap-2 text-sm text-gray-400">
          <img src={assets.logo_icon} alt="Edemy Logo" className="w-5 h-5" />
          <span className="text-white font-semibold">Edemy</span>
          <span className="text-gray-500 mx-2">|</span>
          <span>Copyright 2025 © GreatStack. All Right Reserved.</span>
        </div>

        {/* Right: Social Media Icons */}
        <div className="flex gap-3 mt-3 md:mt-0">
          <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition">
            <img src={assets.facebook_icon} alt="Facebook" className="w-4 h-4" />
          </a>
          <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition">
            <img src={assets.twitter_icon} alt="Twitter" className="w-4 h-4" />
          </a>
          <a href="#" className="bg-gray-800 p-2 rounded-full hover:bg-gray-700 transition">
            <img src={assets.instagram_icon} alt="Instagram" className="w-4 h-4" />
          </a>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
