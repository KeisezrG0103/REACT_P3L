import React, { useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { getKategori } from "../../../api/kategori/kategori_query"; // Import icons from Font Awesome
import { useQuery } from "react-query";
import {useSelector} from "react-redux";

const Shop = () => {
  // State for controlling filter visibility
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const {
    data: Kategory,
    isLoading,
    isError,
  } = useQuery("kategori", getKategori);
  const Filter = useSelector((state) => state.Filter);

  const Kategori = Kategory?.data?.filter((item) => item.Id !== 4);
  console.log(Kategori);

  // Function to toggle filter visibility
  const toggleFilter = () => {
    setIsFilterOpen(!isFilterOpen);
  };

  return (
    <div className="flex justify-center content-center mx-2">
      <div className="container">
        <div className="grid grid-row-2 lg:grid-cols-6 gap-4">
          {/* Filter section */}
          <div>
            <div className="bg-gray-100 p-4 rounded-md">
              {/* Toggle button for filter visibility */}
              <button
                onClick={toggleFilter}
                className="flex justify-between items-center w-full text-xl font-semibold"
              >
                <span>Filter</span>
                {isFilterOpen ? <FaChevronUp /> : <FaChevronDown />}
              </button>

              {isFilterOpen && (
                <div className="mt-4">
                  <h1 className="text-lg font-semibold">Category</h1>
                  <div className="form-control">
                    {Kategori?.map((item, index) => (
                      <div key={index}>
                        <label className="cursor-pointer label">
                          <span className="label-text">{item.Kategori}</span>
                          <input
                            type="checkbox"
                            className="checkbox checkbox-secondary"
                            checked={Filter?.Value == item.Kategori}
                            value={item.Id}
                          />
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Products section */}
          <div className="grid grid-cols-1 lg:grid-cols-4 lg:col-span-5 gap-4">
            <div className="bg-gray-100 p-4 rounded-md">
              <img
                src="https://source.unsplash.com/400x300/?cake"
                alt="cake"
                className="w-full h-32 object-cover rounded-md"
              />
              <h1 className="text-xl font-semibold mt-2">Cake</h1>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, voluptatem.
              </p>
              <button className="bg-blue-500 text-white px-2 py-1 mt-2 rounded-md">
                Shop Now
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <img
                src="https://source.unsplash.com/400x300/?food"
                alt="food"
                className="w-full h-32 object-cover rounded-md"
              />
              <h1 className="text-xl font-semibold mt-2">Food</h1>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, voluptatem.
              </p>
              <button className="bg-blue-500 text-white px-2 py-1 mt-2 rounded-md">
                Shop Now
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <img
                src="https://source.unsplash.com/400x300/?drink"
                alt="drink"
                className="w-full h-32 object-cover rounded-md"
              />
              <h1 className="text-xl font-semibold mt-2">Drink</h1>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, voluptatem.
              </p>
              <button className="bg-blue-500 text-white px-2 py-1 mt-2 rounded-md">
                Shop Now
              </button>
            </div>
            <div className="bg-gray-100 p-4 rounded-md">
              <img
                src="https://source.unsplash.com/400x300/?bread"
                alt="bread"
                className="w-full h-32 object-cover rounded-md"
              />
              <h1 className="text-xl font-semibold mt-2">Bread</h1>
              <p className="text-gray-500">
                Lorem ipsum dolor sit amet consectetur adipisicing elit.
                Quisquam, voluptatem.
              </p>
              <button className="bg-blue-500 text-white px-2 py-1 mt-2 rounded-md">
                Shop Now
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Shop;
