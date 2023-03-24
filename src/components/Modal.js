import React, { useEffect, useState, useRef } from 'react';
// import api from '../api';

const Modal = ({ modal, data, setModal }) => {
  let indexId;
  let results;
  if (data && modal) {
    console.log(data, modal);
    results = data.json.results;
    indexId = results.findIndex((item) => item.id === modal.id);
  }
  function handleClick({ target }) {
    if (target.id === 'modalBase') {
      setModal(null);
    }
  }

  return (
    <div>
      {results && (
        <div
          id="modalBase"
          onClick={handleClick}
          style={{
            position: 'fixed',
            top: '0',
            left: '0',
            width: '100vw',
            height: '100vh',
            backgroundColor: 'rgba(0, 0, 0, 0.9)',
            zIndex: '10',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <img
            src={`https://image.tmdb.org/t/p/w300${results[indexId].poster_path}`}
            alt={results[indexId].original_name}
          />
        </div>
      )}
    </div>
  );
};

export default Modal;
