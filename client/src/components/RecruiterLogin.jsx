import React, { useContext, useState,useEffect} from "react";
import { assets } from "../assets/assets";
import { AppContext } from "../context/AppContext";


const RecruiterLogin = () => {
  const [state, setState] = useState("Login");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [image, setImage] = useState(false);

  const {setShowRecruiterLogin} = useContext(AppContext)

  const [isTextDataSubmitted, setIsTextDataSubmitted] = useState(false);
  const onSubmit = async(e) => {
    e.preventDefault();
    if (state === "Sign Up" && !isTextDataSubmitted) {
        setIsTextDataSubmitted(true);
      // Add your sign-up logic here
    }
  }

  useEffect(()=>{
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    }
  },[])
  return (
    <div className="absolute top-0 left-0 right-0 bottom-0  backdrop-blur-sm z-10 bg-black/30 flex items-center justify-center">
      <form onSubmit={onSubmit} className="relative bg-white p-10 rounded-xl text-slate-500">
        <h1 className="font-medium  text-center text-2xl text-neutral-700 ">
          Recruiter {state}
        </h1>
        {state == "Login" ? (
          <p className="text-sm ">
            Welcome back ! Please sign in to your account.
          </p>
        ) : (
          <p className="text-sm ">
            Welcome back ! Please sign Up to your account.
          </p>
        )}

        {state === "Sign Up" && isTextDataSubmitted ? (
            <>
            <div className="flex items-center gap-4 my-10">
                <label htmlFor="image">
                    <img className="w-16 rounded-full" src={image?URL.createObjectURL(image): assets.upload_area} alt="" />
                    <input onChange={e=>setImage(e.target.files[0])} type="file" hidden id="image" />
                </label>
                <p>Upload Company <br />logo</p>
            </div>
            </>
        ) : (
          <>
            {state !== "Login" && (
              <div className="flex items-center gap-2 mt-5 border px-4 py-2 rounded-full ">
                <img src={assets.person_icon} alt="" />
                <input
                  className="outline-none text-sm"
                  type="text"
                  placeholder="Company Name"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            )}
            <div className="flex items-center gap-2 mt-5 border px-4 py-2 rounded-full ">
              <img src={assets.email_icon} alt="" />
              <input
                className="outline-none text-sm"
                type="email"
                placeholder="Company Email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 mt-5 border px-4 py-2 rounded-full ">
              <img src={assets.lock_icon} alt="" />
              <input
                className="outline-none text-sm"
                type="password"
                placeholder="Enter Your Password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <div className="flex items-center gap-2 mt-5 border px-4 py-2 rounded-full ">
              <img src={assets.lock_icon} alt="" />
              <input
                className="outline-none text-sm"
                type="password"
                placeholder="Confirm Password"
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
              />
            </div>
          </>
        )}
        {state=== "Login" && <p className="text-sm text-gray-500 mt-2">
          Forgot Password ?{" "}
          <span className="text-blue-600 cursor-pointer">Click Here</span>
        </p>}
        <button type="submit" className="bg-blue-600 text-white px-6 sm:px-9 py-2 rounded-full mt-4 mb-4 w-full">
            {state === "Login" ? 'Log in' :isTextDataSubmitted ? 'Create account':'Next'}
        </button>
        <p className="text-sm text-gray-500 mt-2">
          {state === "Login"
            ? "New to Job Portal ?"
            : "Already have an account?"}
          <span
            className="text-blue-600 cursor-pointer"
            onClick={() => {
              setState(state === "Login" ? "Sign Up" : "Login");
              setIsTextDataSubmitted(false);
            }}
          >
            {state === "Login" ? " Sign Up" : " Login"}
          </span>
        </p>
        <img onClick={e=>setShowRecruiterLogin(false)} className="absolute top-5 right-5 cursor-pointer" src={assets.cross_icon} alt="" />
      </form>
    </div>
  );
};

export default RecruiterLogin;
