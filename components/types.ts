// types.ts
export interface Post {
  postNumber: number;
  content: string;
}

export interface Thread {
  threadNumber: number;
  posts: Post[];
}
