import { SignIn } from "@clerk/nextjs";
import Link from "next/link";

export default function SignInPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-4">
      <SignIn afterSignInUrl="/" redirectUrl="/" />
      <div className="mt-4 flex items-center gap-2 text-xs text-slate-400">
        <span>Need to submit a role request?</span>
        <Link href="/onboarding" className="text-purple-400 hover:text-purple-300 font-semibold underline">
          Go to Role Onboarding →
        </Link>
      </div>
    </div>
  );
}