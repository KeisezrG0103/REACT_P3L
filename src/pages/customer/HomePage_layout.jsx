import Logo from "../../assets/logo.png";
import Footer from "../../components/Footer";
import { HiUser, HiLogout } from "react-icons/hi";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { setIsOpen } from "../../slicer/slicer_cart";
import Cart from "../../components/Cart";
import { Link, Outlet } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState } from "react";
import { ROUTES_HOMEPAGE } from "../../constant/Routes";
import { Toaster, toast } from "react-hot-toast";
import { FaShoppingCart } from "react-icons/fa";

const HomePage_layout = () => {
  const [navResponsive, setNavResponsive] = useState(false);

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const cartOpen = useSelector((state) => state.cart.isOpen);

  const openCloseCart = () => {
    if (cartOpen) {
      dispatch(setIsOpen(false));
    } else {
      dispatch(setIsOpen(true));
    }
  };

  const logout = () => {
    toast.success("Berhasil logout", { duration: 3000 });

    localStorage.removeItem("token");
    localStorage.removeItem("customer");

    setTimeout(() => {
      navigate("/");
    }, 1500);
  };

  return (
    <div className="bg-base-100">
      <Toaster></Toaster>
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
              <a className=" text-xl flex items-center space-x-2" href="/">
                <img src={Logo} alt="logo" className="w-20" />
                <p>
                  <span className="text-lg text-black font-bold">
                    Atma Kitchen
                  </span>
                </p>
              </a>
            </div>
            <div className="flex items-center justify-end w-full space-x-0 md:space-x-4">
              {customer ? (
                <div className="flex items-center justify-center sm:mx-0">
                  <CiCoins1 className="w-6 h-6" />
                  {/* make a Poin */}
                  <span className="text-lg font-semibold text-gray-600">
                    {poinCustomer?.Total_Poin}
                  </span>
                </div>
              ) : null}

              {customer ? (
                <button
                  onClick={() => openCloseCart()}
                  className="text-gray-600 focus:outline-none mx-4 sm:mx-0"
                >
                  <FaShoppingCart className="w-6 h-6" />
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
                        src="https://cdn-8.motorsport.com/images/mgl/YP3wdKQ2/s800/fabio-quartararo-yamaha-factor.jpg"
                        alt="profile"
                        className="w-10 h-10 rounded-full"
                      />
                    ) : (
                      // Login icon and button here
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
                  {customer ? (
                    <>
                      <li>
                        <Link to="/checkout">Checkout</Link>
                      </li>
                      <li>
                        <Link to="/Pembelian">Pembelian</Link>
                      </li>
                      <li>
                        <Link to="/profile">Profile</Link>
                      </li>
                      <li>
                        <Link to="/settings">Settings</Link>
                      </li>
                    </>
                  ) : null}

                  {karyawan ? (
                    <>
                      <li>
                        <Link to={`/Dashboard/${karyawan.role}`}>
                          Dashboard {karyawan.role}
                        </Link>
                      </li>
                      <li>
                        <Link to="/settings">Settings</Link>
                      </li>
                      {/* Add other employee options here */}
                    </>
                  ) : null}

                  {/* Always include the logout option for both customer and karyawan */}
                  <li>
                    <a className="btn btn-ghost btn-sm" onClick={logout}>
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
                  className="mt-3 text-sm text-gray-600 hover:text-gray-500 sm:mx-3 sm:mt-0"
                >
                  {route.name}
                </Link>
              ))}
            </div>
          </nav>
          <div className="relative mt-6 max-w-lg mx-auto">
            <span className="absolute inset-y-0 left-0 pl-3 flex items-center">
              <svg
                className="h-5 w-5 text-gray-500"
                viewBox="0 0 24 24"
                fill="none"
              >
                <path
                  d="M21 21L15 15M17 10C17 13.866 13.866 17 10 17C6.13401 17 3 13.866 3 10C3 6.13401 6.13401 3 10 3C13.866 3 17 6.13401 17 10Z"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </span>

            <input
              className="w-full border rounded-md pl-10 pr-4 py-2 focus:border-blue-500 focus:outline-none focus:shadow-outline"
              type="text"
              placeholder="Search"
            />
          </div>
        </div>
      </header>

      <Cart />

      {/* Main section */}
      <main className="my-8">
        <Outlet />
      </main>
      {/* Footer component make always in the bottom*/}
      <div className="flex flex-col items-center justify-between p-4 bg-base-100 text-base-content">
        <Footer />
      </div>
    </div>
  );
};

export default HomePage_layout;
