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
  const { user, userVerified, signOutWithGoogle } = useContext(AuthContext);
  const [open, setOpen] = useState(false);

  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);

  useEffect(() => {
    console.log("useEffect içinde userVerifide: ", userVerified)
    if (!userVerified) {
      handleOpen() // userVerified false olduğunda modal'ı aç
    }
  }, [userVerified])
  


  return (
    <div>
        {
          user ?
          userVerified == null ?
            <LinearProgress /> :
            <ScrapeContextProvider>
              {
                userVerified ? 
                            <>
                              <NavBar />
                              <main
                                className={styles.layoutMain}
                                style={{ backgroundColor: 'rgb(246, 246, 246)' }}
                              >
                                {children}
                              </main>
                            </> :
                            <>
                              <div className={open ? styles.blurBackground : ''}> {/* Eğer modal açık ise blur eklenir */}
                                <NavBar />
                                <main
                                  className={styles.layoutMain}
                                  style={{ backgroundColor: 'rgb(246, 246, 246)' }}
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
                                    E-posta adresi deoğrulanmadı.
                                  </Typography>
                                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                                    Lütfen E-posta adresinize gelen bağlantıya tıklayarak doğrulayın.
                                  </Typography>
                                  <div className="mt-3">
                                    <Link href="https://mail.google.com/" target="_blank">Gmail'e git</Link>
                                  </div>
                                  <div className="mt-3">
                                    <Button onClick={()=>signOutWithGoogle()}>Çıkış yap</Button>
                                  </div>
                                </Box>
                              </Modal>
                            </>
              }
              
            </ScrapeContextProvider> : 
            <>
              <NavBar />
              <main
                className={styles.layoutMain}
                style={{ backgroundColor: 'rgb(246, 246, 246)' }}
              >
                {children}
              </main>
            </>
        }
      
    </div>
  );
};

export default Layout;
