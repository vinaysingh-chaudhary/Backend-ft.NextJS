"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  
  const router = useRouter()
  const [loading, setLoading] = useState(false);  
  const [errorMessage, setError] = useState(""); 
  const [token, setToken] = useState();
  const [successFlag, setSuccessFlag] = useState(false)


  useEffect(() => { 
   const token : any =  window.location.search.split("=")[1]
   setToken(token);
  },[])



  const handleVerification = async () => {
    try {
      
      setLoading(true);
      console.log("token" , token);
      const { data } = await axios.post("/api/users/verify", { token });
      
      if(data?.success){
        setSuccessFlag(true);
        router.push("/profile")
      }
      setLoading(false);
      console.log(data);

    } catch (error : any) {
      setError(error.response.data.error)
      setLoading(false);
    }

  };

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full p-6 bg-[#3e3e3e74] rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-semibold mb-4">Email Verification</h2>
        <p className="text-white mb-6">Click the button below to verify your email address.</p>
        <button
          onClick={handleVerification}
          className={`w-full py-3 px-4 bg-green-300 text-black rounded-md shadow-sm focus:outline-none ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
          }`}
          disabled={errorMessage? false : loading === true ? true : false}
        >
          {errorMessage ? "Try again" : successFlag ? "Verified": "Verify User"}
        </button>

       {errorMessage && <h1 className='text-red-500 text-sm pt-2 flex justify-center items-center'>{errorMessage}</h1>}
      </div>
    </div>
  );
}

