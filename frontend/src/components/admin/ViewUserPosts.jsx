import { useQuery } from "@tanstack/react-query";
import React from "react";
import { axiosInstance } from "../../lib/axios";
import { useParams } from "react-router-dom";
import AdminPost from "./AdminPost";

const ViewUserPosts = () => {
  let user = useParams();
  let userId = user.userId;
  console.log("userId", userId);
  const { data: posts } = useQuery({
    queryKey: ["singleposts"],
    queryFn: async () => {
      const res = await axiosInstance.get(`/admin/getUserPosts/${userId}`);
      return res.data;
    },
  });
  console.log("posts", posts);
  return (
    <div>
      {posts?.map((post) => (
        <AdminPost key={post._id} post={post} />
      ))}
      {posts?.length === 0 && (
        <div className="bg-white rounded-lg shadow p-8 text-center">
          <h2 className="text-2xl font-bold mb-4 text-gray-800">
            No Posts Yet
          </h2>
        </div>
      )}
    </div>
  );
};

export default ViewUserPosts;
