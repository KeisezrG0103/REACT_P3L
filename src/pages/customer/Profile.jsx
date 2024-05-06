import { useState, useEffect } from "react";
import { Card } from "flowbite-react";
import { getCurrentCustomer, updateCustomer, getHistoryCustomer } from "../../api/profile/profile_query";
import toast from "react-hot-toast";

const Profile = () => {
  const [isDisabled, setIsDisabled] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [user, setUser] = useState({});
  const [history, setHistory] = useState([]);

  const fetchCurrentCustomer = async () => {
    try {
      const res = await getCurrentCustomer();
      if (res.success) {
        let modifiedUser = res.data
        modifiedUser.Tanggal_Lahir = new Date(modifiedUser.Tanggal_Lahir)
          .toISOString()
          .split('T')[0]
        setUser(modifiedUser);
      } else {
        toast.error("Gagal mengambil data", { duration: 3000 });
      }
    } catch (error) {
      toast.error(`Gagal mengambil data: ${error}`, { duration: 3000 });
    }
  };

  const fetchHistoryCustomer = async () => {
    try {
      const res = await getHistoryCustomer();
      if (res.success) {
        setHistory(res.data)
      } else {
        toast.error("Gagal mengambil data", { duration: 3000 });
      }
    } catch (error) {
      toast.error(`Gagal mengambil data: ${error}`, { duration: 3000 });
    }
  }

  const filteredHistory = history.filter((item) => 
    item.Nama_Produk.toLowerCase().includes(searchQuery.toLowerCase()) ||
    item.Nama_Hampers.toLowerCase().includes(searchQuery.toLowerCase())
  )

  const updateProfile = async () => {
    try {
      const res = await updateCustomer(user)

      if (res.success) {
        toast.success("Berhasil mengubah data", { duration: 3000 });
        setTimeout(() => {
          window.location.reload()
        }, 1500);
      } else {
        toast.error("Gagal mengubah data", { duration: 3000 });
      }
    } catch (error) {
      toast.error(`Gagal mengubah data: ${error}`, { duration: 3000 });
    }
  }

  useEffect(() => {
    fetchCurrentCustomer();
    fetchHistoryCustomer();
  }, []);

  return (
    <div className="flex items-start px-20 gap-3">
      <Card className="w-[70%] shadow-lg rounded-2xl">
        <span className="text-2xl font-bold text-center text-primary my-4">Profile</span>
        <div className="flex flex-col gap-3 px-10 pb-5">
          <div className="flex gap-3">
            <Card className="rounded-lg p-3 bg-primary text-white">
              <span><b>Saldo</b>: Rp. {Intl.NumberFormat('id-ID').format(user.Total_Saldo || 0)}</span>
            </Card>
            <Card className="rounded-lg p-3 bg-secondary text-white">
              <span><b>Total Poin</b>: Rp. {user.Total_Poin || 0}</span>
            </Card>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className="ms-2 text-sm font-medium text-gray-900">
                Email
              </label>
              <input
                type="text"
                className="input input-bordered"
                disabled
                value={user.Email}
                onChange={(e) => setUser({ ...user, Email: e.target.value })}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="ms-2 text-sm font-medium text-gray-900">
                Password
              </label>
              <input
                type="password"
                className="input input-bordered"
                disabled={isDisabled}
                value={user.Password}
                onChange={(e) => setUser({ ...user, Password: e.target.value })}
              />
            </div>
          </div>
          <div className="grid">
            <div className="flex flex-col gap-2">
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Nama
              </label>
              <input
                type="text"
                className="input input-bordered"
                value={user.Nama}
                disabled={isDisabled}
                onChange={(e) => setUser({ ...user, Nama: e.target.value })}
              />
            </div>
          </div>
          <div className="grid">
            <div className="flex flex-col gap-2">
              <label className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300">
                Tanggal Lahir
              </label>
              <input type="date" className="input input-bordered" value={user.Tanggal_Lahir} onChange={(e) => setUser({ ...user, Tanggal_Lahir: e.target.value })} disabled={isDisabled}/>
            </div>
          </div>
          <div className="flex items-start gap-2 mt-2">
            <button className={'btn btn-secondary text-white'} onClick={() => setIsDisabled(!isDisabled)}>{isDisabled ? 'Edit' : 'Batal'}</button>
            <button className="btn btn-primary text-white" disabled={isDisabled} onClick={updateProfile}>Save</button>
          </div>
        </div>
      </Card>
      <Card className="w-[30%] max-h-[35rem] overflow-y-scroll">
        <span className="text-lg font-bold text-center my-4 text-primary">History Pemesanan</span>
        <div className="px-8 pb-1">
          <input type="text" className="input input-bordered w-full" placeholder="Cari Pesanan" value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)} />
        </div>
        <div className="flex flex-col gap-3 px-7 pb-5 min-h-[30rem] overflow-y-scroll">
          {
            filteredHistory.length > 0 ? filteredHistory.map((item, index) => (
              <Card key={index} className="p-3 bg-primary text-white rounded-lg">
                <span><b>No Pemesanan</b>: {item.Id}</span>
                <div className="-mt-2 text-sm flex flex-col">
                  <span><b>Tanggal Pesan</b>: {new Date(item.Tanggal_Pesan).toLocaleDateString('id-ID')}</span>
                  <span><b>Tanggal Pelunasan</b>: {new Date(item.Tanggal_Pelunasan).toLocaleDateString('id-ID')}</span>
                  <span><b>Tanggal Diambil</b>: {new Date(item.Tanggal_Diambil).toLocaleDateString('id-ID')}</span>
                </div>
                <div className="-mt-2 text-sm flex flex-col">
                  <span><b>Alamat - Ongkir</b>: {item.Alamat} - Rp. {Intl.NumberFormat('id-ID').format(item.Ongkos_Kirim)}</span>
                </div>
                <div className="-mt-2 text-sm flex flex-col">
                  <span><b>Produk</b>: {item.Nama_Produk}</span>
                  <span><b>Hampers</b>: {item.Nama_Hampers}</span>
                </div>
                <div className="flex gap-2">
                  <Card className='text-white p-1 text-sm bg-info'>
                    <span className="font-bold">{item.Status}</span>
                  </Card>
                  <Card className="text-white p-1 text-sm bg-secondary">
                    <span className="font-bold">Rp. {Intl.NumberFormat('id-ID').format(item.Total)}</span>
                  </Card>
                </div>
              </Card>
            )) 
            : (
              <Card className="p-3 bg-primary text-white text-center rounded-lg">
                <span className="opacity-80">Belum ada history pemesanan</span>
              </Card>
            )
          }
        </div>
      </Card>
    </div>
  );
};

export default Profile;
