import { useState, useEffect } from 'react';
import api from '../api';
import styles from './FilmsList.module.css';
const FilmsList = () => {
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

  return (
    <section className={styles.genreSection}>
      {data &&
        data.map((i) => (
          <div key={i.gengeName} className={styles.film}>
            <h1> {i.gengeName}</h1>
            {i.films.json.map(({ name, title, id, poster_path }) => (
              <div key={id}>
                <p>{name ? name : title}</p>
                <img src={`https://image.tmdb.org/t/p/w300${poster_path}`} />
              </div>
            ))}
          </div>
        ))}
    </section>
  );
};

export default FilmsList;
