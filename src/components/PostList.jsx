import React, { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPosts } from "../store/postsSlice";
import PostItem from "./PostItem";
import PostDetails from "./PostDetails";
import SearchBar from "./SearchBar"; 

const PostList = () => {
  const dispatch = useDispatch();
  const { posts, loading, error } = useSelector((state) => state.posts);
  const [selectedPostId, setSelectedPostId] = useState(null);

  useEffect(() => {
    dispatch(fetchPosts());
  }, [dispatch]);

  const handlePostSelect = (postId) => {
    setSelectedPostId(postId);
  };

  const handleClosePostDetails = () => {
    setSelectedPostId(null);
  };

  if (loading) return <div className="text-center">Loading...</div>;
  if (error) return <div className="text-center text-red-500">{error}</div>;

  return (
    <div className="space-y-4">
      {posts.map((post) => (
        <PostItem key={post.id} post={post} onPostSelect={handlePostSelect} />
      ))}
      {selectedPostId && (
        <PostDetails postId={selectedPostId} onClose={handleClosePostDetails} />
      )}
    </div>
  );
};

export default PostList;
