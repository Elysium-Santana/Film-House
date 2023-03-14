import { useState, useEffect } from 'react';
import api from '../api';
import MovieList from './MovieList';

const MoviesListGenres = () => {
  const [data, setData] = useState([]);

  useEffect(() => {
    async function getAllFilms() {
      const { getFilms } = api;
      const getAll = await getFilms();
      console.log(getAll);
      setData(getAll);
    }
    getAllFilms();
  }, []);
  console.log(data);

  return (
    <section>
      {data &&
        data.map((genre) => (
          <MovieList key={genre.genreName} data={data} genre={genre} />
        ))}
    </section>
  );
};

export default MoviesListGenres;
