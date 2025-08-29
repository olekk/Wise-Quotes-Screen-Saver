"use client";
import { redirect, useRouter } from "next/navigation";
import { useEffect } from "react";

export default function NotFound() {
  const router = useRouter();
  useEffect(() => router.push("/"), [router]);
  return (
    <h1>Oops! We didn't find this page. We'll redirect you to home page</h1>
  );
}
