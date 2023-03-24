import React, { useRef, useState } from 'react';
import arrow from '../img/arrow.svg';
import styles from './MoviesListGenres.module.css';
import { Link } from 'react-router-dom';
import Modal from './Modal';

const MovieList = ({ genre }) => {
  const [modal, setModal] = useState(null);

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
  }

  return (
    <section style={{ color: '#fff' }} className={styles.section}>
      <Modal data={genre.films} modal={modal} setModal={setModal} />
      <Link
        style={{ textDecoration: 'none' }}
        className={styles.link}
        to={`genre/${genre.pathName}`}
      >
        {genre.genreName + '  >'}
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
