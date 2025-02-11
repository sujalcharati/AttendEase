"use client"
import React, { useEffect } from 'react';
import Signin from '../components/Signin';
import { NEXT_AUTH_CONFIG } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { useRouter } from 'next/router';

const SignInPage = () => {
  const router = useRouter();

  useEffect(() => {
    const checkSession = async () => {
      const session = await getServerSession(NEXT_AUTH_CONFIG);
      if (session?.user) {
        router.push('/homepage');
      }
    };

    checkSession();
  }, [router]);

  return (
    <div>
      <Signin />
    </div>
  );
};

export default SignInPage;
