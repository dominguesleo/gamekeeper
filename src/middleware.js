import { clerkMiddleware } from "@clerk/nextjs/server";

export default clerkMiddleware({
    protectedRoutes: ['/my-library'],
});

export const config = {
    matcher: ["/((?!.+.[w]+$|_next).*)", "/", "/(api|trpc)(.*)"],
};