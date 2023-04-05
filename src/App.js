import './App.css';
import Banner from './components/Banner';
import MoviesListGenres from './components/MoviesListGenres';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useState, useEffect } from 'react';
import api from './api';
import GenrePage from './components/GenrePage';
import Loading from './components/Loading';
import Header from './components/Header';

function App() {
  const [data, setData] = useState(null);
  const [loading, setLoading] = useState(null);
  const [modal, setModal] = useState(null);

  const { getFilms } = api;

  useEffect(() => {
    async function getAllFilms() {
      setLoading(true);
      const getAll = await getFilms(5);
      setData(getAll);
      setLoading(null);
      return getAll;
    }
    getAllFilms();
  }, []);
  return (
    <div className="App">
      <Header />
      {loading && <Loading />}
      <Banner data={data} setLoading={setLoading} />

      <BrowserRouter>
        <Routes>
          <Route path="/" element={<MoviesListGenres data={data} />} />
          <Route
            path="genre/:id"
            element={
              <GenrePage
                setLoading={setLoading}
                setModal={setModal}
                modal={modal}
              />
            }
          />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
