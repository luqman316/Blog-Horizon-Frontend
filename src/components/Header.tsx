"use client";
// import { Flex, TextArea } from "@radix-ui/themes";
import { logoutAction } from "@/actions/logout";
import "@radix-ui/themes/styles.css";
import { getSignInUrl, withAuth } from "@workos-inc/authkit-nextjs";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { IoMdSearch } from "react-icons/io";
import useSWR from "swr";

type User = {
  email: string;
  firstName?: string;
  lastName?: string;
  profilePictureUrl?: string;
};
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

function Header() {
  const [user, setUser] = useState<User | null>(null);
  const [signInUrl, setSignInUrl] = useState<string>("");
  const [search, setSearch] = useState("");
  const router = useRouter();
  const [showSuggestions, setShowSuggestions] = useState(false);

  useEffect(() => {
    async function fetchAuth() {
      const { user } = await withAuth();
      if (user) {
        setUser({
          email: user.email,
          firstName: user.firstName ?? undefined,
          lastName: user.lastName ?? undefined,
          profilePictureUrl: user.profilePictureUrl ?? undefined,
        });
         // Save to localStorage
        window.localStorage.setItem(
          "user",
          JSON.stringify({
            email: user.email,
            firstName: user.firstName ?? undefined,
            lastName: user.lastName ?? undefined,
            profilePictureUrl: user.profilePictureUrl ?? undefined,
          })
        );
      } else {
        setUser(null);
        window.localStorage.removeItem("user");
      }
      const url = await getSignInUrl();
      setSignInUrl(url);
    }
    fetchAuth();
  }, []);

  useEffect(() => {
    if (user) {
      fetch("http://localhost:3001/author", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          email: user.email,
          firstName: user.firstName || "Unknown",
          lastName: user.lastName || "",
          profilePicture: user.profilePictureUrl || "",
        }),
      })
        .then((res) => res.json())
        .then(console.log)
        .catch(console.error);
    }
  }, [user]);

  // Fetch all blogs for suggestions (or use API endpoint for search)
  const { data: blogs } = useSWR("http://localhost:3001/blog", (url) =>
    fetch(url).then((res) => res.json())
  );

  // Filtered suggestions
  const suggestions =
    search.length > 0 && blogs
      ? blogs.filter(
          (blog: Blog) =>
            blog.title.toLowerCase().includes(search.toLowerCase()) ||
            blog.summary.toLowerCase().includes(search.toLowerCase())
        )
      : [];

  // Handle search submission
  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (search.trim()) {
      router.push(`/all-blogs?search=${encodeURIComponent(search)}`);
    }
  };

  return (
    <>
      <div className="text-white w-full  bg-primary">
        {/* {JSON.stringify(user)} */}
        <div className=" container mx-auto py-5">
          <div className="flex flex-row justify-between items-center gap-4">
            {/* blog logo */}
            <div className="flex-shrink-0  md:mb-0">
              <Link
                className="flex flex-row items-center text-lg font-bold"
                href={"/"}
              >
                <Image
                  src="/logo-bg.png"
                  alt={"logo icon"}
                  width={600}
                  height={600}
                  className="w-10 h-10 md:w-16 md:h-16"
                />
                Horizon-Blog
              </Link>
            </div>

            {/* navigation links */}
            <div>
              <nav className="flex flex-wrap gap-4 md:gap-7 justify-center w-full md:w-auto">
                <Link className=" hover:underline" href={"/all-blogs"}>
                  All
                </Link>
                <Link
                  className=" hover:underline"
                  href={"/category/destination"}
                >
                  Destination
                </Link>
                <Link className=" hover:underline" href={"/category/culinary"}>
                  Culinary
                </Link>
                <Link className=" hover:underline" href={"/category/lifestyle"}>
                  Lifestyle
                </Link>
                {/* <Link className=" hover:underline" href={"/category/tips-hack"}>
                  Tips & Hack
                </Link> */}
                <Link className=" hover:underline" href={"/category/others"}>
                  Other
                </Link>
              </nav>
            </div>

            {/* search bar */}
            <div className=" relative w-full md:w-[260px] mt-2 md:mt-0">
              <form onSubmit={handleSearch}>
                <input
                  type="text"
                  placeholder="Search Anything"
                  className=" border border-gray-300 rounded-md p-2 w-full"
                  value={search}
                  onChange={(e) => {
                    setSearch(e.target.value);
                    setShowSuggestions(true);
                  }}
                />
                <button
                  type="submit"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-500 bg-transparent border-none"
                >
                  <IoMdSearch className=" text-lg text-white hover:cursor-pointer" />
                </button>
              </form>
              {/* Suggestions Dropdown */}
              {showSuggestions && suggestions.length > 0 && (
                <div className="absolute z-50 bg-white w-full border rounded shadow mt-1 max-h-60 overflow-y-auto">
                  {suggestions.slice(0, 6).map((blog: Blog) => (
                    <Link
                      key={blog.id}
                      href={`/show/${blog.id}`}
                      className="block px-4 py-2 text-black hover:bg-gray-100"
                      onClick={() => setShowSuggestions(false)}
                    >
                      <div className="flex items-center gap-2">
                        <Image
                          src={blog.coverImage}
                          alt={blog.title}
                          width={32}
                          height={32}
                          className="rounded object-cover"
                        />
                        <span>{blog.title}</span>
                      </div>
                    </Link>
                  ))}
                </div>
              )}
            </div>

            {/* for user login and logout and info details about blogs and account */}
            <div className="flex gap-2  mt-2 md:mt-0 w-full md:w-auto justify-end">
              {/* {user && (
                <form action={logoutAction}>
                  <button
                    type="submit"
                    className="bg-white text-black px-2 py-1 sm:px-4 sm:py-2 rounded-md cursor-pointer"
                  >
                    Logout
                    , {user.firstName}
                  </button>
                </form>
              )} */}
              {user && (
                <div className="relative inline-block text-left group">
                  <div className="flex items-center gap-2 cursor-pointer">
                    <Image
                      src={user.profilePictureUrl || "/user.png"}
                      alt="Profile"
                      width={36}
                      height={36}
                      className="rounded-full border"
                    />
                    <span className="text-white font-medium">
                      {user.firstName}
                    </span>
                  </div>

                  {/* Dropdown */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg z-50 hidden group-hover:block transition-all">
                    <div className="py-2 text-sm text-gray-700">
                      <div className="px-4 py-2 border-b border-gray-200">
                        <p className="font-medium">
                          {user.firstName} {user.lastName}
                        </p>
                        <p className="text-xs text-gray-500 truncate">
                          {user.email}
                        </p>
                      </div>
                      <Link
                        href="/my-blogs"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        My Blogs
                      </Link>
                      <Link
                        href="/account"
                        className="block px-4 py-2 hover:bg-gray-100"
                      >
                        Account Info
                      </Link>
                      <form action={logoutAction}>
                        <button
                          type="submit"
                          className="w-full text-left px-4 py-2 hover:bg-gray-100"
                        >
                          Logout
                        </button>
                      </form>
                    </div>
                  </div>
                </div>
              )}

              {!user && (
                <Link
                  className="bg-white text-black  px-2 py-1 sm:px-4 sm:py-2 rounded-md w-full md:w-auto text-center"
                  href={signInUrl}
                >
                  {/* <span>SignIn | </span> */}
                  Login
                </Link>
              )}
              <Link
                className="bg-blue-600 px-2 py-1 text-white sm:px-4 sm:py-2 rounded-md"
                href={"/new-blogs"}
              >
                Post a <span className="font-bold">Blog</span>
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}

export default Header;
