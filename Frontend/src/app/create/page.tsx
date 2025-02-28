"use client";

import { useRef, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import Link from "next/link";

import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { ArrowLeft, Upload, Loader2 } from "lucide-react";

export default function AddStoryForm() {
  const router = useRouter();
  const imageEl = useRef<HTMLInputElement>(null);
  const [image, setImage] = useState<File | null>(null);
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [preview, setPreview] = useState<string>("");

  const clearInputs = () => {
    setTitle("");
    setContent("");
    setImage(null);
    setPreview("");
    if (imageEl.current) {
      imageEl.current.value = "";
    }
  };

  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImage(file);
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
    formData.append("title", title);
    if (image) {
      formData.append("image", image);
    }
    formData.append("content", content.trim()); // Ensure plain text is stored

    try {
      const authToken = sessionStorage.getItem("authToken");

      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/story/addstory`,
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      setSuccess("Story published successfully!");
      clearInputs();
      router.push("/blog");
    } catch (err: any) {
      setError(
        err.response?.data?.error || "Something went wrong while creating"
      );
      setTimeout(() => {
        setError("");
      }, 7000);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <Card className="shadow-lg">
        <CardHeader className="space-y-6">
          <div className="flex items-center">
            <Button
              type="button"
              variant="ghost"
              size="icon"
              className="mr-4"
              onClick={() => router.back()}
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
            <CardTitle className="text-2xl font-semibold">Add Blog</CardTitle>
          </div>

          {error && (
            <Alert variant="destructive">
              <AlertDescription>{error}</AlertDescription>
            </Alert>
          )}

          {success && (
            <Alert className="bg-emerald-50 text-emerald-600 border-emerald-200">
              <AlertDescription className="flex justify-between items-center">
                <span>{success}</span>
                <Link href="/" className="text-emerald-700 hover:underline">
                  View all stories
                </Link>
              </AlertDescription>
            </Alert>
          )}
        </CardHeader>

        <CardContent className="space-y-6">
          <div className="space-y-2">
            <Input
              type="text"
              placeholder="Story title"
              required
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="text-xl font-medium border-0 border-b rounded-none px-0 focus-visible:ring-0 focus-visible:border-emerald-500"
            />
          </div>

          {/* Replaced TipTapEditor with a simple TextArea */}
          <div className="space-y-2">
            <textarea
              placeholder="Write your story..."
              required
              value={content}
              onChange={(e) => setContent(e.target.value)}
              className="w-full h-40 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-emerald-500"
            />
          </div>

          <div
            className={`relative border-2 border-dashed rounded-lg p-8 text-center 
              ${
                image
                  ? "border-emerald-500 bg-emerald-50"
                  : "border-gray-300 hover:border-emerald-500"
              }
              transition-colors cursor-pointer
            `}
            onClick={() => imageEl.current?.click()}
          >
            {preview ? (
              <div className="relative aspect-video">
                <img
                  src={preview || "/placeholder.svg"}
                  alt="Preview"
                  className="rounded-lg object-cover w-full h-full"
                />
              </div>
            ) : (
              <div className="space-y-2">
                <Upload className="w-8 h-8 mx-auto text-gray-400" />
                <div className="text-sm text-gray-600">
                  Include a high-quality image in your story to make it more
                  inviting to readers.
                </div>
              </div>
            )}
            <input
              ref={imageEl}
              type="file"
              accept="image/*"
              onChange={handleImageChange}
              className="hidden"
            />
          </div>
        </CardContent>

        <CardFooter>
          <Button
            type="submit"
            className="w-full bg-emerald-500 hover:bg-emerald-600 text-white"
            disabled={!image || submitting}
          >
            {submitting && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
            {submitting ? "Publishing..." : "Publish Story"}
          </Button>
        </CardFooter>
      </Card>
    </form>
  );
}
