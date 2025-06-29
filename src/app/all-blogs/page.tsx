"use client";
import Image from "next/image";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
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
export default function AllBlogs() {
  const searchParams = useSearchParams();
  const search = searchParams.get("search")?.toLowerCase() || "";
  const { data, error } = useSWR("http://localhost:3001/blog", fetcher);

  if (error) return <div>Error loading blogs.</div>;
  if (!data) return <div>Loading...</div>;

  const filteredBlogs = data.filter(
    (blog: Blog) =>
      blog.title.toLowerCase().includes(search) ||
      blog.summary.toLowerCase().includes(search) ||
      blog.category.toLowerCase().includes(search)
  );

  return (
    <div className="container mx-auto my-4">
      <h1 className="text-2xl font-bold mb-4">All Blogs</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredBlogs.map((item: Blog, idx: number) => (
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
              {/* {item.author?.email === user?.email && (
                <span className="absolute top-3 right-3 bg-gray-200/90 text-gray-700 px-3 py-1 rounded-full text-xs font-medium backdrop-blur-sm">
                  <Link href={`/edit-blogs/${item.id}`}>Edit</Link>
                </span>
              )} */}
            </div>
            <div className="flex items-center text-gray-500 text-sm gap-2 mb-2">
              <span>{item.publishedDate}</span>
              {/* <span>•</span> */}
              {/* <span>{item.read}</span> */}
            </div>
            <h3 className="font-semibold text-lg mb-1 text-gray-900">
              {/* {item.title} */}
              <Link href={`/show/${item.id}`}>{item.title}</Link>
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
    </div>
  );
}
