import Link from "next/link"
import { AuthContext } from "../../contexts/AuthContex"
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';

const Login = () => {
    const { signInWithGoogle, signInEmailPassword } = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const router = useRouter();

    const login = (email, password) => {
        //giriş yap metodu (email ve password)
        signInEmailPassword(email, password)
    }

    return (
        <div className="login">
            <div>
                <h1><Link href="/">PriceWise</Link></h1>
                <label htmlFor="mail">E-Posta</label><br />
                <input type="email" id="mail" name="mail" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br /><br />

                <label htmlFor="password">Şifre</label><br />
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /> <br />

                <button type="button" onClick={() => login(email, password)} >Giriş Yap</button> <br />

                <button type="button" onClick={() => signInWithGoogle()}>Google ile giriş yap</button> <br />
                
                <Link href="/signIn">Hesap aç</Link>
            </div>
        </div>
  )
}

Login.getLayout = function (page) {
    return page;
};

export default Login