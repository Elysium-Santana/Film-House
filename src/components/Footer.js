import React from 'react';
import logo from '../img/logo.svg';

const Footer = () => {
  return (
    <div
      style={{
        color: '#ddd',
        padding: '3rem 4rem',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        gap: '1rem',
        borderTop: '4px solid #111',
      }}
    >
      <img src={logo} alt="logomarca" style={{ width: '150px' }} />
      <p style={{ fontSize: '1.2rem' }}>
        Entretenimento de qualidade, na sua casa.
      </p>
      <p style={{ fontSize: '1rem', color: '#444' }}>
        Utilizamos a API Themoviedb apenas para fins educacionais e de prática
        de React em nossa aplicação de filmes.
      </p>
    </div>
  );
};

export default Footer;
