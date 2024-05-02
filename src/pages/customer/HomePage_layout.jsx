import Logo from "../../assets/logo.png";
import Footer from "../../components/Footer";

import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setIsOpen } from "../../slicer/slicer_cart";
import Cart from "../../components/Cart";
import { Link, Outlet } from "react-router-dom";
import { useState } from "react";
import { ROUTES_HOMEPAGE } from "../../constant/Routes";
import { useLocation } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { FiLogIn } from "react-icons/fi";
import { resetProduk } from "../../slicer/slicer_cartProduk";

const HomePage_layout = () => {
  const [navResponsive, setNavResponsive] = useState(false);
  const location = useLocation();
  const dispatch = useDispatch();
  const cartOpen = useSelector((state) => state.cart.isOpen);
  const navigate = useNavigate();

  const customer = localStorage?.getItem("customer");
  const karyawan = localStorage?.getItem("karyawan");
 

  const openCloseCart = () => {
    if (cartOpen) {
      dispatch(setIsOpen(false));
    } else {
      dispatch(setIsOpen(true));
    }
  };
  const doLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("karyawan");
    localStorage.removeItem("customer");
    dispatch(resetProduk());
    navigate("/auth/signin");
  };

  return (
    <div className="bg-base-100">
      <header>
        <div className="container mx-auto px-6 py-3">
          <div className="flex items-center justify-between">
            <div className="hidden w-full text-gray-600 md:flex md:items-center">
              <svg
                className="h-5 w-5"
                viewBox="0 0 24 24"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M16.2721 10.2721C16.2721 12.4813 14.4813 14.2721 12.2721 14.2721C10.063 14.2721 8.27214 12.4813 8.27214 10.2721C8.27214 8.06298 10.063 6.27212 12.2721 6.27212C14.4813 6.27212 16.2721 8.06298 16.2721 10.2721ZM14.2721 10.2721C14.2721 11.3767 13.3767 12.2721 12.2721 12.2721C11.1676 12.2721 10.2721 11.3767 10.2721 10.2721C10.2721 9.16755 11.1676 8.27212 12.2721 8.27212C13.3767 8.27212 14.2721 9.16755 14.2721 10.2721Z"
                  fill="currentColor"
                />
                <path
                  fillRule="evenodd"
                  clipRule="evenodd"
                  d="M5.79417 16.5183C2.19424 13.0909 2.05438 7.39409 5.48178 3.79417C8.90918 0.194243 14.6059 0.054383 18.2059 3.48178C21.8058 6.90918 21.9457 12.6059 18.5183 16.2059L12.3124 22.7241L5.79417 16.5183ZM17.0698 14.8268L12.243 19.8965L7.17324 15.0698C4.3733 12.404 4.26452 7.97318 6.93028 5.17324C9.59603 2.3733 14.0268 2.26452 16.8268 4.93028C19.6267 7.59603 19.7355 12.0268 17.0698 14.8268Z"
                  fill="currentColor"
                />
              </svg>
              <span className="mx-1 text-sm">Indonesia</span>
            </div>
            <div className="w-full text-gray-700 md:text-center text-2xl font-semibold flex justify-center content-center">
              <a className=" text-xl flex items-center space-x-2" href="#">
                <img src={Logo} alt="logo" className="w-20" />
                <p>
                  <span className="text-lg text-black font-bold">
                    Atma Kitchen
                  </span>
                </p>
              </a>
            </div>
            <div className="flex items-center justify-end w-full">
              {customer ? (
                <button
                  onClick={() => openCloseCart()}
                  className="text-gray-600 focus:outline-none mx-4 sm:mx-0"
                >
                  <svg
                    className="h-5 w-5"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z"></path>
                  </svg>
                </button>
              ) : null}

              <div className="dropdown dropdown-end mx-2">
                <div
                  tabIndex={0}
                  role="button"
                  className="btn btn-ghost btn-circle avatar"
                >
                  <div className="w-10 rounded-full">
                    {customer || karyawan ? (
                      <img
                        src="https://daisyui.com/images/stock/photo-1534528741775-53994a69daeb.jpg"
                        alt="profile"
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      // login icon and button here
                      <Link to="/auth/signin">
                        <div className="w-10 h-10 rounded-full flex items-center justify-center">
                          <FiLogIn className="w-6 h-8" />
                        </div>
                      </Link>
                    )}
                  </div>
                </div>
                <ul
                  tabIndex={0}
                  className="mt-3 z-[1] p-2 shadow menu menu-sm dropdown-content bg-base-100 rounded-box w-52"
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
                    <a className="btn btn-ghost btn-sm" onClick={doLogout}>
                      Logout
                    </a>
                  </li>
                </ul>
              </div>

              <div className="flex sm:hidden">
                <button
                  onClick={() => setNavResponsive(!navResponsive)}
                  type="button"
                  className="text-gray-600 hover:text-gray-500 focus:outline-none focus:text-gray-500"
                  aria-label="toggle menu"
                >
                  <svg viewBox="0 0 24 24" className="h-6 w-6 fill-current">
                    <path
                      fillRule="evenodd"
                      d="M4 5h16a1 1 0 0 1 0 2H4a1 1 0 1 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2zm0 6h16a1 1 0 0 1 0 2H4a1 1 0 0 1 0-2z"
                    ></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>

          <nav
            className={`${
              navResponsive ? "" : "hidden"
            } sm:flex sm:justify-center sm:items-center mt-4`}
          >
            <div className="flex flex-col sm:flex-row">
              {Object.values(ROUTES_HOMEPAGE).map((route) => (
                <Link
                  to={route.route}
                  key={route.route}
                  className={`${
                    location.pathname === route.route
                      ? "bg-gray-200 text-gray-900"
                      : "text-gray-600"
                  } px-4 py-2 mt-2 text-sm font-semibold rounded hover:text-primary hover:bg-gray-100 focus:outline-none focus:text-primary focus:bg-gray-100`}
                >
                  {route.name}
                </Link>
              ))}
            </div>
          </nav>
        </div>
      </header>

      <Cart />

      {/* Main section */}
      <main className="my-8">
        <Outlet />
      </main>
      <div className="flex flex-col items-center justify-between p-4 bg-base-100 text-base-content">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage_layout;
