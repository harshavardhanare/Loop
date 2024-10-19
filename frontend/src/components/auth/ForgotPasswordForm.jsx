import { useState } from "react";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";
import { useNavigate } from "react-router-dom";
const ForgotPasswordForm = () => {
    const navigate = useNavigate();
  const [email, setEmail] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axiosInstance.post("/auth/forgot-password", { email });
      toast.success("Reset link sent to your email");
      navigate('/');
    } catch (err) {
      toast.error(err.response.data.message || "Something went wrong");
    }
  };

  return (
    <div className="w-screen h-screen justify-center items-center">
    <form onSubmit={handleSubmit} className="space-y-4 w-full max-w-md">
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        className="input input-bordered w-full"
        required
      />
      <button type="submit" className="btn btn-primary w-full">
        Send Reset Link
      </button>
    </form>
    </div>

  );
};

export default ForgotPasswordForm;
