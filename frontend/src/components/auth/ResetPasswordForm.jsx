import { useState } from "react";
import { useParams } from "react-router-dom";
import { axiosInstance } from "../../lib/axios";
import toast from "react-hot-toast";

const ResetPasswordForm = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [confirmNewPassword, setConfirmNewPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmNewPassword) {
      return toast.error("Passwords aren't matching");
    }
    try {
      await axiosInstance.post("/auth/reset-password", { token, newPassword });
      toast.success("Password has been reset successfully");
    } catch (err) {
      toast.error(err.response.data.message || "Something went wrong");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form 
        onSubmit={handleSubmit} 
        className="bg-white p-6 rounded shadow-md w-80 space-y-4"
      >
        <h2 className="text-lg font-semibold text-center">Reset Password</h2>
        <input
          type="password"
          placeholder="New Password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <input
          type="password"
          placeholder="Confirm Password"
          value={confirmNewPassword}
          onChange={(e) => setConfirmNewPassword(e.target.value)}
          className="input input-bordered w-full"
          required
        />
        <button type="submit" className="btn btn-primary w-full">
          Reset Password
        </button>
      </form>
    </div>
  );
};

export default ResetPasswordForm;
