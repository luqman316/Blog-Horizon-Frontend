/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
// import { withAuth } from "@workos-inc/authkit-nextjs";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
// import { withAuth } from "@workos-inc/authkit-nextjs";
import Image from "next/image";
import Link from "next/link";
import useSWR from "swr";

interface Blog {
  id: number;
  title: string;
  summary: string;
  category: string;
  coverImage: string;
  publishedDate: string;
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

function MyBlogsInfo() {
  const { user } = useAuth();
  const { data, error, isLoading } = useSWR(
    "http://localhost:3001/blog",
    fetcher
  );

  return (
    <>
      <div className="container mx-auto my-4">
        {/* {JSON.stringify(user)} */}
        <h1 className="p-4 mb-7 font-bold text-2xl">My Blogs</h1>
        <div className="">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {data
              ?.filter((blog: Blog) => blog.author?.email === user?.email)
              .map((blog: Blog) => (
                <div
                  key={blog.id}
                  className="border rounded-lg p-4 flex flex-col gap-4 shadow-sm hover:shadow-md transition"
                >
                  {/* Author Info */}
                  <div className="flex items-center gap-3">
                    <Image
                      src={
                        blog.author?.profilePicture || "/default-profile.png"
                      }
                      alt={`${blog.author?.firstName} ${blog.author?.lastName}`}
                      width={48}
                      height={48}
                      className="rounded-full object-cover w-12 h-12"
                    />
                    <div>
                      <h2 className="text-base font-semibold">
                        {blog.author?.firstName} {blog.author?.lastName}
                      </h2>
                      <p className="text-gray-500 text-sm">
                        {blog.author?.email}
                      </p>
                    </div>
                  </div>

                  {/* Blog Thumbnail + Info */}
                  <div className="flex flex-col gap-2">
                    <Image
                      src={blog.coverImage}
                      alt={blog.title}
                      width={400}
                      height={200}
                      className="w-full h-40 object-cover rounded-md"
                    />
                    <Link
                      href={`/show/${blog.id}`}
                      className="text-lg font-bold hover:text-blue-600"
                    >
                      {blog.title}
                    </Link>
                    <p className="text-sm text-gray-600">{blog.summary}</p>
                    <p className="text-xs text-gray-500">
                      <span className="font-bold">Category:</span>{" "}
                      {blog.category} <span className="mx-1">|</span>
                      <span className="font-bold">Published:</span>{" "}
                      {new Date(blog.publishedDate).toLocaleDateString()}
                    </p>
                  </div>

                  {/* Action */}
                  <div className="mt-auto">
                    <Link
                      href={`/edit-blogs/${blog.id}`}
                      className="inline-block text-center bg-blue-500 text-white px-4 py-2 rounded-md text-sm hover:bg-blue-600 transition"
                    >
                      Manage Blog
                    </Link>
                  </div>
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default MyBlogsInfo;
