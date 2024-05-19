import React from 'react'

import '../About/App.css';
import '../About/App.css';
import '../About/App.css';
import findus from '../../../assets/findus.png';
import { IoLocationSharp } from "react-icons/io5";
import { FaClock } from "react-icons/fa";
import { FaPhoneAlt } from "react-icons/fa";
import { IoLogoWhatsapp } from "react-icons/io";
import { BsInstagram, BsFacebook, BsTwitter } from 'react-icons/bs';
import { MdEmail } from "react-icons/md";
import { TbPointFilled } from "react-icons/tb";

const Contact = () => {
  return (
    <div>
    <div className="app__bg app__wrapper section__padding" id="contact">
    <div className="app__wrapper_info">
      <h1 className="app__header-h1 mb-3">
        <span>Find</span> 
        <span className='text-primary'> Us</span>
      </h1>
      <p className="p__opensans">     
        Hubungi kami jika ada pertanyaan atau masukan, kami  akan dengan senang membantu.
      </p>
      <div className="app__wrapper-content">

      <div className="flex items-center space-x-4 mt-8">
         <IoLocationSharp size={22}></IoLocationSharp>
          <p className="p__opensans text-2xl font-bold">
           Alamat
          </p>
        </div>
        <p className="p__opensans mt-2"> Jl. Kaliurang KM 5 No.100, 
           Kocoran, Sinduadi, 
           Kec. Mlati, 
           Kabupaten Sleman, 
           Daerah Istimewa Yogyakarta 55284</p>

           <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div className="mt-4">
              <div>
                <p className="p__opensans text-2xl font-bold mt-1 mb-2">Waktu Operasional</p>
                <div className="flex items-center space-x-4 mt-2">
                <FaClock size={15}></FaClock>
                <p className="p__opensans">Senin - Sabtu : 09:00 - 22:00</p>
                </div>
                <div className="flex items-center space-x-4 mt-2">
                <FaClock size={15}></FaClock>
                <p className="p__opensans">Minggu / Libur : 10:00 - 18:00</p>
                </div>
               
              </div>
            </div>
            <div className="mt-4">
              <div>
                <p className="p__opensans text-2xl font-bold mt-1 mb-2">Nomor Telepon</p>
                <div className="flex items-center space-x-4 mt-2">
                <FaPhoneAlt size={15}></FaPhoneAlt>
                <p className="p__opensans">(022) 8765 4321</p>
                </div>
                <div className="flex items-center space-x-4 mt-2">
                <IoLogoWhatsapp size={18}></IoLogoWhatsapp>
                <p className="p__opensans">+62 812-3456-7890 ( Whatsapp )</p>
                </div>
              </div>
            </div>
          </div>
          
        
          <div className="mt-4">
              <div>
                <p className="p__opensans text-2xl font-bold mt-1 mb-2">Sosial Media</p>
                <div className="flex items-center space-x-4 mt-2">
                  <BsInstagram size={15}></BsInstagram>
                <a className='p__opensans hover:font-bold' href="https://www.instagram.com/uajy" target="_blank" rel="noopener noreferrer">@atma_kitchen</a>
                  <BsFacebook size={18}></BsFacebook>
                <a className='p__opensans hover:font-bold' href="https://web.facebook.com/universitas.atma.jaya.yogyakarta" target="_blank" rel="noopener noreferrer">Atma Kitchen Official</a>
                  <BsTwitter size={18}></BsTwitter>
                <a className='p__opensans hover:font-bold' href="https://x.com/uajy" target="_blank" rel="noopener noreferrer">@AtmaKitchen</a>
                </div>
              </div>
            </div>
            <div className="mt-4">
              <div>
                <p className="p__opensans text-2xl font-bold mt-1 mb-2">Email</p>
                <div className="flex items-center space-x-4 mt-2">
                <MdEmail size={15}></MdEmail>
                <p className="p__opensans">atmakitchen898@gmail.com</p>
                </div>        
              </div>
            </div>
          
          
      </div>
      
      
    </div>

    <div className="app__wrapper_img">
      <img src={findus} alt="finus_img" />
    </div>
  </div>

  <div className="section__padding">
  <h1 className='app__header-h1 text-center'>
    <span>Frequently</span>
    <span className='text-primary'> Asked </span>
    <span>Question</span>
  </h1>
  <div className="flex items-center space-x-4 mt-12 mb-2">
    <TbPointFilled></TbPointFilled>
     <p className="p__opensans text-2xl font-bold">Apakah ada batas waktu pembayaran dalam pemesanan online?</p>
  </div>
  <p className="p__opensans text-xl ml-8 mt-4" style={{lineHeight: 2}}>Untuk pesanan <em>Ready Stock</em>, tenggatnya adalah 1 jam.
   Untuk pesanan <em>Pre-Order</em> pada H-2, tenggatnya adalah 1 jam. Jika pesanan <em>Pre-Order</em> dilakukan pada
   H-3+, tenggatnya adalah pada H-2.
  </p>
  <div className="flex items-center space-x-4 mt-12 mb-2">
    <TbPointFilled></TbPointFilled>
     <p className="p__opensans text-2xl font-bold">Apakah ada biaya pengiriman untuk pesanan yang dikirim oleh kurir Atma Kitchen?</p>
  </div>
  <p className="p__opensans text-xl ml-8 mt-4" style={{lineHeight: 2}}>Ada. Biaya dihitung dari jarak outlet Atma Kitchen ke alamat Customer.
  </p>
  </div>
  <div className="section__padding">
  <h1 className='app__header-h1 text-center'>
    <span>Our</span>
    <span className='text-primary'> Location</span>
  </h1>
  <div className="mt-12">
        <iframe
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3953.2554433947985!2d110.37712477466853!3d-7.762711876988501!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x2e7a59ac8eba7b9b%3A0xa481b43442a601bc!2sTempo%20Gelato%20Kaliurang!5e0!3m2!1sid!2sid!4v1716133946618!5m2!1sid!2sid" 
          referrerpolicy="no-referrer-when-downgrade"
          height="450"
          style={{ border: 0 }}
          allowFullScreen=""
          loading="lazy"
          className='w-full rounded-lg shadow-xl'
        ></iframe>
      </div>
  </div>
  </div>
 
  )
}

export default Contact