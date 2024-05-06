import { useEffect, useState } from "react";
import { FaChevronDown, FaChevronUp } from "react-icons/fa";
import { getKategori } from "../../../api/kategori/kategori_query";
import { useQuery } from "react-query";
import { useDispatch, useSelector } from "react-redux";
import { getProdukNonPenitipWithKuota } from "../../../api/produk/produk_query";
import { updateFilter } from "../../../slicer/slicer_FIltered";
import { Link, useNavigate } from "react-router-dom";
import {
  setProduk,
  setType,
  resetStateView,
} from "../../../slicer/slicer_customer_view_produk";

import { Custom_Date } from "../../../utils/Date";

const Shop = () => {
  const [isFilterOpen, setIsFilterOpen] = useState(true);
  const [filteredProdukData, setFilteredProdukData] = useState(null); // State to hold filtered products
  const [searchQuery, setSearchQuery] = useState(""); // State to hold search query

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const {
    data: KategoriData,
    isLoading: kategoriLoading,
    isError: kategoriError,
  } = useQuery("kategori", getKategori);
  const filter = useSelector((state) => state.Filter);

  useEffect(() => {
    dispatch(resetStateView());
  }, [dispatch]);

  const CustomerDate = new Custom_Date();

  const TwodaysAfterToday = CustomerDate.twoDaysAfterTodayToString();

  const {
    data: ProdukData,
    isLoading: produkLoading,
    isError: produkError,
  } = useQuery(["produk", TwodaysAfterToday], getProdukNonPenitipWithKuota);

  useEffect(() => {
    let filteredData = ProdukData?.data;

    if (filter.isFiltered) {
      filteredData = ProdukData?.data?.filter(
        (produk) => produk.Nama_Kategori === filter.Value
      );
    }

    if (searchQuery.trim() !== "") {
      filteredData = filteredData.filter((produk) =>
        produk.Nama.toLowerCase().includes(searchQuery.toLowerCase())
      );
    }

    setFilteredProdukData(filteredData);
  }, [filter, ProdukData, searchQuery]);

  // Filter categories and products
  const Kategori = KategoriData?.data?.filter((item) => item.Id !== 4);

  const toggleFilter = () => setIsFilterOpen((prev) => !prev);

  const handleCheckboxClick = (value) => {
    if (filter.Value === value) {
      dispatch(updateFilter({ isFiltered: false, Value: null }));
    } else {
      dispatch(updateFilter({ isFiltered: true, Value: value }));
    }
  };

  const handleSearch = (event) => {
    setSearchQuery(event.target.value);
  };

  const loadingSkeleton = Array.from({ length: 4 }).map((_, index) => (
    <div
      key={index}
      className="w-full mx-auto rounded-md shadow-md overflow-hidden"
    >
      <div className="flex flex-col gap-4 w-full">
        <div className="w-full h-52 bg-gray-300 animate-pulse"></div>
        <div className=" w-2/3 h-4 bg-gray-300 animate-pulse px-5"></div>
        <div className=" w-1/2 h-4 bg-gray-300 animate-pulse mb-5"></div>
      </div>
    </div>
  ));

  const handleViewProduk = (id, Produk) => {
    console.log(id);
    dispatch(setProduk(Produk));

    if (Produk.Stok == 0) {
      dispatch(setType("Pre Order"));
    } else {
      dispatch(setType("Add to cart"));
    }

    navigate(`/Produk/${id}`);
  };

  return (
    <div>Shop</div>
  )
}

export default Shop