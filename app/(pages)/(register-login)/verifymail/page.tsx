"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';

export default function Page() {
  
  const router = useRouter()
  const [loading, setLoading] = useState(false);  
  const [VerificationError, setVerificationError] = useState(""); 
  const [resendError, setResendError] = useState(""); 
  const [globalError, setGlobalError] = useState("")
  const [token, setToken] = useState();
  const [successFlag, setSuccessFlag] = useState(false)
  const [successFlagTwo, setSuccessFlagTwo] = useState(false);


  useEffect(() => { 
   const token : any =  window.location.search.split("=")[1]
   setToken(token);
  },[])


  const handleVerification = async () => {
    try {
    
      setLoading(true);
      console.log("token" , token);
      const { data } = await axios.post("/api/users/verify", { token });
      
      if(data?.isVerified){
        setSuccessFlag(true);
      }
      setLoading(false);
      console.log(data);

    } catch (error : any) {
      setVerificationError(error.response.data.error)
      setGlobalError(error.response.data.error)
      setLoading(false);
    }
  };


  const handleReSend = async() => {
    try {
      setGlobalError("")
      setSuccessFlag(false)
      setLoading(true); 
      const {data} = await axios.post("/api/users/resend", {token}); 

      if(data.success){
        setSuccessFlagTwo(true);
      }

      setLoading(false)

    } catch (error : any) {
      setResendError(error.response.data.error)
      setGlobalError(error.response.data.error)
      setLoading(false);
    }
  }

  
  return (
    <div className="min-h-screen flex items-center justify-center bg-black">
      <div className="max-w-md w-full p-6 bg-[#3e3e3e74] rounded-lg shadow-lg text-white">
        <h2 className="text-2xl font-semibold mb-4">Email Verification</h2>
        { VerificationError !== "Verification code is expired" && 
          <button
          onClick={handleVerification}
          className={`w-full py-3 px-4 bg-green-300 text-black rounded-md shadow-sm focus:outline-none ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
          }`}
          disabled={VerificationError? false : loading === true ? true : false}
        >
          {successFlag ? "Verified": "Verify User"}
        </button>
        }
        
       { globalError && 
          (<h1 className='text-red-500 text-sm py-5 flex justify-center items-center'>{globalError}</h1>)
       }

       {VerificationError === "Verification code is expired" && 
          <button
          className={`w-full py-3 px-4 bg-green-300 text-black rounded-md shadow-sm focus:outline-none ${
            loading ? 'opacity-50 cursor-not-allowed' : 'hover:bg-green-600'
          }`}

          onClick={handleReSend}
           > {globalError === "Verification code is expired" ? "Resend code" : successFlagTwo ? "Mail sent to your mail" : "Try again"}</button>
      }
      </div>
    </div>
  );
}

