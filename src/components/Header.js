import React from 'react';
import user from '../img/user.svg';
import logo from '../img/logo.svg';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

const header = () => {
  return (
    <section className={styles.header}>
      <div
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: '1rem 2rem',
        }}
      >
        <img src={user} alt="usuário" className={styles.user} />
        <Link to={'/'}>
          <img src={logo} alt="logomarca" className={styles.logo} />
        </Link>

        <div style={{ color: '#fff' }}>
          <div>●</div>
          <div>●</div>
          <div>●</div>
        </div>
      </div>
    </section>
  );
};

export default header;
