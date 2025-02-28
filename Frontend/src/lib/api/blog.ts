import axios from "axios";
import { BlogPost } from "@/lib/types";

const API_BASE_URL = `${process.env.NEXT_PUBLIC_API_URL}/api/story`;

export const fetchBlogs = async (): Promise<BlogPost[]> => {
  try {
    const { data } = await axios.get(`${API_BASE_URL}/getAllStories`);
    return data.data;
  } catch (error) {
    console.error("Error fetching blogs:", error);
    return [];
  }
};
