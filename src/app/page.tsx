import Image from "next/image";
import Link from "next/link";

export default function Home() {
  return (
    <main>
      <h1 className="text-2xl  pt-16 text-center">
        Welcome to the Vault Home Page
      </h1>
      <div className="flex justify-center items-center mt-8">
        <button className="bg-gray-800 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded-md">
          <Link href="/new-vault">New Vault</Link>
        </button>
        <button className="hover:bg-gray-200 text-gray-800 border-2 font-bold py-2 px-4 rounded-md ml-4">
          <Link href="/open-vault">Open Vault</Link>
        </button>
      </div>
    </main>
  );
}
