import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './views/login/login';
import Main from './views/main/main';
import Plaza from './views/plaza/plaza';
import Register from './views/register/register';
import Result from './views/result/result';
import Settings from './views/settings/settings';
import Profile from './views/profile/profile';
import Homepage from './views/homepage/homepage'
import JobPosts from './views/jobposts/jobposts';
import Docs from './views/Docs/docs';


function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/plaza" element={<Plaza />} />
        <Route path="/register" element={<Register />} />  
        <Route path="/result" element={<Result />} />
        <Route path="/settings" element={<Settings />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/homepage" element={<Homepage />} />
        <Route path="/jobposts" element={<JobPosts />} />
        <Route path="/docs" element={<Docs />} />
      </Routes>
    </Router>
  );
}

export default App;

