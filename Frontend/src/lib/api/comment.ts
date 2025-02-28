import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getComments(slug: string) {
  try {
    const { data } = await axios.get(`${API_URL}/comment/${slug}`);
    return data.data;
  } catch (error) {
    console.error("Error fetching comments:", error);
    return [];
  }
}

export async function addComment(slug: string, content: string) {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const { data } = await axios.post(
      `${API_URL}/comment/${slug}/addComment`,
      { content },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data.data;
  } catch (error) {
    throw error;
  }
}
