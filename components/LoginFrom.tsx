"use client";
import { login } from "@/app/actions";
import { useRouter } from "next/navigation";
import React, { useState } from "react";

export default function LoginForm() {
  const router = useRouter();
  const [error, setError] = useState("");

  async function handleSubmit(e: React.ChangeEvent<HTMLFormElement>) {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    try {
      const reseponse = await login(formData);
      if (!!reseponse.error) {
        console.error(reseponse.error);
        setError(reseponse.error.message);
      } else {
        router.push("/booking");
      }
    } catch (err) {
      console.error(err);
      setError("check your credentials");
    }
  }
  return (
    <>
      <p>{error}</p>
      <form
        onSubmit={handleSubmit}
        className="max-w-sm mx-auto mt-10 p-6 bg-white rounded shadow-md space-y-4"
      >
        <div>
          <label
            htmlFor="email"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Email Address
          </label>
          <input
            type="email"
            name="email"
            id="email"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <div>
          <label
            htmlFor="password"
            className="block text-sm font-medium text-gray-700 mb-1"
          >
            Password
          </label>
          <input
            type="password"
            name="password"
            id="password"
            className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-2 px-4 rounded hover:bg-blue-700 transition"
        >
          Login
        </button>
      </form>
    </>
  );
}
