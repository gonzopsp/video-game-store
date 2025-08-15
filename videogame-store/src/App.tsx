// src/App.tsx
import './App.css'

import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Header from './components/header';
import VideoGameStore from './components/videogamestore';
import GameCreate from './components/protected/gameCreate';
import Login from './components/auth/login';
import Logout from './components/auth/logout';
import Register from './components/auth/register';
import Home from './components/home';

import LoadGames from './components/functions/LoadGames';
import { useEffect, useState } from 'react';
import UsersPage from './components/admin/usersPage';
import {ProtectedRoute, Unauthorized} from './components/protectedRoute';

 



const App: React.FC = () => {  

const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Check if user/token exists in localStorage
    const user = localStorage.getItem('user');
    setIsLoggedIn(!!user);
  }, []);

  
  
  
  

  return (
      <Router>
        <Header isLoggedIn={isLoggedIn}/>
        <LoadGames /> 
        <div className="container mt-4">
          <Routes>
            //public
            <Route path="/" element={<Home/>} />
            <Route path="/juegos" element={<VideoGameStore />} />
            <Route path="/acerca" element={''} />
           



            <Route path='/login' element={<Login setIsLoggedIn={setIsLoggedIn}/>} />
            <Route path='/registro' element={<Register setIsLoggedIn={setIsLoggedIn} />}/>
            <Route path="/logout" element={<Logout />} />
            
            
            //admin
            <Route element={<ProtectedRoute allowedRoles={[4]} />}>
            <Route path="/users" element={<UsersPage />} />
            </Route>
            // and Vendedor

            <Route element={<ProtectedRoute allowedRoles={[1,4]}/>}></Route>
            <Route path= "/createGame" element={<GameCreate/>}/>

            //unauthorized    
            <Route path="/unauthorized" element={<Unauthorized />} />
           
            
          </Routes>
        </div>
      </Router>
  )
};



export default App;

