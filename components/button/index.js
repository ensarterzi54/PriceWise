import React from 'react'
import styles from './button.module.css'
const Button = () => {
  return (
    <button className={styles.button}>
        <span className={styles.span}>
            <span className={styles.span} aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 10 15">
                    <path d="M 10 0 L 10 5 L 5 5 L 0 0 Z M 0 5 L 5 5 L 10 10 L 5 10 L 5 15 L 0 10 Z" fill="currentColor"></path>
                </svg>
            </span>
            <span className={styles.span}>Satıcıya Git</span>
            <span className={styles.span} aria-hidden="true">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" d="M4.5 19.5l15-15m0 0H8.25m11.25 0v11.25" />
                </svg>
            </span>
        </span>
    </button>
  )
}

export default Button
