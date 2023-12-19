import React from "react";
import Navbar from "../parts/Navbar";
import Header from "../parts/Header";
import { Outlet } from "react-router-dom";
function Home() {
  return (
    <div className="container">
      <Header />
      <div className="main_container flex-1 grid grid-cols-6 mt-16 h-screen">
        <Navbar />
        <div className="right__content col-span-5 flex-1">
          <div className="main_contain px-5 py-5 bg-slate-800 min-h-screen text-white">
            <Outlet />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;
