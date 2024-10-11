import WaterIntakeTracker from "../features/WaterIntakeTracker";
import SideNavUser from "../side-nav/SideNavUser";

function Dashboard() {
  return (
    <div className="dark:bg-boxdark-2 dark:text-bodydark">
      <div className="flex h-screen overflow-hidden">
        <SideNavUser />

        <div className="relative flex flex-1 flex-col overflow-y-auto overflow-x-hidden">
          {/* <Header /> */}

          <main>
            <div className="mx-auto max-w-screen-2xl p-4 md:p-6 2xl:p-10">
              {/* <Main /> */}
              <WaterIntakeTracker />
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
