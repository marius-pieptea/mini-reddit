import React from "react";

const PostItem = ({ post, onPostSelect }) => {
  return (
    <div
      className="bg-white shadow-md rounded-md p-4 cursor-pointer"
      onClick={() => onPostSelect(post.id)}
    >
      <h2 className="text-xl font-semibold mb-2">{post.title}</h2>
      {post.url && post.url.match(/\.(jpeg|jpg|gif|png)$/) && (
        <img
          src={post.url}
          alt={post.title}
          className="mb-4 max-w-full h-auto"
        />
      )}
      <p className="text-gray-600 mb-4">{post.selftext.slice(0, 200)}...</p>
      <div className="flex items-center text-sm text-gray-500">
        <span className="mr-4">👤 {post.author}</span>
        <span className="mr-4">💬 {post.num_comments} comments</span>
        <span>⬆️ {post.score} points</span>
      </div>
    </div>
  );
};

export default PostItem;
