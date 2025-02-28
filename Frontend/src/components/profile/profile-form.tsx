"use client";

import type React from "react";

import { useState, useEffect, useContext } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Camera, Upload, Loader2 } from "lucide-react";
import { Alert, AlertDescription } from "@/components/ui/alert";

interface User {
  username: string;
  email: string;
  photo: string;
}

export function ProfileForm() {
  const router = useRouter();

  const [loading, setLoading] = useState(true);
  const [submitting, setSubmitting] = useState(false);
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [photo, setPhoto] = useState<File | string>("");
  const [previousPhoto, setPreviousPhoto] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [preview, setPreview] = useState<string>("");
  const [activeUser, setActiveUser] = useState<User | null>();

  useEffect(() => {
    const getActiveUser = async () => {
      setLoading(true);

      try {
        const authToken = sessionStorage.getItem("authToken");
        if (!authToken) {
          console.error("No auth token found.");
          router.push("/not-found");
          return;
        }

        // Fetch active user from the auth API
        const { data: authData } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/auth/private`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${authToken}`,
            },
          }
        );

        setActiveUser(authData.user);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching active user:", error);
        router.push("/not-found");
      }
    };

    getActiveUser();
  }, []);

  useEffect(() => {
    if (activeUser) {
      setUsername(activeUser.username);
      setEmail(activeUser.email);
      setPreviousPhoto(activeUser.photo);
      setPhoto(activeUser.photo);
      setPreview(
        `${process.env.NEXT_PUBLIC_API_URL}/userPhotos/${activeUser.photo}`
      );

      setTimeout(() => {
        setLoading(false);
      }, 1000);
    }
  }, [activeUser]);

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setPhoto(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setPreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError("");
    setSuccess("");

    const formData = new FormData();
    formData.append("username", username);
    formData.append("email", email);
    formData.append("photo", photo);

    try {
      const authToken = sessionStorage.getItem("authToken");
      const { data } = await axios.post("/user/editProfile", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
          authorization: `Bearer ${authToken}`,
        },
      });
      setSuccess("Profile updated successfully");
      router.push("/profile");
    } catch (err: any) {
      setError(err.response?.data?.error || "Something went wrong");
      setTimeout(() => {
        setError("");
      }, 7000);
    } finally {
      setSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[400px]">
        <Loader2 className="h-8 w-8 animate-spin text-emerald-500" />
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit}>
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-2xl font-semibold text-center text-gray-800">
            Edit Profile
          </CardTitle>
        </CardHeader>

        <CardContent className="space-y-6">
          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-emerald-50 text-emerald-600 border-emerald-200">
              <AlertDescription>{success}</AlertDescription>
            </Alert>
          )}

          <div className="flex flex-col items-center gap-4">
            <div className="relative">
              <Avatar className="w-32 h-32 border-4 border-white shadow-md">
                <AvatarImage src={preview} />
                <AvatarFallback className="bg-emerald-100 text-emerald-600 text-2xl">
                  {username?.charAt(0)?.toUpperCase()}
                </AvatarFallback>
              </Avatar>
              <div className="absolute -bottom-2 left-1/2 -translate-x-1/2">
                <Label htmlFor="avatar" className="cursor-pointer">
                  <div className="bg-emerald-500 text-white p-2 rounded-full shadow-md hover:bg-emerald-600 transition-colors">
                    <Camera className="w-4 h-4" />
                  </div>
                </Label>
                <Input
                  id="avatar"
                  type="file"
                  accept="image/*"
                  className="hidden"
                  onChange={handleImageUpload}
                />
              </div>
            </div>
            <Button
              type="button"
              variant="ghost"
              size="sm"
              className="text-emerald-600 hover:text-emerald-700 hover:bg-emerald-50"
              onClick={() => document.getElementById("avatar")?.click()}
            >
              <Upload className="w-4 h-4 mr-2" />
              Change Profile Photo
            </Button>
          </div>

          <div className="space-y-4">
            <div className="space-y-2">
              <Label
                htmlFor="username"
                className="text-sm font-medium text-gray-700"
              >
                Username
              </Label>
              <Input
                id="username"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>

            <div className="space-y-2">
              <Label
                htmlFor="email"
                className="text-sm font-medium text-gray-700"
              >
                Email
              </Label>
              <Input
                id="email"
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="border-gray-200 focus:border-emerald-500 focus:ring-emerald-500"
              />
            </div>
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
            disabled={submitting}
          >
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitting ? "Saving Changes..." : "Save Changes"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
