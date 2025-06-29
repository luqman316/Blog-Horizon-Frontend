// "use client";
// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { useAuth } from "@workos-inc/authkit-nextjs/components";
// import { useRouter } from "next/navigation";

// function EditBlogPage() {
//   const { user } = useAuth();
//   const router = useRouter();

//   // Agar user login nahi hai
//   if (!user) {
//     return <div>Please login to edit blogs.</div>;
//   }

//   // Dummy blog object for demonstration; replace with actual blog fetching logic
//   const blog = {
//     author: {
//       email: user.email || "",
//     },
//   };

//   // Sirf apne blog edit kar sakta hai
//   if (user.email !== blog.author.email) {
//     return <div>You are not allowed to edit this blog.</div>;
//   }

//   return (
//     <div>
//       {/* Edit form yahan aayega */}
//       Edit your blog here!
//     </div>
//   );
// }

// export default EditBlogPage;
