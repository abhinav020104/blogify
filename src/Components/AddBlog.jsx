import axios from "axios";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useRecoilValue } from "recoil";
import { tokenAtom, userAtom } from "../Store/Atoms/user";
import toast from "react-hot-toast";
import JoditEditor from "jodit-react";
import { useRef, useState, useMemo } from "react";

const AddBlog = () => {
    const editor = useRef(null);
    const [content, setContent] = useState('');
    const [title, setTitle] = useState('');
    const user = useRecoilValue(userAtom);
    const navigate = useNavigate();
    const token = useRecoilValue(tokenAtom);

    useEffect(() => {
        if (token === null) {
            toast.error("Please login to write a blog !");
            navigate("/login");
        }
    }, [token, navigate]);

    const changeHandler = (value) => {
        setContent(value);
    };

    const titleHandler = (e) => {
        setTitle(e.target.value);
    };

    const editorConfig = useMemo(() => ({
        buttons: [
            'source', '|',
            'bold',
            'strikethrough',
            'underline',
            'italic', '|',
            'ul',
            'ol', '|',
            'outdent', 'indent', '|',
            'font',
            'fontsize',
            'link', '|',
            'align', 'undo', 'redo', '|',
            'hr',
            'eraser',
            'fullsize',
            'print',
            'image',
        ],
        height: 500,
    }), []);

    const validateInputs = () => {
        if (!title.trim() || !content.trim()) {
            toast.error("Fields cannot be empty");
            return false;
        }
        return true;
    };

    const handleBlogSubmission = async (published) => {
        if (!validateInputs()) return;

        try {
            const message = published ? "Blog Publish in progress" : "Saving Blog as draft";
            toast.loading(message);
            
            const response = await axios.post("https://blogify-ds91.onrender.com/api/v1/blog/addblog", {
                userId: user.id,
                title: title,
                content: content,
                published: published,
            });

            const successMessage = published ? "Blog published successfully" : "Blog saved as draft";
            toast.dismiss();
            toast.success(successMessage);
            
            const redirectPath = published ? "/myblogs/publishedblogs" : "/myblogs/unpublishedblogs";
            navigate(redirectPath);
        } catch (error) {
            toast.dismiss();
            console.error(error);
            const errorMessage = published ? "Failed to publish blog" : "Failed to save blog as draft";
            toast.error(errorMessage);
        }
    };

    const draftHandler = () => handleBlogSubmission(false);
    const publishHandler = () => handleBlogSubmission(true);
    const exitHandler = () => navigate("/");

    return (
        <div className="flex flex-col min-h-screen overflow-auto">
            <nav className="bg-slate-400 text-black p-2 font-mono">
                <div className="container mx-auto">
                    <h1 className="text-2xl font-bold">Create a New Blog</h1>
                </div>
            </nav>

            <div className="container mx-auto flex-1">
                <form className="mt-2 flex flex-col items-center justify-center gap-3">
                    <input type="text" placeholder="Enter title" name="title" className="text-black text-xl font-bold w-full border-b-2 border-black p-3" onChange={titleHandler} />
                    <div className="w-full h-[500px]">
                        <JoditEditor
                            ref={editor}
                            value={content}
                            onChange={changeHandler}
                            config={editorConfig}
                        />
                    </div>
                </form>
            </div>

            <div className="mb-10 flex justify-center gap-6 tracking-wider overflow-y-scroll max-[640px]:mt-2 ">
                <button onClick={draftHandler} className="bg-green-500 text-black p-2 w-[150px] rounded-md hover:scale-95 duration-200">
                    Save Draft
                </button>
                <button onClick={publishHandler} className="bg-blue-500 text-black p-2 w-[150px] rounded-md hover:scale-95 duration-200">
                    Publish
                </button>
                <button onClick={exitHandler} className="bg-red-500 text-black p-2 w-[150px] rounded-md hover:scale-95 duration-200">
                    Exit
                </button>
            </div>
        </div>
    );
};

export default AddBlog;
