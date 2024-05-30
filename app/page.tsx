"use client";

import Link from "next/link";

export default function Home() {
  return (
    <main className="flex min-h-screen items-center justify-center p-24">
      <Link href="/register" className="btn">
        Register
      </Link>
    </main>
  );
}
