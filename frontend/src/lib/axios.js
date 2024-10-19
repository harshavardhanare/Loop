import axios from "axios";

export const axiosInstance = axios.create({
	baseURL: import.meta.env.MODE === "development" ? "https://loop-backend-plum.vercel.app/api/v1" : "https://loop-backend-plum.vercel.app/api/v1",
	withCredentials: true,
});
