import React from "react";
import Link from "next/link";
import Image from "next/image";
import VaultLogo from "@/logo1.svg";

const Header = () => {
  return (
    <header className="bg-white p-6 text-gray-800 shadow-md">
      <div className="flex h-16 items-center">
        <div className="w-16 rounded-full">
          <Link href="/">
            <Image src={VaultLogo} alt="Vault Logo" className="rounded-lg" />
          </Link>
        </div>
        <p className="px-8 text-5xl font-serif uppercase">Vault</p>
      </div>
    </header>
  );
};

export default Header;
