import React,{useState} from 'react'
import { Navbar,PinDetails,CreatePins,Search,Feed } from '../components'
import { Routes,Route } from 'react-router-dom'

const Pin = ({user}) => {
  const [searchTerm, setSearchTerm] = useState("");
  return (
    <div className='px-2 md:px-5'>
      <div className='bg-gray-300'>
        <Navbar searchTerm={searchTerm} setSearchTerm={setSearchTerm} user={user}/>

      </div>
      <div className="h-full">
        <Routes>
          <Route path='/' element={<Feed/>}/>
          <Route path='/category/:categoryId' element={<Feed/>}/>
          <Route path='/pin-details/:pinId' element={<PinDetails user={user} />}/>
          <Route path='/create-pin' element={<CreatePins user={user}/>}/>
          <Route path='/search' element={<Search searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}/>
          
        </Routes>
      </div>
    </div>
  )
}

export default Pin