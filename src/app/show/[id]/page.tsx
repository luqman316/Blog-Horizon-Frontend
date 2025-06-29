/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import Image from "next/image";
import { useParams } from "next/navigation";
import useSWR from "swr";

const fetcher = (...args: [RequestInfo, RequestInit?]) =>
  fetch(...args).then((res) => res.json());

export default function BlogDetail() {
  const params = useParams() as { id: string }; // ✅ This is now required in Next.js 15+
  const id = params.id;
  const { data, error, isLoading } = useSWR(
    `http://localhost:3001/blog/${id}`,
    fetcher
  );
  if (data) console.log("Blog data:", data);

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading blog details</div>;
  if (!data) return <div>Blog not found</div>;

  return (
    // <div className="container mx-auto py-8">
    //   <div className="bg-white rounded-xl   p-4">
    //     <div className="relative w-full h-[490px] aspect-video mb-4">
    //       <Image
    //         src={data.coverImage}
    //         alt={data.title}
    //         // fill
    //         // quality={100}
    //         // className="rounded-lg object-cover"
    //         // sizes="(max-width: 768px) 100vw, 33vw"
    //         fill
    //         style={{ objectFit: "cover" }}
    //         quality={100}
    //         className=""
    //         priority
    //       />
    //     </div>
    //     <h1 className="text-2xl font-bold mb-2">{data.title}</h1>
    //     <p className="text-gray-600 mb-4">{data.summary}</p>
    //     <p className="text-gray-500 text-sm mb-4">
    //       Category: {data.category} | Published on: {data.publishedDate}
    //     </p>
    //     <div className="prose">
    //       <p>{data.content}</p>
    //     </div>
    //   </div>
    // </div>
    <div className="container mx-auto py-10 px-4">
      <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
        {/* Blog Cover Image */}
        <div className="relative w-full h-80 md:h-[420px]">
          <Image
            src={data.coverImage}
            alt={data.title}
            fill
            className="object-cover w-full h-full"
            priority
          />
          <div className="absolute bottom-0 left-0 bg-gradient-to-t from-black/70 to-transparent w-full p-6">
            <h1 className="text-3xl md:text-4xl font-bold text-white drop-shadow-lg">
              {data.title}
            </h1>
            <p className="text-gray-200 mt-2 text-lg">{data.summary}</p>
          </div>
        </div>

        {/* Author & Meta */}
        <div className="flex flex-col md:flex-row items-center justify-between px-8 py-6 bg-white/80 backdrop-blur border-b border-blue-100">
          <div className="flex items-center gap-4">
            <Image
              src={data.author?.profilePicture || "/default-profile.png"}
              alt={data.author?.firstName || "Author"}
              width={48}
              height={48}
              className="rounded-full border-2 border-blue-200 shadow"
            />
            <div>
              <div className="font-semibold text-gray-800">
                {data.author?.firstName} {data.author?.lastName}
              </div>
              {/* <div className="text-xs text-gray-500">{data.author?.email}</div> */}
            </div>
          </div>
          <div className="flex gap-4 mt-4 md:mt-0">
            <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
              {data.category}
            </span>
            <span className="text-gray-500 text-xs flex items-center">
              <svg
                className="w-4 h-4 mr-1"
                fill="none"
                stroke="currentColor"
                strokeWidth={2}
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z"
                />
              </svg>
              {new Date(data.publishedDate).toLocaleDateString()}
            </span>
          </div>
        </div>

        {/* Blog Content */}
        <div className="p-6 md:p-10">
          <div className="flex flex-wrap items-center gap-4 mb-6">
            {/* <span className="inline-block bg-blue-100 text-blue-700 px-3 py-1 rounded-full text-xs font-semibold">
              {data.category}
            </span>
            <span className="text-gray-500 text-sm">
              Published on: {new Date(data.publishedDate).toLocaleDateString()}
            </span> */}
          </div>
          <article className="prose prose-lg max-w-none text-gray-800 leading-relaxed">
            <p className="first-letter:text-5xl first-letter:font-bold first-letter:text-blue-600 first-letter:float-left first-letter:mr-3 first-letter:leading-none">
              {data.content}
            </p>
            <hr className="my-8 border-t-2 border-blue-100" />
            <blockquote className="border-l-4 border-blue-400 pl-4 italic text-gray-600 my-6">
              “{data.summary}”
            </blockquote>
          </article>
        </div>
      </div>
    </div>
  );
}
