import React, { useEffect, useState } from 'react';
import styles from './Modal.module.css';
import api from '../api';
import { useParams } from 'react-router-dom';

const Modal = ({ modal, data, setModal, setData }) => {
  const [moreDetails, setMoreDetails] = useState(null);
  const params = useParams();

  let dataType;
  let indexId;
  let results;
  let details;
  useEffect(() => {
    const getMoreDetails = async () => {
      if (modal && dataType) {
        const { aboutMoreWithId } = api;
        details = await aboutMoreWithId(modal.id, dataType);
        setMoreDetails(details.detailsWithId.json);
      }
    };
    getMoreDetails();
  }, [modal, dataType]);

  if (data && modal) {
    results = data.json.results;
    dataType = data.json.results[0].first_air_date ? 'session' : 'movie';
    indexId = results.findIndex((item) => item.id === modal.id);
  }

  function handleClick({ target }) {
    if (target.id === 'transparent') {
      setModal(null);
      if (Object.keys(params).length === 0) {
        setData(null);
      }
    }
  }

  return (
    <div>
      {results && (
        <div
          className={styles.transparent}
          id="transparent"
          onClick={handleClick}
        >
          <div className={styles.modalConteiner}>
            <img
              src={`https://image.tmdb.org/t/p/w300${results[indexId].poster_path}`}
              alt={results[indexId].original_name}
            />

            <div className={styles.modalTopContent}>
              <h2>
                {results[indexId].title
                  ? results[indexId].title
                  : results[indexId].name}
              </h2>
            </div>

            <div className={styles.modalContent}>
              {moreDetails && (
                <div>
                  <div
                    style={{ display: 'flex', justifyContent: 'space-between' }}
                  >
                    <div>
                      <span className={styles.strong}>Avaliaçao:</span>{' '}
                      <p>{moreDetails.vote_average.toFixed(1)}</p>
                    </div>

                    {moreDetails.first_air_date && (
                      <p>
                        {new Date(moreDetails.first_air_date).getFullYear()}
                      </p>
                    )}
                    {moreDetails.release_date && (
                      <p>{new Date(moreDetails.release_date).getFullYear()}</p>
                    )}
                    {moreDetails.runtime && (
                      <p>{moreDetails.runtime + ' Min.'}</p>
                    )}

                    {moreDetails.seasons && (
                      <p>
                        {moreDetails.seasons.length + ' TEMPORADA'}
                        {moreDetails.seasons.length === 1 ? ' ' : 'S'}
                      </p>
                    )}
                  </div>
                  <span className={styles.strong}>Gênero</span>
                  {moreDetails.genres.length > 1 ? (
                    <span className={styles.strong}>s</span>
                  ) : (
                    ''
                  )}
                  :{' '}
                  {moreDetails.genres.map(({ name, id }, index) => (
                    <span key={id}>
                      {moreDetails.genres.length > 1 && index !== 0
                        ? ' , ' + name + ' '
                        : ' ' + name}
                    </span>
                  ))}
                  .
                </div>
              )}

              <p>{results[indexId].overview}</p>

              <button>Assistir</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Modal;
