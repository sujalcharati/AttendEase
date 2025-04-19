// import { NEXT_AUTH_CONFIG } from "@/lib/auth"
// import NextAuth from "next-auth"



// const handler = NextAuth(NEXT_AUTH_CONFIG)

// export { handler as GET, handler as POST }



// import NextAuth, { AuthOptions } from "next-auth";
// import GoogleProvider from "next-auth/providers/google";
// import { JWT } from "next-auth/jwt";
// import { Session } from "next-auth";
// import { Account, User, Profile } from "next-auth";
// import GitHubProvider from "next-auth/providers/github"
// // Extend the built-in types
// declare module "next-auth" {
//   interface Session {
//     accessToken?: string;
//     userId?: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     accessToken?: string;
//     refreshToken?: string;
//     userId?: string;
//   }
// }

// export const authOptions: AuthOptions = {
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID!,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
//     }),
//     GitHubProvider({
//       clientId: process.env.GITHUB_ID!,
//       clientSecret: process.env.GITHUB_SECRET!
//     })
//   ],
//   debug: true,
//   callbacks: {
//     async signIn({ user, account, profile }: { user: User; account: Account | null; profile?: Profile }) {
//       console.log("Sign in callback", { user, account, profile });
//       return true;
//     },
//     async jwt({ token, account, user }: { token: JWT; account: Account | null; user?: User }) {
//       // Initial sign in
//       if (account && user) {
//         console.log("Initial sign in", { token, account, user });
//         return {
//           ...token,
//           accessToken: account.access_token,
//           refreshToken: account.refresh_token,
//           userId: user.id,
//         };
//       }
//       // Return previous token if the access token has not expired yet
//       console.log("Subsequent sign in", { token, account, user });
//       return token;
//     },
//     async session({ session, token }: { session: Session; token: JWT }) {
//       console.log("Session callback", { session, token });
//       // Send properties to the client
//       return {
//         ...session,
//         accessToken: token.accessToken,
//         userId: token.userId,
//       };
//     },
//   },
//   pages: {
//     signIn: "/",
//     error: "/",
//   },
// };

// const handler = NextAuth(authOptions);
// export { handler as GET, handler as POST };


import NextAuth, { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import { JWT } from "next-auth/jwt";
import { Session } from "next-auth";
import { Account, User, Profile } from "next-auth";
import GitHubProvider from "next-auth/providers/github"
import CredentialsProvider from "next-auth/providers/credentials";
// Extend the built-in types
declare module "next-auth" {
  interface Session {
    accessToken?: string;
    idToken?: string; // Add this line
    userId?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    accessToken?: string;
    idToken?: string; // Add this line
    refreshToken?: string;
    userId?: string;
  }
}

export  const  authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID!,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET!,
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
          scope: "openid email profile" // Make sure to include openid scope
        }
      }
    }),
    GitHubProvider({
      clientId: process.env.GITHUB_ID!,
      clientSecret: process.env.GITHUB_SECRET!
    }),

    CredentialsProvider({
      id: "custom-credentials",
      name: "Email/Password",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },
      async authorize(credentials) {
        try {
          // Call your backend API to authenticate
          const response = await fetch(`http://be.coduter.com/authenticate`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
              email: credentials?.email,
              password: credentials?.password
            })
          });
          
          const data = await response.json();
          
          if (response.ok && data) {
            // Return user object and tokens that will be passed to callbacks
            return {
              id: data.user.id,
              name: data.user.name,
              email: data.user.email,
              accessToken: data.accessToken,
              idToken: data.idToken,  // Your backend should generate this
            };
          }
          
          // If authentication fails
          return null;
        } catch (error) {
          console.error("Auth error:", error);
          return null;
        }
      }
    }),

  ],
  debug: true,
  callbacks: {
    async signIn({ user, account, profile }: { user: User; account: Account | null; profile?: Profile }) {
      console.log("Sign in callback", { user, account, profile });
      return true;
    },
    async jwt({ token, account, user }: { token: JWT; account: Account | null; user?: User }) {
      // Initial sign in
      if (account && user) {
        console.log("Initial sign in", { token, account, user });
        return {
          ...token,
          accessToken: account.access_token,
          idToken: account.id_token ? account.id_token:token.idToken, // Store the ID token
          refreshToken: account.refresh_token,
          userId: user.id,
        };
      }
      // Return previous token if the access token has not expired yet
      console.log("Subsequent sign in", { token, account, user });
      return token;
    },
    async session({ session, token }: { session: Session; token: JWT }) {
      console.log("Session callback", { session, token });
      // Send properties to the client
      return {
        ...session,
        accessToken: token.accessToken,
        idToken: token.idToken, // Make ID token available in session
        userId: token.userId,
      };
    },
  },
  pages: {
    signIn: "/",
    error: "/",
  },
};

const handler = NextAuth(authOptions);
export { handler as GET, handler as POST };
