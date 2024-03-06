import BlogFeed from "./BlogFeed"
import Navbar from "./Navbar"
function Home(){
    return(
        <div className="bg-white w-screen  h-screen flex flex-col">
            <Navbar/>
            <div className="w-11/12 mx-auto h-full">
                <BlogFeed></BlogFeed>
            </div>
        </div>
    )
}
 
export default Home