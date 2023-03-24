import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import styles from './GenrePage.module.css';
import { Link } from 'react-router-dom';
import api from '../api';
import Modal from './Modal';

const GenrePage = () => {
  const [data, setData] = useState(null);
  const [pagesNext, setPagesNext] = useState([]);
  const [pagesPrev, setPagesPrev] = useState([]);
  const [atualPage, setAtualPage] = useState(null);
  const [modal, setModal] = useState(null);

  const param = useParams();

  const { getFilms } = api;
  let arrayPagesNext = [];
  let arrayPagesPrev = [];
  let index;

  async function fetchData(page) {
    const films = await getFilms(page);
    setAtualPage(page);
    index = films.findIndex((data) => data.pathName === param.id);
    setData(films[index].films);
  }

  useEffect(() => {
    let page = atualPage ? atualPage : 1;
    fetchData(page);
    setAtualPage(data && data.json.page);
  }, []);

  useEffect(() => {
    if (data) {
      arrayPagesNext = [
        atualPage + 1,
        atualPage + 2,
        atualPage + 3,
        atualPage + 4,
        atualPage + 5,
      ];
      arrayPagesPrev = [
        atualPage - 5,
        atualPage - 4,
        atualPage - 3,
        atualPage - 2,
        atualPage - 1,
      ];
      setPagesPrev(arrayPagesPrev);

      setPagesNext(arrayPagesNext);
    }
  }, [atualPage]);

  function handleClick(dado, par) {
    setModal({ id: dado, param: par });
  }

  return (
    <section style={{ color: '#fff' }} className={styles.genreSection}>
      <Modal data={data} modal={modal} setModal={setModal} />
      <h1>{param.id}</h1>

      <Link to={'/'} style={{ textDecoration: 'none' }} className={styles.link}>
        {'< '} Voltar à Página Principal
      </Link>

      <div className={styles.genreMovieContent}>
        {data &&
          data.json.results.map(
            ({ id, poster_path, original_name, original_title }) => (
              <div
                onClick={() => handleClick(id, param.id)}
                key={id}
                className={styles.genreMovie}
              >
                <img
                  src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                  alt={original_name ? original_name : original_title}
                />
              </div>
            ),
          )}
      </div>
      <div className={styles.buttonBox}>
        {pagesPrev.map((item) => (
          <button
            style={{
              backgroundColor:
                item < 1
                  ? 'rgba(255, 255, 255, 0.05)'
                  : 'rgba(255, 255, 255, 0.2)',
              pointerEvents: item < 1 ? 'none' : 'initial',
            }}
            key={item}
            onClick={() => fetchData(item)}
            className={styles.button}
          >
            {item > 0 && item}
          </button>
        ))}
        <h1 style={{ textAlign: 'center', margin: '20px' }}>{atualPage}</h1>
        {pagesNext.map((item) => (
          <button
            key={item}
            onClick={() => fetchData(item)}
            className={styles.button}
          >
            {item}
          </button>
        ))}
      </div>
    </section>
  );
};

export default GenrePage;
