import { useMutation, useQueryClient } from "@tanstack/react-query";
import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { Loader } from "lucide-react";
import { useLocation } from "react-router-dom";
import { Link } from "react-router-dom";

const LoginForm = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const queryClient = useQueryClient();
  const location = useLocation();
  const path = location.pathname;
  const { mutate: loginMutation, isLoading } = useMutation({
    mutationFn: (userData) => axiosInstance.post("/auth/login", userData),
    onSuccess: (response) => {
      const userRole = response.data.role;
      console.log("userRole", response);
      localStorage.setItem("userRole", userRole);

      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Login successful");
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });
  const { mutate: adminloginMutation, isLoading: isLoading2 } = useMutation({
    mutationFn: (userData) => axiosInstance.post("/admin/login", userData),
    onSuccess: (response) => {
      const userRole = response.data.role;
      console.log("response", response);
      localStorage.setItem("userRole", userRole);

      queryClient.invalidateQueries({ queryKey: ["authUser"] });
      toast.success("Login successful");
    },
    onError: (err) => {
      toast.error(err.response.data.message || "Something went wrong");
    },
  });
  const handleSubmit = (e) => {
    e.preventDefault();
    if (!path.includes("admin")) {
      loginMutation({ username, password });
    } else {
      adminloginMutation({ username, password });
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <input
        type="text"
        placeholder="Username"
        value={username}
        onChange={(e) => setUsername(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => setPassword(e.target.value)}
        className="input input-bordered w-full"
        required
      />
<Link className="w-full mt-6 text-sm text-blue-900 hover:text-blue-500 hover:underline" to='/forgotPassword'>Forgot Password?</Link>
<button type="submit" className="btn btn-primary w-full">
        {path.includes("admin") ? (
          isLoading2 ? (
            <Loader className="size-5 animate-spin" />
          ) : (
            "Admin Login"
          )
        ) : isLoading ? (
          <Loader className="size-5 animate-spin" />
        ) : (
          "Login"
        )}
      </button>
    </form>
  );
};

export default LoginForm;
