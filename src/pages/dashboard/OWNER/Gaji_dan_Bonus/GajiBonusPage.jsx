import { Card, Table, Modal } from "flowbite-react"
import { useState, useEffect } from "react"
import { getGajiBonus, updateGajiBonus } from "../../../../api/gaji_dan_bonus/gajibonus_query"
import toast from "react-hot-toast"

const GajiBonusPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [selectedKaryawan, setSelectedKaryawan] = useState({
    TotalGaji: 0,
    Bonus: 0
  })
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')
  const [gajiDanBonus, setGajiDanBonus] = useState([])

  const fetchGajiBonus = async () => {
    try {
      setIsLoading(true)
      const res = await getGajiBonus()
      if (res.success) {
        setGajiDanBonus(res.data)
      } else {
        toast.error("Gagal mengambil data gaji dan bonus", { duration: 3000 })
      }
    } catch (error) {
      toast.error(`Gagal mengambil data: ${error}`, { duration: 3000 })
    } finally {
      setIsLoading(false)
    }
  }

  const handleEditGaji = async () => {
    try {
      const res = await updateGajiBonus(selectedKaryawan, selectedKaryawan.Id)
      if (res.success) {
        toast.success("Berhasil mengubah gaji", { duration: 3000 })
        setOpenModal(false)
        setSelectedKaryawan({})
        setTimeout(() => {
          window.location.reload()
        }, 1500);
      } else {
        toast.error("Gagal mengubah gaji", { duration: 3000 })
      }
    } catch (error) {
      toast.error(`Gagal mengubah gaji: ${error}`, { duration: 3000 })
    }
  }

  const filteredGajidanBonus = gajiDanBonus.filter((item) => item.Nama.toLowerCase().includes(searchQuery.toLowerCase()))

  useEffect(() => {
    fetchGajiBonus()
  }, [])

  return (
    <div className="p-5">
      <div className="flex flex-col">
        <h2 className="font-bold text-2xl">Gaji dan Bonus</h2>
        <span className="opacity-80">Manage Gaji dan Bonus</span>
      </div>
      <div className="flex my-5 items-center justify-center">
      <Card className="p-5 w-[55rem]">
          <div className="flex justify-between">
            <h3 className="font-bold text-xl">Data Karyawan</h3>
            <input className="input input-bordered" placeholder="search..." value={searchQuery} onChange={(e) => setSearchQuery(e.target.value)}></input>
          </div>
          {
            isLoading === true ? (
              <div>Loading Data...</div>
            ) : (
              <div className="max-h-[40rem] overflow-y-scroll">
                <Table>
                  <Table.Head>
                    <Table.HeadCell>Nama</Table.HeadCell>
                    <Table.HeadCell>Jabatan</Table.HeadCell>
                    <Table.HeadCell>Gaji</Table.HeadCell>
                    <Table.HeadCell>Actions</Table.HeadCell>
                  </Table.Head>
                  <Table.Body>
                    {filteredGajidanBonus.map((karyawan) => (
                      <Table.Row key={karyawan.Id} className="text-center">
                        <Table.Cell className="font-medium text-gray-900 border-b-2">{karyawan.Nama}</Table.Cell>
                        <Table.Cell className="border-b-2">
                          {karyawan.Role_Id === 1 ? "MO" : karyawan.Role_Id === 2 ? "Admin" : karyawan.Role_Id === 3 ? "Owner" : "Karyawan"}
                        </Table.Cell>
                        <Table.Cell className="border-b-2">
                          Rp. {Intl.NumberFormat('id-ID').format(karyawan.TotalGaji || 0)}
                        </Table.Cell>
                        <Table.Cell className="border-b-2">
                          <div className="flex items-center justify-center gap-3">
                            <button className="btn btn-secondary text-white" onClick={() => {
                              setSelectedKaryawan(karyawan)
                              setOpenModal(true)
                            }}>Ubah</button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
              </div>
            )
          }
        </Card>
        <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size='md' className="px-72">
          <Modal.Header className="bg-secondary !text-white">Edit Gaji Karyawan</Modal.Header>
          <Modal.Body className="p-10">
            <div className="grid grid-cols-2 gap-4">
              <div className="flex flex-col gap-2">
                <label className="ms-2 text-sm font-medium text-gray-900">Gaji</label>
                <input type="number" className="input input-bordered" value={selectedKaryawan.TotalGaji} onChange={(e) => setSelectedKaryawan({ ...selectedKaryawan, TotalGaji: e.target.value })} />
              </div>
              <div className="flex flex-col gap-2">
                <label className="ms-2 text-sm font-medium text-gray-900">Bonus</label>
                <input type="number" className="input input-bordered" value={selectedKaryawan.Bonus} onChange={(e) => setSelectedKaryawan({ ...selectedKaryawan, Bonus: e.target.value })} />
              </div>
            </div>
            <Modal.Footer className="mt-6">
              <button className="btn btn-secondary text-white" onClick={handleEditGaji}>Simpan</button>
              <button className="btn bg-red-600 text-white hover:bg-red-700" onClick={() => setOpenModal(false)}>Batal</button>
            </Modal.Footer>
          </Modal.Body>
      </Modal>
      </div>
    
    </div>
  )
}

export default GajiBonusPage