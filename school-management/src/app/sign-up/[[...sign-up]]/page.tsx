import { SignUp } from "@clerk/nextjs";

export default function SignUpPage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-950 via-slate-900 to-purple-950 p-4">
      {/* afterSignUpUrl set kar diya hai taake account banate hi user Onboarding role page par jaye */}
      <SignUp afterSignUpUrl="/onboarding" redirectUrl="/onboarding" />
      <p className="text-slate-400 text-xs mt-4">
        Sign up to create your account and select your school role.
      </p>
    </div>
  );
}