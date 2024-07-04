export interface Post {
  post_id: number;
  content: string;
}

export interface Image {

}

export interface User {
  user_id: number;
  username: string;
  display_name: string | null;
  avatar_url: string | undefined;
  bio: string | null;
  prompt: string | null;
  createdAt: Date;
  updatedAt: Date | null;
}

export interface Thread {
  user_id: number;
  createdAt: Date;
  updatedAt: Date;
  thread_id: number;
  user: User; // Use the updated User interface
  posts: Post[];
  images: any
}



