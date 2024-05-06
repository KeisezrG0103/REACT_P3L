import { useState } from "react";
import { Link } from "react-router-dom";
import { useQuery } from "react-query";
import { getCustomer } from "../../../../api/customer/customer_query";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { resetState } from "../../../../slicer/slicer_IsEdit";


const Customer = () => {

  const dispatch = useDispatch();

  const {
    data: customerData,
    isLoading,
    refetch,
  } = useQuery("customer", getCustomer);
    
  const [searchQuery, setSearchQuery] = useState("");
  const [filteredCustomer, setFilteredCustomer] = useState([]);

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    dispatch(resetState());
  }, [dispatch]);

  useEffect(() => {
    if (customerData && customerData.data) {
      const filtered = customerData.data.filter((customer) =>
        customer.Nama.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredCustomer(filtered);
    }
  }, [customerData, searchQuery]);

  

  const [page, setPage] = useState(1);
  const [limit, setLimit] = useState(10);

  const startIndex = (page - 1) * limit;
  const endIndex = Math.min(startIndex + limit, filteredCustomer.length);

  const currentData = filteredCustomer.slice(startIndex, endIndex);

  const totalPages = Math.ceil(filteredCustomer.length / limit);

  const changePage = (page) => {
    setPage(Math.max(1, Math.min(page, totalPages)));
  };

  return (
    <div>
      <div className="flex justify-between place-items-end lg:place-items-center">
        <div className="flex items-start space-y-4 flex-col">
          <h1 className="font-bold text-2xl">Customer</h1>
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
      </div>
      <div className="overflow-x-auto w-full mt-5">
        <div className="card shadow-md bg-base-100" style={{ width: "100%" }}>
          <div className="card-body relative" style={{ width: "100%", height: "100vh" }}>
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
                      <th>Email</th>
                      <th>Nama</th>
                      <th>Total Poin</th>
                      <th>Total Saldo</th>
                      <th>Is PengajuanSaldo</th>
                      <th>Nama Bank</th>
                      <th>Nomor Rekening</th>
                      <th>Tanggal Lahir</th>
                    </tr>
                  </thead>
                  <tbody>
                    {currentData.map((customer, index) => (
                      <tr key={index} className="text-center">
                        <td>{startIndex + index + 1}</td>
                        <td>{customer.Email}</td>
                        <td>{customer.Nama}</td>
                        <td>
                          {customer.Total_Poin == null ? <td>-</td> : <td>{customer.Total_Poin}</td>}
                        </td>
                        <td>
                          {customer.Total_Saldo == null ? <td>-</td> : <td>{customer.Total_Saldo}</td>}
                        </td>
                        <td>
                          {customer.IsPengajuanSaldo == null ? <td>-</td> : <td>{customer.IsPengajuanSaldo}</td>}
                        </td>
                        <td>
                          {customer.Nama_Bank == null ? <td>-</td> : <td>{customer.Nama_Bank}</td>}
                        </td>
                        <td>
                         {customer.Nomor_Rekening == null ? <td>-</td> : <td>{customer.Nomor_Rekening}</td>}
                        </td>
                        <td>
                          {customer.Tanggal_Lahir == null ? <td>-</td> : <td>{customer.Tanggal_Lahir}</td>}
                        </td>
                        <td>
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
}

export default Customer;