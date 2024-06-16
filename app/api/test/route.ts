import { getAllThreads } from "@/actions/action";
import { sql } from "drizzle-orm";
import { db } from "@/db";
import { get } from "http";
export async function GET(req: Request) {
  getAllThreads();
  return new Response("Hello, world!", { status: 200 });
}
