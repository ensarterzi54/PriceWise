import React from 'react'
import Box from '@mui/material/Box'
import styles from './profile.module.css'
import dynamic from 'next/dynamic'

const ProfileTabs = dynamic(() => import('../../components/profileTabs'), { ssr: false })

const ProfileLayout = ({ children }) => {
  const profileStyle = {
    backgroundImage: "url('/images/profil_bg.jpg')",
    backgroundSize: "cover",
    backgroundPosition: "bottom",
    height: "100vh",
    paddingBottom: "250px"
};

  return (
    <div className={`${styles.profile}`} style={profileStyle}>
      <div className="row pt-5">
        <div className="col-3">
          <Box sx={{ width: '100%', bgcolor: 'background.paper', border: "1px solid rgba(0, 0, 0, 0.12)", borderRadius:"8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <ProfileTabs />
          </Box>
        </div>
        <div className="col-9">
          <div className="tab-content" id="v-pills-tabContent">
            <main>{children}</main>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileLayout
