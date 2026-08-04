import Link from "next/link";
import { ReactNode } from "react";

export default function AdminLayout({
  children,
}: {
  children: ReactNode;
}) {
  return (
    <div className="min-h-screen flex bg-zinc-950 text-white">
      <aside className="w-72 border-r border-zinc-800 p-6">
        <h1 className="text-3xl font-bold">
          DEVAN
        </h1>

        <p className="text-sm text-zinc-500 mt-2">
          Admin Dashboard
        </p>

        <nav className="mt-10 flex flex-col gap-3">
          <Link href="/admin/users">Users</Link>

          <Link href="/admin/projects">Projects</Link>

          <Link href="/admin/experience">Experience</Link>

          <Link href="/admin/education">Education</Link>

          <Link href="/admin/skills">Skills</Link>

          <Link href="/admin/technology">Technology</Link>
        </nav>
      </aside>

      <main className="flex-1 p-10">
        {children}
      </main>
    </div>
  );
}