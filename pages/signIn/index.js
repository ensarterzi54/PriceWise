import { AuthContext } from "../../contexts/AuthContex"
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';
import { Button, TextField } from "@mui/material";

const SignIn = () => {
    const { createUserEmailAndPassword } = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();

    const createUser = (email, password) => {
        createUserEmailAndPassword(email, password)
        router.push("/")
    }

    return (
        <div className="signIn">
            <div>
                <h1><Link href="/">PriceWise</Link></h1>
                <h6>Devam etmek için hesap oluştur ya da <Link href="/login">Giriş yap</Link></h6>
                {/* <label htmlFor="name">Ad</label><br />
                <input type="text" id="name" name="name" /><br /><br /><br /> */}
                <TextField id="outlined-basic" label="Ad" variant="outlined" /> <br /><br />
                {/* <label htmlFor="sname">Soyad</label><br />
                <input type="text" id="sname" name="sname" /><br /><br /><br /> */}
                <TextField id="outlined-basic" label="Soyad" variant="outlined" /> <br /><br />
                {/* <label htmlFor="mail">E-Posta</label><br />
                <input type="email" id="mail" name="mail" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br /><br /> */}
                <TextField id="outlined-basic" label="E-Posta" variant="outlined" value={email} onChange={(e) => setEmail(e.target.value)} /> <br /><br />

                {/* <label htmlFor="password">Şifre</label><br />
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /> <br /> */}
                <TextField id="outlined-basic" label="Şifre" variant="outlined" value={password} onChange={(e) => setPassword(e.target.value)} /> <br /><br />
                {/* <button type="button" onClick={() => createUser(email, password)}>Kayıt ol</button> <br /> */}
                <Button variant="contained" onClick={() => createUser(email, password)}>Kayıt ol</Button>
            </div>
        </div>
    )
}

SignIn.getLayout = function (page) {
    return page;
};

export default SignIn
