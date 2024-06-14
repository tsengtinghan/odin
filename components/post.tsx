import React from 'react';
import { Post } from './types';

interface PostComponentProps {
  post: Post;
}

const PostComponent: React.FC<PostComponentProps> = ({ post }) => {
  return (
    <div className="bg-white p-4 border-b border-gray-200">
      <div className="text-sm text-gray-900">{post.content}</div>
    </div>
  );
};

export default PostComponent;
