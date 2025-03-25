import Head from 'next/head';
import { useTranslation } from 'react-i18next';
import { useState } from 'react';
import styles from './langButton.module.css'
const FloatingButton = () => {

  const { i18n } = useTranslation();

  const changeLanguage = (language) => {
    i18n.changeLanguage(language);
  };

  return (
    <div className={styles.floatingContainer} style={{ zIndex: 9999999 }}>
      <Head>
        <link href="https://fonts.googleapis.com/icon?family=Material+Icons" rel="stylesheet" />
      </Head>
      <div className={styles.floatingButton}>
        <img style={{ borderRadius: 25, height: 'inherit' }} src='/flags/country-flag.jpeg'></img>
      </div>
      <div className={styles.elementContainer}>
        {/* Türkiye */}
        <svg onClick={() => changeLanguage("tr")} style={{ borderRadius: 20 }} className={styles.floatElement} xmlns="http://www.w3.org/2000/svg" id="flag-icons-tr" viewBox="0 0 512 512">
          <g fillRule="evenodd">
            <path fill="#e30a17" d="M0 0h512v512H0z" />
            <path fill="#fff" d="M348.8 264c0 70.6-58.3 127.9-130.1 127.9s-130.1-57.3-130.1-128 58.2-127.8 130-127.8S348.9 193.3 348.9 264z" />
            <path fill="#e30a17" d="M355.3 264c0 56.5-46.6 102.3-104.1 102.3s-104-45.8-104-102.3 46.5-102.3 104-102.3 104 45.8 104 102.3z" />
            <path fill="#fff" d="m374.1 204.2-1 47.3-44.2 12 43.5 15.5-1 43.3 28.3-33.8 42.9 14.8-24.8-36.3 30.2-36.1-46.4 12.8z" />
          </g>
        </svg>

        {/* Pol */}
        {/* <span onClick={() => changeLanguage("pl")} className="floatElement">
          <svg style={{ borderRadius: 20 }} xmlns="http://www.w3.org/2000/svg" id="flag-icons-pl" viewBox="0 0 512 512">
            <g fillRule="evenodd">
              <path fill="#fff" d="M512 512H0V0h512z" />
              <path fill="#dc143c" d="M512 512H0V256h512z" />
            </g>
          </svg>
        </span> */}

        {/* Rusça */}
        {/* <span onClick={() => changeLanguage("ru")} className="floatElement">
          <svg style={{ borderRadius: 20 }} xmlns="http://www.w3.org/2000/svg" id="flag-icons-ru" viewBox="0 0 512 512">
            <g fillRule="evenodd" stroke-width="1pt">
              <path fill="#fff" d="M0 0h512v512H0z" />
              <path fill="#0039a6" d="M0 170.7h512V512H0z" />
              <path fill="#d52b1e" d="M0 341.3h512V512H0z" />
            </g>
          </svg>
        </span> */}

        {/* Çekçe */}
        {/* <span onClick={() => changeLanguage("cs")} className="floatElement">
          <svg style={{ borderRadius: 20 }} xmlns="http://www.w3.org/2000/svg" id="flag-icons-cz" viewBox="0 0 512 512">
            <path fill="#fff" d="M0 0h512v256H0z" />
            <path fill="#d7141a" d="M0 256h512v256H0z" />
            <path fill="#11457e" d="M300 256 0 56v400z" />
          </svg>
        </span> */}

        {/* Almanca */}
        {/* <span onClick={() => changeLanguage("de")} className="floatElement">
          <svg style={{ borderRadius: 20 }} xmlns="http://www.w3.org/2000/svg" id="flag-icons-de" viewBox="0 0 512 512">
            <path fill="#fc0" d="M0 341.3h512V512H0z" />
            <path fill="#000001" d="M0 0h512v170.7H0z" />
            <path fill="red" d="M0 170.7h512v170.6H0z" />
          </svg>
        </span> */}

        {/* İngilizce */}
        <span onClick={() => changeLanguage("en")} className={styles.floatElement}>
          <svg style={{ borderRadius: 20 }} xmlns="http://www.w3.org/2000/svg" id="flag-icons-us" viewBox="0 0 512 512">
            <path fill="#bd3d44" d="M0 0h512v512H0" />
            <path stroke="#fff" strokeWidth="40" d="M0 58h512M0 137h512M0 216h512M0 295h512M0 374h512M0 453h512" />
            <path fill="#192f5d" d="M0 0h390v275H0z" />
            <marker id="us-a" markerHeight="30" markerWidth="30">
              <path fill="#fff" d="m15 0 9.3 28.6L0 11h30L5.7 28.6" />
            </marker>
            <path fill="none" markerMid="url(#us-a)" d="m0 0 18 11h65 65 65 65 66L51 39h65 65 65 65L18 66h65 65 65 65 66L51 94h65 65 65 65L18 121h65 65 65 65 66L51 149h65 65 65 65L18 177h65 65 65 65 66L51 205h65 65 65 65L18 232h65 65 65 65 66z" />
          </svg>
        </span>
      </div>
    </div>
  )
};

export default FloatingButton;
