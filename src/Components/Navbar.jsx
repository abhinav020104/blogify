import { useNavigate } from "react-router-dom";
import { useRecoilState, useRecoilValue, useSetRecoilState } from "recoil";
import {
  hamburgermenuClickedAtom,
  loadingAtom,
  searchDataAtom,
  tokenAtom,
  userAtom,
} from "../Store/Atoms/user";
import { useState } from "react";
import { GiHamburgerMenu } from "react-icons/gi";
import { GrClose } from "react-icons/gr";
import icon from "../assets/blog_7466122.png";

function Navbar() {
  const navigate = useNavigate();
  const [token, setToken] = useRecoilState(tokenAtom);
  const loading = useRecoilValue(loadingAtom);
  const [user, setUser] = useRecoilState(userAtom);
  const setSearch = useSetRecoilState(searchDataAtom);
  const [hamburgerMenuClicked, setHamburgerMenuClicked] = useRecoilState(
    hamburgermenuClickedAtom
  );

  const logoutHandler = () => {
    navigate("/logout");
  };
  const [searchData, setSearchData] = useState("");

  const searchDataChangeHandler = (e) => {
    setSearchData(e.target.value);
  };

  const searchClickHandler = () => {
    setSearch(searchData);
    navigate("/searchresults");
  };

  const hamburgermenuclickHandler = () => {
    setHamburgerMenuClicked(!hamburgerMenuClicked);
  };

  return (
    <div className="bg-slate-400 h-[70px] w-screen border-b-2 border-black flex items-center justify-center fixed z-10 shadow-xl">
      <div className="w-[94%] flex items-center h-full justify-between gap-6 max-[400px]:justify-space-around max-[400px]:w-screen max-[400px]:gap-0">
        <div className="flex items-center justify-between w-[200px] max-[400px]:w-[50px]">
          <img
            src={icon}
            className="h-[55px] ml-8 max-[400px]:ml-1"
            alt="Blogify Icon"
            onClick={()=>{
                navigate("/")
            }}
          />
          <a
            href="/"
            className="text-slate-800 text-2xl font-xl font-bold font-mono cursor-pointer ml-6 max-[400px]:hidden block"
          >
            Blogify
          </a>
          <div className="flex gap-6 ml-6">
              <input
                type="text"
                className="w-[300px] p-2 rounded-md bg-slate-600 font-mono text-white max-[400px]:w-[100px]"
                placeholder="search..."
                name="search"
                onChange={searchDataChangeHandler}
              />
              <button
                className="font-xl text-white bg-slate-600 rounded-md p-3 hover:scale-95 duration-200"
                onClick={searchClickHandler}
              >
                Search
              </button>
            </div>
        </div>
        {token === null && (
          <div className="max-[400px]:hidden">
            <div className="flex gap-12">
              <button
                className="bg-slate-100 w-[100px] p-2 rounded-xl text-center hover:scale-95 duration-200 cursor-pointer font-mono text-l font-bold"
                onClick={() => {
                  navigate("/login");
                }}
              >
                Login
              </button>
              <button
                className="bg-slate-100 w-[100px] p-2 rounded-xl text-center hover:scale-95 duration-200 cursor-pointer font-mono text-l font-bold"
                onClick={() => {
                  navigate("/signup");
                }}
              >
                Signup
              </button>
            </div>
          </div>
        )}
        {token !== null && (
          <div className="flex justify-between items-center gap-10 text-black ">
            
            <div className="font-bold text-black text-[15px] tracking-wide max-[400px]:hidden">
              {loading === false
                ? `welcome ! ${user.firstName} ${user.lastName}`
                : `Fetching details...`}
            </div>
            <div className="text-black flex gap-3 max-[400px]:hidden">
              <button
                className="bg-slate-100 w-[100px] p-2 rounded-xl text-center hover:scale-95 duration-200 cursor-pointer font-mono text-l font-bold "
                onClick={() => {
                  navigate("/myblogs/publishedblogs");
                }}
              >
                My Blogs
              </button>
              <button
                className="bg-slate-100 w-[100px] p-2 rounded-xl text-center hover:scale-95 duration-200 cursor-pointer font-mono text-l font-bold  tracking-wide"
                onClick={() => {
                  navigate("/profile");
                }}
              >
                Profile
              </button>
              <button
                className="bg-slate-100 w-[100px] p-2 rounded-xl text-center hover:scale-95 duration-200 cursor-pointer font-mono text-l font-bold tracking-wide"
                onClick={logoutHandler}
              >
                Logout
              </button>
            </div>
          </div>
        )}
        <div className="hidden max-[400px]:block mr-2">
          {hamburgerMenuClicked === false ? (
            <GiHamburgerMenu
              style={{ height: "30px", width: "30px" }}
              onClick={hamburgermenuclickHandler}
            />
          ) : (
            <GrClose
              style={{ height: "30px", width: "30px" }}
              onClick={hamburgermenuclickHandler}
            />
          )}
        </div>
      </div>
    </div>
  );
}

export default Navbar;
