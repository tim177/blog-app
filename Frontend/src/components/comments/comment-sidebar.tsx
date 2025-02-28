"use client";

import { useState, useEffect, useRef } from "react";
import axios from "axios";
import { Send, X } from "lucide-react";

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Sheet, SheetContent } from "@/components/ui/sheet";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { CommentRatings } from "../ui/Rating";

interface Comment {
  _id: string;
  content: string;
  user: {
    username: string;
    photo?: string;
  };
  createdAt: string;
}

interface CommentSidebarProps {
  slug: string;
  isOpen: boolean;
  onClose: () => void;
  activeUser: any;
}

export function CommentSidebar({
  slug,
  isOpen,
  onClose,
  activeUser,
}: CommentSidebarProps) {
  const [comment, setComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [comments, setComments] = useState<Comment[]>([]);
  const [commentCount, setCommentCount] = useState(0);
  const [star, setStar] = useState(0);

  const sidebarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isOpen) {
      getStoryComments();
    }
  }, [isOpen]);

  const getStoryComments = async () => {
    try {
      const { data } = await axios.get(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comment/${slug}/getAllComment`
      );
      setComments(data.data);
      setCommentCount(data.count);
    } catch (error) {
      console.error("Error fetching comments:", error);
      toast({
        title: "Error fetching comments",
        variant: "destructive",
        duration: 1000,
      });
    }
  };

  const handleComment = async () => {
    if (!comment.trim()) return;

    setLoading(true);
    try {
      const authToken = sessionStorage.getItem("authToken");
      await axios.post(
        `${process.env.NEXT_PUBLIC_API_URL}/api/comment/${slug}/addComment`,
        { content: comment, star },
        {
          headers: {
            "Content-Type": "application/json",
            authorization: `Bearer ${authToken}`,
          },
        }
      );

      setComment("");
      toast({ title: "Comment added successfully", duration: 1000 });
      getStoryComments();
    } catch (error) {
      console.error("Error adding comment:", error);
      toast({
        title: "Error adding comment",
        variant: "destructive",
        duration: 1000,
      });
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        isOpen &&
        sidebarRef.current &&
        !sidebarRef.current.contains(event.target as Node)
      ) {
        onClose();
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isOpen]);

  const handleRatingChange = (newRating: number) => {
    setStar(newRating);
  };
  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent
        ref={sidebarRef}
        side="right"
        className="w-full border-l sm:max-w-lg"
      >
        <div className="flex h-full flex-col">
          <div className="flex items-center justify-between border-b px-4 py-4">
            <h2 className="text-lg font-semibold">Comments ({commentCount})</h2>
          </div>
          <ScrollArea className="flex-1 p-4">
            {comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment._id} className="mb-4 flex items-start gap-4">
                  <Avatar>
                    {/* <AvatarImage
                      src={
                        comment.user.photo
                          ? `/userPhotos/${comment.user.photo}`
                          : "/default-avatar.png"
                      }
                      alt={comment.user.username}
                    />
                    <AvatarFallback>{comment.user.username[0]}</AvatarFallback> */}
                  </Avatar>
                  <div className="flex-1">
                    <p className="text-sm font-semibold">
                      {/* {comment.author.username} */}Author
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {comment.content}
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="text-sm text-muted-foreground">No comments yet.</p>
            )}
          </ScrollArea>
          {activeUser?.username && (
            <div className="border-t p-4">
              <div className="mb-4 flex items-start gap-4">
                <Avatar>
                  <AvatarImage
                    src={
                      activeUser.photo
                        ? `/userPhotos/${activeUser.photo}`
                        : "/default-avatar.png"
                    }
                    alt={activeUser.username}
                  />
                  <AvatarFallback>{activeUser.username[0]}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <Textarea
                    placeholder="Add a comment..."
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    className="mb-2"
                  />
                  <CommentRatings
                    rating={star}
                    onRatingChange={handleRatingChange}
                  />

                  <Button
                    onClick={handleComment}
                    className="mt-6"
                    disabled={loading || !comment.trim()}
                  >
                    <Send className="mr-2 h-4 w-4" />
                    {loading ? "Posting..." : "Comment"}
                  </Button>
                </div>
              </div>
            </div>
          )}
        </div>
      </SheetContent>
    </Sheet>
  );
}
