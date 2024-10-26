import Link from "next/link"
import { AuthContext } from "../../contexts/AuthContex"
import React, { useContext, useState } from 'react'
import { Button, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import styles from "../forgotPassword/forgotPassword.module.css"
import { SnackbarProvider, useSnackbar } from 'notistack';
import Logo from "../logo";

const ForgotPassword = ({setForgetPassword}) => {
    const { resetPassword } = useContext(AuthContext)
    const [email, setEmail] = useState("")

    const { enqueueSnackbar } = useSnackbar()

    const reset = (email) => {
        resetPassword(email)
        enqueueSnackbar('Şifre sıfırlama mailiniz gönderildi!', { variant: 'success', vertical: 'top', horizontal: 'right' });
    }

    const linkStyle = {
        textDecoration: "none",
        color: "inherit"
    }

    return (
        <SnackbarProvider maxSnack={3}>
            <div className={`${styles.login} ${styles.forgotBackground}`}>
                <div>
                    <Box sx={{minWidth: 375}}>
                        <Card variant="outlined" sx={{
                            backgroundColor: '#f9fafb', // Hafif bir arka plan rengi
                            border: '2px solid #b0bec5', // Çerçeve rengi ve kalınlığı
                            borderRadius: '8px', // Köşe yuvarlama
                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Hafif gölge
                            padding: '16px', // İçerik için boşluk
                        }}>
                            <div className={`${styles.inCard}`}>
                                <div className="pt-5 pb-3">
                                    <div className={`${styles.logo} mb-4`}>
                                        <Link href="/" style={linkStyle}>
                                            <Logo />
                                        </Link>
                                    </div>
                                    <h6 className="mb-4">Şifre yenileme bağlantısını gönderebilmemiz<br /> için e-posta adresinize ihtiyacımız var.</h6>
                                    <TextField 
                                        id="outlined-basic" 
                                        label="E-Posta" 
                                        variant="outlined" 
                                        sx={{width: '100%'}} 
                                        value={email} 
                                        onChange={(e) => setEmail(e.target.value)} 
                                    /> <br /><br />

                                    <Button className="mb-3" variant="contained" sx={{ width: '100%', textTransform: "none"}} onClick={()=> reset(email)}>Şifremi yenile</Button>
                                    <Link href="/login" onClick={() => setForgetPassword(false)}><Button className="mb-5" variant="outlined" sx={{ width: '100%', textTransform: "none"}} >Giriş yap </Button></Link>
                                </div>
                            </div>   
                        </Card>
                    </Box>
                </div>
            </div>
        </SnackbarProvider>
    )
}

ForgotPassword.getLayout = function (page) {
    return page;
};

export default ForgotPassword