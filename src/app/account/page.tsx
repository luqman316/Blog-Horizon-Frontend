"use client";
import { useEffect, useState } from "react";
import Image from "next/image";

type User = {
  email: string;
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
};

export default function AccountPage() {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedUser = window.localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  if (!user) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh]">
        <p className="text-lg text-gray-600">Please login to view your account info.</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto py-10 px-4">
      <div className="bg-white rounded-xl shadow-lg p-8 max-w-lg mx-auto">
        <div className="flex flex-col items-center gap-4">
          <Image
            src={user.profilePictureUrl || "/default-profile.png"}
            alt={user.firstName || "User"}
            width={96}
            height={96}
            className="rounded-full border-2 border-blue-200 shadow"
          />
          <h2 className="text-2xl font-bold">{user.firstName} {user.lastName}</h2>
          <p className="text-gray-600">{user.email}</p>
        </div>
        <div className="mt-8">
          <h3 className="text-lg font-semibold mb-2">Account Details</h3>
          <ul className="text-gray-700 space-y-2">
            <li>
              <span className="font-medium">First Name:</span> {user.firstName}
            </li>
            <li>
              <span className="font-medium">Last Name:</span> {user.lastName}
            </li>
            <li>
              <span className="font-medium">Email:</span> {user.email}
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
}