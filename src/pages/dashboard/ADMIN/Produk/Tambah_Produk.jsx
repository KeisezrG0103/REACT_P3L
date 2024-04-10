import { useForm, Form } from "react-hook-form";
import { useMutation, useQuery } from "react-query";
import { addProduk } from "../../../../api/produk/produk_query";
import { getKategori } from "../../../../api/kategori/kategori_query";
import { getPenitip } from "../../../../api/penitip/penitip_query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import Edit_Produk from "./Edit_Produk";
import { useLocation } from "react-router-dom";

const Tambah_Produk = () => {
  const { register, handleSubmit } = useForm();

  const { data: kategori } = useQuery("kategori", getKategori);
  const { data: penitip } = useQuery("penitip", getPenitip);

  const Navigate = useNavigate();

  const location = useLocation();

  const id = location.pathname.split("/")[4];
  
  console.log(id);

  

  const mutation = useMutation(addProduk);

  const onSubmit = async (data) => {
    console.log(data);

    try {
      await mutation.mutateAsync(data);
      toast.success("Produk berhasil ditambahkan");
      Navigate("/dashboard/Admin/produk");
    }
    catch (error) {
      console.log(error);
      toast.error(error.response.data.message);
    }

  };

  return (
    <div>
      <div className="card shadow-lg bg-base-100">
        <div className="card-header">
          <h2 className="card-title text-xl font-semibold ml-4 mt-5">
            Tambah Produk
          </h2>
        </div>
        <div className="card-body">
          <form onSubmit={handleSubmit(onSubmit)}>
            <label className="form-control w-full">
              <div className="label">
                <span className="label-text font-bold">Nama Produk</span>
              </div>
              <input
                type="text"
                placeholder="Type here"
                className="input input-bordered w-full"
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
                  <option value="">
                    Pilih Penitip
                  </option>
                  {penitip?.data.map((item) => (
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
                  defaultValue={""}
                >
                  <option value="" disabled>
                    Pilih Kategori
                  </option>
                  {kategori?.data.map((item) => (
                    <option key={item.Id} value={item.Id}>
                      {item.Kategori}
                    </option>
                  ))}
                </select>
              </label>
            </div>

            {/* button */}
            <div className="flex justify-end mt-5">
              <button className="btn btn-error text-white mr-2">Batal</button>
              <button className="btn btn-primary text-white">Tambah</button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Tambah_Produk;
