import React from 'react'
import Link from 'next/link'

const Header = () => {
  return (
    <div>
          <nav className="flex justify-between items-center p-4 bg-white">
        <div className="text-blue-600 text-4xl font-serif pl-28">Attendease</div>

        <div className="flex space-x-4">
          <Link  href='/signin'className="text-black py-2">Log in</Link>
          <Link href='/signup' className="bg-blue-500 text-white px-4 py-2 rounded">Get started</Link>
        </div>
       
      </nav>
    </div>
  )
}

export default Header