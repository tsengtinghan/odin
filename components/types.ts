export interface Post {
  post_id: number;
  content: string;
  createdAt: Date;
}

export interface Thread {
  thread_id: number;
  posts: Post[];
}
