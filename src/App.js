import './App.css';
import { Routes, Route, useNavigate } from "react-router-dom"
import Home from "../src/Components/Home"
import Login from './Components/Login';
import Signup from './Components/Signup';
import { loadingAtom, tokenAtom, userAtom } from "./Store/Atoms/user"
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { Toaster } from "react-hot-toast"
import toast from "react-hot-toast"
import axios from "axios"
import { useEffect } from 'react';
import MyBlogs from './Components/MyBlogs';
import PublishedBlogs from './Components/PublishedBlogs';
import UnpublishedBlogs from './Components/UnpublishedBlogs';
import AddBlog from './Components/AddBlog';
import BlogFeed from './Components/BlogFeed';
import EditBlog from './Components/EditBlog';
import BlogDetail from './Components/BlogDetail';
import SearchResult from './Components/SearchResult';
import Profile from './Components/Profile';
import Logout from './Components/Logout';
function App() {
    const token = useRecoilValue(tokenAtom);
    const [user, setUser] = useRecoilState(userAtom);
    const setLoading = useSetRecoilState(loadingAtom);
    const fetchData = async () => {
        if (token !== null) {
            try {
                toast.loading("Fetching user details");
                setLoading(true);
                const userDetails = await axios({
                    method: "post",
                    url: "https://blogify-ds91.onrender.com/api/v1/auth/getuserdetails",
                    data: {
                        token: token
                    }
                })
                toast.dismiss();
                toast.success("User fetched successfully");
                setUser(userDetails.data.data);
                setLoading(false);
            } catch (error) {
                toast.dismiss();
                setLoading(false);
                console.log(error);
            }
        } else {
            return
        }
    }
    useEffect(() => {
        fetchData();
    }, []);
    return (
        <div className='overflow-hidden'>
            <Toaster></Toaster>
            <Routes>
                <Route path='/' element={<Home></Home>}></Route>
                <Route path='/login' element={<Login></Login>}></Route>
                <Route path='/signup' element={<Signup></Signup>}></Route>
                <Route path='/myblogs' element={<MyBlogs></MyBlogs>}>
                    <Route path='/myblogs/publishedblogs' element={<PublishedBlogs></PublishedBlogs>}></Route>
                    <Route path='/myblogs/unpublishedblogs' element={<UnpublishedBlogs></UnpublishedBlogs>}></Route>
                </Route>
                <Route path='/addblog' element={<AddBlog></AddBlog>}></Route>
                <Route path='/editblog/:id' element={<EditBlog></EditBlog>}></Route>
                <Route path='/blogdetail/:id' element={<BlogDetail></BlogDetail>}></Route>
                <Route path='/searchresults' element={<SearchResult></SearchResult>}></Route>
                <Route path='/profile' element={<Profile></Profile>}></Route>
                <Route path='/logout' element={<Logout></Logout>}></Route>
            </Routes>
        </div>
    );

}
export default App;
