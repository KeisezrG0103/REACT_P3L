import { useForm } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { addProduk } from "../../../../api/produk/produk_query";
import { getKategori } from "../../../../api/kategori/kategori_query";
import { getPenitip } from "../../../../api/penitip/penitip_query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { useSelector, useDispatch } from "react-redux";
import { editProduk } from "../../../../api/produk/produk_query";
import { resetState } from "../../../../slicer/produk/slicer_Editproduk";

const Tambah_Edit_Produk = () => {
  const { register, handleSubmit } = useForm();

  const { data: kategori } = useQuery("kategori", getKategori);
  const { data: penitip } = useQuery("penitip", getPenitip);

  const dispatch = useDispatch();

  const Navigate = useNavigate();

  const produk = useSelector((state) => state.isEditProduk);

  console.log(produk);

  const mutation = useMutation(addProduk);
  const mutateEdit = useMutation(editProduk);

  const onSubmit = async (data) => {
    console.log(data);

    try {
      await mutation.mutateAsync(data);
      toast.success("Produk berhasil ditambahkan");
      Navigate("/dashboard/Admin/produk");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const onEdit = async (data) => {
    console.log(data);
    try {
      const id = parseInt(produk.item.Id);
      console.log(id);
      await mutateEdit.mutateAsync({ data, id: id });
      toast.success("Produk berhasil diubah");
      dispatch(resetState());
      Navigate("/dashboard/Admin/produk");
    } catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }
  };

  const batalEdit = () => {
    dispatch(resetState());
    Navigate("/dashboard/Admin/produk");
  };

  console.log(kategori?.data);



  return (
    <div>
      <div className="card shadow-lg bg-base-100">
        <div className="card-header">
          <h2 className="card-title text-xl font-semibold ml-4 mt-5">
            {produk.isEdit ? "Edit Produk" : "Tambah Produk"}
          </h2>
        </div>
        <div className="card-body">
          <form
            onSubmit={
              produk.isEdit ? handleSubmit(onEdit) : handleSubmit(onSubmit)
            }
          >
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Nama Produk</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
                defaultValue={produk.isEdit ? produk.item.Nama_Produk : ""}
                {...register("Nama", { required: true })}
                required
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Harga</span>
              </div>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                required
                defaultValue={produk.isEdit ? produk.item.Harga : ""}
                {...register("Harga", { required: true })}
              />
            </label>

            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Stok</span>
              </div>
              <input
                type="number"
                placeholder="Type here"
                className="input input-bordered w-full"
                required
                defaultValue={produk.isEdit ? produk.item.Stok : ""}
                {...register("Stok", { required: true })}
              />
            </label>

            <div className="grid grid-cols-3 gap-4 w-full">
              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">Satuan</span>
                </div>
                <input
                  type="text"
                  placeholder="Type here"
                  className="input input-bordered w-full"
                  required
                  {...register("Satuan", { required: true })}
                  defaultValue={produk.isEdit ? produk.item.Satuan : ""}
                />
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">Penitip</span>
                </div>
                <select
                  id="penitip"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  {...register("Penitip_Id")}
                >
                  <option value={produk.isEdit ? produk.item.Penitip_Id : ""}>
                    {produk.isEdit
                      ? produk.item.Penitip || "Pilih Penitip"
                      : "Pilih Penitip"}
                  </option>
                  {penitip?.data
                    .filter((item) => item.Id !== produk.item.Penitip_Id) // Filter out item with the same value as the default value
                    .map((item) => (
                      <option key={item.Id} value={item.Id}>
                        {item.Nama_Penitip}
                      </option>
                    ))}
                </select>
              </label>

              <label className="form-control w-full">
                <div className="label">
                  <span className="label-text font-bold">Kategori</span>
                </div>
                <select
                  id="Kategori"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  {...register("Kategori_Id", {
                    required: true,
                    valueAsNumber: true,
                  })}
                >
                  <option value={produk.item.Kategori_Id}>
                    {produk.isEdit
                      ? produk.item.Kategori
                        ? produk.item.Kategori
                        : "Pilih Kategori"
                      : "Pilih Kategori"}
                  </option>
                  {kategori?.data
                    .filter((item) => item.Id !== produk.item.Kategori_Id) // Filter out item with the same value as the default value
                    .map((item) => (
                      <option key={item.Id} value={item.Id}>
                        {item.Kategori}
                      </option>
                    ))}
                </select>
              </label>
            </div>

            {/* button */}
            <div className="flex justify-end mt-5">
              {/* </Link> */}
              <button className="btn btn-primary text-white">
                {produk.isEdit ? "Edit" : "Tambah"}
              </button>
            </div>
          </form>
          {/* <Link to="/dashboard/Admin/produk"> */}
          <button
            className="btn btn-error text-white mr-2"
            onClick={
              produk.isEdit
                ? batalEdit
                : () => Navigate("/dashboard/Admin/produk")
            }
          >
            Batal
          </button>
        </div>
      </div>
    </div>
  );
};

export default Tambah_Edit_Produk;
