import { useQuery } from "@tanstack/react-query";
import { axiosInstance } from "../lib/axios";
import Sidebar from "../components/Sidebar";
import PostCreation from "../components/PostCreation";
import Post from "../components/Post";
import { Users } from "lucide-react";
import RecommendedUser from "../components/RecommendedUser";
import { useState } from "react";

const HomePage = () => {
	const [YourPost, setYourPost] = useState(false);
	const { data: authUser } = useQuery({ queryKey: ["authUser"] });

	const { data: recommendedUsers } = useQuery({
		queryKey: ["recommendedUsers"],
		queryFn: async () => {
			const res = await axiosInstance.get("/users/suggestions");
			return res.data;
		},
	});

	const [searchTerm, setSearchTerm] = useState("");

  const filteredUsers = recommendedUsers?.filter((user) =>
    user.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchChange = (e) => {
    setSearchTerm(e.target.value);
  };
  const { data: posts } = useQuery({
    queryKey: ["posts"],
    queryFn: async () => {
      const res = await axiosInstance.get("/posts");
      return res.data;
    },
  });

  const { data: posts2 } = useQuery({
    queryKey: ["singleposts"],
    queryFn: async () => {
      const res = await axiosInstance.get(
        `/admin/getUserPosts/${authUser?._id}`
      );
      return res.data;
    },
  });

	return (
		<div className='grid grid-cols-1 lg:grid-cols-4 gap-6'>
			<div className='hidden lg:block lg:col-span-1'>
				<Sidebar user={authUser} />
			</div>

			<div className='col-span-1 lg:col-span-2 order-first lg:order-none'>
				<PostCreation user={authUser} />

				<div className="flex w-full justify-center gap-4 my-4">
          <button
            onClick={() => setYourPost(false)}
            className={`${
              !YourPost
                ? "bg-violet-600 text-white"
                : "bg-violet-100 text-black hover:text-white"
            } px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-violet-700 focus:outline-none shadow-lg`}
          >
            Posts
          </button>
          <button
            onClick={() => setYourPost(true)}
            className={`${
              YourPost
                ? "bg-violet-600 text-white"
                : "bg-violet-100 text-black hover:text-white"
            } px-6 py-2 rounded-lg font-semibold transition-all duration-300 transform hover:scale-105 hover:bg-violet-700 focus:outline-none shadow-lg`}
          >
            Your Posts
          </button>
        </div>

		{YourPost ? (
          posts2?.length > 0 ? (
            posts2?.map((post) => <Post key={post._id} post={post} />)
          ) : (
            <div className="bg-white rounded-lg shadow p-8 text-center">
              <div className="mb-6">
                <Users size={64} className="mx-auto text-purple-600" />
              </div>
              <h2 className="text-2xl font-bold mb-4 text-gray-800">
                No Posts Yet
              </h2>
              <p className="text-gray-600 mb-6">
                Start creating posts to see them here!
              </p>
            </div>
          )
        ) : posts?.length > 0 ? (
          posts?.map((post) => <Post key={post._id} post={post} />)
        ) : (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="mb-6">
              <Users size={64} className="mx-auto text-purple-600" />
            </div>
            <h2 className="text-2xl font-bold mb-4 text-gray-800">
              No Posts Yet
            </h2>
            <p className="text-gray-600 mb-6">
              Connect with others to start seeing posts in your feed!
            </p>
          </div>
        )}
      </div>

      {recommendedUsers?.length > 0 && (
        <div className="col-span-1 w-[22rem] lg:col-span-1 hidden lg:block">
          <div className="bg-secondary rounded-lg shadow p-4">
            <h2 className="font-semibold mb-4">People you may know</h2>

            {/* Search Input and Button */}
            <div className="flex mb-4">
              <input
                type="text"
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Search users..."
                className="border w-full rounded-l-lg p-2 flex-grow"
              />
              <button
                onClick={handleSearchChange}
                className="bg-purple-600 text-white p-2 rounded-r-lg"
              >
                Search
              </button>
            </div>

            {/* User List */}
            {filteredUsers?.map((user) => (
              <RecommendedUser key={user._id} user={user} />
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default HomePage;