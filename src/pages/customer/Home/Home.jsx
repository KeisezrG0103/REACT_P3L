import React, { useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import { setFilter } from "../../../slicer/slicer_FIltered";
import { useNavigate } from "react-router-dom";
import { useQuery } from "react-query";
import Roti from "../../../assets/roti.avif";
import Minuman from "../../../assets/minuman.avif";
import Cake from "../../../assets/cake.avif";
import { getProdukPenitip } from "../../../api/produkPenitip/Produk_penitip_query";

const Home = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { data, isLoading } = useQuery("produkPenitip", getProdukPenitip);

  // State to track the number of items to display
  const [itemsToShow, setItemsToShow] = useState(5);

  const handleFilter = (Value) => {
    dispatch(setFilter({ isFiltered: true, Value: Value }));
    navigate("/shop");
  };

  useEffect(() => {
    dispatch(setFilter({ isFiltered: false, Value: "" }));
  }, [dispatch]);

  const loadMoreItems = () => {
    // Increase the number of items to show by 5
    setItemsToShow((prevItems) => prevItems + 5);
  };

  return (
    <div>
      <div className="container mx-auto px-6">
        {/* Hero section */}
        <div
          className="h-64 rounded-md overflow-hidden bg-cover bg-center"
          style={{
            backgroundImage: `url(${Cake})`,
            backgroundPosition: "center 25%",
          }}
        >
          <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
            <div className="px-10 max-w-xl">
              <h2 className="text-2xl text-white font-semibold">Cake</h2>
              <button
                className="flex items-center mt-4 px-3 py-2 bg-primary text-white text-sm uppercase font-medium rounded hover:bg-secondary focus:outline-none focus:bg-secondary"
                onClick={() => handleFilter("Cake")}
              >
                <span>Shop Now</span>
                <svg
                  className="h-5 w-5 mx-2"
                  fill="none"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                </svg>
              </button>
            </div>
          </div>
        </div>

        {/* Sections for Minuman and Roti */}
        <div className="md:flex mt-8 md:-mx-4">
          <div
            className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2"
            style={{
              backgroundImage: `url(${Minuman})`,
              backgroundPosition: "center 25%",
            }}
          >
            <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
              <div className="px-10 max-w-xl">
                <h2 className="text-2xl text-white font-semibold">Minuman</h2>
                <button
                  className="flex items-center mt-4 px-3 py-2 bg-primary text-white text-sm uppercase font-medium rounded hover:bg-secondary focus:outline-none focus:bg-secondary"
                  onClick={() => handleFilter("Minuman")}
                >
                  <span>Shop Now</span>
                  <svg
                    className="h-5 w-5 mx-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
          <div
            className="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2"
            style={{
              backgroundImage: `url(${Roti})`,
            }}
          >
            <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
              <div className="px-10 max-w-xl">
                <h2 className="text-2xl text-white font-semibold">Roti</h2>
                <button
                  className="flex items-center mt-4 px-3 py-2 bg-primary text-white text-sm uppercase font-medium rounded hover:bg-secondary focus:outline-none focus:bg-secondary"
                  onClick={() => handleFilter("Roti")}
                >
                  <span>Shop Now</span>
                  <svg
                    className="h-5 w-5 mx-2"
                    fill="none"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                  </svg>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Produk Lainnya section */}
        <div className="mt-16">
          <h3 className="text-gray-600 text-2xl font-medium">Produk Lainnya</h3>
          <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 mt-6">
            {isLoading ? (
              <div>Loading...</div>
            ) : (
              data?.data
                // Slice the data to show only a limited number of items
                ?.slice(0, itemsToShow)
                .map((item, index) => (
                  <div
                    key={index}
                    className="w-full max-w-sm mx-auto rounded-md shadow-md overflow-hidden"
                  >
                    <div
                      className="flex items-end justify-end h-56 w-full bg-cover"
                      style={{
                        backgroundImage: `url(${item.Gambar})`,
                      }}
                    >
                      <button
                        className="px-3 py-1 bg-gray-800 text-white text-sm rounded-md m-2"
                        onClick={() => navigate(`/shop/${item.Id}`)}
                      >
                        View
                      </button>
                    </div>
                    <div className="px-5 py-3">
                      <h3 className="text-gray-700 uppercase">{item.Nama_Produk}</h3>
                      <span className="text-gray-500 mt-2">Rp. {item.Harga_Produk}</span>
                      <p className="text-gray-500 mt-2">Stok: {item.Stok_Produk}</p>
                      <button
                        className="block text-center w-full p-3 mt-4 bg-primary text-white uppercase font-semibold rounded"
                        onClick={() => navigate(`/shop/${item.Id}`)}
                      >
                        Add to cart
                      </button>
                    </div>
                  </div>
                ))
            )}
          </div>
          {data?.data.length > itemsToShow && (
            <div className="flex justify-center mt-6">
              <button
                className="px-4 py-2 bg-primary text-white rounded-md hover:bg-secondary"
                onClick={loadMoreItems}
              >
                Load More
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Home;
