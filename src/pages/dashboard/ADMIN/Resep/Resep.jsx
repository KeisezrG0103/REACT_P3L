import { Card, Table, Modal } from "flowbite-react";
import { useState, useEffect } from "react";
import {
  getResep,
  getDetail,
  addResep,
  deleteResep,
  editResep,
  getProduk
} from "../../../../api/resep/resep_query";
import toast from "react-hot-toast";
import { setOpen } from "../../../../slicer/slicer_DetailHampers";

const ResepPage = () => {
  const [isTambah, setIsTambah] = useState(true);

  const [searchQuery, setSearchQuery] = useState("");
  const [resep, setResep] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [openModal, setOpenModal] = useState(false);
  const [openModalDetail, setOpenModalDetail] = useState(false);
  const [openModalDelete, setOpenModalDelete] = useState(false);
  const [selectedResep, setSelectedResep] = useState({});
  const [selectedDetailResep, setSelectedDetailResep] = useState([]);

  const [selectedProduk, setSelectedProduk] = useState({});
  const [produk, setProduk] = useState([]);

  const fetchResep = async () => {
    try {
      setIsLoading(true);
      const res = await getResep();
      if (res.success) {
        setResep(res.data);
      } else {
        toast.error("Gagal mengambil data resep", { duration: 3000 });
      }
    } catch (error) {
      toast.error(`Gagal mengambil data: ${error}`, { duration: 3000 });
    } finally {
      setIsLoading(false);
    }
  };

  const fetchProduk = async () => {
    try {
      const res = await getProduk();
      if (res.success) {
        setProduk(res.data);
      } else {
        toast.error("Gagal mengambil data produk", { duration: 3000 });
      }
    } catch (error) {
      toast.error(`Gagal mengambil data: ${error}`, { duration: 3000 });
    }
  }

  const filteredResep = resep.filter((item) =>
    item.Nama.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDetail = async () => {
    try {
      const res = await getDetail(selectedResep.Id);
      if (res.success) {
        setSelectedDetailResep(res.data);
        await fetchProduk();
        setOpenModalDetail(true);
      } else {
        toast.error("Gagal mengambil data resep", { duration: 3000 });
      }
    } catch (error) {
      toast.error(`Gagal mengambil data: ${error}`, { duration: 3000 });
    }
  }

  const handleTambahResep = async () => {
    try {
        const res = await addResep(selectedResep);
        if (res.success) {
          toast.success("Berhasil menambah resep", { duration: 3000 });
          setOpenModal(false);
          setSelectedResep({});
          setTimeout(() => {
            window.location.reload();
          }, 1500);
        } else {
          toast.error("Gagal mengubah resep", { duration: 3000 });
        }
    } catch (error) {
      toast.error(`Gagal mengubah resep: ${error}`, { duration: 3000 });
    }
  }

  const handleEditResep = async () => {
    try {
      const res = await editResep(selectedResep, selectedResep.Id);
      if (res.success) {
        toast.success("Berhasil mengubah resep", { duration: 3000 });
        setOpenModal(false);
        setSelectedResep({});
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error("Gagal mengubah resep", { duration: 3000 });
      }
    } catch (error) {
      toast.error(`Gagal mengubah resep: ${error}`, { duration: 3000 });
    }
  }

  const handleDeleteResep = async () => {
    try {
      const res = await deleteResep(selectedResep.Id);
      if (res.success) {
        toast.success("Berhasil menghapus resep", { duration: 3000 });
        setOpenModalDelete(false);
        setSelectedResep({});
        setTimeout(() => {
          window.location.reload();
        }, 1500);
      } else {
        toast.error("Gagal menghapus resep", { duration: 3000 });
      }
    } catch (error) {
      toast.error(`Gagal menghapus resep: ${error}`, { duration: 3000 });
    }
  
  }

  useEffect(() => {
    fetchResep();
    fetchProduk();
  }, [], []);

  return (
    <div className="p-5">
      <div className="flex flex-col">
        <h2 className="font-bold text-2xl">Resep</h2>
        <span className="opacity-80">Manage Resep</span>
      </div>
      <div className="flex my-5 items-center justify-center">
        <Card className="p-5 w-[55rem]">
          <div className="flex justify-between">
            <h3 className="font-bold text-xl">Data Resep</h3>
            <input
              type="text"
              className="input input-bordered"
              placeholder="search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          {isLoading === true ? (
            <div>Loading data...</div>
          ) : (
            <div className="max-h-[40rem] overflow-y-scroll">
              <Table>
                <Table.Head>
                  <Table.HeadCell>Nama</Table.HeadCell>
                  <Table.HeadCell>ID Produk</Table.HeadCell>
                  <Table.HeadCell>Actions</Table.HeadCell>
                </Table.Head>
                <Table.Body>
                  {filteredResep.map((resep) => (
                    <Table.Row key={resep.Id} className="text-center">
                      <Table.Cell className="font-medium text-gray-900 border-b-2">
                        {resep.Nama}
                      </Table.Cell>
                      <Table.Cell className="border-b-2">
                        {resep.Produk_Id}
                      </Table.Cell>
                      <Table.Cell className="border-b-2">
                        <div className="flex items-center justify-center gap-3">
                          <button className="btn btn-info text-white" onClick={() => {
                            setSelectedResep(resep);
                            handleDetail();
                          }}>Detail</button>
                          <button
                            className="btn btn-secondary text-white"
                            onClick={() => {
                              setSelectedResep(resep);
                              setIsTambah(false)
                              setOpenModal(true);
                            }}
                          >
                            Ubah
                          </button>
                          <button
                            className="btn bg-red-600 text-white hover:bg-red-700"
                            onClick={() => {
                              setSelectedResep(resep);
                              setOpenModalDelete(true);
                            }}
                          >
                            Hapus
                          </button>
                        </div>
                      </Table.Cell>
                    </Table.Row>
                  ))}
                </Table.Body>
              </Table>
              <div className="flex items-end justify-end pr-16 mt-5 mb-2">
                <button
                  className="btn btn-primary text-white"
                  onClick={() => {
                    setOpenModal(true);
                  }}
                >
                  Tambah
                </button>
              </div>
            </div>
          )}
        </Card>
        <Modal
          dismissible
          show={openModalDetail}
          onClose={() => setOpenModalDetail(false)}
          size="md"
          className="px-72"
        >
          <Modal.Header className="bg-secondary !text-white">
            Detail Resep {selectedResep.Resep_Id}
          </Modal.Header>
          <Modal.Body className="p-10">
            <div className="flex flex-col gap-2 max-h-[20rem] overflow-y-auto">
              {
                selectedDetailResep.map((detail) => (
                  <div  key={detail.Resep_Id}>
                    <input type="text" className="input input-bordered" value={`${detail.nama} ${detail.qty} ${detail.satuan}`} disabled/>
                  </div>
                ))
              }
              {
                selectedDetailResep.length === 0 && (
                  <div>Tidak ada data</div>
                )
              }
            </div>
            <Modal.Footer className="mt-6">
              <button
                className="btn bg-primary text-white"
                onClick={() => setOpenModalDetail(false)}
              >
                Tutup
              </button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
        <Modal
          dismissible
          show={openModal}
          onClose={() => setOpen(false)}
          size="md"
          className="px-72"
        >
          <Modal.Header className="bg-secondary !text-white">
            {isTambah ? "Tambah Resep" : "Edit Resep"}
          </Modal.Header>
          <Modal.Body className="p-10">
            <div className="flex flex-col gap-2">
              <input type="text" placeholder="Nama Resep" className="input input-bordered" value={selectedResep.Nama} onChange={(e) => setSelectedResep({ ...selectedResep, Nama: e.target.value })}/>
              <select onChange={(e) => setSelectedResep({ ...selectedResep, Produk_Id: e.target.value })} className="input input-bordered">
                <option disabled selected>Pilih Produk</option>
                {produk.map((item) => (
                  <option key={item.Id} value={item.Id}>{item.Nama_Produk}</option>
                ))}
              </select>
            </div>
            <Modal.Footer className="mt-6">
              <button className="btn btn-primary text-white" onClick={isTambah ? handleTambahResep : handleEditResep}>Submit</button>
              <button
                className="btn bg-secondary text-white"
                onClick={() => setOpenModal(false)}
              >
                Tutup
              </button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
        <Modal dismissible size="md" className="px-72" show={openModalDelete} onClose={() => setOpenModalDelete(false)}>
          <Modal.Body className="p-10">
            Apakah anda yakin untuk menghapus data <b>{selectedResep.Nama}</b> ini?
            <Modal.Footer className="mt-5">
              <button className="btn btn-secondary text-white" onClick={() => setOpenModalDelete(false)}>Batal</button>
              <button className="btn bg-red-600 text-white hover:bg-red-700" onClick={handleDeleteResep}>Hapus</button>
            </Modal.Footer>
          </Modal.Body>
        </Modal>
      </div>
    </div>
  );
};

export default ResepPage;
