import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import AnimeById from './components/animeById/AnimeById';
import SearchPage from './components/searchPage/SearchPage';

// export interface Props {
//   exact: Boolean
// }

const App: React.FC = () => {
  return (
    <div className="App">
    <Router>
      <Routes>
        <Route path="/" element={<SearchPage />} />
        <Route path="/search/:id" element={<AnimeById />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
