import { GoogleLogin } from "@react-oauth/google"
// import {FcGoogle} from "react-icons/Fc";
import { useNavigate } from "react-router-dom";
import Vid from "../assets/share.mp4";
import logo from "../assets/pistagram.png"
import jwt_decode from "jwt-decode";
import { client } from "../client";


const Login = () => {
    const navigate=useNavigate();
    const responseGoogle=(response)=>{
        // console.log(response);    
        // console.log(jwt_decode(response.credential));
        localStorage.setItem("user",JSON.stringify(jwt_decode(response.credential)))
        const { aud,name,picture }=jwt_decode(response.credential)

        const doc={
            _id:aud,
            _type:'user',
            userName:name,
            image:picture
        }
        client.createIfNotExists(doc).then(()=>{
            navigate("/",{replace:true});
        })
    }
    // console.log(import.meta.env.VITE_CLIENT_ID);
  return (
    <div className="flex justify-center flex-col  items-center h-screen">
        <div
        className="relative w-full h-full"
        >
            <video
            src={Vid}
            autoPlay
            muted
            loop
            content="false"
            className="w-full h-full object-cover"
            />
        </div>
        <div className="absolute flex flex-col justify-center items-center inset-0 bg-blackOverlay">
            <div className="p-5">
                <img src={logo} width={"100px"}  alt="logo" />
            </div>
            <div className="shadow-2xl">
               

                <GoogleLogin
                 onSuccess={credentialResponse => {
                    responseGoogle(credentialResponse);
                  }}
                  onError={() => {
                    console.log('Login Failed');
                  }}
           
           
            />
                    
            </div>
        </div>
    </div>
  )
}

export default Login