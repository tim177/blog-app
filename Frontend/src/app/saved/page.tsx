// "use client";

// import { useState } from "react";
// import {
//   Search,
//   Plus,
//   Bookmark,
//   MoreHorizontal,
//   ChevronLeft,
//   Home,
//   PenSquare,
//   User,
// } from "lucide-react";
// import Image from "next/image";
// import Link from "next/link";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
// import { Badge } from "@/components/ui/badge";
// import { Card } from "@/components/ui/card";
// import {
//   DropdownMenu,
//   DropdownMenuContent,
//   DropdownMenuItem,
//   DropdownMenuTrigger,
// } from "@/components/ui/dropdown-menu";

// export default function ReadingList() {
//   const [searchQuery, setSearchQuery] = useState("");

//   const articles = [
//     {
//       id: 1,
//       title: "MongoDB",
//       description:
//         "MongoDB adalah salah satu database NoSQL yang populer untuk mengembangkan aplikasi modern...",
//       author: "Gilbert Hutapea",
//       date: "Mar 15",
//       readTime: "1 min read",
//       image:
//         "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ssozgfIunyvAooVRFtWBVJDufOVEfD.png",
//       saved: true,
//       category: "Database",
//     },
//     {
//       id: 2,
//       title: "MERN Stack",
//       description:
//         "MERN Stack adalah singkatan dari MongoDB, Express.js, React, dan Node.js yang menjadi...",
//       author: "Gilbert Hutapea",
//       date: "Mar 20",
//       readTime: "1 min read",
//       image: "/placeholder.svg?height=200&width=200",
//       saved: false,
//       category: "Web Development",
//     },
//     {
//       id: 3,
//       title: "JavaScript",
//       description:
//         "JavaScript merupakan bahasa pemrograman yang sering digunakan untuk membangun aplikasi...",
//       author: "Gilbert Hutapea",
//       date: "Mar 18",
//       readTime: "1 min read",
//       image: "/placeholder.svg?height=200&width=200",
//       saved: true,
//       category: "Programming",
//     },
//     {
//       id: 4,
//       title: "React Hooks",
//       description:
//         "React Hooks memungkinkan Anda menggunakan state dan fitur React lainnya tanpa menulis kelas...",
//       author: "Gilbert Hutapea",
//       date: "Mar 22",
//       readTime: "2 min read",
//       image: "/placeholder.svg?height=200&width=200",
//       saved: false,
//       category: "Frontend",
//     },
//   ];

//   return (
//     <div className="flex min-h-screen bg-gray-50">
//       {/* Sidebar */}
//       <aside
//         className="fixed inset-y-0 left-0 w-64 bg-emerald-500 text-white shadow-lg z-10 transition-transform duration-300 ease-in-out transform lg:translate-x-0 -translate-x-full"
//         id="sidebar"
//       >
//         <div className="p-6 flex items-center space-x-2">
//           <div className="w-8 h-8 bg-white rounded-full flex items-center justify-center">
//             <span className="text-emerald-500 font-bold text-lg">M</span>
//           </div>
//           <span className="text-xl font-bold">MERN BLOG</span>
//         </div>

//         <nav className="mt-8 px-4">
//           <NavItem icon={<Home size={20} />} label="All Blogs" active />
//           <NavItem icon={<PenSquare size={20} />} label="Create Blog" />
//           <NavItem icon={<User size={20} />} label="Profile" />
//         </nav>
//       </aside>

//       {/* Main Content */}
//       <main className="flex-1 ml-0 lg:ml-64 transition-all duration-300 ease-in-out">
//         {/* Header */}
//         <header className="bg-white h-16 flex items-center justify-between px-6 shadow-sm sticky top-0 z-10">
//           <button
//             className="p-2 rounded-full hover:bg-gray-100 transition-colors lg:hidden"
//             onClick={() =>
//               document
//                 .getElementById("sidebar")
//                 .classList.toggle("-translate-x-full")
//             }
//           >
//             <ChevronLeft size={20} />
//           </button>
//           <div className="flex items-center space-x-4 ml-auto">
//             <div className="relative hidden md:block w-64">
//               <Search className="absolute left-2 top-2.5 h-4 w-4 text-gray-400" />
//               <Input
//                 placeholder="Search..."
//                 className="pl-8 bg-gray-50 border-gray-200"
//                 value={searchQuery}
//                 onChange={(e) => setSearchQuery(e.target.value)}
//               />
//             </div>
//             <Button
//               variant="outline"
//               className="flex items-center gap-1 text-emerald-600 border-emerald-600 hover:bg-emerald-50"
//             >
//               <Plus size={16} />
//               <span>Add Story</span>
//             </Button>
//             <Button variant="ghost" className="relative p-2">
//               <Bookmark size={20} />
//               <span className="absolute top-0 right-0 h-5 w-5 bg-emerald-600 text-white text-xs rounded-full flex items-center justify-center">
//                 3
//               </span>
//             </Button>
//             <Avatar>
//               <AvatarImage
//                 src="/placeholder.svg?height=40&width=40"
//                 alt="User"
//               />
//               <AvatarFallback className="bg-emerald-100 text-emerald-600">
//                 GH
//               </AvatarFallback>
//             </Avatar>
//           </div>
//         </header>

//         {/* Content */}
//         <div className="p-8">
//           <div className="max-w-3xl mx-auto">
//             {/* Back Button and Title */}
//             <div className="mb-8">
//               <Link
//                 href="#"
//                 className="inline-flex items-center text-gray-500 hover:text-gray-700 mb-4"
//               >
//                 <ChevronLeft size={16} className="mr-1" />
//                 Back
//               </Link>
//               <h2 className="text-3xl font-bold text-gray-800">Reading List</h2>
//             </div>

//             {/* Author Info */}
//             <div className="flex items-center justify-between mb-8 p-4 bg-white rounded-lg shadow-sm border">
//               <div className="flex items-center space-x-3">
//                 <Avatar className="h-12 w-12">
//                   <AvatarImage
//                     src="/placeholder.svg?height=48&width=48"
//                     alt="Gilbert Hutapea"
//                   />
//                   <AvatarFallback className="bg-emerald-100 text-emerald-600 text-lg">
//                     GH
//                   </AvatarFallback>
//                 </Avatar>
//                 <div>
//                   <h3 className="font-semibold text-gray-800">
//                     Gilbert Hutapea
//                   </h3>
//                   <p className="text-sm text-gray-500">Mar 20 · 4 stories</p>
//                 </div>
//               </div>
//               <Button variant="ghost" size="icon">
//                 <MoreHorizontal size={20} />
//               </Button>
//             </div>

//             {/* Articles */}
//             <div className="space-y-6">
//               {articles.map((article) => (
//                 <ArticleCard key={article.id} article={article} />
//               ))}
//             </div>
//           </div>
//         </div>
//       </main>
//     </div>
//   );
// }

// function NavItem({ icon, label, active = false }) {
//   return (
//     <Link
//       href="#"
//       className={`flex items-center space-x-3 px-4 py-3 rounded-lg mb-2 transition-colors ${
//         active
//           ? "bg-emerald-600 text-white"
//           : "text-white/90 hover:bg-emerald-600/50"
//       }`}
//     >
//       {icon}
//       <span className="font-medium">{label}</span>
//     </Link>
//   );
// }

// function ArticleCard({ article }) {
//   return (
//     <Card className="overflow-hidden hover:shadow-md transition-shadow">
//       <div className="flex flex-col md:flex-row">
//         <div className="flex-1 p-5">
//           <div className="flex items-center space-x-2 mb-2">
//             <Link
//               href="#"
//               className="text-sm text-gray-500 hover:text-gray-700"
//             >
//               {article.author}
//             </Link>
//             <span className="text-gray-300">·</span>
//             <span className="text-sm text-gray-500">{article.date}</span>
//             <Badge
//               variant="outline"
//               className="ml-1 text-xs bg-emerald-50 text-emerald-600 border-emerald-200"
//             >
//               {article.category}
//             </Badge>
//           </div>

//           <Link href="#" className="block group">
//             <h3 className="text-xl font-bold text-gray-800 group-hover:text-emerald-600 transition-colors mb-2">
//               {article.title}
//             </h3>
//             <p className="text-gray-600 mb-4 line-clamp-2">
//               {article.description}
//             </p>
//           </Link>

//           <div className="flex items-center justify-between">
//             <Link
//               href="#"
//               className="text-sm text-emerald-600 hover:text-emerald-800 font-medium"
//             >
//               Read More: {article.readTime}
//             </Link>

//             <div className="flex items-center space-x-2">
//               <Button
//                 variant="ghost"
//                 size="icon"
//                 className={article.saved ? "text-emerald-600" : "text-gray-400"}
//               >
//                 <Bookmark
//                   size={18}
//                   className={article.saved ? "fill-emerald-600" : ""}
//                 />
//               </Button>

//               <DropdownMenu>
//                 <DropdownMenuTrigger asChild>
//                   <Button variant="ghost" size="icon">
//                     <MoreHorizontal size={18} />
//                   </Button>
//                 </DropdownMenuTrigger>
//                 <DropdownMenuContent align="end">
//                   <DropdownMenuItem>Share</DropdownMenuItem>
//                   <DropdownMenuItem>Copy link</DropdownMenuItem>
//                   <DropdownMenuItem>Hide</DropdownMenuItem>
//                 </DropdownMenuContent>
//               </DropdownMenu>
//             </div>
//           </div>
//         </div>

//         <div className="md:w-48 h-auto">
//           <div className="relative h-48 md:h-full w-full">
//             <Image
//               src={article.image || "/placeholder.svg"}
//               alt={article.title}
//               fill
//               className="object-cover"
//             />
//           </div>
//         </div>
//       </div>
//     </Card>
//   );
// }
