import { Toaster } from "sonner";
import type { Metadata } from "next";
import AuthProvider from "@/context/AuthContext";
import "./globals.css";

export const metadata: Metadata = {
  title: "Blog App",
  description: "A modern blog application",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <title>Blog App</title>
        <meta name="description" content="A modern blog application" />
      </head>
      <body>
        <AuthProvider>
          <Toaster />
          {children}
        </AuthProvider>
      </body>
    </html>
  );
}
