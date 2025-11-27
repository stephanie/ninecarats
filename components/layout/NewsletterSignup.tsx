"use client";

import { useState } from "react";

export default function NewsletterSignup() {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<
    "idle" | "loading" | "success" | "error"
  >("idle");
  const [message, setMessage] = useState("");

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      setStatus("error");
      setMessage("Please enter a valid email address");
      return;
    }

    setStatus("loading");
    setMessage("");

    try {
      const response = await fetch("/api/newsletter", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email }),
      });

      const data = await response.json();

      if (response.ok) {
        setStatus("success");
        setMessage("Thank you for subscribing!");
        setEmail("");
      } else {
        setStatus("error");
        setMessage(data.error || "Something went wrong. Please try again.");
      }
    } catch (error) {
      setStatus("error");
      setMessage("Something went wrong. Please try again.");
    }
  };

  return (
    <div className="max-w-3xl mx-auto flex flex-col items-center mb-12 md:mb-32 px-4">
      <p className="text-center text-md md:text-lg mb-8 max-w-[20rem] md:max-w-[25rem] font-header">
        Subscribe for insider access to discover our new collections, exclusive
        events and more.
      </p>
      <form
        onSubmit={handleSubmit}
        className="w-full flex flex-row items-center justify-center gap-2"
      >
        <div className="border-b border-white w-[15rem] md:w-[20rem] px-2.5 py-2.5 text-center">
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "loading"}
            className="borderless-input bg-transparent w-full text-center transition text-sm text-white placeholder:text-neutral-400"
            required
          />
        </div>
        <button
          type="submit"
          disabled={status === "loading"}
          className="mt-2 px-2 py-2 border-b border-white hover:border-neutral-200 text-white text-sm tracking-wide transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {status === "loading" ? "Subscribing..." : "Subscribe"}
        </button>
      </form>
      {message && (
        <div
          className={`text-sm mt-4 ${
            status === "success" ? "text-green-300" : "text-red-300"
          }`}
        >
          {message}
        </div>
      )}
    </div>
  );
}
