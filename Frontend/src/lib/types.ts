export interface Author {
  id: string;
  name: string;
  role: string;
  bio: string;
  avatar: string;
}

export interface BlogPost {
  _id: string; // Add _id from API response
  author: string; // Author ID
  commentCount: number;
  comments: string[]; // Array of comment IDs
  content: string;
  createdAt: string;
  image: string;
  likeCount: number;
  likes: string[]; // Array of user IDs who liked
  readTime: number;
  slug: string;
  title: string;
  updatedAt: string;
  __v?: number; // Optional since it's usually for MongoDB versioning
}
