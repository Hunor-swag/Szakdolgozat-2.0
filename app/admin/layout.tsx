"use client";

import { useSession } from "next-auth/react";
import Link from "next/link";
import Header from "../../components/Header";

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const { data: session } = useSession();

  return (
    <div>
      <Header />
      {session?.user?.role === "admin" ||
      session?.user?.role === "main_admin" ? (
        <div className="flex justify-center p-5">{children}</div>
      ) : (
        <div className="flex justify-center p-5 items-center flex-col">
          <h1 className="text-3xl">
            You don't have permission to the admin interface
          </h1>
          <Link href="../user">
            <button className="btn">User interface</button>
          </Link>
        </div>
      )}
    </div>
  );
}
