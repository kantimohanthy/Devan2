"use client";

import { useState } from "react";
export default function UserForm() {
  const [form, setForm] = useState({
    name: "",
    email: "",
    headline: "",
    bio: "",
    location: "",
    website: "",
    avatar: "",
  });

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();

    const response = await fetch("/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(form),
    });

    if (!response.ok) {
      alert("Failed to create user.");
      return;
    }

    alert("User created successfully!");

    setForm({
      name: "",
      email: "",
      headline: "",
      bio: "",
      location: "",
      website: "",
      avatar: "",
    });

    window.location.href = "/admin/users";
  }

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-4 rounded-xl border border-zinc-800 p-6"
    >
      <input
        className="w-full rounded-lg bg-zinc-900 p-3"
        placeholder="Name"
        value={form.name}
        onChange={(e) =>
          setForm({ ...form, name: e.target.value })
        }
      />

      <input
        className="w-full rounded-lg bg-zinc-900 p-3"
        placeholder="Email"
        value={form.email}
        onChange={(e) =>
          setForm({ ...form, email: e.target.value })
        }
      />

      <input
        className="w-full rounded-lg bg-zinc-900 p-3"
        placeholder="Headline"
        value={form.headline}
        onChange={(e) =>
          setForm({ ...form, headline: e.target.value })
        }
      />

      <input
        className="w-full rounded-lg bg-zinc-900 p-3"
        placeholder="Location"
        value={form.location}
        onChange={(e) =>
          setForm({ ...form, location: e.target.value })
        }
      />

      <input
        className="w-full rounded-lg bg-zinc-900 p-3"
        placeholder="Website"
        value={form.website}
        onChange={(e) =>
          setForm({ ...form, website: e.target.value })
        }
      />

      <input
        className="w-full rounded-lg bg-zinc-900 p-3"
        placeholder="Avatar URL"
        value={form.avatar}
        onChange={(e) =>
          setForm({ ...form, avatar: e.target.value })
        }
      />

      <textarea
        className="w-full rounded-lg bg-zinc-900 p-3"
        rows={5}
        placeholder="Bio"
        value={form.bio}
        onChange={(e) =>
          setForm({ ...form, bio: e.target.value })
        }
      />

      <button
        className="rounded-lg bg-blue-600 px-5 py-3 hover:bg-blue-700"
      >
        Save User
      </button>
    </form>
  );
}