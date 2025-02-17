import User from '@/models/user';
import CredentialsProvider from 'next-auth/providers/credentials';
import { connectDB } from '@/lib/db';
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
      email :{ label:'email', type: 'email', placeholder: '' }
      },
      async authorize(Credentials: any) {
      await connectDB();

      try {
        const user = await User.create({
        data: {
          username: Credentials.username,
          password: Credentials.password,
          email: Credentials.email
        }
        });
        return {
        id: user.id.toString(),
        name: user.username,
        email: user.email
        };
      } catch (error) {
        console.error(error);
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
    session: ({ session, token, user }: any) => {
      if (session.user) {
        session.user.id = token.uid;
      }
      return session;
    }
  },
};

// function GoogleProvider(arg0: { clientId: string | undefined; clientSecret: string | undefined; }) {
//   throw new Error('Function not implemented.');
// }
