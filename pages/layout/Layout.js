import NavBar from '@/components/navBar'
import ScrapeContextProvider from '@/contexts/ScrapeContext'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <div>
      <ScrapeContextProvider>
        <NavBar />
        <main style={{ backgroundColor: "rgb(246, 246, 246)" }}>{children}</main>
      </ScrapeContextProvider>
    </div>
  )
}

export default Layout
