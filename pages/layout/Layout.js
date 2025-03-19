import NavBar from '@/components/navBar';
import ScrapeContextProvider from '@/contexts/ScrapeContext';
import React, { useContext, useEffect, useState } from 'react';
import styles from './layout.module.css';
import { AuthContext } from '@/contexts/AuthContex';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Backdrop, Button, CircularProgress, IconButton, LinearProgress } from '@mui/material';
import Link from 'next/link';
import { ThemeContext } from '@/contexts/ThemeContext';
import { useRouter } from 'next/router';
import CloseIcon from '@mui/icons-material/Close';
import FloatingButton from '@/components/langButton';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
}

const Layout = ({ children }) => {
  const router = useRouter(); 
  const { user, userVerified, signOutWithGoogle, count } = useContext(AuthContext);
  const { systemTheme, setSystemTheme } = useContext(ThemeContext)
  const [open, setOpen] = useState(false);
  const [backdropOpen, setBackdropOpen] = useState(false);
  const [focus, setFocus] = useState(false)
  const [avatarFocus, setAvatarFocus] = useState(false)

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const hideNavbarRoutes = ['/login'];

  const showNavbar = !hideNavbarRoutes.includes(router.pathname);

  useEffect(() => {
    console.log("userVerified: ", userVerified) 
    if (user && !userVerified) {
      console.log("userVerified ifdee: ", userVerified)
      handleOpen() // userVerified false olduğunda modal'ı aç
    }
  }, [userVerified, count])
  
  return (
    <div style={{ backgroundColor: systemTheme ? "rgb(33, 33, 33)" : "#ECEBDE" }} >
        <FloatingButton />
        {
          (user && userVerified == null) ?
              <div>
                <LinearProgress />
              </div>
            :
              <>
                <div>
                  {showNavbar && <NavBar focus={focus} avatarFocus={avatarFocus} setFocus={setFocus} setAvatarFocus={setAvatarFocus} setBackdropOpen={setBackdropOpen} />}
                  
                  <main
                    className={`${styles.layoutMain} ${(focus || avatarFocus) ? styles.blur : ""}`}
                  >
                    {
                      (focus || avatarFocus) && 
                        <>
                          <Backdrop
                            sx={{
                              bgcolor: 'rgba(0, 0, 0, 0.5)', // Arka plan rengi
                              zIndex: 2000,                  // Yüksek bir z-index değeri
                            }}
                            open={backdropOpen}
                            onClick={handleClose}
                          >
                          </Backdrop>
                        </>
                    }
                    
                    {children}
                  </main>
                </div> 

                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                  BackdropProps={{ onClick: (event) => event.stopPropagation() }}
                  disableScrollLock={true}
                >
                  <Box sx={style}>
                  <IconButton
                    onClick={handleClose}
                    sx={{ position: 'absolute', top: 8, right: 8 }}
                  >
                    <CloseIcon />
                  </IconButton>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                      E-posta adresi doğrulanmadı.
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Lütfen E-posta adresinize gelen bağlantıya tıklayarak doğrulayın.
                    </Typography>
                    <div className="mt-3">
                      <Button>
                        <Link href="https://mail.google.com/" target="_blank">Gmail'e git</Link>
                      </Button>
                    </div>
                    <div>
                      <Button onClick={()=> signOutWithGoogle()}>Çıkış yap</Button>
                    </div>
                  </Box>
                </Modal>
              </>
        }
      
    </div>
  );
};

export default Layout;
