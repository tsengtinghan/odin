export interface Post {
  post_id: number;
  content: string;
}

export interface Thread {
  thread_id: number;
  posts: Post[];
}
