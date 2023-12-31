import React from "react";

const Footer = () => {
  const currentYear = new Date().getFullYear(); // Get the current year

  return (
    <footer className="bg-gray-800 text-white py-4 absolute bottom-0 w-full">
      <div className="container mx-auto px-4 flex items-center">
        <span>Copyright © {currentYear} Taylor Made Tech Net</span>
      </div>
    </footer>
  );
};

export default Footer;
