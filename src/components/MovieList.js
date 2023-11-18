import React, { useRef, useState } from 'react';
import arrow from '../img/arrow.svg';
import styles from './MoviesListGenres.module.css';
import { Link } from 'react-router-dom';
import Modal from './Modal';

const MovieList = ({ genre, modal, setModal }) => {
  const [data, setData] = useState(null);

  const divScroll = useRef(null);

  function handleMove(side) {
    const scrollRef = divScroll.current;
    const positionX = scrollRef.scrollLeft;

    if (side === 'left') {
      let x = positionX - 600;
      scrollRef.scrollTo({
        left: x,
        behavior: 'smooth',
      });
    } else if (side === 'right') {
      let x = positionX + 600;
      scrollRef.scrollTo({
        left: x,
        behavior: 'smooth',
      });
    }
  }

  function handleClick(params) {
    setModal({ id: params });
    setData(genre.films);
  }

  return (
    <section style={{ color: '#fff' }} className={styles.section}>
      <Modal data={data} modal={modal} setModal={setModal} setData={setData} />
      <Link
        style={{
          textDecoration: 'none',
          display: 'flex',
          alignItems: 'center',
        }}
        className={styles.link}
        to={`genre/${genre.genreName}`}
      >
        {genre.genreName}
        <svg
          style={{ scale: '-1' }}
          width="30"
          height="30"
          viewBox="0 0 48 48"
          fill="#fff"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M32.8 43.9L35.6 41.05L18.45 23.9L35.6 6.75L32.8 3.9L12.8 23.9L32.8 43.9Z" />
        </svg>
      </Link>

      <div className={styles.arrouNavLeft} onClick={() => handleMove('left')}>
        <img src={arrow} alt="arrowLeft" />
      </div>
      <div className={styles.arrouNavRight} onClick={() => handleMove('right')}>
        <img src={arrow} alt="arrowRight" />
      </div>
      <div
        ref={divScroll}
        style={{
          scrollBehavior: 'smooth',
          transition: 'scroll-behavior 1s ease',
        }}
        className={styles.movieListConteiner}
      >
        {genre.films.json.results.map(({ id, poster_path, original_name }) => (
          <div
            className={styles.movieListContent}
            key={id}
            onClick={() => handleClick(id)}
          >
            <img
              src={`https://image.tmdb.org/t/p/w300${poster_path}`}
              alt={original_name}
            />
          </div>
        ))}
      </div>
    </section>
  );
};

export default MovieList;
