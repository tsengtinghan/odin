"use client";
import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Thread } from "./types";
import PostComponent from "./post";
import { ChevronDown, ChevronUp } from "lucide-react";

interface ThreadComponentProps {
  thread: Thread;
}

const ThreadComponent: React.FC<ThreadComponentProps> = ({ thread }) => {
  const [expanded, setExpanded] = useState(false);

  const toggleExpanded = () => {
    setExpanded(!expanded);
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
            className="bg-white rounded-lg shadow-sm overflow-hidden mb-4 w-1/2 text-sm py-2 text-gray-500  flex items-center justify-center"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: "spring", stiffness: 400, damping: 17 }}
          >
            <motion.div
              initial={false}
              animate={{ rotate: expanded ? 180 : 0 }}
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
