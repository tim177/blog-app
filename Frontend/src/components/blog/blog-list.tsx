"use client";
import { BlogCard } from "./blog-card";
import useSWR from "swr";
import { fetchBlogs } from "@/lib/api/blog";

export function BlogList() {
  const { data: blogs, error, isLoading } = useSWR("blogs", fetchBlogs);

  if (isLoading) return <p className="text-center">Loading blogs...</p>;
  if (error)
    return <p className="text-center text-red-500">Failed to load blogs</p>;

  return (
    <div className="px-4">
      <h1 className="text-2xl font-medium text-gray-800 mb-4">Read Blogs</h1>
      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
        {blogs?.map((post) => (
          <BlogCard key={post._id} post={post} />
        ))}
      </div>
    </div>
  );
}
