"use client"
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface FormData {
  email: string;
  password: string;
}

export default function Page() {

  const router = useRouter();

  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
  });

  const [loading, setLoading] = useState(false)
  const [errorMessage, setError] = useState("");

  
  const [disabled, setDisabled] = useState(true); 
  useEffect(() => {
    const isFilled = Object.values(formData).every(value => value !== '');
    
   setDisabled(!isFilled)
  },[formData])


  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const loginUser = async() => {
    try {

      setError("")
      setLoading(true);
      const {data} = await axios.post("/api/users/login", formData);
      setLoading(false); 
      console.log(data); 

      if(data?.success){
         router.push("/profile");
      }

    } catch (error:any) {
     setError(error.response.data.error)
     setLoading(false); 
    }
  }

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
    loginUser();
    console.log(formData);
  };

  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-white">Login to your account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
        <div className="bg-black py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 bg-opacity-50 backdrop-blur-lg border border-[#ffffff70]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-300">
                Email address
              </label>
              <div className="mt-1">
                <input
                  id="email"
                  name="email"
                  type="email"
                  autoComplete="email"
                  required
                  value={formData.email}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 bg-[#ffffff5d] border border-gray-600 rounded-md shadow-sm placeholder-gray-500 text-black focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-300">
                Password
              </label>
              <div className="mt-1">
                <input
                  id="password"
                  name="password"
                  type="password"
                  autoComplete="current-password"
                  required
                  value={formData.password}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 bg-[#ffffff5d] border border-gray-600 rounded-md shadow-sm placeholder-gray-500 text-black focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              </div>
            </div>

            
            {
              loading && 
              <div className='py-1 text-white flex justify-center items-center'>
                       loading
              </div>
            }

            <div>
              <button
                type="submit"
                disabled={disabled}
                className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white ${disabled? "bg-green-300" : "bg-green-400"} hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-700`}
              >
                Sign up
              </button>
            </div>

            {errorMessage !== "" && <h1 className='text-sm text-red-500 flex justify-center items-center'>{errorMessage}</h1>}

            <p>
              <Link href={"/signup"} className='text-green-400 hover:text-green-700 cursor-pointer flex justify-center items-center'>
                create a new account
              </Link>
            </p>
            
          </form>
        </div>
      </div>
    </div>
  );
}

