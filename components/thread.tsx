'use client'
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Thread } from "./types";
import PostComponent from "./post";
import { ChevronDown, ChevronUp, ChevronLeft, ChevronRight } from "lucide-react";

interface ThreadComponentProps {
  thread: Thread;
}

const ThreadComponent: React.FC<ThreadComponentProps> = ({ thread }) => {
  const [expanded, setExpanded] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const toggleExpanded = () => {
    setExpanded(!expanded);
  };

  const nextImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === thread.images.length - 1 ? 0 : prevIndex + 1
    );
  };

  const prevImage = () => {
    setCurrentImageIndex((prevIndex) =>
      prevIndex === 0 ? thread.images.length - 1 : prevIndex - 1
    );
  };

  const containerVariants = {
    hidden: { opacity: 0, height: 0 },
    visible: {
      opacity: 1,
      height: "auto",
      transition: {
        duration: 0.3,
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };

  const childVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.3 }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-sm overflow-hidden mb-4">
      {thread.images && thread.images.length > 0 && (
        <div className="relative h-64 mb-4">
          <img
            src={thread.images[currentImageIndex].image_url}
            alt={`Thread image ${currentImageIndex + 1}`}
            className="w-full h-full object-cover"
          />
          {thread.images.length > 1 && (
            <>
              <button
                onClick={prevImage}
                className="absolute left-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2"
              >
                <ChevronLeft size={24} />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 bg-black bg-opacity-50 text-white rounded-full p-2"
              >
                <ChevronRight size={24} />
              </button>
              <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {thread.images.map((_: any, index: number) => (
                  <div
                    key={index}
                    className={`w-2 h-2 rounded-full ${
                      index === currentImageIndex ? "bg-white" : "bg-gray-300"
                    }`}
                  />
                ))}
              </div>
            </>
          )}
        </div>
      )}

      <PostComponent
        key={thread.posts[0].post_id}
        post={thread.posts[0]}
        user={thread.user}
        isLast={thread.posts.length === 1}
      />

      {thread.posts.length > 1 && (
        <>
          <AnimatePresence>
            {expanded && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit="hidden"
              >
                {thread.posts.slice(1).map((post, index) => (
                  <motion.div key={post.post_id} variants={childVariants}>
                    <PostComponent
                      post={post}
                      user={thread.user}
                      isLast={index === thread.posts.length - 2}
                    />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </AnimatePresence>

          <motion.button
            onClick={toggleExpanded}
            className="bg-white rounded-lg shadow-sm overflow-hidden mb-4 w-1/2 text-sm py-2 text-gray-500 flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              initial={false}
              transition={{ duration: 0.3 }}
            >
              {expanded ? <ChevronUp size={20} /> : <ChevronDown size={20} />}
            </motion.div>
            <span className="ml-2">
              {expanded
                ? "Show less"
                : `Show ${thread.posts.length - 1} more ${
                    thread.posts.length - 1 === 1 ? "reply" : "replies"
                  }`}
            </span>
          </motion.button>
        </>
      )}
    </div>
  );
};

export default ThreadComponent;