"use server";
import { db } from "@/db";
import { revalidatePath } from "next/cache";
import { threadsTable, postsTable, InsertPost } from "@/db/schema";
import { eq, asc } from "drizzle-orm";

interface threadProps {
  threadNumber: number;
  posts: Array<InsertPost>;
}

export async function saveThread(thread: threadProps) {
  const threadNumber = thread.threadNumber;
  const posts = thread.posts;
  await db.insert(threadsTable).values({
    thread_id: threadNumber,
  });
  for (const post of posts) {
    await db.insert(postsTable).values({
      thread_id: threadNumber,
      content: post.content,
    });
  }
}

export async function getAllThreads() {
  // const result = await db
  // .select({
  //   threadId: threadsTable.thread_id,
  //   postId: postsTable.post_id,
  //   content: postsTable.content,
  // })
  // .from(threadsTable)
  // .leftJoin(postsTable, eq(threadsTable.thread_id, postsTable.thread_id))
  // .orderBy(asc(threadsTable.thread_id), asc(postsTable.createdAt));
  // console.log(result);

  const threadsWithPosts = await db.query.threadsTable.findMany({
    with: {
      posts: true,
    },
  });
  console.log(threadsWithPosts[0]);
  return threadsWithPosts;

}

// create thread from db

// {
//     "threads": [
//         {
//             "threadNumber": 1,
//             "posts": [
//                 {
//                     "postNumber": 1,
//                     "content": "Let’s play a game. Take a look at the two companies and tell me which is better: [Thread1]"
//                 },
//                 {
//                     "postNumber": 2,
//                     "content": "Company A is a content platform founded in 1997. Last year, it did $30 billion in revenue, +18% YoY, with 225 million users, spending $19 billion on content in 2021. [Thread1]"
//                 },
//                 {
//                     "postNumber": 3,
//                     "content": "Company B, also a content platform, founded in 2005, did $30 billion in revenue last year, +46% YoY, with 2.6 billion users, without spending on content—users produce it. [Thread1]"
//                 },
//                 {
//                     "postNumber": 4,
//                     "content": "Which business model is better? You probably chose Company B. Why? Because it crowdsources content instead of spending $19 billion. [Thread1]"
//                 },
//                 {
//                     "postNumber": 5,
//                     "content": "Company B is YouTube and Company A is Netflix. Both had $30 billion in revenue last year, but with very different business models. [Thread1]"
//                 },
//                 {
//                     "postNumber": 6,
//                     "content": "Netflix spends billions on content, YouTube taps the world's creativity. Netflix focuses on expensive productions like _Stranger Things_ and _Squid Game_, while YouTube thrives on user-generated content. [Thread1]"
//                 }
//             ]
//         },
//         {
//             "threadNumber": 2,
//             "posts": [
//                 {
//                     "postNumber": 1,
//                     "content": "Netflix vs. YouTube: Let's delve into the numbers. Netflix has 225 million paying subscribers. YouTube has 2.6 billion monthly active users. [Thread2]"
//                 },
//                 {
//                     "postNumber": 2,
//                     "content": "ARPU (Average Revenue Per User) differs greatly: YouTube = $11.50; Netflix = $38.70. Despite differences, the basic principle stands: Netflix pours billions into content, YouTube crowdsources. [Thread2]"
//                 },
//                 {
//                     "postNumber": 3,
//                     "content": "Chris Anderson’s long tail concept (WIRED, 2004) predicted such platforms. He emphasized niche markets over “megahits.” [Thread2]"
//                 },
//                 {
//                     "postNumber": 4,
//                     "content": "Barry Diller’s 2005 quote (“There is not that much talent in the world”) didn’t age well. YouTube, founded the same year, showed there was a lot of talent globally. [Thread2]"
//                 }
//             ]
//         },
//     ]
// }
