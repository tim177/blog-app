"use client";

import { useEffect } from "react";
import Link from "next/link";
import { X } from "lucide-react";

import { Button } from "@/components/ui/button";
import { ScrollArea } from "@/components/ui/scroll-area";

interface MobileNavProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileNav({ isOpen, onClose }: MobileNavProps) {
  // Handle body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "unset";
    }
    return () => {
      document.body.style.overflow = "unset";
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 top-[3.5rem] z-50 grid h-[calc(100vh-4rem)] grid-flow-row auto-rows-max overflow-auto p-6 pb-32 shadow-md animate-in slide-in-from-bottom-80 md:hidden">
      <div className="relative z-20 grid gap-6 rounded-md bg-popover p-4 text-popover-foreground shadow-md">
        <div className="flex items-center justify-between">
          <h2 className="font-semibold">Navigation</h2>
          <Button
            variant="ghost"
            size="icon"
            className="-m-2 flex h-8 w-8 items-center justify-center rounded-full"
            onClick={onClose}
          >
            <X className="h-5 w-5" />
            <span className="sr-only">Close</span>
          </Button>
        </div>
        <ScrollArea className="h-[calc(100vh-8rem)]">
          <div className="grid gap-2">
            <Link
              href="/blog"
              onClick={onClose}
              className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
            >
              Mock Tests
            </Link>
            <Link
              href="/blog"
              onClick={onClose}
              className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
            >
              Contest Practice
            </Link>
            <Link
              href="/blog"
              onClick={onClose}
              className="flex w-full items-center rounded-md p-2 text-sm font-medium hover:underline"
            >
              Ask Doubts
            </Link>
          </div>
          <div className="mt-4 space-y-2">
            <Button variant="ghost" className="w-full justify-start" asChild>
              <Link href="/sign-in">Sign In</Link>
            </Button>
            <Button className="w-full justify-start" asChild>
              <Link href="/sign-up">Sign Up</Link>
            </Button>
          </div>
        </ScrollArea>
      </div>
    </div>
  );
}
