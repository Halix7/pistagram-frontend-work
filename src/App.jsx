import { Route,Routes ,useNavigate } from "react-router-dom"
import Home from "./container/Home"
import Login from "./components/login";
import { useEffect } from "react";
import { FetchUser } from "./utils/FetchUser";
const App = () => {
  const navigate = useNavigate();
  useEffect(() => {
   const user = FetchUser();
   if(!user) navigate('login');
  }, [])
  
  return (
    <div className="bg-red-600">

        <Routes>
          <Route path="login" element={<Login/>}/>
          <Route
          path="/*"
          element={<Home/>}
          />
        </Routes>

    </div>
  )
}

export default App