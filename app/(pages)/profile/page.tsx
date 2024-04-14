"use client";
import { useState, useEffect } from "react";
import axios from "axios";
import { useRouter } from "next/navigation";

interface User {
  username: string;
  fullName: string;
  bio: string;
  isVerified: boolean;
}

const Page = () => {

  const router = useRouter();
  const [user, setUser] = useState<User | null>(null);


  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const { data } = await axios.get("/api/users/user");
        setUser(data.user);
      } catch (error: any) {
        console.log(error.message)
      }
    };

    fetchUserData();
  }, []);


  const logOut = async () => {
    try {
      await axios.post("/api/users/logout");
      router.push("/login");
    } catch (error: any) {
      console.log(error.message);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black text-white">
      <div className="bg-[#48484865] w-1/2 p-5 rounded-lg shadow-md max-w-md flex  flex-col gap-3">
        <div className="flex justify-around items-center">
          <h1 className="text-2xl font-bold mb-4 text-green-400">
            User Profile
          </h1>
          <button
            onClick={logOut}
            className="px-4 py-2 bg-green-300 text-white rounded-md shadow-md hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-600 focus:ring-opacity-50"
          >
            Logout
          </button>
        </div>

        <p>
          <strong>- Username:</strong> {user?.username}
        </p>
        <p>
          <strong>- Full Name:</strong> {user?.fullName}
        </p>
        <p>
          <strong>- Bio:</strong> {user?.bio}
        </p>
        <p>{user?.isVerified ? "Verified ✅" : "Not verified ❌"}</p>
      </div>
    </div>
  );
};

export default Page;
