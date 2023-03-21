import './App.css';
import Banner from './components/Banner';
import MoviesListGenres from './components/MoviesListGenres';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from './api';
import GenrePage from './components/GenrePage';
function App() {
  const [data, setData] = useState(null);

  useEffect(() => {
    async function getAllFilms() {
      const { getFilms } = api;
      const getAll = await getFilms();
      setData(getAll);
      return getAll;
    }
    getAllFilms();
    // console.log(data);
  }, []);
  return (
    <div className="App">
      <Banner data={data} />
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MoviesListGenres data={data} />} />
          <Route path="genre/:id" element={<GenrePage data={data} />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
