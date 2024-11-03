import { useState } from "react";
import { Outlet } from "react-router-dom";
import { HeaderAdmin, SidebarAdmin } from "../components";
export const AdminLayout = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };
  return (
    <>
      <HeaderAdmin toggleSidebar={toggleSidebar} />
      <SidebarAdmin isOpen={isOpen} />
      <main className={` main-admin ${isOpen ? "" : " active"}`}>
        <Outlet />
      </main>
    </>
  );
};
