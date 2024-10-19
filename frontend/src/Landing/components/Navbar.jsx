import React from "react";
import { Menu } from "lucide-react";
import { HashLink } from 'react-router-hash-link';
import { Link } from "react-router-dom";

export const Navbar = () => {
  return (
    <div className="bg-black">
      <div className="">
        <div className="px-8 w-screen justify-center bg-black">
          <div className="py-4 flex items-center justify-between">
            <div className="">
              <h1 className="text-violet-400 text-2xl font-bold">Loop</h1>
            </div>
            <div className='border border-white border-opacity-30 h-10 w-10 inline-flex justify-center items-center rounded-lg sm:hidden'>
              <Menu className="text-white" />
            </div>
            <nav className='text-white gap-6 items-center hidden sm:flex'>
              <HashLink smooth to="#Features" className='text-opacity-60 text-white hover:text-opacity-100 transition'>
                Features
              </HashLink>
              <HashLink smooth to="#FAQs" className='text-opacity-60 text-white hover:text-opacity-100 transition'>
                FAQ's
              </HashLink>
              <HashLink smooth to="#CallToAction" className='text-opacity-60 text-white hover:text-opacity-100 transition'>
                Contact
              </HashLink>
              <Link to='/login' className='bg-white py-2 px-4 rounded-lg text-black'>Login Now</Link>
            </nav>
          </div>
        </div>
      </div>
    </div>
  )
};