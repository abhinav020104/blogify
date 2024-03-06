import BlogFeed from "./BlogFeed"
import Navbar from "./Navbar"
function Home(){
    return(
        <div className="bg-white w-screen  h-screen flex flex-col">
            <Navbar/>
            <div className="w-screen h-full">
                <BlogFeed></BlogFeed>
            </div>
        </div>
    )
}
 
export default Home