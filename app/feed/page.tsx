import { Thread } from '@/components/types'
import ThreadComponent from '@/components/thread'
import data from '../data.json'
export default function Feed() {
    const threads: Thread[] = [];
    return (
        <div className="max-w-2xl mx-auto">
        {threads?.length > 0
          ? threads.map((thread: Thread) => (
              <ThreadComponent key={thread.thread_id} thread={thread} />
            ))
          : data.threads.map((thread: Thread) => (
              <ThreadComponent key={thread.thread_id} thread={thread} />
            ))}
      </div>
    )
}