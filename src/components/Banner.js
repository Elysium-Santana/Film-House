import React, { useEffect, useState } from 'react';
import api from '../api';
import styles from './Banner.module.css';

const Banner = () => {
  const [data, setData] = useState(null);
  const [destakMovies, setDestakMovies] = useState([]);
  const [slideIndex, setSlideIndex] = useState(2);
  const { getFilms, aboutMoreWithId } = api;
  useEffect(() => {
    async function getAllFilms() {
      const getAll = await getFilms();
      setData(getAll);
    }
    getAllFilms();
    createArraySelection();

    async function createArraySelection() {
      let destakMoviesArray = [];
      if (data) {
        const arrayFilms = data[0].films.json.results;

        while (destakMoviesArray.length < 5) {
          const aleatoryNumber = Math.floor(Math.random() * arrayFilms.length);
          if (!destakMoviesArray.includes(arrayFilms[aleatoryNumber])) {
            destakMoviesArray.push({
              movie: arrayFilms[aleatoryNumber],
              moreDetails: await aboutMoreWithId('136283'),
            });
          }
        }
        console.log(arrayFilms);
        setDestakMovies(destakMoviesArray);
      }
    }
  }, [!!data]);
  console.log(destakMovies);

  return (
    <div className={styles.bannerConteiner}>
      <div className={styles.verticalShadow}></div>
      <div className={styles.horizontalShadow}></div>
      {destakMovies &&
        destakMovies.map((i, index) => {
          if (slideIndex === index) {
            return (
              <div key={i.movie.id}>
                <h1>{i.movie.name}</h1>
                <p>{i.movie.overview}</p>
                <div className={styles.imgBox}>
                  <img
                    src={`https://image.tmdb.org/t/p/original${i.movie.backdrop_path}`}
                    alt={i.movie.original_name}
                  />
                </div>
              </div>
            );
          }
        })}
    </div>
  );
};

export default Banner;
