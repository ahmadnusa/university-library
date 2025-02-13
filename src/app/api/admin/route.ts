import { NextResponse } from "next/server"

export async function GET() {
  try {
    const response = await fetch(
      "https://res.cloudinary.com/dlzlfasou/raw/upload/users-01_fertyx.json",
    )
    const data = await response.json()
    return NextResponse.json(data)
  } catch (error: unknown) {
    return NextResponse.json({ error: "Failed to fetch data " + error })
  }
}
