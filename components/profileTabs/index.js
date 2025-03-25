import React from 'react'
import { Tab, Tabs } from '@mui/material'
import { useRouter } from 'next/router'
import FavoriteIcon from '@mui/icons-material/Favorite';
import PersonIcon from '@mui/icons-material/Person';
import Link from 'next/link';
import { useTranslation } from 'react-i18next';

const ProfileTabs = () => {
    const router = useRouter()
    const { pathname } = router
    const { t } = useTranslation();

    const getTabValue = () => {
        if (pathname === "/profile/favorite") return 0
        if (pathname === "/profile/account") return 1
        
        return false
    }

    return (
        <div>
            <Tabs 
                value={getTabValue()} 
                orientation="vertical" 
                sx={{ 
                overflow: "hidden", 
                padding: "3px 0px", 
                color: '#35d499',
                '& .MuiTabs-indicator': {
                    backgroundColor: '#35d499', // Change this color to your desired color
                }
                }}
            >
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
                    label={
                        <div style={{ display: 'flex', alignItems: 'center', color: '#35d499' }}>
                            <FavoriteIcon sx={{ marginRight: '8px', color: '#35d499' }} />
                            <span style={{ paddingTop: '5px' }}>{t('Favorites')}</span>
                        </div>
                    }
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
                    label={
                        <div style={{ display: 'flex', alignItems: 'center', color: '#35d499' }}>
                        <PersonIcon sx={{ marginRight: '8px', color: '#35d499', fontSize: 28 }} />
                        <span style={{ paddingTop: '5px' }}>{t('Account')}</span>
                        </div>
                    } 
                />
            </Tabs>
        </div>
    )
}

export default ProfileTabs
