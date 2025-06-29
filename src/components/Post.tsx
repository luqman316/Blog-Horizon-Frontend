"use client";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
/* eslint-disable @typescript-eslint/no-unused-vars */
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

interface Blog {
  id: number;
  title: string;
  content: string;
  summary: string;
  category: string;
  coverImage: string;
  publishedDate: string;
  // authorEmail?: string || user?.email;
  author?: {
    firstName: string;
    lastName?: string;
    avatar?: string;
    email: string;
    profilePicture?: string;
  };
}

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
  fetch(...args).then((res) => res.json());

// {data?.map((item: Blog) => (

function Post() {
  const { user } = useAuth();
  const { data, error, isLoading } = useSWR(
    "http://localhost:3001/blog",
    fetcher
  );
  console.log(data);
  return (
    <div className="container mx-auto py-8">
      {/* default posts */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {/* more post */}
        {data?.slice(0, 6).map((item: Blog, idx: number) => (
          <div
            key={idx}
            className="bg-white rounded-xl shadow-sm border p-4 flex flex-col"
          >
            <div className="relative w-full h-48 mb-4">
              <Image
                src={item.coverImage}
                alt={item.title}
                fill
                className="rounded-lg object-cover"
                sizes="(max-width: 768px) 100vw, 33vw"
              />
              <p>
                <span className="absolute top-3 left-3 bg-gray-200/90 text-gray-700 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                  {item.category}
                </span>
                <Link
                  href={`/category/${item.category?.toLowerCase()}`}
                  className="text-blue-600 underline"
                >
                  {item.category}
                </Link>
              </p>
            </div>
            <div className="flex items-center text-gray-500 text-sm gap-2 mb-2">
              <span>{item.publishedDate}</span>
              {/* <span>•</span> */}
              {/* <span>{item.read}</span> */}
            </div>
            <h3 className="font-semibold text-lg mb-1 text-gray-900">
              {/* {item.title} */}
              <Link className="text-lg font-bold hover:text-blue-600" href={`/show/${item.id}`}>{item.title}</Link>
            </h3>
            <p className="text-gray-600 text-sm mb-4 flex-1">{item.summary}</p>
            <div className="flex items-center gap-2 mt-auto">
              <Image
                // src={user?.profilePictureUrl }
                src={item.author?.profilePicture || "/user.png"}
                alt="user avatar"
                width={32}
                height={32}
                className="rounded-full border"
              />
              {item.author ? (
                <span className="text-sm font-medium text-gray-800">
                  {item.author.firstName} {item.author.lastName}
                </span>
              ) : (
                <span className="text-sm font-medium text-gray-500">
                  Unknown Author
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
        {data && data.length > 6 && (
          <div className="flex justify-center mt-8">
            <Link
              href="/all-blogs"
              className="px-6 py-2 bg-blue-600 text-white rounded-md font-semibold hover:bg-blue-700 transition"
            >
              View All Blogs
            </Link>
          </div>
        )}
    </div>
  );
}

export default Post;
