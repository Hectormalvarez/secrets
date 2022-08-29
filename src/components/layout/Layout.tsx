import React from "react";
import Footer from "./Footer";
import Header from "./Header";

function Layout(props: any) {
  return (
    <div className="grid h-screen grid-rows-8 font-mono">
      <Header />
      <main className="row-span-6 bg-slate-300">{props.children}</main>
      <Footer />
    </div>
  );
}

export default Layout;
