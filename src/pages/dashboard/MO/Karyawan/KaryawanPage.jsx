import { Card, Table, Modal } from "flowbite-react"
import { getKaryawan, addKaryawan, deleteKaryawan, updateKaryawan } from "../../../../api/karyawan/karyawan_query"
import { useState, useEffect } from "react"
import toast from "react-hot-toast"

const KaryawanPage = () => {
  const [openModal, setOpenModal] = useState(false)
  const [openModalDelete, setOpenModalDelete] = useState(false)
  const [isTambah, setIsTambah] = useState(true)

  const [selectedKaryawan, setSelectedKaryawan] = useState({
    Id: 0,
    Nama: '',
    Role_Id: 0
  })
  const [karyawan, setKaryawan] = useState([])
  const [isLoading, setIsLoading] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  const fetchKaryawan = async () => {
    try {
      setIsLoading(true)
      const res = await getKaryawan()
      if (res.success) {
        setKaryawan(res.data)
      } else {
        toast.error("Gagal mengambil data karyawan", { duration: 3000 })
      }

    } catch (error) {
      toast.error(`Gagal mengambil data: ${error}`, { duration: 3000 })
    } finally {
      setIsLoading(false)
    }
  }

  const filteredKaryawan = karyawan.filter((item) => item.Nama.toLowerCase().includes(searchQuery.toLowerCase()))

  const handleAddKaryawan = async () => {
    try {
      const res = await addKaryawan(selectedKaryawan)
      if (res.success) {
        toast.success("Berhasil menambahkan karyawan", { duration: 3000 })
        setOpenModal(false)
        setSelectedKaryawan({})
        setTimeout(() => {
          window.location.reload()
        }, 1500);
      } else {
        toast.error("Gagal menambahkan karyawan", { duration: 3000 })
      }
    } catch (error) {
      toast.error(`Gagal menambahkan karyawan: ${error}`, { duration: 3000 })
    }
  }

  const handleEditKaryawan = async () => {
    try {
      const res = await updateKaryawan(selectedKaryawan, selectedKaryawan.Id)
      if (res.success) {
        toast.success("Berhasil mengubah karyawan", { duration: 3000 })
        setOpenModal(false)
        setSelectedKaryawan({})
        setTimeout(() => {
          window.location.reload()
        }, 1500);
      } else {
        toast.error("Gagal mengubah karyawan", { duration: 3000 })
      }
    } catch (error) {
      toast.error(`Gagal mengubah karyawan: ${error}`, { duration: 3000 })
    }
  }

  const handleDeleteKaryawan = async () => {
    try {
      const res = await deleteKaryawan(selectedKaryawan.Id)
      if (res.success) {
        toast.success("Berhasil menghapus karyawan", { duration: 3000 })
        setOpenModalDelete(false)
        setSelectedKaryawan({})
        setTimeout(() => {
          window.location.reload()
        }, 1500);
      } else {
        toast.error("Gagal menghapus karyawan", { duration: 3000 })
      }
    } catch (error) {
      toast.error(`Gagal menghapus karyawan: ${error}`, { duration: 3000 })
    }
  }

  useEffect(() => {
    fetchKaryawan()
  }, [])

  return (
    <div className="p-5">
      <div className="flex flex-col">
        <h2 className="font-bold text-2xl">Karyawan</h2>
        <span className="opacity-80">Manage Karyawan</span>
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
                    {filteredKaryawan.map((karyawan) => (
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
                              setIsTambah(false)
                              setOpenModal(true)
                            }}>Ubah</button>
                            <button className="btn bg-red-600 text-white hover:bg-red-700" onClick={() => {
                              setSelectedKaryawan(karyawan)
                              setOpenModalDelete(true)
                            }}>Hapus</button>
                          </div>
                        </Table.Cell>
                      </Table.Row>
                    ))}
                  </Table.Body>
                </Table>
                <div className="flex items-end justify-end pr-16 mt-5 mb-2">
                  <button className="btn btn-primary text-white" onClick={() => {
                    setIsTambah(true)
                    setOpenModal(true)
                  }}>
                    Tambah
                  </button>
                </div>
              </div>
            )
          }
        </Card>
      </div>
      <Modal dismissible show={openModal} onClose={() => setOpenModal(false)} size='md' className="px-72">
        <Modal.Header className="bg-secondary !text-white">{isTambah ? 'Tambah Karyawan' : 'Edit Karyawan'}</Modal.Header>
        <Modal.Body className="p-10">
          <div className="grid grid-cols-2 gap-4">
            <div className="flex flex-col gap-2">
              <label className="ms-2 text-sm font-medium text-gray-900">Nama</label>
              <input type="text" className="input input-bordered" value={selectedKaryawan.Nama} onChange={(e) => setSelectedKaryawan({ ...selectedKaryawan, Nama: e.target.value })} />
            </div>
            <div className="flex flex-col gap-2">
              <label className="ms-2 text-sm font-medium text-gray-900">Role</label>
              <select className="input input-bordered" onChange={(e) => setSelectedKaryawan({ ...selectedKaryawan, Role_Id: e.target.value })}>
                <option value="0" selected disabled>Pilih Role</option>
                <option value="1">MO</option>
                <option value="2">Admin</option>
              </select>
            </div>
          </div>
          <Modal.Footer className="mt-6">
            <button className="btn btn-secondary text-white" onClick={isTambah ? handleAddKaryawan : handleEditKaryawan}>Simpan</button>
            <button className="btn bg-red-600 text-white hover:bg-red-700" onClick={() => setOpenModal(false)}>Batal</button>
          </Modal.Footer>
        </Modal.Body>
      </Modal>
      <Modal dismissible show={openModalDelete} onClose={() => setOpenModalDelete(false)} size='md' className="px-80">
        <Modal.Header>Konfirmasi Delete</Modal.Header>
        <Modal.Body className="px-5">
          <span className="text-sm font-medium">Apakah anda yakin untuk menghapus data {selectedKaryawan.Nama} ini?</span>
        </Modal.Body>
        <Modal.Footer className="mt-6 px-5 mb-3">
          <button className="btn btn-secondary text-white" onClick={() => {
            setSelectedKaryawan({})
            setOpenModalDelete(false)
          }}>Batal</button>
          <button className="btn bg-red-600 hover:bg-red-700 text-white" onClick={handleDeleteKaryawan}>Hapus</button>
        </Modal.Footer>
      </Modal>
    </div>
  )
}

export default KaryawanPage