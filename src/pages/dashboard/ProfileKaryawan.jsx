import { Card, Button } from "flowbite-react";
import { toast } from "react-hot-toast";
import { useState, useEffect } from "react";
import { getCurrentKaryawan, updateProfileKaryawan } from "../../api/profile/profile_karyawan_query";

const ProfilePage = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [isDisabled, setIsDisabled] = useState(true);
  const [karyawan, setKaryawan] = useState({});

  const fetchCurrentKaryawan = async () => {
    try {
      const res = await getCurrentKaryawan()
      if (res.success) {
        setKaryawan(res.data)
      } else {
        toast.error("Gagal mengambil data karyawan", { duration: 3000 })
      }
    } catch (error) {
      toast.error("Gagal mengambil data karyawan", { duration: 3000 })
    }
  }

  const handleUpdatePassword = async () => {
    try {
      setIsLoading(true)
      const res = await updateProfileKaryawan(karyawan)
      if (res.success) {
        toast.success("Berhasil mengubah password", { duration: 3000 })
        setTimeout(() => {
          window.location.reload()
        }, 500);
        setIsDisabled(true)
      } else {
        toast.error("Gagal mengubah password", { duration: 3000 })
      }
    } catch (error) {
      toast.error("Gagal mengubah password", { duration: 3000 })
    } finally {
      setIsLoading(false)
    }
  
  }

  useEffect(() => {
    fetchCurrentKaryawan()
  }, [])

  return (
    <div>
      <Card className="p-5">
        <span className="text-xl font-bold text-primary">Profile</span>
        <div className="flex flex-col gap-3 px-10 pb-5">
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className="ms-2 text-sm font-medium text-gray-900">
                Nama
              </label>
              <input
                type="text"
                className="input input-bordered"
                disabled
                value={karyawan.Nama}
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
                value={karyawan.Password}
                onChange={(e) => setKaryawan({ ...karyawan, Password: e.target.value })}
              />
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <div className="flex flex-col gap-2">
              <label className="ms-2 text-sm font-medium text-gray-900">
                Total Gaji
              </label>
              <input
                type="text"
                className="input input-bordered"
                disabled
                value={karyawan.TotalGaji || 0}
              />
            </div>
            <div className="flex flex-col gap-2">
              <label className="ms-2 text-sm font-medium text-gray-900">
                Bonus
              </label>
              <input
                type="text"
                className="input input-bordered"
                disabled
                value={karyawan.Bonus || 0}
              />
            </div>
          </div>
          <div className="grid">
            <div className="flex flex-col gap-2">
              <label className="ms-2 text-sm font-medium text-gray-900">
                Role ID
              </label>
              <input
                type="text"
                className="input input-bordered"
                disabled
                value={karyawan.Role_Id}
              />
            </div>
          </div>
          <div className="flex gap-3">
            <button className="btn btn-secondary text-white" onClick={() => setIsDisabled(!isDisabled)}>{isDisabled ? 'Edit Password' : 'Cancel'}</button>
            <Button className="btn btn-primary text-white" disabled={isDisabled} onClick={handleUpdatePassword} isProcessing={isLoading}>Save</Button>
          </div>
        </div>
      </Card>
    </div>
  );
};

export default ProfilePage;
