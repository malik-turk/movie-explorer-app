import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import MovieList from './pages/MovieList';
import MovieDetails from './pages/MovieDetails';

const App: React.FC = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<MovieList />} />
        <Route path="/movie/:id" element={<MovieDetails />} />
      </Routes>
    </Router>
  );
};

export default App;
