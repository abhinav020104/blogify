import './App.css';
import {Routes , Route , useNavigate} from "react-router-dom"
import Home from "../src/Components/Home"
import Login from './Components/Login';
import Signup from './Components/Signup';
function App() {
  return (
    <div className='overflow-hidden'>
      <Routes>
        <Route path='/' element={<Home></Home>}></Route>
        <Route path='/login' element={<Login></Login>}></Route>
        <Route path='/signup' element={<Signup></Signup>}></Route>
      </Routes>
    </div>
  );
}
export default App;
