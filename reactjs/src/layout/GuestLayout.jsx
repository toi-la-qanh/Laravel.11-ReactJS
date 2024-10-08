import React from "react";
import { Outlet } from "react-router-dom";
import NavBar from "../components/NavBar";
import Footer from "../components/Footer";

export default function GuestLayout() {

  return (
    <>
      <div className="bg-gray-50">
        <NavBar />
        <main className="w-full flex justify-center h-screen">
          <div className="shadow-gray-200 shadow-sm lg:w-1/2 md:w-2/3 md:mb-0 mb-28 m-4 w-full rounded-3xl border-gray-300 border px-6 py-3 bg-white">
            <Outlet />
          </div>
        </main>
        <Footer />
      </div>
    </>
  );
}
