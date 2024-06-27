'use client';
import React from 'react';
import { Thread } from './types';
import PostComponent from './post';
import { Button } from './ui/button';
import { useState } from 'react';
import { ChevronDown, ChevronUp } from "lucide-react";

interface ThreadComponentProps {
  thread: Thread;
}

const ThreadComponent: React.FC<ThreadComponentProps> = ({ thread }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
      <PostComponent key={thread.posts[0].post_id} post={thread.posts[0]} user={thread.user} isLast={thread.posts.length === 1} />
      
      {thread.posts.length > 1 && (
        <>
          {expanded && (
            <div className="">
              {thread.posts.slice(1).map((post, index) => (
                <PostComponent 
                  key={post.post_id} 
                  post={post} 
                  user={thread.user}
                  isLast={index === thread.posts.length - 2}
                />
              ))}
            </div>
          )}
          
          <Button
            onClick={toggleExpanded}
            variant="ghost"
            className="w-full flex items-center justify-center py-2 text-gray-500 hover:bg-gray-100"
          >
            {expanded ? (
              <>
                <ChevronUp size={20} className="mr-2" />
                Show less
              </>
            ) : (
              <>
                <ChevronDown size={20} className="mr-2" />
                Show {thread.posts.length - 1} more {thread.posts.length - 1 === 1 ? 'reply' : 'replies'}
              </>
            )}
          </Button>
        </>
      )}
    </div>
  );
};

export default ThreadComponent;
