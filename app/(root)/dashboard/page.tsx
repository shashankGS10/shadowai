"use client";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function DashboardPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [showUnverifiedCard, setShowUnverifiedCard] = useState(false);

  useEffect(() => {
    if (status === "authenticated") {
      const isVerified = session?.user?.emailVerified;

      if (!isVerified) {
        setShowUnverifiedCard(true); // Show fallback card instead
      }
    }
  }, [session, status]);

  if (status === "loading") return <div>Loading...</div>;

  if (showUnverifiedCard) {
    return (
      <div className="p-8 max-w-xl mx-auto bg-yellow-100 border border-yellow-300 rounded-lg text-center">
        <h2 className="text-xl font-semibold text-yellow-800">Email Not Verified</h2>
        <p className="text-yellow-700 mt-2">
          Your Google account email is not verified. Please verify your email with Google to access the dashboard.
        </p>
      </div>
    );
  }

  return (
    <div>
      <h1>Welcome to your dashboard</h1>
      {/* your real dashboard content here */}
    </div>
  );
}
