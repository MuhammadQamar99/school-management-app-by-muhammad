import { SignIn } from "@clerk/nextjs";
import { GraduationCap, Lock } from "lucide-react";

export default function SignInPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 flex flex-col items-center justify-center p-4">
      {/* INSTITUTION HEADER */}
      <div className="text-center mb-6 flex flex-col items-center">
        <div className="w-14 h-14 rounded-2xl bg-purple-600 text-white flex items-center justify-center shadow-lg mb-3">
          <GraduationCap className="w-8 h-8" />
        </div>
        <h1 className="text-2xl font-extrabold text-white tracking-tight">
          SchooLama Portal Login
        </h1>
        <p className="text-xs text-slate-300 mt-1 max-w-sm leading-relaxed">
          Authorized Academic Portal. Please sign in with your school-issued credentials.
        </p>
      </div>

      {/* CLERK LOGIN ONLY (Sign up link permanently hidden) */}
      <div className="shadow-2xl rounded-2xl overflow-hidden border border-white/10">
        <SignIn
          appearance={{
            elements: {
              footerAction: "hidden", // Public Sign Up link ko mukammal remove kar diya hai
              card: "bg-white shadow-none",
            },
          }}
          afterSignInUrl="/"
          redirectUrl="/"
        />
      </div>

      {/* SECURITY NOTICE */}
      <div className="mt-6 flex items-center gap-2 text-[11px] text-slate-400">
        <Lock className="w-3.5 h-3.5 text-emerald-400" />
        <span>Accounts are provisioned by School Administration only.</span>
      </div>
    </div>
  );
}