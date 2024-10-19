import { useEffect, useState } from "react";

import { Mail, User, Eye, MessageCircle, ChevronRight ,LogOut} from "lucide-react";
import axios from "axios";
import { axiosInstance } from "../../lib/axios";
import { QueryClient, useMutation, useQuery,useQueryClient } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
// Sample user data

// User Detail Component

function UserDetail({ user, onClose }) {
  const [isFrozen, setIsFrozen] = useState(user.isFreezed); // Initialize with user data
  const navigate = useNavigate();

  const { mutate: freezeUserMutation, isPending: isLikingPost } = useMutation({
    mutationFn: async (data) => {
      const res = await axiosInstance.post(
        `/admin/freezeUser/${user._id}`,
        data
      );
      return res.data;
    },
    onSuccess: (data) => {
      console.log("data", data);
      toast.success(`User ${data.user.isFreezed ? "frozen" : "unfrozen"}`);
    },
  });

  const handleToggleChange = () => {
    setIsFrozen(!isFrozen);
    freezeUserMutation({ freeze: !isFrozen });
  };

  function handleViewPosts() {
    navigate(`/admin/posts/${user._id}`);
  }


  return (
    <div className="w-full max-w-md mx-auto p-4 dark:bg-black bg-white dark:text-white text-black shadow-lg rounded-lg">
      <div>
        <div className="text-2xl font-bold">User Profile</div>
      </div>
      <div className="space-y-4 mt-4">
        <div className="space-y-2">
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 opacity-70" />
            <span className="text-sm font-medium">Display Name:</span>
            <span className="text-sm">{user.displayName}</span>
          </div>
          <div className="flex items-center space-x-2">
            <User className="h-4 w-4 opacity-70" />
            <span className="text-sm font-medium">Username:</span>
            <span className="text-sm">{user.username}</span>
          </div>
          <div className="flex items-center space-x-2">
            <Mail className="h-4 w-4 opacity-70" />
            <span className="text-sm font-medium">Email:</span>
            <span className="text-sm">{user.email}</span>
          </div>
        </div>
        <div className="flex items-center space-x-2">
          <span className="text-sm font-medium">Freeze Account:</span>
          <label className="relative inline-flex items-center cursor-pointer">
            <input
              type="checkbox"
              checked={isFrozen}
              onChange={handleToggleChange}
              className="sr-only"
            />
            <div className="w-10 h-6 bg-gray-200 rounded-full shadow-inner"></div>
            <div
              className={`absolute left-0 w-4 h-4 bg-white rounded-full shadow transition-transform ${
                isFrozen ? "translate-x-full bg-green-500" : "translate-x-0"
              }`}
            ></div>
          </label>
        </div>
      </div>
      <div className="flex flex-wrap gap-2 mt-4">
        {/* <button className="flex p-1 justify-between items-center bg-black dark:bg-white text-white dark:text-black py-2 rounded hover:bg-violet-300">
          <User className="mr-2 h-4 w-4" />
          Update Profile
        </button> */}
        <button
          onClick={handleViewPosts}
          className="flex p-1 justify-between items-center bg-black dark:bg-white text-white dark:text-black py-2 rounded hover:bg-violet-300"
        >
          <Eye className="mr-2 h-4 w-4" />
          See Posts
        </button>
        {/* <button className="flex p-1 justify-between items-center bg-black dark:bg-white text-white dark:text-black py-2 rounded hover:bg-violet-300">
          <MessageCircle className="mr-2 h-4 w-4" />
          See Chats
        </button> */}
      </div>
      <button
        onClick={onClose}
        className="mt-4 w-full bg-black dark:bg-white text-white dark:text-black py-2 rounded hover:bg-violet-300"
      >
        Close
      </button>
    </div>
  );
}

export default function ManageUsers() {
  const queryClient = useQueryClient();

  const navigate = useNavigate();

  const [users, setUsers] = useState([]);
  const [selectedUser, setSelectedUser] = useState(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const {
    data: usersinfo,
    isLoading: isLoadingStudents,
    error: fetchError,
  } = useQuery({
    queryKey: ["users"],
    queryFn: async () => {
      const response = await axiosInstance.get("/admin/getAllUsers");
      return response.data; // Adjust based on your API response structure
    },
  });
  console.log(usersinfo);
  useEffect(() => {
    setUsers(usersinfo?.users || []);
  }, [usersinfo]);

  const filteredUsers = users.filter((user) =>
    [user.displayName, user.username, user.email].some((field) =>
      field?.toLowerCase()?.includes(searchTerm?.toLowerCase())
    )
  );
  const { mutate: logout } = useMutation({
		mutationFn: () => axiosInstance.post("/auth/logout"),
		onSuccess: () => {
      navigate('/')
			queryClient.invalidateQueries({ queryKey: ["authUser"] });
		},
	});

  // if (loading) return <p>Loading...</p>;
  // if (error) return <p>Error: {error}</p>;

  return (
    <div className="container mx-auto p-4">
      {selectedUser ? (
        <UserDetail user={selectedUser} onClose={() => setSelectedUser(null)} />
      ) : (
        <div>
          <div className="flex items-center mb-4">
            <input
              type="text"
              placeholder="Search by username, email, or name"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="border p-2 rounded w-full"
            />
            <button
              className="ml-2 dark:bg-black bg-white dark:text-white text-black p-2 rounded"
              onClick={() => setSearchTerm(searchTerm)}
            >
              Search
            </button>
            <button
									className='flex items-center space-x-1 text-sm text-gray-600 hover:text-gray-800'
									onClick={() =>{navigate('/'); logout();       
                  }}
								>
									<LogOut size={20} />
									<span className='hidden md:inline'>Logout</span>
								</button>
          </div>
          {filteredUsers.length === 0 ? (
            <p>No users found.</p>
          ) : (
            <div>
              <div>User List</div>
              <ul className="space-y-4">
                {filteredUsers.map((user) => (
                  <li
                    key={user.id}
                    className="flex dark:border-black  items-center justify-between p-2 border-white border-[0.6px] rounded"
                  >
                    <div>
                      <p className="font-medium">{user?.name}</p>
                      <p className="text-sm text-muted-foreground">
                        <span className=" font-semibold">username:</span>{" "}
                        {user.username}
                      </p>
                      <p className="text-sm text-muted-foreground">
                        <span className=" font-semibold">email:</span>{" "}
                        {user.email}
                      </p>
                    </div>
                    <button
                      className="dark:bg-black bg-white dark:text-white text-black p-3 rounded-md"
                      onClick={() => setSelectedUser(user)}
                    >
                      <ChevronRight className="h-4 w-4" />
                    </button>
                  </li>
                ))}
              </ul>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
