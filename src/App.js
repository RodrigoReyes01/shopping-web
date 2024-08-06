import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Search from './views/Search';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/search" element={<Search />} />
          <Route path="/" element={<Search />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
