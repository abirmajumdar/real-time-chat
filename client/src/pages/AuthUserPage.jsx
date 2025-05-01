import { useEffect, useState } from "react";
import axios from 'axios'
import { useNavigate } from "react-router-dom";
import {BASE_URL} from '../utils/utils'
export default function AuthUserPage() {

  const [isSignin, setIsSignin] = useState(false);
  const [email,setEmail] = useState()
  const [username,setUserName] = useState()
  const [password,setPassword] = useState()
  const navigate = useNavigate()
  const toggleForm = () => {
    setIsSignin(!isSignin);
  };
  useEffect(()=>{
    if (localStorage.getItem("User")){
      setIsSignin(true)
    }
    
  },[])
  const submitForm=async(e)=>{
    e.preventDefault()
    if(!isSignin){
      try{
        const res = await axios.post(`${BASE_URL}/auth/register`,{email,username,password})
        console.log(res)
        if(res.status === 200){
          console.log(res.data)
          localStorage.setItem("User",JSON.stringify(res.data.User))
          navigate('/')
        }
        else{
          console.log("something went wrong")
        }
      }
      catch(e){
        console.log(e)
      }
    }
    else{
      try{
        const res = await axios.post(`${BASE_URL}/auth/login`,{email,password})
        if(res.status === 200){
          console.log(res.data.message)
          console.log(res.data.User)
          localStorage.setItem("User",JSON.stringify(res.data.User))
          navigate('/')
        }
        else{
          console.log(res.data.message)
        }
      }
      catch(e){
        alert("invalid credentials")
      }
    }
    
  }
  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-200 to-purple-300 p-4">
      <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">
          {isSignin ? "Sign In" : "Sign Up"}
        </h2>
        
        <form className="space-y-5">
          {!isSignin && (
            <div>
              <label className="block mb-1 text-gray-600">Username</label>
              <input
                type="text"
                placeholder="Enter your username"
                className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={username} onChange={(e)=>{setUserName(e.target.value)}}
              />
            </div>
          )}
          <div>
            <label className="block mb-1 text-gray-600">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email} onChange={(e)=>{setEmail(e.target.value)}}
            />
          </div>
          <div>
            <label className="block mb-1 text-gray-600">Password</label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full border border-gray-300 p-2 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={password} onChange={(e)=>{setPassword(e.target.value)}}
            />
          </div>

          <button
            type="submit"
            className="w-full bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition duration-300"
            onClick={submitForm}
          >
            {isSignin ? "Sign In" : "Sign Up"}
          </button>
        </form>

        <div className="mt-6 text-center">
          <p className="text-gray-600">
            {isSignin ? "Don't have an account?" : "Already have an account?"}
          </p>
          <button
            onClick={toggleForm}
            className="text-blue-500 font-semibold hover:underline mt-2"
          >
            {isSignin ? "Sign Up" : "Sign In"}
          </button>
        </div>
      </div>
    </div>
  );
}
