import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Login from './views/login/login';
import Main from './views/main/main';
import Plaza from './views/plaza/plaza';
import Register from './views/register/register';
import Result from './views/result/result';
import Settings from './views/settings/settings';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/main" element={<Main />} />
        <Route path="/plaza" element={<Plaza />} />
        <Route path="/register" element={<Register />} />
        <Route path="/result" element={<Result />} />
        <Route path="/settings" element={<Settings />} />
      </Routes>
    </Router>
  );
}

export default App;
  