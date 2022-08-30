import React from "react";
import { Slide, toast, ToastContainer } from "react-toastify";
import Footer from "./Footer";
import Header from "./Header";

function Layout(props: any) {
  return (
    <div className="grid h-screen grid-rows-8 font-mono">
      <Header />
      <main className="row-span-6 bg-slate-300">
        <ToastContainer
          transition={Slide}
          position={toast.POSITION.TOP_LEFT}
          autoClose={1500}
          className="secret toast"
        />
        {props.children}
      </main>
      <Footer />
    </div>
  );
}

export default Layout;
