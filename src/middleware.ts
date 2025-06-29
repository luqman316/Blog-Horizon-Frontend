// import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

// export default authkitMiddleware();

// // Match against pages that require authentication
// // Leave this out if you want authentication on every page in your application
// export const config = { matcher: ["/"] };

import { authkitMiddleware } from "@workos-inc/authkit-nextjs";

export default authkitMiddleware({
  redirectUri: process.env.AUTHKIT_REDIRECT_URI,
});
export const config = {
  matcher: ["/((?!_next|api|static|favicon.ico).*)","/", "/new-blogs", "/edit-blogs", "/edit-blogs/:id*"],
};
