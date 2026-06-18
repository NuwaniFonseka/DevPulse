import { auth } from "@/auth";
import { redirect } from "next/navigation";
import { prisma } from "@/lib/prisma";
import UpgradeButton from "./UpgradeButton";

export default async function DashboardPage() {
  const session = await auth();
  if (!session) redirect("/login");

  const user = await prisma.user.findUnique({
    where: { id: session.user.id },
    select: { email: true, subscriptionStatus: true },
  });

  const isPro = user?.subscriptionStatus === "active";

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-2xl mx-auto space-y-6">
        <div>
          <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
          <p className="text-gray-500 mt-1">
            Signed in as <span className="font-medium text-gray-700">{user?.email}</span>
          </p>
        </div>

        {/* Subscription status card */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <div className="flex items-center justify-between">
            <div>
              <p className="text-sm text-gray-500">Current plan</p>
              <p className="text-lg font-semibold text-gray-900 mt-1">
                {isPro ? "Pro" : "Starter (free)"}
              </p>
              {isPro && (
                <span className="inline-flex items-center mt-2 text-xs font-semibold text-green-700 bg-green-50 px-2 py-1 rounded-full">
                  Active
                </span>
              )}
            </div>
            {!isPro && <UpgradeButton />}
          </div>
        </div>

        {/* Digest section */}
        <div className="bg-white rounded-2xl border border-gray-200 p-6">
          <h2 className="font-semibold text-gray-900 mb-3">Your digests</h2>
          <p className="text-gray-500 text-sm">
            {isPro
              ? "Your daily AI digest will appear here once set up."
              : "Upgrade to Pro to get daily AI-generated digests."}
          </p>
        </div>
      </div>
    </div>
  );
}
