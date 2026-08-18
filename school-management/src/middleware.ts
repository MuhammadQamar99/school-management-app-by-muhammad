import { clerkMiddleware, createRouteMatcher } from "@clerk/nextjs/server";

// Public routes: Root (/), Onboarding, Pending-approval, Sign-in, Sign-up
const isPublicRoute = createRouteMatcher([
  "/",
  "/onboarding(.*)",
  "/pending-approval(.*)",
  "/sign-in(.*)",
  "/sign-up(.*)",
]);

export default clerkMiddleware((auth, req) => {
  if (isPublicRoute(req)) return;

  const { userId } = auth();

  // Agar user dashboards kholne ki koshish kare bina login k, tab sign-in par bheje
  if (!userId) {
    return auth().redirectToSignIn({ returnBackUrl: req.url });
  }
});

export const config = {
  matcher: [
    "/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)",
    "/(api|trpc)(.*)",
  ],
};