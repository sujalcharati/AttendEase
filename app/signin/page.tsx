import React from 'react'
import Signin from '../components/Signin'
import { NEXT_AUTH_CONFIG } from '@/lib/auth';
import { getServerSession } from 'next-auth';
import { redirect } from 'next/navigation';

const signIn = async () => {

  const session =await getServerSession(NEXT_AUTH_CONFIG);
  if(session?.user){
    redirect('/homepage')
  }
  return (
    <div>

      <Signin/>
      
    </div>
  )
}

export default signIn 
