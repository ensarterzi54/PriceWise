import Link from "next/link"
import { AuthContext } from "../../contexts/AuthContex"
import React, { useContext, useEffect, useState } from 'react'
import { Avatar, IconButton, InputAdornment, Menu, MenuItem, MenuList, TextField } from "@mui/material"
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from "../navBar/navBar.module.css"
const NavBar = () => {
    const [value, setValue] = useState("")
    const { signOutWithGoogle, user } = useContext(AuthContext)
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);

    const handleMenuOpen = (event) => {
      setAnchorEl(event.currentTarget);
    };
  
    const handleMenuClose = () => {
      setAnchorEl(null);
    };
  
    const isMenuOpen = Boolean(anchorEl);

    const search = (value) => {
        router.push(`/search/${value}`)
    }

    const linkStyle = {
        textDecoration: "none",
        color: "inherit"
    }

    return (
        <div className={`${styles.nav} pt-3 pb-2`}>
            <div className="mt-2" style={{fontWeight: "bold"}}>
                <Link href="/">PriceWise</Link>
            </div>
            <div className="mu-input pt-1">
                <TextField 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                    sx={{ width: '60ch' }} 
                    label="Neyi ucuza aramak istersin?" 
                    variant="outlined" 
                    size="small"
                    slotProps={{
                        input: {
                            endAdornment: 
                            <InputAdornment position="start">
                                <IconButton type="button" aria-label="search" onClick={() => search(value)}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>,
                        },
                    }}
                />
            </div>
            <div>
                { 
                    <>
                        {
                            user ?  <>
                                        <IconButton
                                            onMouseEnter={handleMenuOpen} // Avatar üzerine gelince menüyü aç
                                            >
                                            <Avatar src={ user && user.photoURL } />
                                        </IconButton>
                
                                    
                                        <Menu
                                            anchorEl={anchorEl}
                                            open={isMenuOpen}
                                            onClose={handleMenuClose}  // Menü dışına tıklayınca kapanmasını sağla
                                            anchorOrigin={{
                                            vertical: 'bottom',  // Menü avatarın altında açılır
                                            horizontal: 'center',
                                            }}
                                            transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'center',
                                        }}
                                            MenuListProps={{
                                                onMouseLeave: handleMenuClose,  // Menüden çıkınca kapat
                                            }}
                                            disableScrollLock
                                        >
                                            <MenuList
                                                sx={{ 
                                                    border: 'none', 
                                                    boxShadow: 'none', 
                                                    '&:hover': { 
                                                        backgroundColor: 'transparent' // Hover durumunda arka plan rengi değişimini önleyebilirsiniz
                                                    },
                                                    '&:focus': {
                                                        outline: 'none' // Focus durumundaki kenarlığı kaldırır
                                                    }
                                                }}
                                            >
                                                <Link href="/profile" style={linkStyle}>
                                                    <MenuItem onClick={handleMenuClose} sx={{ borderBottom: 'none', boxShadow: 'none' }}>
                                                        <PermIdentityIcon />Profil
                                                    </MenuItem>
                                                </Link>
                                                <Link href="/" style={linkStyle}>
                                                    <MenuItem onClick={handleMenuClose} sx={{ borderBottom: 'none', boxShadow: 'none' }}>
                                                        <NotificationsNoneIcon />Takip Listem
                                                    </MenuItem>
                                                </Link>
                                                <Link href="/" style={linkStyle} onClick={() => signOutWithGoogle()}>
                                                    <MenuItem onClick={handleMenuClose} sx={{ borderBottom: 'none', boxShadow: 'none' }}>
                                                        <LogoutIcon />Çıkış Yap
                                                    </MenuItem>
                                                </Link>
                                            </MenuList>
                                        </Menu>
                                    </> :
                                        <div>
                                            <IconButton>
                                                <Avatar />
                                            </IconButton>
                                            <Link className="ml-2 mt-2" href="/login">Giriş Yap</Link>
                                        </div> 
                        }
                        
                        {/* <img src={ user && user.photoURL } style={ imgStyle } alt="" />  */}
                        { user ? user.email : null }
                    </>
                }
            </div>
        </div>
    )
}

export default NavBar
