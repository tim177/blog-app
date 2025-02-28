import { Header } from "@/components/layout/header";
import { Sidebar } from "@/components/layout/sidebar";
import type React from "react";

export default function CreateLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <div className="flex min-h-screen flex-col">
      <div className="flex flex-1">
        <Sidebar />
        <div className="flex-1 flex flex-col">
          <Header />
          <main className="flex-1 bg-gray-100 p-6 px-60">{children}</main>
        </div>
      </div>
    </div>
  );
}
