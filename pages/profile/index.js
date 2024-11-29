import { ThemeContext } from '@/contexts/ThemeContext'
import React, { useContext, useEffect } from 'react'

const Profile = () => {
  const { systemTheme, setSystemTheme } = useContext(ThemeContext)
  useEffect(() => {
    console.log("erert",systemTheme)
  }, [systemTheme]);
  return (
    <div>
      {
        systemTheme ? <p>sdlks</p> : <p>eortı</p>
      }
    </div>
  )
}

export default Profile
