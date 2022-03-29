import './App.css';
import Navbar from './component/Navbar';
import Banner from './component/Banner';
import Favorites from './component/Favorites';
import Animes from './component/Animes';
import Info from './component/Info';
import {BrowserRouter, Routes, Route} from 'react-router-dom';
import Description from './component/Description';
import Signup from "./component/Signup"
import Login from "./component/Login"
import {AuthProvider} from './Context/AuthContext'
import PrivateRoute from "./component/PrivateRoute";
import ResetPw from "./component/ResetPw"
function App() {
  return (
    <BrowserRouter>
    <AuthProvider>
      <Routes>
      <Route path = "/login" element = {<Login/>}/>
      <Route path = "/signup" element = {<Signup/>}/>
      <Route element={<PrivateRoute/>}>
        <Route path='/' element={
           <>
           <Banner/>
           <div className='flex'>
             <Animes className='w-2/3' />
             <Info className='w-1/3'/>
           </div>
         </>
        }/>
        <Route path='/favorites' element={
          <Favorites/>
        }/>
        <Route path='/description' element={
          <Description/>
        }/>
        </Route>
       <Route path = "/reset/password" element = {<ResetPw/>}/>
      </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
