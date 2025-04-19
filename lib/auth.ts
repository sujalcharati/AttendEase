

// import clientPromise  from '@/lib/db';
// import Users from '@/models/user';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
// import { Account, User, Profile } from "next-auth";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import { connectDB } from './connectDB';



// export const NEXT_AUTH_CONFIG = {
//   adapter: MongoDBAdapter(clientPromise),
//   providers: [
//     GoogleProvider({
//       clientId: process.env.GOOGLE_CLIENT_ID as string,
//       clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//     }),
//     CredentialsProvider({
//       name: 'Credentials',
//       credentials: {
//         username: { label: 'Username', type: 'text', placeholder: '' },
//         password: { label: 'Password', type: 'password', placeholder: '' },
//         email: { label: 'Email', type: 'email', placeholder: '' },
//       },
//       async authorize(credentials: any) {
//         if (!credentials?.email || !credentials?.password || !credentials?.username) {
//           return null;
//         }

//         await connectDB();

//         try {
//           const user = await Users.findOne({ email: credentials.email });
//           if (!user) {
//             throw new Error('No user found with this email');
//           }

//           // You can perform additional password validation here if necessary (e.g., bcrypt comparison)

//           return {
//             id: user.id.toString(),
//             name: user.username,
//             email: user.email,
//           };
//         } catch (error) {
//           console.error(error);
//           throw new Error(error instanceof Error ? error.message : 'Failed to authorize user');
//         }
//       },
//     }),
//   ],
//   secret: process.env.NEXTAUTH_SECRET,
//   callbacks: {

//     // async signIn({ user }:any) {
//     //   await connectDB();
    
//       // const dbUser = await Users.findOne({ email: user.email });
    
//       // if (!dbUser) {
//       //   const newUser = await Users.create({
//       //     name: user.name,
//       //     email: user.email,
//       //     image: user.image,
//       //   });
//       //   user.id = newUser._id; // ✅ store MongoDB ID
//       // } else {
//       //   user.id = dbUser._id; // ✅ store MongoDB ID
//       // }
    
//       // return true;
//       async signIn({ user, account, profile }: { user: User; account: Account | null; profile?: Profile }) {
//         console.log("Sign in callback", { user, account, profile });
//         return true;
//     },
//     jwt: async ({ user, token }: any) => {
//       if (user) {
//         token.sub = user.id.toString();  // Using "sub" instead of "uid" for NextAuth.js conventions
//       }
//       return token;
//     },
//     session: async ({ session, token }: any) => {
//       await connectDB();

//       if (session.user) {
//         console.log(session)
//         session.user.id = token.sub;  // Using "sub" here too
//       }
//       return session;
//     },
//   },
//   pages: {
//     newUser: '/homepage',  // Redirect after successful login
//   },
// };







// import Users from '@/models/user';
// import CredentialsProvider from 'next-auth/providers/credentials';
// import GoogleProvider from 'next-auth/providers/google';
// import { Account, User, Profile } from "next-auth";
// import { MongoDBAdapter } from "@next-auth/mongodb-adapter";
// import clientPromise from "./db";
// import { JWT } from "next-auth/jwt";
// import { Session } from 'next-auth';

// // import { connectDB } from '@/lib/connectDB';
// // import Providers from "@/app/components/Providers";

// declare module "next-auth" {
//   interface Session {
//     accessToken?: string;
//     idToken?: string; // Add this line
//     userId?: string;
//   }
// }

// declare module "next-auth/jwt" {
//   interface JWT {
//     accessToken?: string;
//     idToken?: string; // Add this line
//     refreshToken?: string;
//     userId?: string;
//   }
// }


// export const NEXT_AUTH_CONFIG ={
//   adapter: MongoDBAdapter(clientPromise),
//   Providers:[
//     GoogleProvider({
//             clientId: process.env.GOOGLE_CLIENT_ID as string,
//             clientSecret: process.env.GOOGLE_CLIENT_SECRET as string,
//           }),
//        ],
//        debug: true,
//        callbacks: {
//          async signIn({ user, account, profile }: { user: User; account: Account | null; profile?: Profile }) {
//            console.log("Sign in callback", { user, account, profile });
//            return true;
//          },
//          async jwt({ token, account, user }: { token: JWT; account: Account | null; user?: User }) {
//            // Initial sign in
//            if (account && user) {
//              console.log("Initial sign in", { token, account, user });
//              return {
//                ...token,
//                accessToken: account.access_token,
//                idToken: account.id_token ? account.id_token:token.idToken, // Store the ID token
//                refreshToken: account.refresh_token,
//                userId: user.id,
//              };
//            }
//            // Return previous token if the access token has not expired yet
//            console.log("Subsequent sign in", { token, account, user });
//            return token;
//          },
//          async session({ session, token }: { session: Session; token: JWT }) {
//            console.log("Session callback", { session, token });
//            // Send properties to the client
//            return {
//              ...session,
//              accessToken: token.accessToken,
//              idToken: token.idToken, // Make ID token available in session
//              userId: token.userId,
//            };
//          },
//        },
//        pages: {
//          signIn: "/",
//          error: "/",
//        },

// }