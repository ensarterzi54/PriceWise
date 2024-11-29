import Link from "next/link"
import { AuthContext } from "../../contexts/AuthContex"
import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Button, IconButton, InputAdornment, Menu, MenuItem, MenuList, TextField } from "@mui/material"
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
import PermIdentityIcon from '@mui/icons-material/PermIdentity';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import LogoutIcon from '@mui/icons-material/Logout';
import styles from "../navBar/navBar.module.css"
import Logo from "../logo";
import DehazeIcon from '@mui/icons-material/Dehaze';
import { ScrapeContext } from "@/contexts/ScrapeContext";
import FormGroup from '@mui/material/FormGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import { styled } from '@mui/material/styles';
import Switch from '@mui/material/Switch';
import { ThemeContext } from '@/contexts/ThemeContext';

const MaterialUISwitch = styled(Switch)(({ theme }) => ({
    width: 62,
    height: 34,
    padding: 7,
    '& .MuiSwitch-switchBase': {
      margin: 1,
      padding: 0,
      transform: 'translateX(6px)',
      '&.Mui-checked': {
        color: '#fff',
        transform: 'translateX(22px)',
        '& .MuiSwitch-thumb:before': {
          backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
            '#fff',
          )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`,
        },
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
        },
      },
    },
    '& .MuiSwitch-thumb': {
      backgroundColor: theme.palette.mode === 'dark' ? '#003892' : '#001e3c',
      width: 32,
      height: 32,
      '&::before': {
        content: "''",
        position: 'absolute',
        width: '100%',
        height: '100%',
        left: 0,
        top: 0,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="20" width="20" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          '#fff',
        )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`,
      },
    },
    '& .MuiSwitch-track': {
      opacity: 1,
      backgroundColor: theme.palette.mode === 'dark' ? '#8796A5' : '#aab4be',
      borderRadius: 20 / 2,
    },
}));
const NavBar = () => {
    const [value, setValue] = useState("")
    const { getCategories, categories } = useContext(ScrapeContext)
    const { signOutWithGoogle, user } = useContext(AuthContext)
    const { systemTheme, setSystemTheme } = useContext(ThemeContext)
    const router = useRouter();
    const [anchorEl, setAnchorEl] = useState(null);

    const [anchorElCategories, setAnchorElCategories] = useState(null);

    const handleMenuOpenCategories = (event) => {
        setAnchorElCategories(event.currentTarget);
    };

    const handleMenuCloseCategories = () => {
        setAnchorElCategories(null);
    };

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

    const switchClick = (event) => {
        console.log("event", event)
        setSystemTheme(event.target.checked)
    }

    useEffect(() => {
        getCategories()
    }, [])

    return (
        <div className={`${styles.nav} pt-2`}>
            <div className={`${styles.navBar}`}>
                <div className={`${styles.logo} mb-2`}>
                    <Link href="/" style={linkStyle}>
                        <Logo />
                    </Link>

                    <Button startIcon={<DehazeIcon />} className="ml-4 pr-0 mr-0 pt-2" color="inherit" onClick={handleMenuOpenCategories} style={{ color: systemTheme ? "rgb(33, 33, 33)" : "rgb(246, 246, 246)" }}>
                        Kategoriler
                    </Button>

                    <Menu
                        anchorEl={anchorElCategories}
                        open={Boolean(anchorElCategories)}
                        onClose={handleMenuCloseCategories}
                        anchorOrigin={{
                            vertical: 'bottom',
                            horizontal: 'left'
                        }}
                        transformOrigin={{
                            vertical: 'top',
                            horizontal: 'left'
                        }}
                        disableScrollLock={true}   //body ye eklenen padding right'ı engellemek için ekledim
                    >
                        {
                            categories ? categories.map((item) =>
                                <Link 
                                    key={item.id}
                                    href={{
                                        pathname: `/category/${item.kategoriAdi}`,
                                        query: { id: item.id },
                                    }}>
                                    <MenuItem
                                        onClick={handleMenuCloseCategories}
                                    >
                                        {item.kategoriAdi}
                                    </MenuItem>
                                </Link>
                            ) : null
                        }
                    </Menu>
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
                                </InputAdornment>
                            }
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
                                            <span style={{ color: systemTheme ? "rgb(33, 33, 33)" : "rgb(246, 246, 246)" }}>
                                                { user ? user.email : null }
                                            </span>
                    
                                        
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
                                            <FormGroup sx={{display: "inline", marginLeft: "20px", padding:"0px"}}>
                                                <FormControlLabel
                                                    style={{ margin: "0px", padding:"0px"}}
                                                    checked={systemTheme}
                                                    control = {
                                                        <MaterialUISwitch onClick={(event) => setSystemTheme(event.target.checked)} />
                                                    }
                                                />
                                            </FormGroup>
                                        </> :
                                            <div>
                                                <IconButton>
                                                    <Avatar />
                                                </IconButton>
                                                <Link href="/login" style={{ color: systemTheme ? "rgb(33, 33, 33)" : "rgb(246, 246, 246)" }}>Giriş Yap</Link>
                                                <FormGroup style={{display: "inline", margin: "0px", padding:"0px"}}>
                                                    <FormControlLabel
                                                        style={{ margin: "0px", padding:"0px"}}
                                                        checked={systemTheme}
                                                        control = {
                                                            <MaterialUISwitch onClick={(event) => switchClick(event)} />
                                                        }
                                                    />
                                                </FormGroup>
                                            </div> 
                            }
                        </>
                    }
                </div>
            </div>
        </div>
    )
}

export default NavBar
