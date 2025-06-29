import Link from "next/link";

function BlogHeadings() {
  return (
    <div className="container mx-auto mt-10">
      <h1 className="text-3xl font-bold">Blog</h1>
      <div className="mt-4"></div>
      <p className=" text-gray-600 ">
        Here, we share travel tips, destination guides, and stories that inspire
        your next adventure
      </p>
      <div className="grid grid-cols-2 mt-6 ">
        <div className="flex gap-8">
          <Link href={"/all-blogs"}>All</Link>
          <Link href={"/category/destination"}>Destination</Link>
          <Link href={"/category/culinary"}>Culinary</Link>
          <Link href={"/category/lifestyle"}>Lifestyle</Link>
          <Link href={"/category/tips-hack"}>Tips & Hack</Link>
          <Link href={"/category/others"}>Others</Link>
        </div>
        {/* <div className="space-x-2  flex justify-end items-center">
          <p className="text-gray-600">
            Sort By:{" "}
            <span className=" border border-gray-500 p-1">
              <select name="" id="" className="font-bold text-black">
                <option value="">newest</option>
                <option value="">by name</option>
              </select>
            </span>
          </p> */}
        {/* </div> */}
      </div>
    </div>
  );
}

export default BlogHeadings;
