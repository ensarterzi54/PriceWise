import Link from "next/link"
import { AuthContext } from "../../contexts/AuthContex"
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';
import { Button, TextField } from "@mui/material";


import Box from '@mui/material/Box';
import Card from '@mui/material/Card';


const Login = () => {
    const { signInWithGoogle, signInEmailPassword } = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();

    const login = (email, password) => {
        //giriş yap metodu (email ve password)
        signInEmailPassword(email, password)
        router.push("/")
    }

    const loginWithGoogle = () => {
        signInWithGoogle()
        router.push("/")
    }

    return (
        <div className="login" style={{ backgroundColor: "rgb(246, 246, 246)" }}>
            <div>
                <Box sx={{minWidth: 475}}>
                    <Card variant="outlined">
                        <div className="login">
                            <div style={{ width: "70%" }}>
                                <h1 className="text-center mb-5"><Link href="/">PriceWise</Link></h1>
                                <h6 className="mb-4">Devam etmek için hesap oluştur ya da <Link href="/signIn">Kayıt ol</Link></h6>
                                {/* <label htmlFor="mail">E-Posta</label><br />
                                <input type="email" id="mail" name="mail" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br /><br /> */}
                                <TextField id="outlined-basic" label="E-Posta" variant="outlined" sx={{width: '100%'}} value={email} onChange={(e) => setEmail(e.target.value)} /> <br /><br />
                                <TextField id="outlined-basic" label="Şifre" type="password" variant="outlined" sx={{width: '100%'}} value={password} onChange={(e) => setPassword(e.target.value)} /> <br /><br />
                                {/* <label htmlFor="password">Şifre</label><br />
                                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /> <br /> */}

                                <Button 
                                    variant="contained" 
                                    onClick={() => login(email, password)}
                                    sx={{width: '100%'}}>Giriş yap
                                </Button> <br /><br />
                                {/* <button type="button" onClick={() => login(email, password)} >Giriş Yap</button> <br /> */}
                                {/* <Button variant="contained" onClick={() => signInWithGoogle()}>Google ile giriş yap</Button> <br /><br />   */}
                                    
                                <button type="button" className="btn btn-outline-primary" style={{ width: "100%" }} onClick={() => loginWithGoogle()}>
                                    <img src="/images/google-logo.png" alt="" style={{ width: "20px" }} />  Google ile giriş yap
                                </button><br /><br />
                                {/* <button type="button" onClick={() => signInWithGoogle()}>Google ile giriş yap</button> <br /> */}
                                <Link href="/signIn">
                                    <Button variant="contained" sx={{ width: '100%'}}>Kayıt ol</Button> <br /><br />
                                </Link>
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