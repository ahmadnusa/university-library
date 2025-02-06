import { cn } from "@/lib/utils"
import BookCoverSvg from "./BookCoverSvg"
import Image from "next/image"

type BookCovervariant = "extraSmall" | "small" | "medium" | "regular" | "wide"

const variantStyles: Record<BookCovervariant, string> = {
  extraSmall: "book-cover_extra_small",
  small: "book-cover_small",
  medium: "book-cover_medium",
  regular: "book-cover_regular",
  wide: "book-cover_wide",
}

interface BookCoverProps {
  className?: string
  variant?: BookCovervariant
  coverColer: string
  coverImage: string
}

const BookCover = ({
  className,
  variant = "regular",
  coverColer = "#012B48",
  coverImage = "https://placehold.co/400x600.png",
}: BookCoverProps) => {
  return (
    <div
      className={cn(
        "relative transition-all duration-300",
        variantStyles[variant],
        className,
      )}
    >
      <BookCoverSvg coverColor={coverColer} />
      <div
        className="absolute z-10"
        style={{ left: "12%", width: "87.5%", height: "88%" }}
      >
        <Image
          src={coverImage}
          alt="Book Cover"
          fill
          sizes="100%"
          className="rounded-sm object-fill"
        />
      </div>
    </div>
  )
}

export default BookCover
