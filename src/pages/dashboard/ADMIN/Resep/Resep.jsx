import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getResep } from "../../../../api/resep/resep_query";
import { useEffect } from "react";
import Modal_Delete from "../../../../components/Modal_Delete";
//import Modal_DetailResep from "../../../../components/Modal_DetailResep";
import {
  setItems,
  setModal,
  setModalKey,
} from "../../../../slicer/slicer_modal";

import { useDispatch } from "react-redux";

import { setIsEdit } from "../../../../slicer/slicer_IsEdit";
import { setItem, setOpen } from "../../../../slicer/slicer_DetailResep";
import { resetState } from "../../../../slicer/slicer_IsEdit";

const Resep = () => {
  const dispatch = useDispatch();

  const { data: resepData, isLoading, refetch } = useQuery("resep", getResep);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredResep, setFilteredResep] = useState([]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  useEffect(() => {
    if (resepData && resepData.data) {
      const filtered = resepData.data.filter((resep) =>
        resep.Nama.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredResep(filtered);
    }
  }, [resepData, searchQuery]);

  const openModal = (item) => {
    dispatch(setModal(true));
    dispatch(setItems(item));
    dispatch(setModalKey("resep"));
  };

  const openDetail = (item) => {
    dispatch(setItem(item));
    dispatch(setOpen(true));
    this.openModal(item);
  };

  const isEdit = (item) => {
    dispatch(setResep(item));
    dispatch(setIsEdit(true));
  };

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, filteredResep.length);

  const currentData = filteredResep.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredResep.length / limit);

  const changePage = (page) => {
    setPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div>
      <div className="flex justify-between place-items-end lg:place-items-center">
        <div className="flex items-start space-y-4 flex-col">
          <h1 className="font-bold text-2xl">Resep</h1>
          <div className="form-control">
            <input
              type="text"
              placeholder="Search"
              className="input input-bordered w-60 md:w-auto"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
        <div>
          <Link to="/dashboard/Admin/resep/tambah">
            <button className="btn btn-success text-white mt-5">
              Tambah Resep
            </button>
          </Link>
        </div>
      </div>
      <div className="overflow-x-auto w-full mt-5">
        <div className="card shadow-md bg-base-100" style={{ width: "100%" }}>
          <div
            className="card-body relative"
            style={{ width: "100%", height: "100vh" }}
          >
            {isLoading ? (
              <div className="h-full w-full flex justify-center items-center absolute top-0 left-0 right-0 bottom-0">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table">
                  <thead>
                    <tr className="text-center">
                      <th>No</th>
                      <th>Nama</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((resep, index) => (
                      <tr key={index} className="text-center">
                        <td>{startIndex + index + 1}</td>
                        <td>{resep.Nama}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-secondary text-white text-base-100 ml-2 w-20"
                            onClick={() => openDetail(resep)}
                          >
                            Detail
                          </button>
                          <Link to={`/dashboard/Admin/resep/${resep.id}`}>
                            <button
                              className="btn btn-sm btn-primary text-base-100 ml-2 w-20"
                              onClick={() => isEdit(resep)}
                            >
                              Edit
                            </button>
                          </Link>
                          <button
                            className="btn btn-sm btn-error text-base-100 ml-2 w-20"
                            onClick={() => openModal(resep)}
                          >
                            Delete
                          </button>
                          <Modal_Delete />
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
          <div className="join flex justify-center mb-4">
            {Array.from({ length: totalPages }).map((_, index) => (
              <button
                key={index}
                className={`join-item btn btn-square ${
                  index + 1 === page ? "btn-primary text-white" : ""
                }`}
                onClick={() => changePage(index + 1)}
              >
                {index + 1}
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resep;
