import React from "react";
import Link from "next/link";

const Header = () => {
  return (
    <header className="bg-white shadow-md py-4 text-gray-800">
      <div className="container mx-auto px-4 flex items-center justify-between">
        <div className="flex items-center">
          <Link href="/">Vault</Link>
        </div>
      </div>
    </header>
  );
};

export default Header;
