import Head from './Head';
import MovieList from './MovieList';

const MoviesListGenres = ({ data, modal, setModal }) => {
  return (
    <section>
      <Head title="Home" />
      {data &&
        data.map((genre) => (
          <MovieList
            key={genre.genreName}
            data={data}
            genre={genre}
            modal={modal}
            setModal={setModal}
          />
        ))}
    </section>
  );
};

export default MoviesListGenres;
