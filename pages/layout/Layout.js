import NavBar from '@/components/navBar';
import ScrapeContextProvider from '@/contexts/ScrapeContext';
import React, { useContext, useEffect, useState } from 'react';
import styles from './layout.module.css';
import { AuthContext } from '@/contexts/AuthContex';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Button, LinearProgress } from '@mui/material';
import Link from 'next/link';
import { ThemeContext } from '@/contexts/ThemeContext';
import { useRouter } from 'next/router';

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
  const { user, userVerified, signOutWithGoogle } = useContext(AuthContext);
  const { systemTheme, setSystemTheme } = useContext(ThemeContext)
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  const hideNavbarRoutes = ['/login'];

  const showNavbar = !hideNavbarRoutes.includes(router.pathname);

  useEffect(() => {
    if (!userVerified) {
      handleOpen() // userVerified false olduğunda modal'ı aç
    }
  }, [userVerified])
  
  return (
    <div style={{ backgroundColor: systemTheme ? "rgb(33, 33, 33)" : "rgb(246, 246, 246)" }}>
        {
          user ?
          userVerified == null ?
            <div>
              <LinearProgress />
            </div>
            :
            <ScrapeContextProvider>
              {
                userVerified ? 
                            <>
                                {showNavbar && <NavBar />}
                                <main
                                  className={styles.layoutMain}
                                >
                                  {children}
                                </main>
                            </> :
                            <>
                              <div className={open ? styles.blurBackground : ''}> {/* Eğer modal açık ise blur eklenir */}
                                {showNavbar && <NavBar />}
                                <main
                                  className={styles.layoutMain}
                                >
                                  {children}
                                </main>
                              </div>
                              <Modal
                                open={open}
                                onClose={handleClose}
                                aria-labelledby="modal-modal-title"
                                aria-describedby="modal-modal-description"
                                BackdropProps={{ onClick: (event) => event.stopPropagation() }}
                              >
                                <Box sx={style}>
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
                                    <Button onClick={()=>signOutWithGoogle()}>Çıkış yap</Button>
                                  </div>
                                </Box>
                              </Modal>
                            </>
              }
              
            </ScrapeContextProvider> : 
            <>
              {showNavbar && <NavBar />}
              
              <main
                className={styles.layoutMain}
              >
                {children}
              </main>
            </>
        }
      
    </div>
  );
};

export default Layout;
