'use server';
import { Thread } from "@/components/types";
import ThreadComponent from "@/components/thread";
import data from "../data.json";
import { getAllThreads } from "@/actions/action";
export default async function Feed() {
  const threads: Thread[] = await getAllThreads();
  return (
    <div className="max-w-lg mx-auto">
      {threads?.length > 0
        ? threads.map((thread: Thread) => (
            <ThreadComponent key={thread.thread_id} thread={thread} />
          ))
        : data.threads.map((thread: Thread) => (
            <ThreadComponent key={thread.thread_id} thread={thread} />
          ))}
    </div>
  );
}
