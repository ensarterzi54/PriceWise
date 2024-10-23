import NavBar from '@/components/navBar'
import ScrapeContextProvider from '@/contexts/ScrapeContext'
import React from 'react'
import styles from "./layout.module.css"
const Layout = ({ children }) => {
  return (
    <div>
      <ScrapeContextProvider>
        <NavBar />
        <main className={styles.layoutMain} style={{ backgroundColor: "rgb(246, 246, 246)" }}>{children}</main>
      </ScrapeContextProvider>
    </div>
  )
}

export default Layout
