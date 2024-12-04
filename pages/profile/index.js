import { ThemeContext } from '@/contexts/ThemeContext'
import React, { useContext, useEffect, useState } from 'react'
import styles from "./profile.module.css"
import Account from './account'
import Favorite from './favorite'
import Link from 'next/link'

const Profile = () => {
  const { systemTheme, setSystemTheme } = useContext(ThemeContext)
  const [activeTab, setActiveTab] = useState("v-pills-home-tab");

  const handleTabClick = (tabId) => {
    setActiveTab(tabId); // Tıklanan tab'ı aktif olarak ayarla
  };

  useEffect(() => {
    console.log("erert",systemTheme)
  }, [systemTheme]);

  return (
    <div className="container profile">
      <div className="row mt-5">
        <div className="col-3">
          <div className={`nav flex-column nav-pills border pl-3 ${styles.sideBar}`} id="v-pills-tab" role="tablist" aria-orientation="vertical">
            <span 
              className={`${styles.tab} ${activeTab === "v-pills-home-tab" ? styles.active : ""}`} 
              onClick={() => handleTabClick("v-pills-home-tab")} 
              id="v-pills-home-tab" 
              data-toggle="pill" 
              data-target="#v-pills-home" 
              type="button" 
              role="tab" 
              aria-controls="v-pills-home" 
              aria-selected="true"
            >Favorilerim</span>
            <span 
              className={`${styles.tab} ${activeTab === "v-pills-profile-tab" ? styles.active : ""}`} 
              onClick={() => handleTabClick("v-pills-profile-tab")} 
              id="v-pills-profile-tab" 
              data-toggle="pill" 
              data-target="#v-pills-profile" 
              type="button" 
              role="tab" 
              aria-controls="v-pills-profile" 
              aria-selected="false"
            >Hesabım</span>
            <span 
              className={`${styles.tab} ${activeTab === "v-pills-settings-tab" ? styles.active : ""}`} 
              onClick={() => handleTabClick("v-pills-settings-tab")} 
              id="v-pills-settings-tab" 
              data-toggle="pill" 
              data-target="#v-pills-settings" 
              type="button" 
              role="tab" 
              aria-controls="v-pills-settings" 
              aria-selected="false"
            >Ayarlar</span>
          </div>
        </div>
        <div className="col-9">
          <div className="tab-content" id="v-pills-tabContent">
            <div className="tab-pane fade show active" id="v-pills-home" role="tabpanel" aria-labelledby="v-pills-home-tab"><Favorite /></div>
            <div className="tab-pane fade" id="v-pills-profile" role="tabpanel" aria-labelledby="v-pills-profile-tab">Hesabım</div>
            <div className="tab-pane fade" id="v-pills-settings" role="tabpanel" aria-labelledby="v-pills-settings-tab">...</div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Profile
