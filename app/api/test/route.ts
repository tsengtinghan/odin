import { getAllThreads } from "@/actions/action";
import { sql } from "drizzle-orm";
import { db } from "@/db";
export async function GET(req: Request) {
  
  return new Response("Hello, world!", { status: 200 });
}
