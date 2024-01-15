import React from "react";
import Link from "next/link";
import Image from "next/image";
import VaultLogo from "@/logo1.svg";

const Header = () => {
  return (
    <header className="bg-white p-6 text-gray-800 shadow-md">
      <Link href="/">
        <div className="flex h-16 items-center">
          <div className="w-16 rounded-full">
            <Image src={VaultLogo} alt="Vault Logo" className="rounded-lg" />
          </div>
          <p className="px-8 font-serif text-5xl uppercase">Vault</p>
        </div>
      </Link>
    </header>
  );
};

export default Header;
