import { useState,useRef,useEffect } from "react"
import { HiMenu } from "react-icons/hi";
import { AiFillCloseCircle } from "react-icons/ai";
import { Sidebar,UserProfile } from "../components";
import Pin from "./pin";
import { client } from "../client";
import logo from "../assets/pistagram.png";
import { Link,Route,Routes } from "react-router-dom";
import { UserQuery } from "../utils/data";
import { FetchUser } from "../utils/FetchUser";



const Home = () => {
  const [toggleSidebar, setToggleSidebar] = useState(false);
  const [user, setUser] = useState(null);
  const scrollRef=useRef(null);
 

  const userInfo = FetchUser();
  useEffect(() => {
    // getting the query from utils and aud is googleId
    const query = UserQuery(userInfo?.aud);
    client.fetch(query).then((data)=>{
      setUser(data[0])
    })
  }, [])
  useEffect(() => {
    scrollRef.current.scrollTo(0,0);
   
  }, [])
  
  return (
    <div className="flex bg-gray-50 flex-col md:flex-row h-screen ">
      <div className="hidden md:flex flex-initial h-screen ">
        <Sidebar user={user && user}  />
      </div>
      <div className="flex md:hidden flex-row">
        <div className="w-full p-2 flex justify-between items-center shadow-md ">

        <HiMenu fontSize={40} className="cursor-pointer" onClick={()=> setToggleSidebar(true)}/>
        <Link
        to="/"
        >
          <img src={logo} alt="logo" className="w-12" />
        </Link>
        <Link
        to={`user-profile/${user?._id}`}
        >
          <img src={user?.image} alt="profile_pic" className="w-12 rounded-full" />
        </Link>
        </div>
      {
        toggleSidebar && (
          <div className="w-4/5 h-screen fixed bg-white overflow-auto animate-slide-in z-10 shadow-lg">
            <div className="absoulte flex justify-end p-3 items-center">
              <AiFillCloseCircle fontSize={40} className="cursor-pointer" onClick={()=> setToggleSidebar(false)}/>
            </div>
            <Sidebar  user={user && user} closeToggle={setToggleSidebar} />
          </div>
        )
      }
      </div>
      <div className="pb-2 flex-1 h-screen overflow-y-scroll" ref={scrollRef} >
        <Routes>
          <Route path="/user-profile/:userId" element={<UserProfile user={user && user}/>} />
          <Route path="/*" element={<Pin user={user && user}/>}/>
        </Routes>
      </div>
     
    </div>
  )
}

export default Home