import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { assets, password as passwordIcons } from "../assets/assets";
import { AppContext } from "../context/AppContext";

const RecruiterLogin = () => {
  const navigate = useNavigate();

  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [image, setImage] = useState(null);
  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const {
    setShowRecruiterLogin,
    backendUrl,
    setCompanyToken,
    setCompanyData,
  } = useContext(AppContext);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  const onSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;

    // Initial validation for signup step 1
    if (state === "Sign Up" && !isTextDataSubmitted) {
      if (!name || !email || !password) {
        return toast.error("Please fill out all fields.");
      }
      return setIsTextDataSubmitted(true);
    }

    setLoading(true);
    try {
      if (state === "Login") {
        const { data } = await axios.post(`${backendUrl}/api/company/login`, {
          email,
          password,
        });

        if (data.success) {
          localStorage.setItem("companyToken", data.token);
          setCompanyToken(data.token);
          setCompanyData(data.company);
          toast.success("Login successful!");
          setShowRecruiterLogin(false);
          navigate("/dashboard");
        } else {
          toast.error(data.message || "Invalid login credentials.");
        }
      } else {
        // Sign Up Step 2 - image upload
        if (!image) {
          setLoading(false);
          return toast.error("Please upload a company logo.");
        }

        const formData = new FormData();
        formData.append("name", name);
        formData.append("email", email);
        formData.append("password", password);
        formData.append("image", image);

        const { data } = await axios.post(
          `${backendUrl}/api/company/register`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );

        if (data.success) {
          localStorage.setItem("companyToken", data.token);
          setCompanyToken(data.token);
          setCompanyData(data.company);
          toast.success("Sign Up successful!");
          setShowRecruiterLogin(false);
          navigate("/dashboard");
        } else {
          toast.error(data.message || "Sign Up failed.");
        }
      }
    } catch (error) {
      console.error("Auth error:", error);
      toast.error(
        error.response?.data?.message || "Something went wrong. Try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setName("");
    setEmail("");
    setPassword("");
    setImage(null);
    setIsTextDataSubmitted(false);
    setLoading(false);
  };

  return (
    <div className="absolute top-0 bottom-0 left-0 right-0 z-10 flex items-center justify-center backdrop-blur-sm bg-black/30">
      <form
        onSubmit={onSubmit}
        className="relative p-10 bg-white rounded-xl text-slate-500 w-[90%] max-w-md"
      >
        <h1 className="mb-2 text-2xl font-semibold text-center text-neutral-700">
          Recruiter {state}
        </h1>
        <p className="mb-4 text-sm text-center">
          {state === "Login"
            ? "Welcome back! Please sign in to your account."
            : isTextDataSubmitted
            ? "Upload your company logo to complete registration."
            : "Welcome! Please sign up to create your account."}
        </p>

        {/* Step 2 - Upload Logo */}
        {state === "Sign Up" && isTextDataSubmitted ? (
          <div className="flex items-center gap-4 my-10">
            <label htmlFor="image" className="cursor-pointer">
              <img
                className="object-cover w-16 h-16 border rounded-full"
                src={
                  image ? URL.createObjectURL(image) : assets.upload_area
                }
                alt="Upload Logo"
              />
              <input
                id="image"
                type="file"
                hidden
                accept="image/*"
                onChange={(e) => setImage(e.target.files[0])}
              />
            </label>
            <p className="text-sm">Upload Company Logo</p>
          </div>
        ) : (
          <>
            {/* Name Field */}
            {state === "Sign Up" && (
              <div className="flex items-center gap-2 px-4 py-2 mt-5 border rounded-full">
                <img src={assets.person_icon} alt="" />
                <input
                  className="w-full text-sm outline-none"
                  type="text"
                  placeholder="Company Name"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}

            {/* Email Field */}
            <div className="flex items-center gap-2 px-4 py-2 mt-5 border rounded-full">
              <img src={assets.email_icon} alt="" />
              <input
                className="w-full text-sm outline-none"
                type="email"
                placeholder="Company Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>

            {/* Password Field */}
            <div className="flex items-center gap-2 px-4 py-2 mt-5 border rounded-full">
              <img src={assets.lock_icon} alt="" />
              <input
                className="flex-1 text-sm outline-none"
                type={showPassword ? "text" : "password"}
                placeholder="Enter Your Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <img
                src={
                  showPassword
                    ? passwordIcons.eye_closed_icon
                    : passwordIcons.eye_open_icon
                }
                alt="Toggle"
                className="w-5 h-5 cursor-pointer"
                onClick={() => setShowPassword(!showPassword)}
              />
            </div>
          </>
        )}

        {/* Forgot Password */}
        {state === "Login" && (
          <p
            className="mt-2 text-sm text-blue-500 cursor-pointer"
            onClick={() => navigate("/forgot-password")}
          >
            Forgot Password? Click here
          </p>
        )}

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full px-6 py-2 mt-5 mb-3 text-white rounded-full bg-blue-600 ${
            loading ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          {loading
            ? "Please wait..."
            : state === "Login"
            ? "Log in"
            : isTextDataSubmitted
            ? "Create Account"
            : "Next"}
        </button>

        {/* Toggle Login/Signup */}
        <p className="text-sm text-center text-gray-600">
          {state === "Login"
            ? "New to Job Portal?"
            : "Already have an account?"}{" "}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => {
              setState(state === "Login" ? "Sign Up" : "Login");
              resetForm();
            }}
          >
            {state === "Login" ? "Sign Up" : "Login"}
          </span>
        </p>

        {/* Close Icon */}
        <img
          src={assets.cross_icon}
          alt="Close"
          onClick={() => setShowRecruiterLogin(false)}
          className="absolute w-5 h-5 cursor-pointer top-5 right-5"
        />
      </form>
    </div>
  );
};

export default RecruiterLogin;
