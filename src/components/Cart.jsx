import React, { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { setIsOpen } from "../slicer/slicer_cart";
import { editJumlahProduk, removeProduk } from "../slicer/slicer_cartProduk";
import { FaTrashAlt } from "react-icons/fa";

const Cart = () => {
  const cartOpen = useSelector((state) => state.cart.isOpen);
  const cartProduk = useSelector((state) => state.cartProduk.Produk);
  const dispatch = useDispatch();

  // Local state to track input quantities for each cart item
  const [quantities, setQuantities] = useState({});

  // Initialize quantities from the cart products
  useEffect(() => {
    const initialQuantities = {};
    cartProduk.forEach((item) => {
      initialQuantities[item.Id] = item.Jumlah;
    });
    setQuantities(initialQuantities);
  }, [cartProduk]);

  // Function to open/close the cart
  const openCloseCart = () => {
    dispatch(setIsOpen(!cartOpen));
  };

  // Update Redux store with new quantity
  useEffect(() => {
    for (const itemId in quantities) {
      const quantity = quantities[itemId];
      if (quantity > 0) {
        dispatch(editJumlahProduk({ Id: itemId, Jumlah: quantity }));
      } 
    }
  }, [quantities, dispatch]);

  // Function to handle input changes
  const handleQuantityChange = (event, itemId) => {
    const newQuantity = parseInt(event.target.value, 10);
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [itemId]: newQuantity,
    }));
  };

  return (
    <div>
      <div
        className={`fixed right-0 top-0 max-w-xs w-full h-full px-6 py-4 transition duration-300 transform overflow-y-auto bg-white border-l-2 border-gray-300 ${
          cartOpen ? "translate-x-0 ease-out" : "translate-x-full ease-in"
        }`}
      >
        <div className="flex items-center justify-between">
          <h3 className="text-2xl font-medium text-gray-700">Your cart</h3>
          <button
            onClick={openCloseCart}
            className="text-gray-600 focus:outline-none"
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
              <path d="M6 18L18 6M6 6l12 12"></path>
            </svg>
          </button>
        </div>
        <hr className="my-3" />
        {/* Cart items */}
        {cartProduk.map((item, index) => (
          <div className="flex justify-between mt-6" key={index}>
            <div className="flex">
              <img
                className="h-20 w-20 object-cover rounded"
                src={item.Gambar}
                alt="Product"
              />
              <div className="mx-3">
                <h3 className="text-sm text-gray-600">{item.Nama}</h3>
                <div className="flex items-center mt-2">
                  <input
                    className="w-16 text-center border border-gray-300 rounded"
                    type="number"
                    min="1"
                    value={quantities[item.Id] ?? item.Jumlah}
                    onChange={(event) => handleQuantityChange(event, item.Id)}
                  />
                </div>
              </div>
            </div>
            <div className="flex flex-col justify-between items-end">
              <span className="text-gray-600">Rp. {item.Harga}</span>
              <FaTrashAlt className="text-red-500 cursor-pointer" onClick={() => dispatch(removeProduk(item.Id))} />
            </div>
          </div>
        ))}

        {/* Apply Promo code and Checkout button */}
        <div className="mt-8">
          <form className="flex items-center justify-center">
            <input
              className="form-input w-48"
              type="text"
              placeholder="Add promo code"
            />
            <button className="ml-3 flex items-center px-3 py-2 bg-primary text-white text-sm uppercase font-medium rounded hover:bg-secondary focus:outline-none focus:bg-secondary">
              <span>Apply</span>
            </button>
          </form>
        </div>
        <button className="flex items-center justify-center mt-4 px-3 py-2 bg-primary text-white text-sm uppercase font-medium rounded hover:bg-secondary focus:outline-none focus:bg-secondary">
          <span>Checkout</span>
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
  );
};

export default Cart;
