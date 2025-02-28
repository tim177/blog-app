"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import axios from "axios";
import {
  ArrowLeft,
  Bookmark,
  Heart,
  MessageCircle,
  MoreHorizontal,
  Pencil,
  Share2,
  Trash2,
  BookmarkIcon as BookmarkFilled,
} from "lucide-react";
import { toast } from "@/components/ui/use-toast";
import Loader from "@/components/ui/loader";
import { CommentSidebar } from "@/components/comments/comment-sidebar";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

// Import our modular components and hook
import { Card, CardContent } from "@/components/ui/card";
import Image from "next/image";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import Link from "next/link";

export default function DetailStory() {
  const [activeUser, setActiveUser] = useState({});
  const [story, setStory] = useState<any>({});
  const [likeStatus, setLikeStatus] = useState(false);
  const [likeCount, setLikeCount] = useState(0);
  const [storyLikeUser, setStoryLikeUser] = useState([]);
  const [storyReadListStatus, setStoryReadListStatus] = useState(false);
  const [sidebarShowStatus, setSidebarShowStatus] = useState(false);
  const [loading, setLoading] = useState(true);

  const params = useParams();
  const router = useRouter();
  const slug = params.slug as string;

  const formatDate = (createdAt: string) => {
    const d = new Date(createdAt);
    return `${d
      .toLocaleString("eng", { month: "long" })
      .substring(0, 3)} ${d.getDate()}`;
  };

  useEffect(() => {
    const getDetailStory = async () => {
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

        const user = authData.user;
        setActiveUser(user);

        // Fetch story details
        const { data: storyData } = await axios.post(
          `${process.env.NEXT_PUBLIC_API_URL}/api/story/${slug}`,
          { activeUser: user }
        );

        setStory(storyData.data);
        setLikeStatus(storyData.likeStatus);
        setLikeCount(storyData.data.likeCount);
        setStoryLikeUser(storyData.data.likes);

        // Handle Read List Status
        setStoryReadListStatus(
          user.readList && user.readList.includes(storyData.data._id)
        );

        setLoading(false);
      } catch (error) {
        console.error("Error fetching story:", error);
        setStory(null);
        router.push("/not-found");
      }
    };

    getDetailStory();
  }, [slug]); // Re-fetch when `slug` changes

  const handleLike = async () => {
    try {
      setLikeStatus((prev) => !prev); // Optimistic update
      const authToken = sessionStorage.getItem("authToken");
      if (!authToken) {
        console.error("No auth token found.");
        router.push("/");
        return;
      }

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/story/${slug}/like`,
        { activeUser },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${authToken}`,
          },
        }
      );
      setLikeCount(data.data.likeCount);
      setStoryLikeUser(data.data.likes);
      toast({
        title: likeStatus ? "Post unliked" : "Post liked",
        duration: 1000,
      });
    } catch (error) {
      console.error("Error liking post:", error);
      router.push("/");
    }
  };

  const handleDelete = async () => {
    if (window.confirm("Do you want to delete this post?")) {
      try {
        const authToken = sessionStorage.getItem("authToken");
        if (!authToken) {
          console.error("No auth token found.");
          return;
        }

        await axios.delete(
          `${process.env.NEXT_PUBLIC_API_URL}/api/story/${slug}/delete`,
          {
            headers: {
              "Content-Type": "application/json",
              authorization: `Bearer ${authToken}`,
            },
          }
        );
        toast({
          title: "Post deleted successfully",
          duration: 1000,
        });
        router.push("/blog");
      } catch (error) {
        console.error("Error deleting post:", error);
        toast({
          title: "Error deleting post",
          variant: "destructive",
          duration: 1000,
        });
      }
    }
  };

  const addStoryToReadList = async () => {
    try {
      const authToken = sessionStorage.getItem("authToken");
      if (!authToken) {
        console.error("No auth token found.");
        return;
      }

      const { data } = await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/user/${slug}/addStoryToReadList`,
        { activeUser },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${authToken}`,
          },
        }
      );

      setStoryReadListStatus(data.status);
      toast({
        title: data.status
          ? "Added to reading list"
          : "Removed from reading list",
        duration: 1000,
      });
    } catch (error) {
      console.error("Error updating reading list:", error);
      toast({
        title: "Error updating reading list",
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  if (loading && activeUser && story) {
    return <Loader />;
  }

  return (
    <>
      <main className="max-w-3xl mx-auto px-4 ">
        <div className="mb-6">
          {/* Top Header type  */}
          <div className="mb-8 flex items-center justify-between">
            <Button variant="ghost" size="sm" onClick={() => router.back()}>
              <ArrowLeft className="h-4 w-4" />
              Back
            </Button>
            {activeUser && story.author && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon">
                    <MoreHorizontal className="h-4 w-4" />
                    <span className="sr-only">More options</span>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem asChild>
                    <Link
                      href={`/blog/${story.slug}/edit`}
                      className="flex items-center"
                    >
                      <Pencil className="mr-2 h-4 w-4" />
                      Edit Story
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem
                    className="text-red-600"
                    onClick={handleDelete}
                  >
                    <Trash2 className="mr-2 h-4 w-4" />
                    Delete Story
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
          </div>

          <Card className="overflow-hidden border-none shadow-md">
            <CardContent className="p-0">
              <div className="relative h-[300px] md:h-[400px] w-full">
                {story?.image && (
                  <Image
                    src={`${process.env.NEXT_PUBLIC_API_URL}/uploads/storyImages/${story.image}`}
                    alt={story.title || "Story Image"}
                    fill
                    unoptimized
                    className="object-cover"
                    priority
                  />
                )}
              </div>
              <div className="p-6 space-y-6">
                {/* Engagement buttons - now at the top for better visibility */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center space-x-4">
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={handleLike}
                      className="flex items-center gap-1 text-rose-500 hover:text-rose-600"
                    >
                      <Heart className="h-5 w-5 fill-rose-500" />
                      <span className="text-sm">{likeCount}</span>
                    </Button>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="flex items-center gap-1"
                    >
                      <MessageCircle className="h-5 w-5" />
                      <span className="text-sm">{story.commentCount}</span>
                    </Button>
                    <Button variant="ghost" size="sm">
                      <Share2 className="h-5 w-5" />
                    </Button>
                  </div>
                  <Button
                    variant="ghost"
                    size="icon"
                    onClick={addStoryToReadList}
                    className={storyReadListStatus ? "text-primary" : ""}
                  >
                    {storyReadListStatus ? (
                      <BookmarkFilled className="h-5 w-5" />
                    ) : (
                      <Bookmark className="h-5 w-5" />
                    )}
                    <span className="sr-only">Save to reading list</span>
                  </Button>
                </div>

                {/* Title and metadata */}
                <div>
                  <h1 className="text-3xl font-bold mb-4">{story.title}</h1>
                  <div className="flex items-center space-x-4">
                    <Avatar className="h-10 w-10 border-2 border-background">
                      <AvatarImage
                        src={`${process.env.NEXT_PUBLIC_API_URL}/api/userPhotos/${story.author.photo}`}
                        alt={story.author.username}
                      />
                      <AvatarFallback>
                        {story.author.username[0]}
                      </AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-medium">{story.author.username}</p>
                      <div className="flex items-center text-sm text-muted-foreground">
                        <span>{formatDate(story.createdAt)}</span>
                        <span className="mx-2">•</span>
                        <Badge variant="secondary" className="font-normal">
                          {story.readtime} min read
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>

                {/* Blog content */}
                <div className="prose prose-stone dark:prose-invert max-w-none">
                  <p>{story.content}</p>
                </div>

                {/* Comments section */}
                <div className="pt-6 border-t">
                  <h3 className="font-semibold text-lg mb-4">Comments </h3>
                  <div className="space-y-4">
                    <Button onClick={() => setSidebarShowStatus(true)}>
                      Add/View Comment
                    </Button>
                    {/* Comment item */}
                    {/* <div className="flex gap-3">
                      <Avatar className="h-8 w-8">
                        <AvatarFallback>U1</AvatarFallback>
                      </Avatar>
                      <div className="flex-1">
                        <div className="bg-muted p-3 rounded-lg">
                          <p className="font-medium text-sm">User1</p>
                          <p className="text-sm">
                            Great post! I really enjoyed reading this.
                          </p>
                        </div>
                        <div className="flex items-center mt-1 text-xs text-muted-foreground">
                          <span>2h ago</span>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="h-auto p-0 px-2"
                          >
                            Reply
                          </Button>
                        </div>
                      </div>
                    </div> */}

                    {/* More comments would go here */}
                  </div>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <CommentSidebar
        slug={slug}
        isOpen={sidebarShowStatus}
        onClose={() => setSidebarShowStatus(false)}
        activeUser={activeUser}
      />
    </>
  );
}
