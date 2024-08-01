import React, { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { fetchPostDetails } from "../store/postsSlice";

const PostDetails = ({ postId, onClose }) => {
  const dispatch = useDispatch();
  const { currentPost, comments, loading, error } = useSelector(
    (state) => state.posts
  );

  useEffect(() => {
    if (!currentPost || currentPost.id !== postId) {
      dispatch(fetchPostDetails(postId));
    }
  }, [dispatch, postId, currentPost]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;
  if (!currentPost) return null;

  return (
    <div className="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full">
      <div className="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white">
        <div className="mt-3 text-center">
          <h3 className="text-lg leading-6 font-medium text-gray-900">
            {currentPost.title}
          </h3>
          {currentPost.url &&
            currentPost.url.match(/\.(jpeg|jpg|gif|png)$/) && (
              <img
                src={currentPost.url}
                alt={currentPost.title}
                className="mx-auto mt-4 max-w-full h-auto"
              />
            )}
          <div className="mt-2 px-7 py-3">
            <p className="text-sm text-gray-500">{currentPost.selftext}</p>
          </div>
          <div className="mt-4">
            <h4 className="text-md font-medium text-gray-900">Comments:</h4>
            {comments && comments.length > 0 ? (
              comments.map((comment) => (
                <div key={comment.id} className="border-t mt-2 pt-2 text-left">
                  <p className="text-sm text-gray-600">{comment.body}</p>
                  <p className="text-xs text-gray-400">by {comment.author}</p>
                </div>
              ))
            ) : (
              <p>No comments yet.</p>
            )}
          </div>
          <div className="items-center px-4 py-3">
            <button
              onClick={onClose}
              className="px-4 py-2 bg-orange-500 text-white text-base font-medium rounded-md shadow-sm hover:bg-orange-600 focus:outline-none focus:ring-2 focus:ring-orange-300"
            >
              Close
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default React.memo(PostDetails);
