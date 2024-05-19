import award01 from '../../../assets/award01.png';
import award02 from '../../../assets/award02.png';
import award03 from '../../../assets/award03.png';
import award04 from '../../../assets/award04.png';
import award05 from '../../../assets/award05.png';

const wines = [
  {
    title: 'Kue Brownies',
    price:  '5 ★',
    tags: '1 Loyang | 1/2 Loyang',
  },
  {
    title: 'Roti Sosis',
    price: '5 ★',
    tags: '1 Box | 10 Pcs',
  },
  {
    title: 'Milk Bun',
    price: '4 ★',
    tags: '1 Box | 10 Pcs',
  },
  {
    title: 'Roti Keju',
    price: '5 ★',
    tags:  '1 Box | 10 Pcs',
  },
  {
    title: 'Choco Latte',
    price: '4 ★',
    tags: 'Botol | 1 Liter',
  },
  {
    title: 'Hampers Paket A',
    price: '5 ★',
    tags: 'Lapis Legit ½ Loyang | Brownies ½ Loyang | Exclusive Box & Card',
  },
];

const cocktails = [

  {
    title: 'Hampers Paket B',
    price: '4 ★',
    tags: 'Lapis Surabaya ½ Loyang | Roti Sosis | Exclusive Box & Card',
  },
  {
    title: 'Matcha Latte',
    price: '5 ★',
    tags: 'Botol | 1 Liter',
  },
  {
    title: "Keripik Kentang",
    price: '4 ★',
    tags: 'Bungkus | 250 gr',
  },
  {
    title: 'Kopi Luwak',
    price: '5 ★',
    tags: 'Bubuk | 250 gr',
  },
  {
    title: 'Matcha Organik',
    price: '4 ★',
    tags: 'Bubuk | 100 gr',
  },
  {
    title: 'Chocolate Bar',
    price: '5 ★',
    tags: 'Bungkus | 100 gr',
  },
];

const awards = [
  {
    imgUrl: award01,
    title: 'Pemesanan Kelipatan 10.000',
    subtitle: 'Mendapatkan 1 Poin',
  },
  {
    imgUrl: award02,
    title: 'Pemesanan Kelipatan 100.000',
    subtitle: 'Mendapatkan 15 Poin',
  },
  {
    imgUrl: award03,
    title: 'Pemesanan Kelipatan 500.000',
    subtitle: 'Mendapatkan 75 Poin',
  },
  {
    imgUrl: award04,
    title: 'Pemesanan Kelipatan 1000.000',
    subtitle: 'Mendapatkan 200 Poin',
  },
  {
    imgUrl: award05,
    title: 'Promo Ulang Tahun Customer',
    subtitle: 'Dapatkan poin dua kali lipat untuk pembelian saat ulang tahunmu! (H-3 sampai H+3)',
  },
];

export default { wines, cocktails, awards };
