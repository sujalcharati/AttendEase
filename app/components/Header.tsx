"use client"
import React from 'react'
import Link from 'next/link'
import { useSession, signOut } from 'next-auth/react'
import { usePathname, useRouter } from 'next/navigation'
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Button } from "@/components/ui/button"
import { LogOut } from "lucide-react"

const Header = () => {
  const { data: session } = useSession();
  const pathname = usePathname();
  const router = useRouter();
  const isHomepage = pathname === '/homepage';

  const handleSignOut = async () => {
    await signOut({ redirect: false });
    router.push('/');
  };

  return (
    <div>
      <nav className="flex justify-between items-center p-4 bg-white">
        {!isHomepage && (
          <div className="text-blue-600 text-4xl font-serif pl-28">Attendease</div>
        )}

        <div className="flex items-center space-x-4">
          {!session ? (
            <>
              <Link href='/signin' className="text-black py-2">Log in</Link>
              <Link href='/signup' className="bg-blue-500 text-white px-4 py-2 rounded">Get started</Link>
            </>
          ) : (
            <div className="flex items-center gap-4">
              <div className="flex items-center gap-2">
                <Avatar>
                  <AvatarImage src={session.user?.image || ""} />
                  <AvatarFallback>
                    {session.user?.name?.split(" ").map(n => n[0]).join("") || "U"}
                  </AvatarFallback>
                </Avatar>
                <span className="font-medium">{session.user?.name}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                onClick={handleSignOut}
                className="flex items-center gap-2"
              >
                <LogOut className="h-4 w-4" />
                Logout
              </Button>
            </div>
          )}
        </div>
      </nav>
    </div>
  )
}

export default Header