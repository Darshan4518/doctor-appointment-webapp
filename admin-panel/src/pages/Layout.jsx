import React from "react";
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

const Layout = ({ children }) => {
  return (
    <div className="  w-full h-screen flex">
      <Sidebar className="w-[20%]" />

      <div className=" w-[100%]">
        <Header />
        <div className=" h-[90vh] overflow-y-scroll">{children}</div>
      </div>
    </div>
  );
};

export default Layout;
