import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";
import { Image, Loader, Video } from "lucide-react";

const PostCreation = ({ user }) => {
	const [content, setContent] = useState("");
	const [image, setImage] = useState(null);
	const [imagePreview, setImagePreview] = useState(null);
	const [video, setVideo] = useState(null);
	const [videoPreview, setVideoPreview] = useState(null);

	const queryClient = useQueryClient();

	const { mutate: createPostMutation, isPending } = useMutation({
		mutationFn: async (formData) => {
			const res = await axiosInstance.post("/posts/create", formData);
			return res.data; // Assuming the backend returns the created post, including media URLs
		},
		onSuccess: (post) => {
			resetForm();
			toast.success("Post created successfully");
			queryClient.invalidateQueries({ queryKey: ["posts"] });

			// Optional: If you want to do something with the returned post (e.g., log URLs)
			console.log("Post created with URLs:", post.contentimg, post.contentvideo);
		},
		onError: (err) => {
			toast.error(err.response.data.message || "Failed to create post");
		},
	});

	const handlePostCreation = async () => {
		try {
			const formData = new FormData();
			formData.append("content", content);
			
			// Append the image file if it's present
			if (image) {
				formData.append("image", image);
			}

			// Append the video file if it's present
			if (video) {
				formData.append("video", video);
			}

			// Trigger the mutation to create the post
			createPostMutation(formData);
		} catch (error) {
			console.error("Error in handlePostCreation:", error);
		}
	};

	const resetForm = () => {
		setContent("");
		setImage(null);
		setImagePreview(null);
		setVideo(null);
		setVideoPreview(null);
	};

	const handleFileChange = (e) => {
		const file = e.target.files[0];
		const fileType = file?.type.split("/")[0];

		if (fileType === "image") {
			setImage(file);
			setVideo(null);
			readFileAsDataURL(file).then(setImagePreview);
			setVideoPreview(null);
		} else if (fileType === "video") {
			setVideo(file);
			setImage(null);
			setImagePreview(null);
			readFileAsDataURL(file).then(setVideoPreview);
		}
	};

	const readFileAsDataURL = (file) => {
		return new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.onloadend = () => resolve(reader.result);
			reader.onerror = reject;
			reader.readAsDataURL(file);
		});
	};

	return (
		<div className='bg-secondary rounded-lg shadow mb-4 p-4'>
			<div className='flex space-x-3'>
				<img src={user.profilePicture || "/avatar.png"} alt={user.name} className='size-12 rounded-full' />
				<textarea
					placeholder="What's on your mind?"
					className='w-full p-3 rounded-lg bg-base-100 hover:bg-base-200 focus:bg-base-200 focus:outline-none resize-none transition-colors duration-200 min-h-[100px]'
					value={content}
					onChange={(e) => setContent(e.target.value)}
				/>
			</div>

			{imagePreview && (
				<div className='mt-4'>
					<img src={imagePreview} alt='Selected' className='w-full h-auto rounded-lg' />
				</div>
			)}

			{videoPreview && (
				<div className='mt-4'>
					<video controls src={videoPreview} className='w-full h-auto rounded-lg' />
				</div>
			)}

			<div className='flex justify-between items-center mt-4'>
				<div className='flex space-x-4'>
					<label className='flex items-center text-info hover:text-info-dark transition-colors duration-200 cursor-pointer'>
						<Image size={20} className='mr-2' />
						<span>Photo/Video</span>
						<input type='file' accept='image/*,video/*' className='hidden' onChange={handleFileChange} />
					</label>
				</div>

				<button
					className='bg-primary text-white rounded-lg px-4 py-2 hover:bg-primary-dark transition-colors duration-200'
					onClick={handlePostCreation}
					disabled={isPending}
				>
					{isPending ? <Loader className='size-5 animate-spin' /> : "Share"}
				</button>
			</div>
		</div>
	);
};
export default PostCreation;
