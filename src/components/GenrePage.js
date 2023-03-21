import React from 'react';
import { useParams } from 'react-router-dom';
import styles from './GenrePage.module.css';
import { Link } from 'react-router-dom';

const GenrePage = ({ data }) => {
  const param = useParams();
  let index;
  if (data) {
    index = data.findIndex((data) => data.pathName === param.id);
  }

  console.log(data);
  return (
    <section style={{ color: '#fff' }} className={styles.genreSection}>
      <Link to={'/'} style={{ textDecoration: 'none' }} className={styles.link}>
        {'< '} Voltar à Página Principal
      </Link>

      <h1>{data && data[index].genreName}</h1>

      <div className={styles.genreMovieContent}>
        {data &&
          data[index].films.json.results.map(
            ({ id, name, title, poster_path, original_name }) => (
              <div key={id} className={styles.genreMovie}>
                {/* <h1>{name ? name : title}</h1> */}

                <img
                  src={`https://image.tmdb.org/t/p/w300${poster_path}`}
                  alt={original_name}
                />
              </div>
            ),
          )}
      </div>
    </section>
  );
};

export default GenrePage;
