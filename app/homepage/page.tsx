import React from 'react'
import { Homepage } from '../components/Homepage'
import { getServerSession } from 'next-auth'
import { authOptions } from '@/lib/authOptions'
import { redirect } from 'next/navigation'

const homepage = async() => {
  const session = await getServerSession(authOptions);

  if (!session) {
    redirect('/');
  }

  return (
    <div>
      <Homepage />
    </div>
  )
}

export default homepage