import { Outlet } from "react-router-dom";
import Logo from "../../assets/logo.png";
import SidebarContent from "./SidebarContent";


const DashboardLayout = () => {
  const user_object = localStorage.getItem("karyawan");
  const user = user_object ? JSON.parse(user_object) : null;

  return (
    <>
      <div className="navbar bg-primary">
        <div className="flex-none">
          <label
            htmlFor="my-drawer-2"
            className="btn btn-square btn-ghost drawer-button md:hidden"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-5 h-5 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </label>
        </div>

        <div className="flex-1">
          <a className="btn btn-ghost text-xl flex-col">
            <img src={Logo} alt="logo" className="w-20" />
            <p>
              <span className="text-lg font-bold">Atma Kitchen</span>
            </p>
          </a>
        </div>
        <div className="dropdown dropdown-end">
          <a href="#" className="inline-flex items-center">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar"
            >
              <div className="w-10 rounded-full">
                <img
                  alt="Tailwind CSS Navbar component"
                  src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                />
              </div>
            </div>
            <div className="ml-2">
              <span className="text-sm font-bold">{user.Nama}</span>
            </div>
          </a>
          <ul
            tabIndex={0}
            className="menu menu-sm dropdown-content mt-3 z-[1] p-2 shadow bg-base-100 rounded-box w-52"
          >
            <li>
              <a className="justify-between">
                Profile
                <span className="badge">New</span>
              </a>
            </li>
            <li>
              <a>Settings</a>
            </li>
            <li>
              <a>Logout</a>
            </li>
          </ul>
        </div>
      </div>

      <div className="drawer lg:drawer-open">
        <input id="my-drawer-2" type="checkbox" className="drawer-toggle" />
        <div className="drawer-content flex flex-col h-screen">
          {/*  */}
          <div className="flex-1 p-4 bg-blue-50">
            {/* Insert your main content here */}
            <Outlet />
          </div>
        </div>

        <div className="drawer-side">
          <label
            htmlFor="my-drawer-2"
            aria-label="close sidebar"
            className="drawer-overlay"
          ></label>
          <ul className="menu p-4 w-80 min-h-full bg-base-100 text-base-content">
            {/* Sidebar content here */}

            {/* {user.role === "MO" &&
              Object.keys(MO_FEATURES).map((key, index) => {
                return (
                  <li key={index}>
                    <a href={MO_ROUTES[MO_FEATURES[key]]}>{MO_FEATURES[key]}</a>
                  </li>
                );
              })} */}

              <SidebarContent role={user.role} />
          </ul>
        </div>
      </div>
    </>
  );
};

export default DashboardLayout;
