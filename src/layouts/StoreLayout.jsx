import { useState } from "react";
import { Outlet } from "react-router-dom";
import '../assets/css/style-admin.css';
import { HeaderStore } from "../components/HeaderStore";
import { SidebarStore } from "../components/SidebarStore";
export const StoreLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <HeaderStore toggleSidebar={toggleSidebar} />
      <SidebarStore isOpen={isOpen} />
      <main className={` main-admin ${isOpen ? "" : " active"}`}>
        <Outlet />
      </main>
    </>
  );
};
