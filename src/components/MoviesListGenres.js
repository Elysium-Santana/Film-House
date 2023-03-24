import { useState } from 'react';
import MovieList from './MovieList';

const MoviesListGenres = ({ data }) => {
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
