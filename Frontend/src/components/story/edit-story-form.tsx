"use client";

import type React from "react";

import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Skeleton } from "@/components/ui/skeleton";
import { useToast } from "@/components/ui/use-toast";
import { Upload, ArrowLeft } from "lucide-react";
import Link from "next/link";
import { Textarea } from "../ui/textarea";
import Image from "next/image";

interface EditStoryProps {
  slug: string;
}

export default function EditStorys({ slug }: EditStoryProps) {
  const imageEl = useRef<HTMLInputElement>(null);
  const [loading, setLoading] = useState(true);

  const [image, setImage] = useState<File | string>("");
  const [previousImage, setPreviousImage] = useState("");
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();
  const { toast } = useToast();

  useEffect(() => {
    const getStoryInfo = async () => {
      setLoading(true);
      try {
        const authToken = sessionStorage.getItem("authToken");
        const { data } = await axios.get(
          `${process.env.NEXT_PUBLIC_API_URL}/api/story/editStory/${slug}`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${authToken}`,
            },
          }
        );

        setTitle(data.data.title);
        setContent(data.data.content);
        setImage(data.data.image);
        setPreviousImage(data.data.image);
      } catch (error) {
        console.error("Error fetching story:", error);
        toast({
          variant: "destructive",
          title: "Error",
          description: "Failed to fetch story details",
        });
        router.push("/");
      } finally {
        setLoading(false);
      }
    };

    getStoryInfo();
  }, [slug, router, toast]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);

    const formdata = new FormData();
    formdata.append("title", title);
    formdata.append("content", content);
    formdata.append("image", image);
    formdata.append("previousImage", previousImage);

    try {
      const authToken = sessionStorage.getItem("authToken");
      await axios.put(
        `${process.env.NEXT_PUBLIC_API_URL}/api/story/${slug}/edit`,
        formdata,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            authorization: `Bearer ${authToken}`,
          },
        }
      );

      toast({
        title: "Success",
        description: "Story updated successfully",
        variant: "default",
      });

      router.push(`/blog`);
    } catch (error: any) {
      console.error("Error updating story:", error);

      toast({
        variant: "destructive",
        title: "Error",
        description: error.response?.data?.error || "Failed to update story",
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (loading) {
    return (
      <div className="container mx-auto max-w-3xl py-10 px-4">
        <div className="space-y-6">
          <Skeleton className="h-8 w-1/3" />
          <Skeleton className="h-12 w-full" />
          <Skeleton className="h-64 w-full" />
          <Skeleton className="h-40 w-full" />
          <Skeleton className="h-12 w-1/4" />
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-3xl py-10 px-4">
      <Card className="border-none shadow-md">
        <CardHeader>
          <div className="flex items-center gap-2 mb-4">
            <Button variant="ghost" size="icon" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
            </Button>
            <CardTitle className="text-2xl">Edit Story</CardTitle>
          </div>
          <CardDescription>
            Make changes to your story and save them when you&apos;re done.
          </CardDescription>
        </CardHeader>

        <form onSubmit={handleSubmit}>
          <CardContent className="space-y-6">
            <div className="space-y-2">
              <Label htmlFor="title">Title</Label>
              <Input
                id="title"
                placeholder="Enter your story title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
                className="text-lg"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content">Content</Label>
              <div className="min-h-[300px] border rounded-md">
                <Textarea
                  className="min-h-[300px]"
                  value={content}
                  onChange={(e) => setContent(e.target.value)}
                />
              </div>
            </div>

            <div className="space-y-4">
              <Label>Current Image</Label>
              <div className="relative rounded-md overflow-hidden border bg-muted/40">
                <div className="absolute top-2 left-2 bg-background/80 px-2 py-1 rounded text-xs font-medium">
                  Current Image
                </div>
                <div className="aspect-video relative">
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/storyImages/${previousImage}`}
                    alt={"Story Image"}
                    fill
                    unoptimized
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="image">Change Image</Label>
              <div
                className="border-2 border-dashed rounded-md p-6 flex flex-col items-center justify-center gap-2 bg-muted/30 hover:bg-muted/50 transition-colors cursor-pointer"
                onClick={() => imageEl.current?.click()}
              >
                <Upload className="h-8 w-8 text-muted-foreground" />
                <p className="text-sm text-muted-foreground">
                  {image === previousImage
                    ? "Click to change the image"
                    : typeof image !== "string"
                    ? image.name
                    : "Image selected"}
                </p>
                <input
                  ref={imageEl}
                  type="file"
                  id="image"
                  className="hidden"
                  onChange={(e) => {
                    if (e.target.files && e.target.files[0]) {
                      setImage(e.target.files[0]);
                    }
                  }}
                  accept="image/*"
                />
              </div>
            </div>
          </CardContent>

          <CardFooter className="flex justify-end gap-2">
            <Button variant="outline" type="button" asChild>
              <Link href={`/story/${slug}`}>Cancel</Link>
            </Button>
            <Button
              type="submit"
              disabled={isSubmitting}
              className="min-w-[120px]"
            >
              {isSubmitting ? "Updating..." : "Update Story"}
            </Button>
          </CardFooter>
        </form>
      </Card>
    </div>
  );
}
