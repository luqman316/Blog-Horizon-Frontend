/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import { useAuth } from "@workos-inc/authkit-nextjs/components";
import { useParams, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
function EditBlogForm() {
  const { user } = useAuth(); // use the correct hook
  const router = useRouter();
  const params = useParams();
  const id = params?.id;
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

  // Get the blog ID from the URL
  useEffect(() => {
    if (id) {
      fetch(`http://localhost:3001/blog/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProductData({
            title: data.title || "",
            summary: data.summary || "",
            coverImage: data.coverImage || "",
            category: data.category || "",
            publishedDate: data.publishedDate || "",
            content: data.content || "",
            authorEmail: data.authorEmail || user?.email || "",
            profilePicture:
              data.profilePicture || user?.profilePictureUrl || "",
          });
        });
    }
  }, [id, user]);

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

  // handle edit blog form submission
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const response = await fetch(`http://localhost:3001/blog/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(productData),
      });

      if (response.ok) {
        toast.success("Blog updated successfully!");
        router.push("/my-blogs");
      } else {
        toast.error("Failed to update the blog.");
        console.error(await response.text());
      }
    } catch (error) {
      toast.error("An error occurred while updating.");
      console.error(error);
    }
  };

  // handle delete blog
  const handleDelete = async () => {
    const confirmed = window.confirm(
      "Are you sure you want to delete this blog?"
    );
    if (!confirmed) return;

    try {
      const res = await fetch(
        `http://localhost:3001/blog/${id}?authorEmail=${user?.email}`,
        {
          method: "DELETE",
        }
      );

      if (res.ok) {
        toast.success("Blog deleted successfully!");
        router.push("/my-blogs");
      } else {
        toast.error("Failed to delete blog.");
        console.error(await res.text());
      }
    } catch (err) {
      toast.error("Error deleting blog.");
      console.error(err);
    }
  };

  return (
    <>
      <div className="container mx-auto my-4">
        <h1 className="font-bold text-xl"></h1>
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
              value={productData.title}
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
              value={productData.summary}
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
              value={productData.coverImage}
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
              value={productData.category}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
              onChange={handleChange}
            >
              <option value="">Select a category</option>
              <option value="travel">Travel</option>
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
              value={productData.publishedDate}
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
              value={productData.content}
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
            Update
          </button>
          <button
            type="button"
            onClick={handleDelete}
            className="bg-red-500 mt-10 text-white px-4 py-2 rounded-md w-full hover:bg-red-600 transition-colors"
          >
            Delete Blog
          </button>
          <ToastContainer />
        </form>
      </div>
    </>
  );
}

export default EditBlogForm;
