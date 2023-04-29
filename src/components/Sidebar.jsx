import React from 'react';
import { NavLink , Link } from 'react-router-dom';
import {RiHomeFill} from "react-icons/ri";
import  {IoIosArrowForward} from "react-icons/io";
import Logo from "../assets/pistagram.png";
import { categories } from '../utils/data';

const isNotActiveStyle="flex items-center py-5 gap-3 text-gray-500 hover:text-black transition-all ease-in-out duration-200 capitalize"
const isActiveStyle="flex items-center py-5 gap-3 font-extrabold border-r-2 border-black transition-all ease-in-out duration-100 capitalize"



const Sidebar = ({closeToggle,user}) => {
    const handleCloseSidebar=()=>{
        if(closeToggle) closeToggle(false)
    }
  return (
    <div className='flex flex-col  bg-white h-full overflow-y-scroll hide-scrollbar min-w-210'>
        <div className='flex flex-col'>
            <Link 
            to="/"
            className='cursor-pointer flex w-[20%] px-5 pt-1 gap-2 my-2 items-center '
            onClick={handleCloseSidebar}
            >
                <img src={Logo} alt="logo" className='w-full' />

            </Link>
            <div className='flex flex-col gap-5 ml-2'>
                <NavLink
                to="/"
                className={({isActive})=> isActive ? isActiveStyle:isNotActiveStyle}
                onClick={handleCloseSidebar}
                
                >
                    <RiHomeFill/>
                    Home
                </NavLink>
                <h3 className='mt-1 px-5 text-base 2xl:text-xl'>
                    Discover Catergories
                </h3>
                {
                    categories.slice(0,(categories.length - 1)).map((category)=>(
                        <NavLink 
                        to={`/category/${category.name}`}
                        className={({isActive})=> isActive ? isActiveStyle:isNotActiveStyle}
                        onClick={handleCloseSidebar}
                        key={category.name}
                        >
                            <img src={category.image} className='w-8 h-8 rounded-full shadow-sm ' alt='category' />
                        {category.name}
                    </NavLink>
                 ))   
                }
            </div>

        </div>
        {
            user && (
                <Link
                to={`/user-profile/${user._id}`}
                className='flex my-5 mb-3 gap-3 items-center p-2 rounded-lg shadow-lg bg-white mx-3'
                onClick={handleCloseSidebar}

                >
                <img src={user.image} className='w-10 h-10 rounded-full' alt="user-profile" />
                <p>{user.userName}</p>
                </Link>
            )
        }
    </div>
  )
}

export default Sidebar