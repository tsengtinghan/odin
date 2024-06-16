import React from "react";
import { Post, User } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";

interface PostComponentProps {
  post: Post;
  user: User;
}

const PostComponent: React.FC<PostComponentProps> = ({ post, user }) => {
  return (
    <div className="bg-white border-b border-gray-200 py-4">
      <div className="flex flex-row space-x-3">
        <HoverCard openDelay={200} closeDelay={200}>
          <HoverCardTrigger asChild>
            <Avatar>
              <AvatarImage src="https://github.com/shadcn.png" alt="@shadcn" />
              <AvatarFallback>CN</AvatarFallback>
            </Avatar>
          </HoverCardTrigger>
          <HoverCardContent className="w-80">
            <div className="flex justify-between space-x-4">
              <Avatar>
                <AvatarImage src="https://github.com/vercel.png" />
                <AvatarFallback>VC</AvatarFallback>
              </Avatar>
              <div className="space-y-1">
                <h4 className="text-sm font-semibold">@{user.username}</h4>
                <p className="text-sm">
                  {user.bio ? user.bio : "No bio provided"}
                </p>
                <div className="flex items-center pt-2">
                  <span className="text-xs text-muted-foreground">
                    Joined December 2021
                  </span>
                </div>
              </div>
            </div>
          </HoverCardContent>
        </HoverCard>

        <div className="text-[13px] text-gray-900">{post.content}</div>
      </div>
    </div>
  );
};

export default PostComponent;
