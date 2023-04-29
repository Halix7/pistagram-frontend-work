import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import {IoMdAdd, IoMdSearch} from "react-icons/io";


const Navbar = ({searchTerm,setSearchTerm, user}) => {
  const Navigate=useNavigate();

  if(!user) return null;
  return (
    <div className='flex gap-2 items-center md:gap-5 w-full mt-5 pb-7'>
      <div className='flex justify-start items-center w-full px-2 rounded-md bg-white border-none outline-none'>
        <IoMdSearch fontSize={14}  className='ml-1'/>
        <input 
        type="text"
        onChange={(e)=> setSearchTerm(e.target.value)}
        value={searchTerm}
        placeholder='Search'
        onFocus={()=>Navigate("/search")}
        className='bg-white outline-none p-2 w-full'
        />

      </div>
      <div className="flex gap-3">
        <Link to={`user-profile/${user?._id}`} className='hidden md:block'>
          <img src={user?.image} alt="User" className='w-14 h-12 rounded-lg ' />
        </Link>
        <Link to="create-pin" className='bg-black text-white w-12 h-12 md:w-14 flex justify-center items-center rounded-lg' >
        <IoMdAdd/>
        </Link>
      </div>

    </div>
  )
}

export default Navbar