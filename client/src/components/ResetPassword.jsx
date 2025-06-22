import axios from "axios";
import React, { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { AppContext } from "../context/AppContext";

const ResetPassword = () => {
  const { token } = useParams();
  const [newPassword, setNewPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
    const { backendUrl } = useContext(AppContext);
    const navigate = useNavigate();
const result = `${backendUrl}/api/company/reset-password/${token}`;

const handleResetPassword = async (e) => {
    e.preventDefault();
    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/company/reset-password`, {
        token,
        newPassword,
      });
  
      if (res.status === 200) {
        const msg = res.data.message;
        setMessage(msg);
        toast.success(msg);
        toast.info("You will be redirected to the home page.");
        
  
        // Broadcast success to other tabs
        const channel = new BroadcastChannel("password_reset");
        channel.postMessage("password_reset_success");
  
        // Try to close the current tab after 2 seconds
        setTimeout(() => {
          window.close();
        }, 2000);
  
        // Fallback: In case tab doesn't close, navigate after 4s
        setTimeout(() => {
          navigate("/");
        }, 4000);
      }
    } catch (err) {
      setMessage(err.response?.data?.message || "Something went wrong. Please try again.");
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <div className="flex flex-col items-center justify-center h-screen p-4">
      <h2 className="mb-4 text-xl font-semibold">Reset Password</h2>
      <form onSubmit={handleResetPassword} className="w-full max-w-sm">
        <input
          type="password"
          placeholder="New password"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
          className="w-full p-2 mb-3 border rounded"
          required
        />
        <button
          type="submit"
          className={`w-full py-2 text-white rounded ${loading ? "bg-gray-500" : "bg-green-600"}`}
          disabled={loading}
        >
          {loading ? "Resetting..." : "Reset Password"}
        </button>
        {message && (
          <p className="mt-2 text-sm text-center text-gray-700">{message}</p>
        )}
      </form>
    </div>
  );
};

export default ResetPassword;
