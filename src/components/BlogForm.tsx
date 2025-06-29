/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { useRouter } from "next/navigation";
import { useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function BlogForm() {
  const { user } = useAuth(); // use the correct hook
  const router = useRouter();
  const [productData, setProductData] = useState({
    title: "",
    summary: "",
    coverImage: "",
    category: "",
    publishedDate: "",
    content: "",
    authorEmail: user?.email || "",
    profilePicture: user?.profilePictureUrl || "",
  });

  const handleChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setProductData({
      ...productData,
      [name]: value,
    });
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const respone = await fetch("http://localhost:3001/blog", {
        method: "POST",
        headers: {
          Accept: "application/json",
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });
      if (respone.ok) {
        const data = await respone.json();
        toast.success("Blog created successfully!");
        console.log("Blog created successfully:", data);
        router.push("/all-blogs"); // Redirect to the home page after successful submission
      } else {
        toast.error("Failed to submit the form!");
        console.error("Failed to create blog:", respone.statusText);
      }
    } catch (error) {
      console.error("Error submitting form:", error);
    }

    console.log("Product Data Submitted:", productData);
  };

  return (
    <>
      <div className="container mx-auto my-4">
        <h1 className="font-bold text-xl">Add a Blog</h1>
        <br />
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2 font-medium"
              htmlFor="title"
            >
              Title
            </label>
            <input
              type="text"
              id="title"
              name="title"
              onChange={handleChange}
              placeholder="Enter blog title"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>
          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2 font-medium"
              htmlFor="summary"
            >
              Summary
            </label>
            <input
              type="text"
              id="summary"
              name="summary"
              onChange={handleChange}
              placeholder="A brief summary of the blog post"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2 font-medium"
              htmlFor="coverImage"
            >
              Cover Image URL
            </label>
            <input
              type="url"
              id="coverImage"
              name="coverImage"
              onChange={handleChange}
              placeholder="Enter the URL of the cover image"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2 font-medium"
              htmlFor="category"
            >
              Category
            </label>
            <select
              id="category"
              name="category"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="destination">Destination</option>
              <option value="lifestyle">Lifestyle</option>
              <option value="food">Food</option>
              <option value="technology">Technology</option>
              <option value="others">Others</option>
            </select>{" "}
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2 font-medium"
              htmlFor="publishedDate"
            >
              Published Date
            </label>
            <input
              type="date"
              id="publishedDate"
              onChange={handleChange}
              name="publishedDate"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              className="block text-gray-700 mb-2 font-medium"
              htmlFor="content"
            >
              Content
            </label>
            <textarea
              id="content"
              name="content"
              rows={5}
              onChange={handleChange}
              placeholder="Write your blog content here"
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            ></textarea>
          </div>

          <button
            type="submit"
            className="bg-blue-500 text-white px-4 py-2 rounded-md w-full hover:bg-blue-600 transition-colors"
          >
            Save
          </button>
          <ToastContainer />
        </form>
      </div>
    </>
  );
}

export default BlogForm;
