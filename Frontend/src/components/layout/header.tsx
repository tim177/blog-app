import Link from "next/link";
import { Button } from "@/components/ui/button";

export function Header() {
  return (
    <header className="sticky top-0 z-10 bg-white border-b">
      <div className="flex h-16 items-center justify-between px-6">
        <div className="flex-1"></div>

        <div className="flex items-center gap-3 flex-1 justify-end">
          <Button
            variant="outline"
            className="rounded-full border-emerald-500 text-emerald-500 hover:bg-emerald-50 px-6"
          >
            Sign Out
          </Button>
        </div>
      </div>
    </header>
  );
}
