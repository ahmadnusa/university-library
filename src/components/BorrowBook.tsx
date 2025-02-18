"use client"

import React, { useState } from "react"
import { Button } from "./ui/button"
import Image from "next/image"
import { useRouter } from "next/navigation"
import { toast } from "@/hooks/use-toast"
import { borrowBook } from "@/lib/actions/book"

interface BorrowBookProps {
  bookId: string
  userId: string
  borrowingEligibility: {
    isEligible: boolean
    message: string
  }
}

const BorrowBook = ({
  bookId,
  userId,
  borrowingEligibility: { isEligible, message },
}: BorrowBookProps) => {
  const { push } = useRouter()
  const [borrowing, setBorrowing] = useState(false)

  const handleBorrowBook = async () => {
    if (!isEligible) {
      toast({
        title: "Error",
        description: message,
        variant: "destructive",
      })
    }
    setBorrowing(true)
    try {
      const result = await borrowBook({ bookId, userId })

      if (result.success) {
        toast({
          title: "Success",
          description: "Book borrowed successfully",
        })
        push("/")
      } else {
        toast({
          title: "Error",
          description: result.error,
          variant: "destructive",
        })
      }
    } catch {
      toast({
        title: "Error",
        description: "An error occurred while borrowing the book",
        variant: "destructive",
      })
    } finally {
      setBorrowing(false)
    }
  }
  return (
    <Button
      className="book-overview_btn"
      onClick={handleBorrowBook}
      disabled={borrowing}
    >
      <Image
        src="/icons/book.svg"
        alt="book"
        width={20}
        height={20}
        className="size-5"
      />
      <p className="font-bebas-neue text-xl text-dark-100">
        {borrowing ? "Borrowing..." : "Borrow Book"}
      </p>
    </Button>
  )
}

export default BorrowBook
