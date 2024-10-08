import NavBar from '@/components/navBar'
import React from 'react'

const Layout = ({ children }) => {
  return (
    <div>
      <NavBar />
      <main>{children}</main>
    </div>
  )
}

export default Layout
