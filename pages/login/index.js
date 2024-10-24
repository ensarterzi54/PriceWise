import Link from "next/link"
import { AuthContext } from "../../contexts/AuthContex"
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';
import { Button, TextField } from "@mui/material";
import Box from '@mui/material/Box';
import Card from '@mui/material/Card';
import styles from "../login/login.module.css"
const Login = () => {
    const { signInWithGoogle, signInEmailPassword, createUserEmailAndPassword, resetPassword } = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();

    const login = (email, password) => {
        signInEmailPassword(email, password)
    }

    const createUser = (email, password) => {
        createUserEmailAndPassword(email, password)
        router.push("/")
    }

    const loginWithGoogle = () => {
        signInWithGoogle()
    }

    const reset = (email) => {
        resetPassword(email)
    }
    return (
        <div className={`${styles.login} mt-5 blurred-background`}>
            <div>
                <Box sx={{minWidth: 475}}>
                    <Card variant="outlined">
                        <div className={`${styles.inCard}`}>
                            <div className="pt-5 pb-3">
                                <h1 className="text-center mb-5"><Link href="/">PriceWise</Link></h1>
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
                                /> <br /><br />

                                <Button 
                                    variant="contained" 
                                    sx={{width: '100%'}}
                                    onClick={() => login(email, password)}>Giriş yap
                                </Button> <br /><br />
                                    
                                <button type="button" className="btn btn-outline-primary" style={{ width: "100%" }} onClick={() => loginWithGoogle()}>
                                    <img src="/images/google-logo.png" alt="" style={{ width: "20px" }} />  Google ile giriş yap
                                </button><br /><br />

                                <Button 
                                    variant="contained" 
                                    sx={{ width: '100%'}}
                                    onClick={() => createUser(email, password)}>Kayıt ol
                                </Button> <br /><br />
                                <Button
                                    onClick={()=> reset(email)}>
                                    Şifre sıfırla
                                </Button>
                            </div>
                        </div>   
                    </Card>
                </Box>
            </div>
        </div>
  )
}

Login.getLayout = function (page) {
    return page;
};

export default Login