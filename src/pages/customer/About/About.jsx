import React from 'react'
import { Link } from 'react-router-dom';

import './Header.css';
import './About.css';
import './App.css';
import './SpecialMenu.css';
import './Chef.css';
import './Intro.css';
import './Laurel.css';
import './Gallery.css';


import welcome from '../../../assets/welcome.png';
import MenuItem from './MenuItem/MenuItem';
import data from './data';
import history from '../../../assets/history.png';
import gallery01 from '../../../assets/gallery01.png';
import gallery02 from '../../../assets/gallery02.png';
import gallery03 from '../../../assets/gallery03.png';
import gallery04 from '../../../assets/gallery04.png';
import gallery05 from '../../../assets/gallery05.png';
import brownies from '../../../assets/brownies.jpg';
import margaret from '../../../assets/margaret.png';
import laurels from '../../../assets/laurels.png';
import pemilih from '../../../assets/pemilih.png';
import pemroses from '../../../assets/pemroses.jpg';
import pengantar from '../../../assets/pengantar.jpg';
import pemakan from '../../../assets/pemakan.jpg';
import signature from '../../../assets/signature.png';
import quote from '../../../assets/quote.png';
import meal  from '../../../assets/bakery.mp4';

import { BsFillPlayFill, BsPauseFill } from 'react-icons/bs';
import { BsInstagram, BsArrowLeftShort, BsArrowRightShort, BsFacebook, BsTwitter } from 'react-icons/bs';
import { MdSmartphone, MdWeb } from 'react-icons/md';
import { FaThumbsUp } from "react-icons/fa";
import { IoLocationSharp } from "react-icons/io5";
import { TbClockHour9 } from "react-icons/tb";
import { MdLocalPhone } from "react-icons/md";


const AboutUs = () => {

  const [playVideo, setPlayVideo] = React.useState(false);
  const vidRef = React.useRef();

  const AwardCard = ({ award: { imgUrl, title, subtitle } }) => (
    <div className="app__laurels_awards-card">
      <img src={imgUrl} alt="awards"/>
      <div className="app__laurels_awards-card_content">
        <p className="p__cormorant">{title}</p>
        <p className="p__opensans">{subtitle}</p>
      </div>
    </div>
  );

  const scrollRef = React.useRef(null);

  const scroll = (direction) => {
    const { current } = scrollRef;

    if (direction === 'left') {
      current.scrollLeft -= 300;
    } else {
      current.scrollLeft += 300;
    }
  };
  

  return (
  <div>
    <div className="app__wrapper section__padding" id="home" >
    <div className="app__wrapper_info">
      <h1 className="app__header-h1">
        <span>Setiap</span> 
        <span style={{ color: '#CC5803' }}> Roti</span> 
      </h1>
      <h1 className="app__header-h1">
        <span>Sebuah</span> 
        <span style={{ color: '#CC5803' }}> Simfoni</span> 
      </h1>
      <h1 className="app__header-h1">
        <span>Dari</span> 
        <span style={{ color: '#CC5803' }}> Hati</span> 
      </h1>
     
      <p className="p__opensans" style={{ margin: '2rem 0', textAlign:'justify' }}>     
        <strong>Setiap gigitan roti</strong> adalah perjalanan ke kesempurnaan sederhana, mengingatkan pada <strong>nilai-nilai 
        kebersamaan, keberagaman, dan kebahagiaan. </strong>
        <br></br>
        <br></br>
        <strong>Atma Kitchen</strong> memiliki <strong>visi dan misi</strong> untuk menghadirkan <strong>pengalaman menikmati bakery tak terlupakan, </strong>
        memenuhi hari-hari dengan <strong>aroma menggoda</strong> dan <strong>kenangan manis</strong> bersama <strong>orang yang dicintai.</strong>
        </p>

        <Link to="/shop"  relative="path">
          <button type="button" className="custom__button">Explore Menu</button>
        </Link>
     
    </div>

    <div className="app__wrapper_img">
      <img src={welcome} alt="header_img" />
    </div>
    
  </div>
  <div className="app__wrapper section__padding" id="home">
  <div className="app__wrapper_img">
    <img src={history} alt="header_img" />
  </div>
  
  <div className="app__wrapper_info">
    <h1 className="app__header-h1">
      <span>Our</span> 
      <span style={{ color: '#CC5803' }}> History</span> 
    </h1>
   
    <p className="p__opensans" style={{ margin: '2rem 0', textAlign:'justify' }}>     
    <strong>Atma Kitchen lahir</strong> dari kecintaan <strong>Margareth Atma Negara</strong> terhadap kuliner yang
    terinspirasi oleh hobinya mencoba makanan-makanan hits. <strong>Fondasi usaha ini 
    terletak</strong> pada <strong>kenangan manis masa kecilnya di dapur ibunya</strong>, seorang pembuat 
    roti tradisional yang selalu menekankan <strong>kualitas dan cinta dalam setiap adonan.</strong> 
    
        <br></br>
        <br></br>
        <strong>Dengan komitmen untuk menyajikan kue premium</strong> yang penuh dengan sentuhan cinta dan kenangan indah, 
        <strong> Ditambah dengan layanan Atma Kitchen 
          </strong> yang hadir untuk efisiensi pelayanan lewat <strong>website dan aplikasi Mobile</strong>, 
        mulai <strong>2024 </strong>kami kembali  untuk membawa kehangatan dan kebahagiaan kepada <strong>setiap pelanggan di Yogyakarta.</strong>
        </p>

  </div>
</div>
<div className="section__padding" id="home">
 

    <h1 className="app__header-h1 mb-4" style={{textAlign: 'center'}}>
      <span>Kenapa Harus</span> 
      <span style={{ color: '#CC5803' }}> Atma Kitchen?</span> 
    </h1>
    
    <div className="bg-gray-100 rounded-lg shadow-md p-6 w-full mt-16 border border-black">
  <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
    <div className="col-span-1 text-center pr-4 relative">
      <div className="h-full md:border-r md:border-black absolute right-0 top-0 bottom-0 hidden md:block"></div>
      <div className="rounded-full bg-primary p-4 inline-block mt-2 mb-4">
        <FaThumbsUp className="text-white" size={48} />
      </div>
      <h1 className="text-2xl font-bold mt-4 mb-4 ">Kualitas & Fasilitas Baik</h1>
      <p className="p__opensans mt-2 mb-4">Kami selalu mengutamakan kualitas dari bahan baku hingga penyajian akhir.
       Fasilitas seperti Wi-Fi juga ada untuk Anda.
      </p>
      <div className="border-t border-black md:hidden mt-4"></div>
    </div>
    <div className="col-span-1 text-center pr-4 relative">
      <div className="h-full md:border-r md:border-black absolute right-0 top-0 bottom-0 hidden md:block"></div>
      <div className="rounded-full bg-primary p-4 inline-block mt-2 mb-4">
        <MdSmartphone className="text-white" size={48} />
      </div>
      <h2 className="text-2xl font-bold mt-4 mb-4">Penggunaan Aplikasi</h2>
      <p className="p__opensans mt-2 mb-4">Dapatkan kemudahan dalam melacak pesanan Anda serta melihat menu kami melalui aplikasi resmi Atma Kitchen.</p>
      <div className="border-t border-black md:hidden mt-4"></div>
    </div>
    <div className="col-span-1 text-center pr-4">
      <div className="rounded-full bg-primary p-4 inline-block mt-2 mb-4">
        <MdWeb className="text-white" size={48} />
      </div>
      <h2 className="text-2xl font-bold mt-4 mb-4 ">Website yang User-Friendly</h2>
      <p className="p__opensans mt-2 mb-4">Kunjungi situs web kami untuk kemudahan transaksi, melihat menu serta promo menarik lainnya.</p>
    </div>
  </div>
</div>


<div className="max-w-7xl mx-auto mt-24">
    <h1 className="app__header-h1 mt-4 text-center">
        <span>Our</span>
        <span style={{ color: '#CC5803' }}> Signatures</span>
    </h1>
    <p className="p__opensans mt-6 text-2xl font-semibold" style={{textAlign:'center' }}>     
     Menu andalan sejak berdirinya Atma Kitchen pada 2024  </p>
    
      <div className="grid grid-cols-1 gap-8 md:gap-16 mt-24">
        <div className="flex justify-between items-center w-full">
          <div className="w-1/2 text-right pr-4">
          <hr className="border-t-4  border-primary my-4" />
            <h3 className="text-4xl font-semibold text-left "> Kue Lapis Legit</h3>
            <p className="p__opensans mt-2 text-gray-600 text-justify">Kue tradisional Indonesia dengan lapisan lembut dan aroma butter khas, sering disajikan pada acara istimewa.</p>
            <p className="p__opensans mt-2 text-lg font-bold text-left">1 Loyang | 1/2 Loyang</p>
            
  
          </div>
          <div className="flex-grow border-b border-dashed border-gray-400 mx-4"></div>
          <div className="w-1/2 text-left pl-4">
          <hr className="border-t-4  border-primary my-4" />
            <h3 className="text-4xl font-semibold">Kue Lapis Surabaya</h3>
            <p className="p__opensans mt-2 text-gray-600 text-justify">Kue berlapis kuning dan cokelat dengan isian selai strawberry, terkenal dengan kelembutannya dan rasa segar.</p>
            <p className="p__opensans mt-2 text-lg font-bold">1 Loyang | 1/2 Loyang</p>
          </div>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="w-1/2 text-right pr-4">
          <hr className="border-t-4 border-primary my-4" />
            <h3 className="text-4xl font-semibold text-left">Kue Mandarin</h3>
            <p className="p__opensans mt-2 text-gray-600 text-justify">Kue lembut dengan rasa cokelat dan strawberry, menawarkan rasa unik dan menyegarkan untuk acara spesial.</p>
            <p className="p__opensans mt-2 text-lg font-bold text-left">1 Loyang | 1/2 Loyang</p>
          </div>
          <div className="flex-grow border-b border-dashed border-gray-400 mx-4"></div>
          <div className="w-1/2 text-left pl-4">
          <hr className="border-t-4 border-primary my-4" />
            <h3 className="text-4xl font-semibold">Kue Spikoe</h3>
            <p className="p__opensans mt-2 text-gray-600 text-justify">Kue klasik dengan tekstur lembut dan kacang kenari, terinspirasi dari resep Belanda, ideal untuk perayaan keluarga</p>
            <p className="p__opensans mt-2 text-lg font-bold">1 Loyang | 1/2 Loyang</p>
          </div>
        </div>
      </div>
    </div>
</div>

 <div className="app__specialMenu flex__center section__padding" id="menu">
    <div className="app__specialMenu-title">
     
      <h1 className="app__header-h1 mt-4">
        <span>Another</span>
        <span style={{ color: '#CC5803' }}> Special Menu</span>
      </h1>
      <p className="p__opensans mt-6 text-2xl font-semibold" style={{textAlign:'center' }}>     
        Kami punya lebih banyak menu spesial untuk Anda.
      </p>
    </div>

    <div className="app__specialMenu-menu">
      <div className="app__specialMenu-menu_wine  flex__center">
        <div className="app__specialMenu_menu_items">
          {data.wines.map((wine, index) => (
            <MenuItem key={wine.title + index} title={wine.title} price={wine.price} tags={wine.tags} />
          ))}
        </div>
      </div>

      <div className="app__specialMenu-menu_img mt-4 relative">
        <img src={brownies} alt="menu__img" className="hover:shadow-xl transition-shadow duration-300" />
      </div>

      <div className="app__specialMenu-menu_cocktails  flex__center">
        <div className="app__specialMenu_menu_items">
          {data.cocktails.map((cocktail, index) => (
            <MenuItem key={cocktail.title + index} title={cocktail.title} price={cocktail.price} tags={cocktail.tags} />
          ))}
        </div>
      </div>
    </div>


    <div style={{ marginTop: 15 }}>
      <Link to="/shop"  relative="path">
      <button type="button" className="custom__button">View More</button>
      </Link>
      
    </div>
  </div>
  <div className="app__bg app__wrapper section__padding">
    <div className="app__wrapper_img app__wrapper_img-reverse">
      <img src={margaret} alt="chef_image" />
    </div>
    <div className="app__wrapper_info">
      <h1 className="app__header-h1">
        <span>A Note From</span>
        <span className='text-primary'> Margaret</span>
      </h1>

      <div className="app__chef-content">
        <div className="app__chef-content_quote">
          <img src={quote} alt="quote_image" />
          <p className="p__opensans">Hai semuanya! Aku Margareth Atma Negara. Senang banget bisa ngenalin Atma Kitchen, usaha kuliner terbaru aku.</p>
        </div>
        <p className="p__opensans text-justify">  Sebagai food enthusiast dan selebgram, 
        aku suka banget coba-coba makanan yang lagi hits. 
        Dari hobi ini, aku terinspirasi buat bikin Atma Kitchen. 
         <strong><em>“Life’s too short for boring food!”</em></strong> Jadi, aku pastiin setiap kue yang kita buat itu <strong>nggak cuma enak,</strong> tapi juga <strong><em>Instagrammable banget. </em></strong>
          Kita bakal segera buka di Yogyakarta, so stay tuned! <strong>Can’t wait to share our delicious creations with you all!</strong> </p>
         <br></br>
        
      </div>

      <div className="app__chef-sign">
        <p className="text-primary font-bold">Margareth Atma Negara</p>
        <p className="p__opensans">Founder</p>
        <img src={signature} alt="sign_image" />
      </div>
    </div>
  </div>
  <div className="app__video">
      <video
        ref={vidRef}
        src={meal}
        type="video/mp4"
        loop
        controls={false}
        muted
      />
      <div className="app__video-overlay flex__center">
        <div
          className="app__video-overlay_circle flex__center"
          onClick={() => {
            setPlayVideo(!playVideo);
            if (playVideo) {
              vidRef.current.pause();
            } else {
              vidRef.current.play();
            }
          }}
        >
          {playVideo ? (
            <BsPauseFill color="#fff" fontSize={30} />
          ) : (
            <BsFillPlayFill color="#fff" fontSize={30} />
          )}
        </div>
      </div>
    </div>
    
    <div className="section__padding">
  <h1 className='app__header-h1 text-center mt-4'>
    <span>Sophisticated</span>
    <span className='text-primary'> Process</span>
  </h1>

  <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-16">
    <div className="flex flex-col items-center">
      <img src={pemilih} alt="Description 1" className="w-full h-80 object-cover rounded-md shadow-lg" />
      <h2 className="text-2xl font-bold mt-4">Penentuan Produk</h2>
      <p className="p__opensans mt-2 text-justify">Anda dapat memilih antara produk yang Ready Stock untuk pengiriman 
      segera atau melakukan Pre-Order untuk mendapatkan produk dalam waktu dua hari berikutnya.</p>
    </div>
    <div className="flex flex-col items-center">
      <img src={pemroses} alt="Description 2" className="w-full h-80 object-cover rounded-md shadow-lg" />
      <h2 className="text-2xl font-bold mt-4">Pemrosesan</h2>
      <p className="p__opensans text-justify mt-2">Setiap produk yang Anda pilih akan kami proses dengan maksimal untuk memastikan kepuasan Anda yang hakiki.</p>
    </div>
    <div className="flex flex-col items-center">
      <img src={pengantar} alt="Description 3" className="w-full h-80 object-cover rounded-md shadow-lg" />
      <h2 className="text-2xl font-bold mt-4">Pengantaran</h2>
      <p className="p__opensans text-justify mt-2">Anda dapat memilih untuk mengambil produk langsung di toko kami atau menggunakan layanan <em>delivery</em> kurir kami yang terpercaya.</p>
    </div>
    <div className="flex flex-col items-center">
      <img src={pemakan} alt="Description 4" className="w-full h-80 object-cover rounded-md shadow-lg" />
      <h2 className="text-2xl font-bold mt-4">Nikmati</h2>
      <p className="p__opensans text-justify mt-2">Ketika produk tiba di tangan Anda, itulah bukti dedikasi kami dalam memberikan pengalaman terbaik untuk Anda.</p>
    </div>
  </div>
</div>



    <div className="app__bg app__wrapper section__padding" id="awards">
    <div className="app__wrapper_info">
      
      <h1 className="app__header-h1">
        <span>Our</span>
        <span className='text-primary'> Promo</span>
        </h1>

        <p className="p__opensans mt-6 text-2xl font-semibold">     
        Poin dapat digunakan untuk pemotongan pembayaran  </p>

      <div className="app__laurels_awards">
        {data.awards.map((award) => <AwardCard award={award} key={award.title} />)}
      </div>
    </div>
    
    <div className="app__wrapper_img">
      <img src={laurels} alt="laurels_img" className="shadow-md hover:shadow-xl transition-shadow duration-300" />
    </div>
  </div>

 <div className='section__padding'>
  <div className="bg-gray-100 rounded-lg shadow-md p-6 w-full mt-6 border border-black">
  <div className="flex flex-col md:grid md:grid-cols-3 gap-4">
    <div className="col-span-1 text-center pr-4 relative">
      <div className="h-full md:border-r md:border-black absolute right-0 top-0 bottom-0 hidden md:block"></div>
      <div className="rounded-full bg-primary p-4 inline-block mt-2 mb-4">
        <TbClockHour9 className="text-white" size={48} />
      </div>
      <p className="p__opensans mb-2 text-2xl" style={{ fontWeight: 'bold' }}>Waktu Operasional</p>
      <p className="p__opensans">09:00 - 22:00</p>
      <div className="border-t border-black md:hidden mt-4"></div>
    </div>
    <div className="col-span-1 text-center pr-4 relative">
      <div className="h-full md:border-r md:border-black absolute right-0 top-0 bottom-0 hidden md:block"></div>
      <div className="rounded-full bg-primary p-4 inline-block mt-2 mb-4">
        <MdLocalPhone className="text-white" size={48} />
      </div>
      <p className="p__opensans mb-2 text-2xl" style={{ fontWeight: 'bold' }}>Telepon</p>
      <p className="p__opensans">(022) 8765 4321</p>
      <div className="border-t border-black md:hidden mt-4"></div>
    </div>
    <div className="col-span-1 text-center pr-4">
      <div className="rounded-full bg-primary p-4 inline-block mt-2 mb-4">
        <IoLocationSharp className="text-white" size={48} />
      </div>
      <p className="p__opensans mb-2 text-2xl" style={{ fontWeight: 'bold' }}>Lokasi</p>
      <p className="p__opensans">Sinduadi, Daerah Istimewa Yogyakarta</p>
    </div>
  </div>
</div>
</div>
  <div className="app__gallery flex__center">
      <div className="app__gallery-content">
        <h1 className="app__header-h1">
         <span>Photo</span>
         <span className='text-primary'> Gallery</span>
        </h1>
        <p className="p__opensans mt-2" >
          Cek medsos kita buat liat foto makanan yang hits banget dan info seru lainnya!
        </p>
      
        <div className="flex items-center space-x-4 mt-5">
        <BsInstagram className="text-primary text-3xl"  />
        <a className='p__opensans hover:font-bold' href="https://www.instagram.com/uajy" target="_blank" rel="noopener noreferrer">@atma_kitchen</a>
        <BsFacebook className="text-primary text-3xl" />
        <a className='p__opensans hover:font-bold' href="https://web.facebook.com/universitas.atma.jaya.yogyakarta" target="_blank" rel="noopener noreferrer">Atma Kitchen Official</a>
        <BsTwitter className="text-primary text-3xl"  />
        <a className='p__opensans hover:font-bold' href="https://x.com/uajy" target="_blank" rel="noopener noreferrer">@AtmaKitchen</a>
      </div>
      <Link to="/contact"  relative="path">
        <button type="button" className="custom__button" style={{ margin: '2rem 0'}}>Contact</button>
      </Link>
      
       
      </div>
      <div className="app__gallery-images">
        <div className="app__gallery-images_container" ref={scrollRef}>
          {[gallery01, gallery02, gallery03, gallery04, gallery05].map((image, index) => (
            <div className="app__gallery-images_card flex__center" key={`gallery_image-${index + 1}`}
            onClick={() => window.open('https://www.instagram.com/uajy', '_blank')} >
              <img src={image} alt="gallery_image" />
              <BsInstagram className="gallery__image-icon" />
            </div>
          ))}
        </div>
        <div className="app__gallery-images_arrows">
          <BsArrowLeftShort className="gallery__arrow-icon" onClick={() => scroll('left')} />
          <BsArrowRightShort className="gallery__arrow-icon" onClick={() => scroll('right')} />
        </div>
      </div>
    </div>
    
 </div>
  
  )
}

export default AboutUs;