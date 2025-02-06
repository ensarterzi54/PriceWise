import React from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'  // 🔥 URL'den aktif sekmeyi almak için
import Box from '@mui/material/Box'
import Tabs from '@mui/material/Tabs'
import Tab from '@mui/material/Tab'
import styles from './profile.module.css'
const ProfileLayout = ({ children }) => {
  const router = useRouter()
  const { pathname } = router

  const getTabValue = () => {
    if (pathname === "/profile/favorite") return 0
    if (pathname === "/profile/account") return 1
    return false
  }

  return (
    <div className={`${styles.profile}`}>
      <div className="row pt-5">
        <div className="col-3">
          <Box sx={{ width: '100%', bgcolor: 'background.paper', border: "1px solid rgba(0, 0, 0, 0.12)", borderRadius:"8px", boxShadow: "0 4px 12px rgba(0, 0, 0, 0.1)" }}>
            <Tabs value={getTabValue()} orientation="vertical" sx={{ overflow: "hidden", padding: "3px 0px" }}>
              <Tab
                component={Link}
                href="/profile/favorite"
                sx={{
                  width: '100%',
                  textTransform: "none",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  textAlign: "left",
                  "&.Mui-selected": {
                    backgroundColor: "rgba(234, 221, 221, 0.08)",
                  },
                  "&:hover": {
                    textDecoration: "none"
                  },
                  overflow: "hidden"
                }}
                label="Favoriler"
              />
              <Tab 
                component={Link} 
                href="/profile/account" 
                sx={{
                  width: "100%",
                  textTransform: "none",
                  display: "flex",
                  justifyContent: "flex-start",
                  alignItems: "flex-start",
                  textAlign: "left",
                  "&.Mui-selected": {
                    backgroundColor: "rgba(234, 221, 221, 0.08)",
                  },
                  "&:hover": {
                    textDecoration: "none"
                  }
                }} 
                label="Hesabım" 
              />
            </Tabs>
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
