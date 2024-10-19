import { useState } from "react";
import { Link } from "react-router-dom";
import { formatDistanceToNow } from "date-fns";
import { Loader, MessageCircle, Share2, ThumbsUp, Trash2 } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

const AdminPost = ({ post, authUser }) => {
  // State to manage comments visibility
  const [showComments, setShowComments] = useState(false);
  const { mutate: deletePost, isPending: isDeletingPost } = useMutation({
    mutationFn: async (data) => {
      await axiosInstance.delete(`/admin/deleteUserPost/${post._id}`, data);
    },
    onSuccess: () => {
      toast.success(`post deleted successfully`);
    },
    onError: () => {
      toast.error("something went wrong");
    },
  });
  const handleDeletePost = () => {
    deletePost();
  };
  return (
    <div className="bg-secondary rounded-lg shadow mb-4">
      <div className="p-4">
        <div className="flex items-center justify-between mb-4">
          <div className="flex items-center">
            <Link to={`/profile/${post?.author?.username}`}>
              <img
                src={post.author.profilePicture || "/avatar.png"}
                alt={post.author.name}
                className="size-10 rounded-full mr-3"
              />
            </Link>

            <div>
              <Link to={`/profile/${post?.author?.username}`}>
                <h3 className="font-semibold">{post.author.name}</h3>
              </Link>
              <p className="text-xs text-info">{post.author.headline}</p>
              <p className="text-xs text-info">
                {formatDistanceToNow(new Date(post.createdAt), {
                  addSuffix: true,
                })}
              </p>
            </div>
          </div>
          <button
            onClick={handleDeletePost}
            className="text-red-500 hover:text-red-700"
          >
            {isDeletingPost ? (
              <Loader size={18} className="animate-spin" />
            ) : (
              <Trash2 size={18} />
            )}
          </button>
        </div>
        <p className="mb-4">{post.content}</p>
        {post.image && (
          <img
            src={post.image}
            alt="Post content"
            className="rounded-lg w-full mb-4"
          />
        )}

        <div className="flex justify-between text-info">
          <span className="flex items-center">
            <ThumbsUp
              size={18}
              // className={isLiked ? "text-blue-500 fill-blue-300" : ""}
            />
            <span>{`Like (${post.likes.length})`}</span>
          </span>

          {/* Toggle comments visibility on click */}
          <span
            className="flex items-center cursor-pointer"
            onClick={() => setShowComments(!showComments)}
          >
            <MessageCircle size={18} />
            <span>{`Comment (${post.comments.length})`}</span>
          </span>

          <span className="flex items-center">
            <Share2 size={18} />
            <span>Share</span>
          </span>
        </div>
      </div>

      {/* Conditionally render comments based on visibility state */}
      {showComments && (
        <div className="px-4 pb-4">
          <div className="mb-4 max-h-60 overflow-y-auto">
            {post.comments.map((comment) => (
              <div
                key={comment._id}
                className="mb-2 bg-base-100 p-2 rounded flex items-start"
              >
                <img
                  src={comment.user.profilePicture || "/avatar.png"}
                  alt={comment.user.name}
                  className="w-8 h-8 rounded-full mr-2 flex-shrink-0"
                />
                <div className="flex-grow">
                  <div className="flex items-center mb-1">
                    <span className="font-semibold mr-2">
                      {comment.user.name}
                    </span>
                    <span className="text-xs text-info">
                      {formatDistanceToNow(new Date(comment.createdAt))}
                    </span>
                  </div>
                  <p>{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default AdminPost;
