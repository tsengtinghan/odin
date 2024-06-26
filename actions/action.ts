"use server";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { threadsTable, postsTable, InsertPost } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

interface threadProps {
  threadNumber: number;
  posts: Array<InsertPost>;
}

export async function saveThread(thread: threadProps, userId: number) {
  const posts = thread.posts;
  const newThread = await db
    .insert(threadsTable)
    .values({
      user_id: userId,
    })
    .returning();

  console.log("newThread", newThread);
  for (const post of posts) {
    await db.insert(postsTable).values({
      thread_id: newThread[0].thread_id,
      user_id: userId,
      content: post.content,
    });
  }
  revalidatePath("/feed");
}

export async function getAllThreads() {
  const threadsWithUsersAndPosts = await db.query.threadsTable.findMany({
    with: {
      user: true,
      posts: true,
      images: true,
    },
  });
  console.log(threadsWithUsersAndPosts);
  return threadsWithUsersAndPosts;
}

// create thread from db
