import axios from "axios";
import { useNavigate, useLocation } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";

const Blog = ({ blogData }) => {
    const location = useLocation();
    const navigate = useNavigate();
    const currPath = location.pathname.split("/").at(-1);
    const [loading , setLoading] = useState(false);
    const [showDeleteModal, setShowDeleteModal] = useState(false);

    const publishHandler = async () => {
        try {
            setLoading(true);
            console.log(blogData);
            const status = !blogData.published;
            console.log(status);
            const response = await axios({
                method: "put",
                url: `https://blogify-ds91.onrender.com/api/v1/blog/changepublishstatus/${blogData.id}/${status}`,
                data: {},
            });
            console.log(response);
            if (status) {
                toast.success("Blog Published Successfully");
            } else {
                toast.success("Blog Unpublished Successfully");
            }
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };

    const editHandler = async () => {
        try {
            navigate(`/editblog/${blogData.id}`);
        } catch (error) {
            console.log(error);
        }
    };


    const showDeleteConfirmation = () => {
        setShowDeleteModal(true);
    };


    const handleDeleteBlog = async () => {
        try {
            setLoading(true);
            toast.loading("Deleting Blog");
            const response = await axios({
                method: "delete",
                url: `https://blogify-ds91.onrender.com/api/v1/blog/deleteblog/${blogData.id}`,
            });
            console.log(response);
            toast.dismiss();
            toast.success("Blog Deleted Successfully");
            setLoading(false);
            setShowDeleteModal(false);
            window.location.reload();
        } catch (error) {
            console.log(error);
        }
    };


    const hideDeleteConfirmation = () => {
        setShowDeleteModal(false);
    };

    return (
        <div className="flex flex-col w-full mx-auto  font-mono">
            <div className="flex  w-full  justify-around text-black font-bold  border-b-2  border-slate-400 items-center max-[640px]:flex-col ">
                <div className=" p-4 flex w-[900px] justify-between max-[640px]:w-full">
                    {blogData.title}
                </div>
                <div className=" p-4 flex w-[250px] justify-between gap-6 tracking-wider max-[640px]:w-full max-[640px]:flex-col">
                    <button
                        className="bg-green-500 text-black p-2 rounded-md hover:scale-95 duration-200"
                        onClick={publishHandler}
                    >
                        {blogData.published === false ? `Publish` : `Unpublish`}
                    </button>
                    <button
                        className="bg-blue-500 text-black p-2 rounded-md hover:scale-95 duration-200"
                        onClick={editHandler}
                    >
                        Edit
                    </button>
                    <button
                        className="bg-red-500 text-black p-2 rounded-md hover:scale-95 duration-200"
                        onClick={showDeleteConfirmation} // Show the delete confirmation modal on click
                    >
                        Delete
                    </button>
                </div>
            </div>
            {showDeleteModal && (
                <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
                    <div className="bg-white p-4 rounded-md">
                        <p className="text-lg font-semibold">
                            Are you sure you want to delete this blog?
                        </p>
                        <div className="flex justify-end mt-4">
                            <button
                                className="bg-red-500 text-white px-4 py-2 rounded-md mr-4 hover:scale-95 duration-200"
                                onClick={handleDeleteBlog}
                            >
                                Yes
                            </button>
                            <button
                                className="bg-gray-300 text-gray-800 px-4 py-2 rounded-md hover:scale-95 duration-200"
                                onClick={hideDeleteConfirmation}
                            >
                                No
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default Blog;
