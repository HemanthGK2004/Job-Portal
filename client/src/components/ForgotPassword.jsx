import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const ForgotPassword = ({ setShowForgotPassword }) => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const { backendUrl } = useContext(AppContext);
    const navigate = useNavigate();

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);
  useEffect(() => {
    const channel = new BroadcastChannel("password_reset");
  
    channel.onmessage = (event) => {
      if (event.data === "password_reset_success") {
        toast.success("Password has been reset successfully!");
        if (setShowForgotPassword) {
          setShowForgotPassword(false);
        }
        console.log("Broadcast received: navigating to home");
        navigate("/");
      }
    };
  
    return () => channel.close();
  }, []);
  
  
  

  const handleForgotPassword = async (e) => {
    e.preventDefault();

    const isValidEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
    if (!isValidEmail) {
      toast.error("Please enter a valid email address.");
      return;
    }

    setLoading(true);
    try {
      const res = await axios.post(`${backendUrl}/api/company/forgot-password`, {
        email,
      });

      toast.success(res.data.message || "Reset link sent successfully.");
      setEmail("");
    } catch (err) {
      toast.error(
        err.response?.data?.message ||
          err.message ||
          "Something went wrong. Please try again!"
      );
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <form
        onSubmit={handleForgotPassword}
        className="relative w-full max-w-sm p-8 bg-white rounded-xl text-slate-500"
      >
        <h1 className="text-2xl font-medium text-center text-neutral-700">
          Forgot Password
        </h1>
        <p className="mt-1 mb-6 text-sm text-center text-gray-500">
          Enter your registered email and we’ll send you a reset link.
        </p>

        <div className="flex items-center gap-2 px-4 py-2 border rounded-full">
          <img src={assets.email_icon} alt="email icon" />
          <input
            type="email"
            className="w-full text-sm outline-none"
            placeholder="Company Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <button
          type="submit"
          className={`w-full px-6 py-2 mt-6 text-white bg-blue-600 rounded-full ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
          disabled={loading}
        >
          {loading ? "Sending..." : "Send Reset Link"}
        </button>

        <img
          onClick={() =>
            setShowForgotPassword ? setShowForgotPassword(false) : null
          }
          className="absolute cursor-pointer top-5 right-5"
          src={assets.cross_icon}
          alt="Close"
        />
      </form>
    </div>
  );
};

export default ForgotPassword;
