import React from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { v4 as uuidv4 } from 'uuid'
import {AiTwotoneDelete} from "react-icons/ai";
import {MdDownloadForOffline} from "react-icons/md";
import {BsFillArrowUpRightCircleFill} from "react-icons/bs";
import { client, urlFor } from '../client'
import { useState } from 'react';
import { FetchUser } from '../utils/FetchUser';

const Pin = ({
    pin
}) => {
    const [mouseHovered, setMouseHovered] = useState(false);
    
  const [savingPost, setSavingPost] = useState(false);

    const navigate=useNavigate();
    const user= FetchUser();
    const {postedBy,image,_id,destination} = pin;
    let alreadySaved= pin?.save?.filter((item)=> item?.postedBy?._id === user?.aud);
    alreadySaved=alreadySaved?.length > 0 ? alreadySaved :[];
    const savePin=(id)=>{
      if(alreadySaved?.length === 0){
        setSavingPost(true);
        client.patch(id).setIfMissing({save:[]}).insert('after','save[-1]',[{
          _key:uuidv4(),
          userId:user?.aud,
          postedBy:{
            _type:'postedBy',
            _ref:user?.aud
          }
        }]).commit().then(()=>{
          window.location.reload();
          setSavingPost(false);
        })
     
      }
    }
 
    const deletePin=(id)=>{
      client.delete(id).then(()=>{
        window.location.reload();
      })
    }
    return (
    <div  className='m-2'>

    <div
    onMouseEnter={()=>setMouseHovered(true)}
    onMouseLeave={()=>setMouseHovered(false)}
    onClick={()=>navigate(`/pin-details/${_id}`)}
    className='relative cursor-zoom-in w-auto hover:shadow-lg rounded-lg  overflow-hidden transition-all ease-in-out duration-500'
    >
        
            <img className='w-full rounded-lg' alt="user-post" src={urlFor(image)?.width(250)?.url()} />
        
        {
           mouseHovered && (
            <div className='absolute top-0   w-full h-full flex flex-col  justify-between p-2 pl-1 z-50'
            style={{height:"100%"}}
            >

              <div className="flex justify-between items-center ">
                <div className='flex gap-2'>
                  <a 
                  
                  href={`${image?.asset?.url}?dl=`}
                  download
                  onClick={(e)=> e.stopPropagation()}
                  className='bg-white w-9 h-9 rounded-full flex items-center justify-center text-dark text-xl opacity-75 hover:opacity-100 hover:shadow-md outline-none'
                  >
              <MdDownloadForOffline/>
                  </a>
                </div>
                {
                  alreadySaved?.length !== 0 ?(
                    <button type='button'  className='bg-red-500  opacity-70 hover:opacity-100 
                    text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none'>
                    {pin?.save?.length}  Saved
                    </button>
                  ):(
                    <button 
                    onClick={(e)=>{
                      e.stopPropagation();
                      savePin(_id);                   
                    }}
                    type='button' className='bg-red-500 opacity-70 hover:opacity-100 
                    text-white font-bold px-5 py-1 text-base rounded-3xl hover:shadow-md outline-none
                    '>
                   {pin?.save?.length}   {savingPost ? 'Saving' : 'Save'}
                    </button>
                  )
                }
              </div>
              <div className="flex justify-between flex-wrap items-center gap-2 w-full relative">
                {
                  destination && (
                    <a href={destination} target='_blank' rel='noreferrer' className='bg-white flex items-center   h-6 gap-2 text-black font-bold px-2 py-4 rounded-full opacity-70 hover:opacity-100 hover:shadow-md'>
                      <BsFillArrowUpRightCircleFill/>
                      {destination.length > 15 ? `${destination.slice(0,15)}...`: destination}
                    </a>
                  )
                }
                {postedBy?._id === user?.aud && (
                  <button  onClick={(e)=>{
                    e.stopPropagation();
                    deletePin(_id);                   
                  }}
                  type='button' className='bg-white   opacity-70 hover:opacity-100 
                   font-bold p-2 text-black  text-base rounded-3xl hover:shadow-md outline-none
                  '>
                    <AiTwotoneDelete/>
                  </button>
                )}
              </div>
            </div>
           ) 
        } 
    </div>
    <Link
      to={`user-profile/${postedBy?._id}` } className="flex gap-2 mt-2 items-center"
      >
      <img className="w-8 h-8 rounded-full object-cover" src={postedBy?.image} alt="user-profile" />
      <p className='font-semibold capitalize'>

      {postedBy.userName}
      </p>
      </Link>
      </div>
  )
}

export default Pin