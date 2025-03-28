import Link from "next/link"
import { AuthContext } from "../../contexts/AuthContex"
import React, { useContext, useEffect, useState } from 'react'
import { Avatar, Box, Button, IconButton, InputAdornment, Menu, MenuItem, MenuList, TextField, List, ListItem, ListItemText, Paper } from "@mui/material"
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
import Badge from '@mui/material/Badge';
import Stack from '@mui/material/Stack';
import CheckIcon from '@mui/icons-material/Check';
import { useTranslation } from 'react-i18next';
import { onValue, ref, set } from "firebase/database";
import { database } from "@/firebase/firebaseConfig";
import HistoryIcon from '@mui/icons-material/History';
import CloseIcon from '@mui/icons-material/Close';
const StyledBadge = styled(Badge)(({ theme }) => ({
    '& .MuiBadge-badge': {
      backgroundColor: '#F2B28C',
      color: 'rgb(245, 245, 245)',
      boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
      '&::after': {
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100%',
        height: '100%',
        borderRadius: '50%',
        animation: 'ripple 1.2s infinite ease-in-out',
        border: '1px solid currentColor',
        content: '""',
      },
    },
    '@keyframes ripple': {
      '0%': {
        transform: 'scale(.8)',
        opacity: 1,
      },
      '100%': {
        transform: 'scale(2.4)',
        opacity: 0,
      },
    },
  }));

const SmallAvatar = styled(Avatar)(({ theme }) => ({
width: 22,
height: 22,
border: `2px solid ${theme.palette.background.paper}`,
}));

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
const NavBar = ({ setFocus, setAvatarFocus, setBackdropOpen }) => {
    const [value, setValue] = useState("")
    const { getCategories, categories, getSearchedProducts } = useContext(ScrapeContext)
    const { signOutWithGoogle, user } = useContext(AuthContext)
    const { systemTheme, setSystemTheme } = useContext(ThemeContext)
    const router = useRouter();
    const { t } = useTranslation();
    const [anchorEl, setAnchorEl] = useState(null);
    const [searchedProductsData, setSearchedProductsData] = useState([])
    const [listWatch, setListWatch] = useState(false)
    const [anchorElCategories, setAnchorElCategories] = useState(null);

    const handleFocus = () => {
        console.log("handleFocus")
        setListWatch(true)
        setFocus(true)
        setBackdropOpen(true)
    };
    
    const handleBlur = () => {
        setListWatch(false)
        setFocus(false)
        setBackdropOpen(false)
    };

    const handleMenuOpenCategories = (event) => {
        setAnchorElCategories(event.currentTarget);
    };

    const handleMenuCloseCategories = () => {
        setAnchorElCategories(null);
    };

    const handleMenuOpen = (event) => {
        setAvatarFocus(true)
        setAnchorEl(event.currentTarget);
        setBackdropOpen(true)
    };
  
    const handleMenuClose = () => {
        setAvatarFocus(false)
        setAnchorEl(null);
        setBackdropOpen(false)
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
        localStorage.setItem("theme", event.target.checked);
        setSystemTheme(event.target.checked)
    }

    useEffect(() => {
        getCategories()
    }, [])

    useEffect(() => {
        if (!user) return
    
        const searchRef = ref(database, `userSearchs/${user?.uid}`)
        const unsubscribe = onValue(searchRef, (snapshot) => {
            const data = snapshot.val()
            setSearchedProductsData(data ? Object.values(data) : [])
        })
    
        return () => unsubscribe()
    }, [user]);

    return (
        <div className={`${styles.nav} pt-2`}>
            <div className={`${styles.navBar}`}>
                <div className={`${styles.logo} mb-2`}>
                    <Link href="/" style={linkStyle}>
                        {/* <Logo /> */}
                        <img src="/PW-logo.png" alt="logo" style={{ width: "70px" }} />
                    </Link>

                    <Button 
                        startIcon={<DehazeIcon />} 
                        className="ml-4 pr-0 mr-1 pt-2" 
                        color="inherit" 
                        onClick={handleMenuOpenCategories} 
                        style={{ 
                            color: systemTheme ? "rgb(33, 33, 33)" : "#EAFAEA", 
                            textTransform: "none", 
                            fontFamily: '"Lato", sans-serif', fontSize: '20px' 
                        }}
                    >
                        { t('Categories') }
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
                        sx={{ maxWidth: '300px' }}
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
                <div className={`mu-input pt-1`}>
                    <TextField 
                        value={value} 
                        onChange={(e) => setValue(e.target.value)} 
                        onFocus={handleFocus} // Odaklanma olayı
                        onBlur={handleBlur}
                        sx={{ 
                            width: '60ch',
                            '& .MuiOutlinedInput-root': {
                                backgroundColor: '#f0f0f0',
                                '& fieldset': {
                                    borderColor: '#ccc'
                                },
                                '&:hover fieldset': {
                                    borderColor: '#888'
                                },
                                '&.Mui-focused fieldset': {
                                    borderColor: '#555'
                                },
                            },
                            '& .MuiInputBase-input': {
                                color: '#333',
                                padding: '10px'
                            },
                        }} 
                        label={t('What do you want to look for cheaply?')}
                        variant="outlined" 
                        size="small"
                        InputLabelProps={{
                            style: { color: '#333' } // Label color
                        }}
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
                    {
                        listWatch ? (
                            <Paper elevation={3} sx={{ width: "60ch", maxHeight: 200, overflowY: "auto", position: 'absolute', zIndex: 1 }}>
                                <List>
                                    {searchedProductsData
                                    ? searchedProductsData.map((item, index) => (
                                        <ListItem
                                            key={index}
                                            sx={{
                                                "&:hover": {
                                                    backgroundColor: "#f5f5f5",
                                                },
                                                cursor: "pointer",
                                                fontSize: "5px",
                                                fontFamily: '"Lato", sans-serif'
                                            }}
                                        >
                                            <HistoryIcon sx={{ marginRight: 1 }} />
                                            <ListItemText primary={item.value} />
                                            <IconButton
                                                edge="end"
                                                aria-label="delete"
                                                onClick={() => console.log('Çarpı tıklanmış!')}  // Buraya tıklandığında yapılacak işlemi ekleyebilirsiniz
                                            >
                                                <CloseIcon sx={{ fontSize: 18 }} />  {/* Çarpı ikonu */}
                                            </IconButton>
                                        </ListItem>
                                        ))
                                    : null}
                                </List>
                            </Paper>
                        ) : null
                    }
                </div>
                <div>
                    { 
                        <>
                            {
                                user ?  <>
                                            <IconButton
                                                onMouseEnter={handleMenuOpen}
                                            >
                                                {
                                                    user.emailVerified ?
                                                        <Box sx={{ position: 'relative', display: 'inline-block' }}>
                                                            <Avatar src={user?.photoURL} />
                                                            {user && (
                                                                <Box
                                                                    sx={{
                                                                        position: 'absolute',
                                                                        bottom: 0,
                                                                        right: 0,
                                                                        width: 15,
                                                                        height: 15,
                                                                        backgroundColor: '#F2B28C',
                                                                        borderRadius: '50%',
                                                                        display: 'flex',
                                                                        justifyContent: 'center',
                                                                        alignItems: 'center',
                                                                        border: '2px solid white',
                                                                    }}
                                                                >
                                                                    <CheckIcon sx={{ fontSize: 14, color: 'white' }} />
                                                                </Box>
                                                            )}
                                                    </Box> :
                                                    <Avatar src={user && user.photoURL} />
                                                }
                                            </IconButton>
                                            <span style={{ color: systemTheme ? "rgb(33, 33, 33)" : "#EAFAEA" }}>
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
                                                    <Link href="/profile/favorite" style={linkStyle}>
                                                        <MenuItem onClick={handleMenuClose} sx={{ borderBottom: 'none', boxShadow: 'none' }}>
                                                            <PermIdentityIcon />{ t('Profile') }
                                                        </MenuItem>
                                                    </Link>
                                                    <Link href="/" style={linkStyle}>
                                                        <MenuItem onClick={handleMenuClose} sx={{ borderBottom: 'none', boxShadow: 'none' }}>
                                                            <NotificationsNoneIcon />{ t('Follow List') }
                                                        </MenuItem>
                                                    </Link>
                                                    <Link href="/" style={linkStyle} onClick={() => signOutWithGoogle()}>
                                                        <MenuItem onClick={handleMenuClose} sx={{ borderBottom: 'none', boxShadow: 'none' }}>
                                                            <LogoutIcon />{ t('Log Out') }
                                                        </MenuItem>
                                                    </Link>
                                                </MenuList>
                                            </Menu>
                                            <FormGroup sx={{display: "inline", marginLeft: "20px", padding:"0px"}}>
                                                <FormControlLabel
                                                    style={{ margin: "0px", padding:"0px"}}
                                                    checked={systemTheme}
                                                    control = {
                                                        <MaterialUISwitch onClick={(event) => switchClick(event)} />
                                                    }
                                                />
                                            </FormGroup>
                                        </> :
                                            <div>
                                                <IconButton>
                                                    <Avatar />
                                                </IconButton>
                                                <Link href="/login" style={{ color: systemTheme ? "rgb(33, 33, 33)" : "rgb(246, 246, 246)" }}>{ t('Log In') }</Link>
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
