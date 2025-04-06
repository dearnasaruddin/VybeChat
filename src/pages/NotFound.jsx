import React from 'react'
import { Link, useNavigate } from "react-router";

const NotFound = () => {
  return (
    <>
      <main className="h-screen w-full flex flex-col justify-center items-center bg-[#1A2238]">
        <div className='relative'>
        <h1 className="text-9xl font-extrabold text-white tracking-widest">404</h1>
        <div className="bg-[#FF6A3D] px-2 text-sm rounded rotate-12 absolute top-2/3 left-1/4 translate-x-2">
          Page Not Found
        </div>
        </div>
        <button className="mt-10">
          <span className="relative inline-block text-sm font-medium text-primary group active:text-orange-500 focus:outline-none focus:ring">
            <span className="absolute inset-0 transition-transform translate-x-0.5 translate-y-0.5 bg-primary group-hover:translate-y-0 group-hover:translate-x-0" />
            <span className="relative block px-8 py-3 bg-[#1A2238] border border-current">
              <Link to="/" >Go Home</Link>
            </span>
          </span>
        </button>
      </main>

    </>
  )
}

export default NotFound