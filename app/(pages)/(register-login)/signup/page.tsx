"use client"
import { useState } from 'react';


interface FormData {
  username: string;
  fullName: string;
  bio: string;
  email: string;
  password: string;
}

export default function Page() {
  const [formData, setFormData] = useState<FormData>({
    username: '',
    fullName: '',
    bio: '',
    email: '',
    password: '',
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleSubmit = (event: React.FormEvent) => {
    event.preventDefault();
  };

  // const register = async() => {
  //   const registerRefrence = await fetch("/api/users/signup", 
  //     {
  //       method: "POST",
  //       headers: {
  //         "content-type": "application/json"
  //       },
  //       body: JSON.stringify(formData) 
  //     }); 

  //     console.log(registerRefrence); 
  // }; 


  return (
    <div className="min-h-screen bg-black flex flex-col justify-center py-12 sm:px-6 lg:px-8">
      <div className="sm:mx-auto sm:w-full sm:max-w-md">
        <h2 className="mt-6 text-center text-3xl font-extrabold text-orange-200">Sign up for an account</h2>
      </div>

      <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-md ">
        <div className="bg-black py-8 px-4 shadow-lg sm:rounded-lg sm:px-10 bg-opacity-50 backdrop-blur-lg border border-[#ffffff70]">
          <form className="space-y-6" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="username" className="block text-sm font-medium text-gray-300">
                Username
              </label>
              <div className="mt-1">
                <input
                  id="username"
                  name="username"
                  type="text"
                  autoComplete="username"
                  required
                  value={formData.username}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 bg-[#ffffff5d] border border-gray-600 rounded-md shadow-sm placeholder-gray-500 text-black focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="fullName" className="block text-sm font-medium text-gray-300">
                Full Name
              </label>
              <div className="mt-1">
                <input
                  id="fullName"
                  name="fullName"
                  type="text"
                  autoComplete="fullName"
                  required
                  value={formData.fullName}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 bg-[#ffffff5d] border border-gray-600 rounded-md shadow-sm placeholder-gray-500 text-black focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              </div>
            </div>

            <div>
              <label htmlFor="bio" className="block text-sm font-medium text-gray-300">
                Bio
              </label>
              <div className="mt-1">
                <input
                  id="bio"
                  name="bio"
                  type="text"
                  autoComplete="bio"
                  required
                  value={formData.bio}
                  onChange={handleChange}
                  className="appearance-none block w-full px-3 py-2 bg-[#ffffff5d] border border-gray-600 rounded-md shadow-sm placeholder-gray-500 text-black focus:outline-none focus:ring-gray-500 focus:border-gray-500 sm:text-sm"
                />
              </div>
            </div>

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

            <div>
              <button
                type="submit"
                className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-orange-300 hover:bg-orange-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-orange-700"
              >
                Sign up
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
