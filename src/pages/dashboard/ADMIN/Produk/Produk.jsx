import { useEffect } from "react";
import { getProduk } from "../../../../api/produk/produk_query";
import { useQuery } from "react-query";
import { useMutation } from "react-query";
import { deleteProduk } from "../../../../api/produk/produk_query";

import { Link } from "react-router-dom";

const Produk = () => {
  const { data, isLoading, isError, refetch } = useQuery(
    {
      queryKey: "produk",
      queryFn: getProduk,
      retry:3
    },
  
);

const mutation = useMutation({
  mutationFn: deleteProduk,
  onSuccess: () => {
    refetch();
  }
});


useEffect (() => {
  refetch();
}, [refetch]);

  console.log(data?.data);

  let No = 1;
  const cake = data?.data?.filter((item) => item.Kategori === "Cake" && item.Penitip == null);
  const minuman = data?.data?.filter((item) => item.Kategori === "Minuman" && item.Penitip == null);
  const roti = data?.data?.filter((item) => item.Kategori === "Roti" && item.Penitip == null);
  const titipan = data?.data?.filter((item) => item.Penitip !== null);


  const deleteProdukFunction = async (id) => {
    await mutation.mutateAsync(id);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Produk</h1>
        <Link to="/dashboard/Admin/produk/tambah">
          <button className="btn btn-primary text-white mt-5">
            Tambah Produk
          </button>
        </Link>
      </div>
      <div className="w-full mt-5 lg:grid lg:grid-cols-3 lg:grid-rows-2 lg:gap-3">
        <div
          className="card shadow-lg bg-base-100 overflow-hidden lg:mt-5 lg:row-span-2"
          style={{ height: "100vh" }}
        >
          <div className="card-header">
            <h2 className="card-title text-xl font-semibold ml-4 mt-5">Cake</h2>
          </div>
          <div className="card-body overflow-y-auto relative">
            {isLoading ? (
              <div className="h-full w-full flex justify-center items-center absolute top-0 left-0 right-0 bottom-0">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="text-center">
                    <tr>
                      <th>No</th>
                      <th>Nama</th>
                      <th>Harga</th>
                      <th>Stok</th>
                      <th className="flex justify-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {cake?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.Nama_Produk}</td>
                        <td>{item.Harga}</td>
                        <td>{item.Stok}</td>
                        <td className="flex justify-center">
                          <Link to={`/dashboard/Admin/produk/${item.Id}`}>
                            <button className="btn btn-sm btn-primary text-white mr-2">
                              Edit
                            </button>
                          </Link>
                          <button className="btn btn-sm btn-error " onClick={() => deleteProdukFunction(item.Id)}>
                            Delete
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

        <div
          className="card shadow-lg bg-base-100 overflow-hidden mt-5 "
          style={{ height: "50vh" }}
        >
          <div className="card-header">
            <h2 className="card-title text-xl font-semibold ml-4 mt-5">
              Minuman
            </h2>
          </div>

          <div className="card-body overflow-y-auto relative">
            {isLoading ? (
              <div className="h-full w-full flex justify-center items-center absolute top-0 left-0 right-0 bottom-0">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="text-center">
                    <tr>
                      <th>No</th>
                      <th>Nama</th>
                      <th>Harga</th>
                      <th>Stok</th>
                      <th className="flex justify-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {minuman?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.Nama_Produk}</td>
                        <td>{item.Harga}</td>
                        <td>{item.Stok}</td>
                        <td className="flex justify-center">
                          <button className="btn btn-sm btn-primary text-white mr-2">
                            Edit
                          </button>
                          <button className="btn btn-sm btn-error " onClick={() => deleteProdukFunction(item.Id)}>
                            Delete
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
        <div
          className="card shadow-lg bg-base-100 overflow-hidden mt-5"
          style={{ height: "50vh" }}
        >
          <div className="card-header">
            <h2 className="card-title text-xl font-semibold ml-4 mt-5">Roti</h2>
          </div>
          <div className="card-body overflow-y-auto relative">
            {isLoading ? (
              <div className="h-full w-full flex justify-center items-center absolute top-0 left-0 right-0 bottom-0">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="text-center">
                    <tr>
                      <th>No</th>
                      <th>Nama</th>
                      <th>Harga</th>
                      <th>Stok</th>
                      <th className="flex justify-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {roti?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.Nama_Produk}</td>
                        <td>{item.Harga}</td>
                        <td>{item.Stok}</td>
                        <td className="flex justify-center">
                          <button className="btn btn-sm btn-primary text-white mr-2">
                            Edit
                          </button>
                          <button className="btn btn-sm btn-error " onClick={() => deleteProdukFunction(item.Id)}>
                            Delete
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
        <div
          className="card shadow-lg bg-base-100 overflow-hidden mt-5 lg:mt-0 lg:col-span-2"
          style={{ height: "49vh" }}
        >
          <div className="card-header">
            <h2 className="card-title text-xl font-semibold ml-4 mt-5">
              Produk Titip
            </h2>
          </div>
          <div className="card-body overflow-y-auto relative">
            {isLoading ? (
              <div className="h-full w-full flex justify-center items-center absolute top-0 left-0 right-0 bottom-0">
                <span className="loading loading-spinner loading-lg"></span>
              </div>
            ) : (
              <div className="overflow-x-auto">
                <table className="table w-full">
                  <thead className="text-center">
                    <tr>
                      <th>No</th>
                      <th>Nama</th>
                      <th>Harga</th>
                      <th>Stok</th>
                      <th>Penitip</th>
                      <th className="flex justify-center">Action</th>
                    </tr>
                  </thead>
                  <tbody className="text-center">
                    {titipan?.map((item, index) => (
                      <tr key={index}>
                        <td>{index + 1}</td>
                        <td>{item.Nama_Produk}</td>
                        <td>{item.Harga}</td>
                        <td>{item.Stok}</td>
                        <td>{item.Penitip}</td>
                        <td className="flex justify-center">
                          <button className="btn btn-sm btn-primary text-white mr-2">
                            Edit
                          </button>
                          <button className="btn btn-sm btn-error " onClick={() => deleteProdukFunction(item.Id)}>
                            Delete
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

export default Produk;
