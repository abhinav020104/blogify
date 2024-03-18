import Navbar from "./Navbar";
import LoginAnimation from "../assets/1709405739948.json";
import Lottie from "lottie-react";
import { useState } from "react";
import axios from "axios";
import { useRecoilValue, useSetRecoilState } from "recoil";
import { hamburgermenuClickedAtom, tokenAtom, userAtom } from "../Store/Atoms/user";
import { useNavigate } from "react-router-dom";
import { FaRegEye, FaRegEyeSlash } from "react-icons/fa6";
import toast from "react-hot-toast";
import HamburgerMenu from "./HamburgerMenu";

function Login() {
  const [loginData, setLoginData] = useState({});
  const setToken = useSetRecoilState(tokenAtom);
  const setUser = useSetRecoilState(userAtom);
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);

  const loginHandler = async () => {
    try {
      toast.loading("Login in process");
      const response = await axios({
        method: "post",
        url: "https://blogify-ds91.onrender.com/api/v1/auth/login",
        data: loginData,
      });
      toast.dismiss();
      toast.success("Login Successfull");
      localStorage.setItem("token", JSON.stringify(response.data.data.token));
      setToken(response.data.data.token);
      setUser(response.data.data);
      navigate("/");
    } catch (error) {
      toast.dismiss();
      console.log(error);
      toast.error("Invalid credentials");
      console.log("login frontend error");
    }
  };

  const changeHandler = (e) => {
    setLoginData({
      ...loginData,
      [e.target.name]: e.target.value,
    });
  };

  const hamburgerMenuClicked = useRecoilValue(hamburgermenuClickedAtom);

  return (
    <div className="w-screen h-screen bg-slate-white flex flex-col">
      <Navbar />
      {hamburgerMenuClicked === false && (
        <div>
          <div className="w-screen h-full flex items-center justify-center gap-32 max-[640px]:flex-col max-[640px]:gap-8 mt-32 max-[640px]:mt9">
            <div className="w-[300px] max-[640px]:h-[100px] max-[640px]:w-[150px]">
              <Lottie animationData={LoginAnimation} />
            </div>
            <div className="flex flex-col w-[400px] bg-slate-400 h-[400px] rounded-md items-center shadow-xl max-[640px]:h-[400px] max-[640px]:w-[350px]">
              <form className="flex flex-col items-center gap-8 w-11/12">
                <div className="text-2xl font-sans font-bold mt-6 tracking-normal">
                  Login
                </div>
                <div className="flex flex-col w-full gap-2">
                  <div className="font-semibold text-[16px] text-black">
                    Email
                  </div>
                  <div className="w-full">
                    <input
                      type="text"
                      name="email"
                      placeholder="Enter email address"
                      className="h-[30px] w-full rounded-md py-5 px-4 bg-slate-700 text-white shadow-lg"
                      onChange={changeHandler}
                    />
                  </div>
                </div>
                <div className="flex flex-col w-full gap-2 relative">
                  <div className=" font-semibold text-[16px] text-black">
                    Password
                  </div>
                  <input
                    type={showPassword === true ? `text` : `password`}
                    name="password"
                    placeholder="Enter password "
                    className="h-[30px] w-full rounded-md py-5 px-4 bg-slate-700 text-white shadow-lg"
                    onChange={changeHandler}
                  />
                  {showPassword === false && (
                    <FaRegEye
                      className="absolute bottom-[10px] right-[10px] text-white text-xl cursor-pointer"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  )}
                  {showPassword === true && (
                    <FaRegEyeSlash
                      className="absolute bottom-[10px] right-[10px] text-white text-xl cursor-pointer"
                      onClick={() => {
                        setShowPassword(!showPassword);
                      }}
                    />
                  )}
                </div>
              </form>
              <button
                className="bg-slate-700 text-white w-[125px] p-2 rounded-md hover:scale-95 duration-200 mt-12 cursor-pointer shadow-lg"
                onClick={loginHandler}
              >
                Login
              </button>
            </div>
          </div>
        </div>
      )}
      {hamburgerMenuClicked === true && <HamburgerMenu />}
    </div>
  );
}

export default Login;
