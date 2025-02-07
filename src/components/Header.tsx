import React from "react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"

const Header = () => {
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
        <h1 className="hidden font-bold text-white md:text-3xl">BookWise</h1>
      </Link>
      <ul className="flex flex-row items-center gap-8">
        <li>
          <Button>Logout</Button>
        </li>
      </ul>
    </header>
  )
}
export default Header
