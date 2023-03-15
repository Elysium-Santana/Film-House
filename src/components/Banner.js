import React, { useEffect, useState } from 'react';
import api from '../api';
import styles from './Banner.module.css';

const Banner = () => {
  const [data, setData] = useState(null);
  const [emphasisMovies, setemphasisMovies] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const { getFilms, aboutMoreWithId } = api;
  useEffect(() => {
    async function getAllFilms() {
      const getAll = await getFilms();
      setData(getAll);
    }
    getAllFilms();
  }, [getFilms]);

  useEffect(() => {
    createArraySelection();

    async function createArraySelection() {
      let emphasisMoviesArray = [];
      if (data) {
        const arrayFilms = data[0].films.json.results;

        while (emphasisMoviesArray.length < 7) {
          const aleatoryNumber = Math.floor(Math.random() * arrayFilms.length);
          if (!emphasisMoviesArray.includes(arrayFilms[aleatoryNumber])) {
            emphasisMoviesArray.push({
              movie: arrayFilms[aleatoryNumber],
              moreDetails: await aboutMoreWithId('136283'),
            });
          }
        }
        setemphasisMovies(emphasisMoviesArray);
      }
    }
    const timeSlide = setInterval(() => {
      setSlideIndex((slideIndex) => (slideIndex < 6 ? slideIndex + 1 : 0));
    }, 3000);

    return () => clearInterval(timeSlide);
  }, [data, aboutMoreWithId]);

  // console.log(emphasisMovies, slideIndex);

  return (
    <div className={styles.bannerConteiner}>
      <div className={styles.verticalShadow}></div>
      <div className={styles.horizontalShadow}></div>

      {emphasisMovies &&
        emphasisMovies.map((i, index) => {
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
      <div className={styles.statusBar}>
        {emphasisMovies.map((item, index) => (
          <span
            key={index}
            className={slideIndex === index ? styles.active : ''}
          ></span>
        ))}
      </div>
    </div>
  );
};

export default Banner;
