// import NextAuth, { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { JWT } from "next-auth/jwt";
// import { Session } from "next-auth";
// import { Account, User, Profile } from "next-auth";
// import GitHubProvider from "next-auth/providers/github"
// import CredentialsProvider from "next-auth/providers/credentials";
// import { NextRequest } from "next/server";

// // Extend the built-in types
// declare module "next-auth" {
//   interface Session {
//     accessToken?: string;
//     idToken?: string;
//     userId?: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     accessToken?: string;
//     idToken?: string;
//     refreshToken?: string;
//     userId?: string;
//   }
// }

// export const authOptions: AuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//           scope: "openid email profile"
//         }
//       }
//     }),
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!
//     }),
//     CredentialsProvider({
//       id: "custom-credentials",
//       name: "Email/Password",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" }
//       },
//       async authorize() {
//         try {
//           return null;
//         } catch (error) {
//           console.error("Auth error:", error);
//           return null;
//         }
//       }
//     }),
//   ],
//   debug: true,
//   callbacks: {
//     async signIn({ user, account, profile }: { user: User; account: Account | null; profile?: Profile }) {
//       console.log("Sign in callback", { user, account, profile });
//       return true;
//     },
//     async jwt({ token, account, user }: { token: JWT; account: Account | null; user?: User }) {
//       if (account && user) {
//         console.log("Initial sign in", { token, account, user });
//         return {
//           ...token,
//           accessToken: account.access_token,
//           idToken: account.id_token ? account.id_token : token.idToken,
//           refreshToken: account.refresh_token,
//           userId: user.id,
//         };
//       }
//       console.log("Subsequent sign in", { token, account, user });
//       return token;
//     },
//     async session({ session, token }: { session: Session; token: JWT }) {
//       console.log("Session callback", { session, token });
//       return {
//         ...session,
//         accessToken: token.accessToken,
//         idToken: token.idToken,
//         userId: token.userId,
//       };
//     },
//   },
//   pages: {
//     signIn: "/",
//     error: "/",
//   },
// };

// // Create the route handlers
// const handler = NextAuth(authOptions);

// // Export the route handlers with proper Next.js 13+ types
// export async function GET(request: NextRequest) {
//   return handler(request);
// }

// export async function POST(request: NextRequest) {
//   return handler(request);
// }


// import NextAuth from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import GitHubProvider from "next-auth/providers/github";
// import CredentialsProvider from "next-auth/providers/credentials";

// const handler = NextAuth({
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//       authorization: {
//         params: {
//           prompt: "consent",
//           access_type: "offline",
//           response_type: "code",
//           scope: "openid email profile"
//         }
//       }
//     }),
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!,
//     }),
//     CredentialsProvider({
//       id: "custom-credentials",
//       name: "Email/Password",
//       credentials: {
//         email: { label: "Email", type: "email" },
//         password: { label: "Password", type: "password" },
//       },
//       async authorize() {
//         return null; // your custom logic here
//       },
//     }),
//   ],
//   debug: true,
//   pages: {
//     signIn: "/",
//     error: "/",
//   },
//   callbacks: {
//     async signIn({ user, account, profile }) {
//       return true;
//     },
//     async jwt({ token, account, user }) {
//       if (account && user) {
//         token.accessToken = account.access_token;
//         token.idToken = account.id_token;
//         token.refreshToken = account.refresh_token;
//         token.userId = user.id;
//       }
//       return token;
//     },
//     async session({ session, token }) {
//       return {
//         ...session,
//         accessToken: token.accessToken,
//         idToken: token.idToken,
//         userId: token.userId
//       };
//     },
//   },
// });

// export { handler as GET, handler as POST };


// app/api/auth/[...nextauth]/route.ts


import NextAuth from "next-auth";
import { authOptions } from "@/lib/authOptions";

const handler = NextAuth(authOptions);

export { handler as GET, handler as POST };
