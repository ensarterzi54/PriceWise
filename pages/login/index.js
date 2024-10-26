import Link from "next/link"
import { AuthContext } from "../../contexts/AuthContex"
import React, { useContext, useState } from 'react'
import { Avatar, Button, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import styles from "../login/login.module.css"
import { SnackbarProvider, useSnackbar } from 'notistack';
import ForgotPassword from "../../components/forgotPassword";
import LockIcon from '@mui/icons-material/Lock';
import Logo from "@/components/logo";

const Login = () => {
    const { signInWithGoogle, signInEmailPassword, createUserEmailAndPassword, resetPassword } = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [forgetPassword, setForgetPassword] = useState(false)

    const login = (email, password) => {
        signInEmailPassword(email, password)
    }

    const createUser = (email, password) => {
        createUserEmailAndPassword(email, password)
    }

    const loginWithGoogle = () => {
        signInWithGoogle()
    }

    const linkStyle = {
        textDecoration: "none",
        color: "inherit"
    }

    return (
        <>
            {
                forgetPassword ? <ForgotPassword setForgetPassword={setForgetPassword} /> :
                    <SnackbarProvider maxSnack={3}>
                        <div className={`${styles.login}`}>
                            <div>
                                <Box sx={{minWidth: 375}}>
                                    <Card variant="outlined"
                                        sx={{
                                            backgroundColor: '#f9fafb', // Hafif bir arka plan rengi
                                            border: '2px solid #b0bec5', // Çerçeve rengi ve kalınlığı
                                            borderRadius: '8px', // Köşe yuvarlama
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)', // Hafif gölge
                                        }}
                                    >
                                        <div className={`${styles.inCard}`}>
                                            <div className="pt-5 pb-3">
                                                <div className={`${styles.logo} mb-5`}>
                                                    <Link href="/" style={linkStyle}>
                                                        <Logo />
                                                    </Link>
                                                </div>
                                                <h6 className="mb-4">Devam etmek için hesap oluştur ya da <Link href="/signIn">Kayıt ol</Link></h6>
                                                <TextField 
                                                    id="outlined-basic" 
                                                    label="E-Posta" 
                                                    variant="outlined" 
                                                    sx={{width: '100%'}} 
                                                    value={email} 
                                                    onChange={(e) => setEmail(e.target.value)} 
                                                /> <br /><br />
                                                <TextField 
                                                    id="outlined-basic" 
                                                    label="Şifre" 
                                                    type="password" 
                                                    variant="outlined" 
                                                    sx={{width: '100%'}} 
                                                    value={password} 
                                                    onChange={(e) => setPassword(e.target.value)} 
                                                /> <br />
                                                <div className="mt-2 mb-1">
                                                    <span className={styles.forgot} onClick={() => setForgetPassword(true)}>Şifremi unuttum</span>
                                                </div>

                                                <Button 
                                                    variant="contained" 
                                                    sx={{width: '100%', textTransform: "none"}}
                                                    onClick={() => login(email, password)}>Giriş yap
                                                </Button> <br /><br />
                                                    
                                                <button type="button" className="btn btn-outline-primary" style={{ width: "100%" }} onClick={() => loginWithGoogle()}>
                                                    <img src="/images/google-logo.png" alt="" style={{ width: "20px" }} />  Google ile giriş yap
                                                </button><br /><br />

                                                <Button 
                                                    variant="contained" 
                                                    sx={{ width: '100%', textTransform: "none"}}
                                                    onClick={() => createUser(email, password)}>Kayıt ol
                                                </Button> <br /><br />

                                            </div>
                                        </div>   
                                    </Card>
                                </Box>
                            </div>
                        </div>
                    </SnackbarProvider>
            }
            
        </>
        
    )
}

Login.getLayout = function (page) {
    return page;
};

export default Login