"use client";

import { useEffect, useState } from "react";
import PageHeader from "@/components/admin/PageHeader";
import UserForm from "@/components/admin/UserForm";

interface User {
  id: string;
  name: string;
  email: string;
  headline?: string;
}

export default function UsersPage() {
  const [users, setUsers] = useState<User[]>([]);

  async function loadUsers() {
    const res = await fetch("/api/users");
    const data = await res.json();
    setUsers(data);
  }

  useEffect(() => {
    loadUsers();
  }, []);

  return (
    <div className="space-y-8">
      <PageHeader
        title="Users"
        description="Manage portfolio users."
        buttonText="+ Add User"
      />

      <UserForm />

      <div className="rounded-xl border border-zinc-800 overflow-hidden">
        <table className="w-full">
          <thead className="bg-zinc-900">
            <tr>
              <th className="p-4 text-left">Name</th>
              <th className="p-4 text-left">Email</th>
              <th className="p-4 text-left">Headline</th>
              <th className="p-4 text-right">Actions</th>
            </tr>
          </thead>

          <tbody>
            {users.length === 0 ? (
              <tr>
                <td
                  colSpan={4}
                  className="p-4 text-zinc-500"
                >
                  No users found.
                </td>
              </tr>
            ) : (
              users.map((user) => (
                <tr
                  key={user.id}
                  className="border-t border-zinc-800"
                >
                  <td className="p-4">{user.name}</td>
                  <td className="p-4">{user.email}</td>
                  <td className="p-4">
                    {user.headline || "-"}
                  </td>
                  <td className="p-4 text-right">
                    Edit | Delete
                  </td>
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}