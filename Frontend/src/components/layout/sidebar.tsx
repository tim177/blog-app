"use client";

import type React from "react";
import Link from "next/link";
import { usePathname } from "next/navigation"; // Import to get current route
import { Home, BookOpen, HelpCircle, ChevronLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

interface SidebarItemProps {
  icon: React.ElementType;
  label: string;
  href: string;
}

function SidebarItem({ icon: Icon, label, href }: SidebarItemProps) {
  const pathname = usePathname(); // Get current path
  const isActive = pathname === href; // Check if it's active

  return (
    <Link
      href={href}
      className={cn(
        "flex items-center gap-3 px-4 py-3 text-white/80 hover:text-white transition-colors",
        isActive && "bg-emerald-600/30 text-white"
      )}
    >
      <Icon className="h-5 w-5" />
      <span className="text-base font-medium">{label}</span>
    </Link>
  );
}

export function Sidebar() {
  return (
    <aside className="w-64 bg-emerald-500 flex flex-col">
      <div className="flex items-center justify-between p-4">
        <Link href="/" className="flex items-center gap-2">
          <div className="relative w-32 h-10">
            <Image
              src="/placeholder.svg?height=40&width=120"
              alt="Logo"
              fill
              className="object-contain"
            />
          </div>
        </Link>
        <Button
          variant="ghost"
          size="icon"
          className="text-white/80 hover:text-white hover:bg-emerald-600/30"
        >
          <ChevronLeft className="h-5 w-5" />
        </Button>
      </div>
      <div className="mt-6 flex flex-col">
        <SidebarItem icon={Home} label="All Blogs" href="/blog" />
        <SidebarItem icon={BookOpen} label="Create Blog" href="/create" />
        <SidebarItem icon={HelpCircle} label="Profile" href="/profile" />
      </div>
    </aside>
  );
}
