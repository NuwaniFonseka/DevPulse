"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function UpgradeButton() {
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  async function handleUpgrade() {
    setLoading(true);
    const res = await fetch("/api/stripe/checkout", { method: "POST" });
    const data = await res.json();

    if (data.url) {
      router.push(data.url); // redirect to Stripe's hosted checkout page
    } else {
      setLoading(false);
    }
  }

  return (
    <button
      onClick={handleUpgrade}
      disabled={loading}
      className="px-5 py-2.5 rounded-xl bg-indigo-600 text-white text-sm font-semibold hover:bg-indigo-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors"
    >
      {loading ? "Loading…" : "Upgrade to Pro — $9/mo"}
    </button>
  );
}
