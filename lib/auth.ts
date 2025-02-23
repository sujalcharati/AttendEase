import { connectDB } from '@/lib/db';

import User from '@/models/user';
import CredentialsProvider from 'next-auth/providers/credentials';
import GoogleProvider from 'next-auth/providers/google';

export const NEXT_AUTH_CONFIG = {
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID as string,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET as string
    }),
    CredentialsProvider({
      name: 'Credentials',
      credentials: {
        username: { label: 'username', type: 'text', placeholder: '' },
        password: { label: 'password', type: 'password', placeholder: '' },
        email: { label: 'email', type: 'email', placeholder: '' }
      },
      async authorize(Credentials: any) {
        if (!Credentials?.email || !Credentials?.password || !Credentials?.username) {
          return null;
        }

        await connectDB();

        try {
          const user = await User.findOne({ email: Credentials.email });
          if (!user) {
            throw new Error('No user found with this email');
          }

          // const isPasswordValid = await user.comparePassword(Credentials.password);
          // if (!isPasswordValid) {
          //   throw new Error('Invalid password');
          // }

          return {
            id: user.id.toString(),
            name: user.username,
            email: user.email
          };
        } catch (error) {
          console.error(error);
          throw new Error('Failed to authorize user');
        }
        return null;
      }
    })
  ],
  secret: process.env.NEXTAUTH_SECRET,
  callbacks: {
    jwt: async ({ user, token }: any) => {
      if (user) {
        token.uid = user.id;
      }
      return token;
    },
    session: async ({ session, token, user }: any) => {
      if (session.user) {
        session.user.id = token.uid;
      }
      return session;
    }
  },
  pages: {
    // signIn: '/signin', // Custom sign-in page (if you have one)
    // error: '/auth/error', // Error page
    // signOut: '/auth/signout', // Sign out page
    newUser: '/homepage' // Redirect here after successful login
  },
};
