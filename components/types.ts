export interface Post {
  post_id: number;
  content: string;
}

export interface User {
  user_id: number;
  username: string;
  display_name: string;
  avatar_url: string;
  bio: string | null; // Allow 'null' for the 'bio' property
}

export interface Thread {
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
  thread_id: number;
  user: User; // Use the updated User interface
  posts: Post[];
}
