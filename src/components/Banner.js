import React, { useEffect, useState } from 'react';
import api from '../api';
import styles from './Banner.module.css';

const Banner = ({ data, setLoading }) => {
  const [emphasisMovies, setemphasisMovies] = useState([]);
  const [slideIndex, setSlideIndex] = useState(0);
  const { aboutMoreWithId } = api;

  useEffect(() => {
    async function createArraySelection() {
      let emphasisMoviesArray = [];
      setLoading(true);
      const arrayFilms = await data[0].films.json.results;
      setLoading(false);
      const usedIds = [];

      while (emphasisMoviesArray.length < 7) {
        const aleatoryNumber = Math.floor(Math.random() * arrayFilms.length);
        const selectedFilm = arrayFilms[aleatoryNumber];

        if (
          !emphasisMoviesArray.some(
            (item) => item.movie.name === selectedFilm.name,
          ) &&
          !usedIds.includes(selectedFilm.id) &&
          selectedFilm.overview.length > 0
        ) {
          setLoading(true);
          emphasisMoviesArray.push({
            movie: selectedFilm,

            moreDetails: await aboutMoreWithId(selectedFilm.id, 'session'),
          });
          setLoading(false);
          usedIds.push(selectedFilm.id);
        }
      }

      setemphasisMovies(emphasisMoviesArray);
    }
    if (data) {
      createArraySelection();
    }

    const timeSlide = setInterval(() => {
      setSlideIndex((slideIndex) => (slideIndex < 6 ? slideIndex + 1 : 0));
    }, 3000);
    return () => clearInterval(timeSlide);
  }, [data]);

  return (
    <div className={styles.bannerConteiner}>
      {emphasisMovies &&
        emphasisMovies.map(({ movie, moreDetails }, index) => {
          let overview = movie.overview;
          if (overview.length > 220) {
            overview = overview.substring(0, 220) + ' ...';
          }
          let year = new Date(
            moreDetails.detailsWithId.json.seasons[0].air_date,
          );
          return (
            <div
              key={movie.id}
              className={`${styles.bannerItem} ${
                slideIndex === index ? styles.active : ''
              }`}
            >
              <h1>{movie.name}</h1>
              <div
                style={{
                  display: 'flex',
                  gap: '1rem',
                  marginBottom: '1rem',
                }}
              >
                <div
                  className={styles.points}
                  style={{ color: 'rgb(255,255,255,0.5)' }}
                >
                  Avaliação: {movie.vote_average}
                </div>
                <div>{year.getFullYear()}</div>
                <div className={styles.seasons}>
                  {moreDetails.detailsWithId.json.number_of_seasons}
                  {moreDetails.detailsWithId.json.number_of_seasons > 1
                    ? ' Temporadas'
                    : ' Temporada'}
                </div>
              </div>
              {}
              <p>{overview}</p>

              <div
                style={{
                  marginBottom: '1rem ',
                  color: 'rgb(255,255,255,0.5)',
                }}
              >
                Gêneros:
                {moreDetails.detailsWithId.json.genres.map(({ name }) => (
                  <span key={name} style={{ marginLeft: '.3rem' }}>
                    {name}
                  </span>
                ))}
              </div>

              <div className={styles.buttonBox}>
                <button>Assistir</button>
                <button>Meus Mavoritos</button>
              </div>

              <div className={styles.verticalShadow}></div>
              <div className={styles.horizontalShadow}></div>
              <div className={styles.imgBox}>
                <img
                  src={`https://image.tmdb.org/t/p/original${movie.backdrop_path}`}
                  alt={movie.original_name}
                />
              </div>
            </div>
          );
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
