import Link from "next/link";
import Image from "next/image";
import { Calendar, Clock } from "lucide-react";
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
} from "@/components/ui/card";
import { BlogPost } from "@/lib/types";
import { Badge } from "../ui/badge";
import { Avatar } from "@radix-ui/react-avatar";
import { AvatarFallback } from "../ui/avatar";

interface BlogCardProps {
  post: BlogPost;
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Link href={`/blog/${post.slug}`} className="group block">
      <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300 h-full flex flex-col">
        <div className="relative h-48 w-full overflow-hidden">
          <Image
            src={
              post.image
                ? `${process.env.NEXT_PUBLIC_API_URL}/uploads/storyImages/${post.image}`
                : "/placeholder.svg"
            }
            alt={post.title}
            width={600}
            height={400}
            unoptimized
            priority
            className="object-cover transition-transform duration-300 group-hover:scale-105"
          />
          <Badge className="absolute top-3 right-3 bg-emerald-500 hover:bg-emerald-600">
            Hot
          </Badge>
        </div>

        <CardHeader className="pb-2">
          <h3 className="text-xl font-bold text-gray-800 line-clamp-2">
            {post.title}
          </h3>
        </CardHeader>

        <CardContent className="pb-2 flex-grow">
          <p className="text-gray-600 line-clamp-3">{post.content}</p>
        </CardContent>

        <CardFooter className="pt-2 border-t flex items-center justify-between text-sm text-gray-500">
          <div className="flex items-center gap-2">
            <Avatar className="h-6 w-6">
              <AvatarFallback className="bg-emerald-100 text-emerald-800 text-xs">
                {/* {blog.category.substring(0, 2)} */} So
              </AvatarFallback>
            </Avatar>
            <div className="flex flex-col">
              <Calendar className="h-3 w-3" />
              <span>{new Date(post.createdAt).toLocaleDateString()}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Clock className="h-3 w-3" />
            <span>{post.readTime} min read</span>
          </div>
        </CardFooter>
      </Card>
    </Link>
  );
}
