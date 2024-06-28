import React from "react";
import { Post, User } from "./types";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from "@/components/ui/hover-card";
import { MessageSquare, Heart, Share2, MoreHorizontal } from "lucide-react";
import { Button } from "@/components/ui/button";

interface PostComponentProps {
  post: Post;
  user: User;
  isLast: boolean;
}

const PostComponent: React.FC<PostComponentProps> = ({ post, user, isLast }) => {
  return (
    <div className="bg-white p-4 hover:bg-gray-50 transition-colors duration-200">
      <div className="flex space-x-4">
        <div className="flex flex-col items-center">
          <HoverCard openDelay={200} closeDelay={200}>
            <HoverCardTrigger asChild>
              <Avatar className="w-10 h-10 cursor-pointer">
                <AvatarImage src={user.avatar_url} alt={user.username} />
                <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
              </Avatar>
            </HoverCardTrigger>
            <HoverCardContent className="w-80">
              <div className="flex justify-between space-x-4">
                <Avatar className="w-12 h-12">
                  <AvatarImage src={user.avatar_url} />
                  <AvatarFallback>{user.username.slice(0, 2).toUpperCase()}</AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h4 className="text-sm font-semibold">@{user.username}</h4>
                  <p className="text-sm text-gray-500">
                    {user.bio ? user.bio : "No bio provided"}
                  </p>
                  <div className="flex items-center pt-2">
                    <span className="text-xs text-gray-400">
                      Joined {new Date(user.joined_date).toLocaleDateString('en-US', { month: 'long', year: 'numeric' })}
                    </span>
                  </div>
                </div>
              </div>
            </HoverCardContent>
          </HoverCard>
          {!isLast && <div className="w-0.5 bg-gray-200 h-full mt-2"></div>}
        </div>
        
        <div className="flex-1">
          <div className="flex items-center justify-between mb-2">
            <div>
              <span className="font-semibold text-gray-900">{user.display_name}</span>
              <span className="text-sm text-gray-500 ml-2">@{user.username}</span>
            </div>
            <Button variant="ghost" size="icon" className="text-gray-400 hover:text-gray-600">
              <MoreHorizontal size={20} />
            </Button>
          </div>
          <p className="text-gray-800 text-sm mb-3">{post.content}</p>
          <div className="flex items-center space-x-4 text-gray-500">
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <MessageSquare size={18} />
              <span>{post.comments_count}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <Heart size={18} />
              <span>{post.likes_count}</span>
            </Button>
            <Button variant="ghost" size="sm" className="flex items-center space-x-1">
              <Share2 size={18} />
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostComponent;
