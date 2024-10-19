"use client"
import appScreen from "../src/assets/images/homedash.png";
export const ProductShowcase = () => {
  return (
    <div className="relative min-h-screen  w-screen bg-black text-white bg-gradient-to-b from-black to-[#5D2CA8] py-[72px] sm:py-24">
      <div>
        <h2 className="text-center text-5xl font-bold tracking-tighter">User Interface</h2>
        <div className='max-w-xl mx-auto'>
        <p className="text-xl text-white/70 text-center mt-5 ">Simple and secure to use</p>
        </div>
        <div className="flex justify-center">
        <img src={appScreen}  alt="app screen" className="scale-95 lg:mt-14 mt-[10rem]" />        </div>
      </div>
    </div>
  )
};
