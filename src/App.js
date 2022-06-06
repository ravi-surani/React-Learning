
import './App.css';

import { BrowserRouter, Routes, Route } from 'react-router-dom'

import Home from './Components/Home'
import Login from './Components/Login'
import UsersListComponent from './Components/UsersTodo/UsersListComponent';
import { useEffect } from 'react';

function App() {
 
  return (
    <div className="App">
      <header className="App-header">



        <BrowserRouter>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/userlist' element={<UsersListComponent />} />

            {/* <Route path='/login' element={<Home />} />
            <Route path='/login' element={<Login />} />
            <Route path='/' element={<UsersList />} /> */}

          </Routes>
        </BrowserRouter>

      </header>
    </div>
  );
}

export default App;
