import { useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { axiosInstance } from "../../lib/axios.js";
import { toast } from "react-hot-toast";
import { Loader } from "lucide-react";
import { useNavigate } from "react-router-dom";

const SignUpForm = () => {
	const navigate = useNavigate();
	const [name, setName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [phoneNumber, setPhoneNumber] = useState(""); // New phone number field
	const [gender, setGender] = useState(""); // New gender field
	const [country, setCountry] = useState(""); // New country field

	const queryClient = useQueryClient();

	const { mutate: signUpMutation, isLoading } = useMutation({
		mutationFn: async (data) => {
			const res = await axiosInstance.post("/auth/signup", data);
			return res.data;
		},
		onSuccess: () => {
			navigate('/login');
			toast.success("Account created successfully");
		},
		onError: (err) => {
			toast.error(err.response.data.message || "Something went wrong");
		},
	});

	const handleSignUp = (e) => {
		e.preventDefault();
		signUpMutation({ name, username, email, password, phoneNumber, gender, country });
	};

	return (
		<form onSubmit={handleSignUp} className='flex flex-col gap-4'>
			<input
				type='text'
				placeholder='Full name'
				value={name}
				onChange={(e) => setName(e.target.value)}
				className='input input-bordered w-full'
				required
			/>
			<input
				type='text'
				placeholder='Username'
				value={username}
				onChange={(e) => setUsername(e.target.value)}
				className='input input-bordered w-full'
				required
			/>
			<input
				type='email'
				placeholder='Email'
				value={email}
				onChange={(e) => setEmail(e.target.value)}
				className='input input-bordered w-full'
				required
			/>
			<input
				type='password'
				placeholder='Password (6+ characters)'
				value={password}
				onChange={(e) => setPassword(e.target.value)}
				className='input input-bordered w-full'
				required
			/>

			{/* Phone Number Field */}
			<input
				type='tel'
				placeholder='Phone Number'
				value={phoneNumber}
				onChange={(e) => setPhoneNumber(e.target.value)}
				className='input input-bordered w-full'
				required
			/>

			{/* Gender Radio Buttons */}
			<div className='flex gap-4'>
				<label className='flex items-center'>
					<input
						type='radio'
						name='gender'
						value='Male'
						checked={gender === 'Male'}
						onChange={(e) => setGender(e.target.value)}
					/>
					<span className='ml-2'>Male</span>
				</label>
				<label className='flex items-center'>
					<input
						type='radio'
						name='gender'
						value='Female'
						checked={gender === 'Female'}
						onChange={(e) => setGender(e.target.value)}
					/>
					<span className='ml-2'>Female</span>
				</label>
				<label className='flex items-center'>
					<input
						type='radio'
						name='gender'
						value='Other'
						checked={gender === 'Other'}
						onChange={(e) => setGender(e.target.value)}
					/>
					<span className='ml-2'>Other</span>
				</label>
			</div>

			{/* Country Dropdown */}
			<select
				value={country}
				onChange={(e) => setCountry(e.target.value)}
				className='input input-bordered w-full'
				required
			>
				<option value='' disabled>Select your country</option>
				<option value='India'>India</option>
				<option value='USA'>USA</option>
				<option value='Canada'>Canada</option>
				<option value='UK'>UK</option>
				<option value='Australia'>Australia</option>
				{/* Add more country options as needed */}
			</select>

			<button type='submit' disabled={isLoading} className='btn btn-primary w-full text-white'>
				{isLoading ? <Loader className='size-5 animate-spin' /> : "Agree & Join"}
			</button>
		</form>
	);
};

export default SignUpForm;
