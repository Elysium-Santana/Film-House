import React from 'react';
import logo from '../img/logo.svg';
import styles from './Footer.module.css';

const Footer = () => {
  return (
    <div className={styles.footer}>
      <img src={logo} alt="logomarca" style={{ width: '150px' }} />
      <p>Entretenimento de qualidade, na sua casa.</p>
      <p>
        Utilizamos a API Themoviedb apenas para fins educacionais e de prática
        de React em nossa aplicação de filmes.
      </p>
    </div>
  );
};

export default Footer;
