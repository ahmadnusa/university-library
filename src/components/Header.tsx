import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback } from "./ui/avatar"
import { getInitials } from "@/lib/utils"
import { Session } from "next-auth"

const Header = ({ session }: { session: Session }) => {
  return (
    <header className="my-10 flex justify-between gap-5">
      <Link href="/" className="flex gap-2">
        <Image
          src="/icons/logo.svg"
          alt="logo"
          width={0}
          height={0}
          className="size-10"
          priority
        />
        <h1 className="hidden font-bold text-white md:text-3xl">LibVerse</h1>
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Button>Logout</Button>
        </li>
        <li>
          <Link href="/my-profile">
            <Avatar>
              <AvatarFallback className="bg-amber-100">
                {getInitials(session?.user?.name || "IN")}
              </AvatarFallback>
            </Avatar>
          </Link>
        </li>
      </ul>
    </header>
  )
}
export default Header
