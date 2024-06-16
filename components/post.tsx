import React from "react";
import { Post } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

interface PostComponentProps {
  post: Post;
}

const PostComponent: React.FC<PostComponentProps> = ({ post }) => {
  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="flex flex-row space-x-3">
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
        <div className="text-[13px] text-gray-900">{post.content}</div>
      </div>
    </div>
  );
};

export default PostComponent;
