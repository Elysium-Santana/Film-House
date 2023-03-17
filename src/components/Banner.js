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
          if (!emphasisMoviesArray.includes(arrayFilms[aleatoryNumber].id)) {
            emphasisMoviesArray.push({
              movie: arrayFilms[aleatoryNumber],
              moreDetails: await aboutMoreWithId(arrayFilms[aleatoryNumber].id),
            });
          }
        }
        console.log(emphasisMovies);
        setemphasisMovies(emphasisMoviesArray);
      }
    }
    const timeSlide = setInterval(() => {
      setSlideIndex((slideIndex) => (slideIndex < 6 ? slideIndex + 1 : 0));
    }, 5000);
    return () => clearInterval(timeSlide);
  }, [data, aboutMoreWithId]);

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
              // key={movie.name}
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
                  fontSize: '1.2rem',
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
                  marginTop: '1rem',
                  fontSize: '1.2rem',
                  color: 'rgb(255,255,255,0.5)',
                }}
              >
                Gêneros:
                {moreDetails.detailsWithId.json.genres.map(({ name }) => (
                  <span style={{ marginLeft: '.3rem' }}>{name}</span>
                ))}
              </div>

              <div style={{ position: 'absolute', bottom: '20px' }}>
                <button>Assistir</button>
                <button>Favorito</button>
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

          return null;
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
