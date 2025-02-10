import config from "@/lib/config"
import { neon } from "@neondatabase/serverless"
import { drizzle } from "drizzle-orm/neon-http"

const sql = neon(config.env.databaseUrl)

export const db = drizzle({ client: sql })
// import { config } from "dotenv"
// import { drizzle } from "drizzle-orm/neon-http"

// config({ path: ".env.local" }) // or .env.local

// export const db = drizzle(process.env.DATABASE_URL!)
