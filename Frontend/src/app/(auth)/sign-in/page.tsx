"use client";
import { useEffect, useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { AuthContext } from "@/context/AuthContext";
import { SignInForm } from "@/components/auth/sign-in-form";

export default function SignInPage() {
  const authContext = useContext(AuthContext);
  const router = useRouter();

  useEffect(() => {
    if (authContext?.activeUser) {
      router.push("/blog");
    }
  }, [authContext?.activeUser, router]);

  return (
    <div className="container flex h-screen w-screen flex-col items-center justify-center">
      <div className="mx-auto flex w-full flex-col justify-center space-y-6 sm:w-[350px]">
        <div className="flex flex-col space-y-2 text-center">
          <h1 className="text-2xl font-semibold tracking-tight">
            Welcome back
          </h1>
          <p className="text-sm text-muted-foreground">
            Enter your credentials to sign in to your account
          </p>
        </div>
        <SignInForm />
        <p className="px-8 text-center text-sm text-muted-foreground">
          <Link
            href="/sign-up"
            className="hover:text-brand underline underline-offset-4"
          >
            Don&apos;t have an account? Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
}
