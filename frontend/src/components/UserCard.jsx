import { Link } from "react-router-dom";

function UserCard({ user, isConnection, onChatClick }) {
	return (
		<div className='bg-white rounded-lg shadow p-4 flex flex-col items-center transition-all hover:shadow-md'>
			<Link to={`/profile/${user.username}`} className='flex flex-col items-center'>
				<img
					src={user.profilePicture || "/avatar.png"}
					alt={user.name}
					className='w-24 h-24 rounded-full object-cover mb-4'
				/>
				<h3 className='font-semibold text-lg text-center'>{user.name}</h3>
			</Link>
			<p className='text-gray-600 text-center'>Loop</p>
			<p className='text-sm text-gray-500 mt-2'>{user.connections?.length} connections</p>
			<div className='mt-4 flex justify-between w-full'>
				<button className='bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors w-full mr-2'>
					{isConnection ? "Connected" : "Connect"}
				</button>
				{/* <button
					onClick={onChatClick}
					className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors w-full ml-2'
				>
					Chat
				</button> */}
			</div>
		</div>
	);
}

export default UserCard;
