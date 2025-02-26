import React from 'react'
import { Homepage } from '../components/Homepage'
import { getServerSession } from 'next-auth'
// import { redirect } from 'next/dist/server/api-utils';

const homepage = async() => {

  const session = await getServerSession();

  if (!session) {
    // redirect('/signin', 302);
    return null;
  }

 

  return (
    <div>
      <Homepage />
    </div>
  )
}

export default homepage