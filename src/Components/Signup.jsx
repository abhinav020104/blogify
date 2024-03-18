import signUpAnimation from "../assets/1707740516213.json";
import Navbar from "./Navbar";
import Lottie from "lottie-react";
import axios from "axios";
import { useState } from "react";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { hamburgermenuClickedAtom } from "../Store/Atoms/user";
import { useRecoilValue } from "recoil";
import HamburgerMenu from "./HamburgerMenu";

function Signup() {
  const navigate = useNavigate();
  const [signUpData, setSignUpData] = useState({});
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const hamburgerMenuClicked = useRecoilValue(hamburgermenuClickedAtom);

  const submitHandler = async () => {
    try {
      toast.loading("Sign Up in process");
      const response = await axios({
        method: "POST",
        url: "https://blogify-ds91.onrender.com/api/v1/auth/signup",
        data: signUpData,
      });
      toast.dismiss();
      toast.success("Sign Up Successfull");
      navigate("/login");
    } catch (error) {
      toast.dismiss();
      console.log(error);
      toast.error("Failed to Sign Up");
      console.log("Signup frontend error");
    }
  };

  const changeHandler = (e) => {
    setSignUpData({
      ...signUpData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <div className="bg-white w-screen min-h-screen flex flex-col">
      <Navbar />
      {/* Signup Form */}
      {!hamburgerMenuClicked && (
        <div className="mt-32 w-screen h-full flex items-center justify-center gap-32">
          {/* Signup Animation */}
          <div className="w-[500px] max-[640px]:hidden">
            <Lottie animationData={signUpAnimation} />
          </div>
          {/* Signup Form Container */}
          <div className="w-[500px] h-[500px] bg-slate-400 rounded-md shadow-xl flex flex-col items-center max-[640px]:h-[660px] max-[640px]:w-[350px]">
            <form className="flex flex-col items-center gap-6 w-11/12">
              {/* Signup Title */}
              <div className="font-bold text-black text-xl tracking-wide mt-6">
                SIGN UP
              </div>
              {/* First Name & Last Name Inputs */}
              <div className="flex w-full items-center justify-between gap-8 mt-5 max-[640px]:flex-col">
                <div className="flex flex-col justify-center gap-2">
                  <div className="font-semibold text-[16px] text-black">
                    First Name
                  </div>
                  <input
                    type="text"
                    name="firstName"
                    placeholder="Enter first name"
                    onChange={changeHandler}
                    className="h-[30px] w-[200px] max-[640px]:w-[320px] rounded-md py-5 px-4 bg-slate-700 text-white shadow-lg"
                  />
                </div>
                <div className="flex flex-col justify-center gap-2">
                  <div className="font-semibold text-[16px] text-black">
                    Last Name
                  </div>
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Enter last name"
                    onChange={changeHandler}
                    className="h-[30px] w-[200px] max-[640px]:w-[320px] rounded-md py-5 px-4 bg-slate-700 text-white shadow-lg"
                  />
                </div>
              </div>
              {/* Email Input */}
              <div className="flex flex-col w-full gap-2">
                <div className="font-semibold text-[16px] text-black">
                  Email
                </div>
                <input
                  type="text"
                  name="email"
                  placeholder="Enter email address"
                  onChange={changeHandler}
                  className="h-[30px] w-full max-[640px]:w-[320px] rounded-md py-5 px-4 bg-slate-700 text-white shadow-lg"
                />
              </div>
              {/* Password & Confirm Password Inputs */}
              <div className="flex w-full items-center justify-between gap-8 max-[640px]:flex-col">
                <div className="flex flex-col justify-center gap-2 relative">
                  <div className="font-semibold text-[16px] text-black">
                    Password
                  </div>
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter password"
                    onChange={changeHandler}
                    className="h-[30px] w-[200px] max-[640px]:w-[320px] rounded-md py-5 px-4 bg-slate-700 text-white shadow-lg"
                  />
                  {showPassword ? (
                    <FaRegEyeSlash
                      className="absolute bottom-[10px] right-[10px] text-white text-xl cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  ) : (
                    <FaRegEye
                      className="absolute bottom-[10px] right-[10px] text-white text-xl cursor-pointer"
                      onClick={() => setShowPassword(!showPassword)}
                    />
                  )}
                </div>
                <div className="flex flex-col justify-center gap-2 relative">
                  <div className="font-semibold text-[16px] text-black">
                    Confirm Password
                  </div>
                  <input
                    type={showConfirmPassword ? "text" : "password"}
                    name="confirmpassword"
                    placeholder="Confirm password"
                    onChange={changeHandler}
                    className="h-[30px] w-[200px] max-[640px]:w-[320px] rounded-md py-5 px-4 bg-slate-700 text-white shadow-lg"
                  />
                  {showConfirmPassword ? (
                    <FaRegEyeSlash
                      className="absolute bottom-[10px] right-[10px] text-white text-xl cursor-pointer"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  ) : (
                    <FaRegEye
                      className="absolute bottom-[10px] right-[10px] text-white text-xl cursor-pointer"
                      onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    />
                  )}
                </div>
              </div>
            </form>
            {/* Signup Button */}
            <button
              className="bg-slate-700 text-white w-[125px] p-2 rounded-md hover:scale-95 duration-200 cursor-pointer mt-12 shadow-lg max-[640px]:mb-10"
              onClick={submitHandler}
            >
              Sign Up
            </button>
          </div>
        </div>
      )}
      {/* Hamburger Menu */}
      {hamburgerMenuClicked && <HamburgerMenu />}
    </div>
  );
}

export default Signup;
