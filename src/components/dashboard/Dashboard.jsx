import React from "react";
import { useNavigate, Outlet } from "react-router-dom";
import SideNavUser from "../side-nav/SideNavUser";
import { doSignOut } from "../../firebase/auth";
import { useAuth } from "../../contexts/authContext";
import Header from "../header";

function Dashboard() {
  const { currentUser } = useAuth();
  const navigate = useNavigate();

  const handleSignOut = async () => {
    try {
      await doSignOut();
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <SideNavUser />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          <Header />
          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {/* Render nested routes here */}
              <Outlet />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
