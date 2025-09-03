import React from 'react'
import { Link } from "react-router-dom";
import logo from "../../assets/logo.png"
import { FaBars, FaTimes } from "react-icons/fa";
import { useState } from 'react';
import { HiMiniXMark } from "react-icons/hi2";
import { MdOutlineDarkMode } from "react-icons/md";




const Navbar = () => {

   const [menuOpen, setMenuOpen] = useState(false);

  return (
    <>
      <section className="p-3 flex justify-between items-center max-w-[1808px] mx-auto bg-white">
        <Link className="flex items-center flex-1" to="/">
          <img className="object-cover max-w-25 max-h-25" src={logo} alt="" />
          <div>
            <h1 className="text-2xl font-bold ">RELIVE</h1>
            <p className="text-sm font-medium text-gray-500">Organ Donor</p>
          </div>
        </Link>

        <div id="nav-menu" className="hidden lg:flex gap-12 ">

            <Link to="/" className="font-medium hover:text-[#3238f2]">Home</Link>
            <Link to="/work" className="font-medium hover:text-[#3238f2]">How Its Work</Link>
            <Link to="/about" className="font-medium hover:text-[#3238f2]">About</Link>
            <Link to="/contact" className="font-medium hover:text-[#3238f2]">Contact</Link>
=======
            <Link to="#pricing" className="font-medium hover:text-[#3238f2]">Home</Link>
            <Link to="#" className="font-medium hover:text-[#3238f2]">How Its Work</Link>
            <Link to={'/about'} className="font-medium hover:text-[#3238f2]">About</Link>
            <Link to="#" className="font-medium hover:text-[#3238f2]">Contact</Link>

        </div>

        <div className="hidden flex-1 lg:flex  justify-end gap-4 items-center">
            
               <MdOutlineDarkMode size={25} className='flex justify-center items-center'/>
            <button className=" flex  items-center gap-3 border border-gray-400 px-6 py-2 rounded-lg hover:border-gray-600">
                <Link to={'/login'}>Login</Link >
            </button>
            <button className=" flex  items-center gap-3 border border-gray-400 px-6 py-2 rounded-lg hover:border-gray-600">
                 <Link to={'/signup'}>SignUp</Link >
            </button>
        </div>

        <button className=" p-2 pt-0 lg:hidden" onClick={() => setMenuOpen(!menuOpen)}>
           <FaBars size={25} className=''/>
        </button>

        {menuOpen && (
          <div id="nav-dialog" className="fixed bg-white inset-0 p-3 z-10 lg:hidden">
            <div id="nav-bar" className="flex justify-between pl-5">
                <Link to="#" id="brand" className="flex gap-2 items-center">
                    <span className="text-2xl font-bold">RELIVE</span>
                </Link>

                <button className="p-2 lg:hidden" onClick={() => setMenuOpen(false)}>
                   <HiMiniXMark size={35} />
                 </button>

            </div>

            <div className="mt-6">

                <Link to="/" className="font-medium m-3 p-3 hover:bg-gray-50 block">Home</Link>
                <Link to="/work" className="font-medium m-3 p-3 hover:bg-gray-50 block">How Its Work</Link>
                <Link to="/about" className="font-medium m-3 p-3 hover:bg-gray-50 block">About</Link>
                <Link to="/contact" className="font-medium m-3 p-3 hover:bg-gray-50 block">Contact</Link>

                <Link to="#" className="font-medium m-3 p-3 hover:bg-gray-50 block">Home</Link>
                <Link to="#" className="font-medium m-3 p-3 hover:bg-gray-50 block">How Its Work</Link>
                <Link to={'/about'} className="font-medium m-3 p-3 hover:bg-gray-50 block">About</Link>
                <Link to="#" className="font-medium m-3 p-3 hover:bg-gray-50 block">Contact</Link>
                

            </div>

            <div className="h-[1px] bg-gray-300 "></div>
            
            <div className="flex flex-col gap-4 mt-8 px-6">
                <Link to="/login" className="w-full py-2 text-center border rounded-lg hover:bg-gray-50">
                    Login
                </Link>
                <Link to="/signup" className="w-full py-2 text-center border rounded-lg hover:bg-gray-50">
                    SignUp
                </Link>
            </div>
          </div>
        )}


      </section>

      
    </>
  )
}

export default Navbar