import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
import { Check, Clock, Tag, UserCheck, UserPlus, X } from "lucide-react";

const RecommendedUser = ({ user }) => {
  const queryClient = useQueryClient();

  const { data: connectionStatus, isLoading } = useQuery({
    queryKey: ["connectionStatus", user._id],
    queryFn: () => axiosInstance.get(`/connections/status/${user._id}`),
  });

  const { mutate: sendConnectionRequest } = useMutation({
    mutationFn: (userId) =>
      axiosInstance.post(`/connections/request/${userId}`),
    onSuccess: () => {
      toast.success("Connection request sent successfully");
      queryClient.invalidateQueries({
        queryKey: ["connectionStatus", user._id],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
    },
  });

  const { mutate: acceptRequest } = useMutation({
    mutationFn: (requestId) =>
      axiosInstance.put(`/connections/accept/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request accepted");
      queryClient.invalidateQueries({
        queryKey: ["connectionStatus", user._id],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
    },
  });

  const { mutate: rejectRequest } = useMutation({
    mutationFn: (requestId) =>
      axiosInstance.put(`/connections/reject/${requestId}`),
    onSuccess: () => {
      toast.success("Connection request rejected");
      queryClient.invalidateQueries({
        queryKey: ["connectionStatus", user._id],
      });
    },
    onError: (error) => {
      toast.error(error.response?.data?.error || "An error occurred");
    },
  });

  const renderButton = () => {
    if (isLoading) {
      return (
        <button
          className="px-3 py-1 rounded-full text-sm bg-gray-200 text-gray-500"
          disabled
        >
          Loading...
        </button>
      );
    }

    switch (connectionStatus?.data?.status) {
      case "pending":
        return (
          <button
            className="px-3 py-1 rounded-full text-sm bg-yellow-500 text-white flex items-center"
            disabled
          >
            <Clock size={16} className="mr-1" />
            Pending
          </button>
        );
      case "received":
        return (
          <div className="flex gap-2 justify-center">
            <button
              onClick={() => acceptRequest(connectionStatus.data.requestId)}
              className={`rounded-full p-1 flex items-center justify-center bg-green-500 hover:bg-green-600 text-white`}
            >
              <Check size={16} />
            </button>
            <button
              onClick={() => rejectRequest(connectionStatus.data.requestId)}
              className={`rounded-full p-1 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white`}
            >
              <X size={16} />
            </button>
          </div>
        );
      case "connected":
        return (
          <button
            className="px-3 py-1 rounded-full text-sm bg-green-500 text-white flex items-center"
            disabled
          >
            <UserCheck size={16} className="mr-1" />
            Connected
          </button>
        );
      default:
        return (
          <button
            className="px-3 py-1 rounded-full text-sm border border-primary text-primary hover:bg-primary hover:text-white transition-colors duration-200 flex items-center"
            onClick={handleConnect}
          >
            <UserPlus size={16} className="mr-1" />
            Connect
          </button>
        );
    }
  };

  const handleConnect = () => {
    if (connectionStatus?.data?.status === "not_connected") {
      sendConnectionRequest(user._id);
    }
  };

  return (
    <div className="flex items-center justify-between p-4 mb-4 bg-white shadow-lg rounded-lg border border-gray-200">
      <Link
        to={`/profile/${user.username}`}
        className="flex items-center flex-grow"
      >
        <img
          src={user.profilePicture || "/avatar.png"}
          alt={user.name}
          className="w-14 h-14 rounded-full mr-4 border border-gray-300 shadow-sm"
        />
        <div>
          <h3 className="font-semibold text-sm text-gray-800">{user.name}</h3>
          <div className="flex gap-2 mt-2 flex-wrap">
            {user.skillMatch === 1 && (
              <span className="bg-blue-50 text-blue-600 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                {user.education[user?.education?.length - 1].school}
              </span>
            )}
            {user.companyMatch === 1 && (
              <span className="bg-green-50 text-green-600 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                {user.experience[user?.experience?.length - 1].company}
              </span>
            )}
            {user.schoolMatch === 1 && (
              <span className="bg-purple-50 text-purple-600 text-xs font-medium px-3 py-1 rounded-full shadow-sm">
                {user.skills[0]}
              </span>
            )}
          </div>
          <p className="text-xs mt-2 text-gray-500">{"Loop User"}</p>
        </div>
      </Link>
      <div>{renderButton()}</div>
    </div>
  );
};
export default RecommendedUser;
