/* eslint-disable @typescript-eslint/no-unused-vars */
// import Image from "next/image";

import BlogHeadings from "@/components/BlogHeadings";
import Hero from "@/components/Hero";
import Post from "@/components/Post";
import {
  getSignInUrl,
  getSignUpUrl,
  withAuth,
} from "@workos-inc/authkit-nextjs";

// import Header from "@/components/Header";

export default async function Home() {
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const { user } = await withAuth();
  const signInUrl = await getSignInUrl();
  const signUpUrl = await getSignUpUrl();
  return (
    <>
      <Hero />
      <BlogHeadings />
      <Post />
    </>
  );
}
