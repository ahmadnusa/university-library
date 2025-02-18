import { cn } from "@/lib/utils"
import Link from "next/link"
import React from "react"
import BookCover from "./BookCover"
import Image from "next/image"

const BookCard = ({ id, title, genre, coverUrl, coverColor }: Book) => {
  const isLoanedBook = false
  return (
    <li className={cn(isLoanedBook && "xs:w-52 w-full")}>
      <Link
        href={`/books/${id}`}
        className={cn(isLoanedBook && "w-full flex flex-col items-center")}
      >
        <BookCover coverColer={coverColor} coverImage={coverUrl} />
        <div className={cn("mt-4", !isLoanedBook && "xs:max-w-40 max-w-28")}>
          <p className="book-title">{title}</p>
          <p className="book-genre">{genre}</p>
        </div>

        {isLoanedBook && (
          <div className="mt-3 w-full">
            <div className="book-loaned">
              <Image
                src="/icons/calendar.svg"
                alt="calender"
                width={18}
                height={18}
                className="size-[18px] object-contain"
              />
              <p className="text-light-100">11 days to return</p>
            </div>

            <button className="book-btn">Download reciept</button>
          </div>
        )}
      </Link>
    </li>
  )
}

export default BookCard
