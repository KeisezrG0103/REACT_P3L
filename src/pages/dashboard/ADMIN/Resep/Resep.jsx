import React from "react";
import { getResep } from "../../../../api/resep/resep_query";
import { useQuery } from "react-query";
import { Link } from "react-router-dom";

const Resep = () => {
  const { data: resep, isLoading } = useQuery("resep", getResep);

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
              //   value={searchQuery}
              //   onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </div>
      </div>

      <div className="overflow-x-auto w-full mt-5">
        <div className="card shadow-md bg-base-100" style={{ width: "100%" }}>
          <div
            className="card-body relative"
            style={{ width: "100%", height: "70vh" }}
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
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {resep?.data.map((item, index) => (
                      <tr key={index} className="text-center">
                        <td>{index + 1}</td>
                        <td>{item.Nama}</td>
                        <td>
                          <button
                            className="btn btn-sm btn-primary text-white"
                            onClick={() => {
                              console.log("Detail");
                            }}
                          >
                            Detail
                          </button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Resep;
