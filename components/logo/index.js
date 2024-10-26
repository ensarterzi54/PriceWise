import React from 'react'
import styles from "../logo/logo.module.css"
const Logo = () => {
  return (
    <div className={styles.logo}>
        <div className={styles.tag}>
            <div className={styles.circle}>
                <span className={styles.checkmark}>✔</span>
            </div>
        </div>
        <span className={styles.text}>PriceWise</span>
    </div>
  )
}

export default Logo
