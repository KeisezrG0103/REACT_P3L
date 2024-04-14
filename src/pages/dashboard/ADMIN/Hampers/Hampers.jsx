import { Link } from "react-router-dom";
import { useQuery} from "react-query";
import {
  getHampers,
} from "../../../../api/hampers/hampers_query";
import { useEffect } from "react";
import Modal_Delete from "../../../../components/Modal_Delete";
import {
  setItems,
  setModal,
  setModalKey,
} from "../../../../slicer/slicer_modal";
import { useDispatch } from "react-redux";
import { setItem, setOpen } from "../../../../slicer/slicer_DetailHampers";
import Modal_DetailHampers from "../../../../components/Modal_DetailHampers";
import { setIsEdit } from "../../../../slicer/slicer_IsEdit";
import { setItem as sethampers } from "../../../../slicer/slicer_IsEdit";
import { resetState } from "../../../../slicer/slicer_IsEdit";

const Hampers = () => {
  const { data: hampers, isLoading, refetch } = useQuery("hampers", getHampers);

  console.log(hampers?.data);
  const dispatch = useDispatch();

  const set_Items = (data) => dispatch(setItems(data));
  const set_Modal = (data) => dispatch(setModal(data));
  const set_Key = (data) => dispatch(setModalKey(data));

  const set_Hampers = (data) => dispatch(sethampers(data));
  const set_Edit = (data) => dispatch(setIsEdit(data));

  useEffect(() => {
    refetch();
  }, [refetch]);

  useEffect(() => {
    dispatch(resetState());
  }, [resetState]);

  const openModal = (item) => {
    set_Modal(true);
    set_Items(item);
    set_Key("hampers");
  };

  const openDetail = (item) => {
    dispatch(setItem(item));
    dispatch(setOpen(true));
  };

  const isEdit = (item) => {
    set_Hampers(item);
    set_Edit(true);
  };

  return (
    <div>
      <div className="flex justify-between items-center">
        <h1 className="font-bold text-2xl">Hampers</h1>
        <Link to="/dashboard/Admin/hampers/tambah">
          <button className="btn btn-primary text-white mt-5">
            Tambah Hampers
          </button>
        </Link>
      </div>

      <div className="overflow-x-auto w-full mt-5">
        <div className="card shadow-md bg-base-100" style={{ width: "100%" }}>
          <div className="card-body relative" style={{ width: "100%" }}>
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
                      <th>Gambar</th>
                      <th>Nama</th>
                      <th>Harga</th>
                      <th>Action</th>
                    </tr>
                  </thead>
                  <tbody>
                    {hampers?.data.map((hampers, index) => (
                      <tr key={index} className="text-center">
                        <td>{index + 1}</td>
                        <td>
                          <img
                            src={hampers.Gambar}
                            alt="gambar"
                            className="object-cover h-20 w-20 mx-auto"
                          />
                        </td>
                        <td>{hampers.Nama_Hampers}</td>
                        <td>{hampers.Harga}</td>
                        <td className="flex flex-col items-center justify-center flex-wrap space-y-2 lg:flex-row lg:space-y-0 lg:space-x-2 lg:text-center">
                          <button
                            className="btn btn-sm btn-accent text-base-100 ml-2 w-20"
                            onClick={openDetail.bind(this, hampers)}
                          >
                            Detail
                          </button>
                          <Link to={`/dashboard/Admin/hampers/${hampers.id}`}>
                            <button
                              className="btn btn-sm btn-primary text-base-100 ml-2 w-20"
                              onClick={() => isEdit(hampers)}
                            >
                              Edit
                            </button>
                          </Link>
                          <button
                            className="btn btn-sm btn-error text-base-100 ml-2 w-20"
                            onClick={openModal.bind(this, hampers)}
                          >
                            Delete
                          </button>
                          <Modal_Delete />
                          <Modal_DetailHampers />
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

export default Hampers;
