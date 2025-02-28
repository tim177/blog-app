import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

// Server-side function to get story by slug
export async function getStoryBySlug(slug: string) {
  try {
    const response = await fetch(`${API_URL}/story/${slug}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ activeUser: {} }),
      cache: "no-store",
    });

    if (!response.ok) {
      throw new Error("Failed to fetch story");
    }

    const data = await response.json();
    return data.data;
  } catch (error) {
    console.error("Error fetching story:", error);
    return null;
  }
}

// Client-side functions
export async function likeStory(slug: string) {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const { data } = await axios.post(
      `${API_URL}/story/${slug}/like`,
      {},
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

export async function deleteStory(slug: string) {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    await axios.delete(`${API_URL}/story/${slug}/delete`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return true;
  } catch (error) {
    throw error;
  }
}

export async function addToReadList(slug: string) {
  const token = localStorage.getItem("authToken");

  if (!token) {
    throw new Error("Authentication required");
  }

  try {
    const { data } = await axios.post(
      `${API_URL}/user/${slug}/addStoryToReadList`,
      {},
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
      }
    );

    return data;
  } catch (error) {
    throw error;
  }
}
