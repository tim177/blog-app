import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL || "http://localhost:5000/api";

export async function getUserProfile() {
  const token = localStorage.getItem("authToken");

  if (!token) {
    return null;
  }

  try {
    const { data } = await axios.get(`${API_URL}/auth/private`, {
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    return data.user;
  } catch (error) {
    console.error("Error fetching user profile:", error);
    return null;
  }
}
