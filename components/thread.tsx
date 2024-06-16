import React from 'react';
import { Thread } from './types';
import PostComponent from './post';

interface ThreadComponentProps {
  thread: Thread;
}

const ThreadComponent: React.FC<ThreadComponentProps> = ({ thread }) => {
  return (
    <div className="mb-4 rounded">
      {thread.posts.map((post, index) => (
        <PostComponent key={post.post_id} post={post} />
      ))}
    </div>
  );
};

export default ThreadComponent;
