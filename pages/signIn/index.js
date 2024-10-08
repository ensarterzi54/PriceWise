import { AuthContext } from "../../contexts/AuthContex"
import Link from 'next/link'
import React, { useContext, useState } from 'react'
import { useRouter } from 'next/router';

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

                <label htmlFor="name">Ad</label><br />
                <input type="text" id="name" name="name" /><br /><br /><br />

                <label htmlFor="sname">Soyad</label><br />
                <input type="text" id="sname" name="sname" /><br /><br /><br />

                <label htmlFor="mail">E-Posta</label><br />
                <input type="email" id="mail" name="mail" value={email} onChange={(e) => setEmail(e.target.value)} /><br /><br /><br />

                <label htmlFor="password">Şifre</label><br />
                <input type="password" id="password" name="password" value={password} onChange={(e) => setPassword(e.target.value)} /><br /> <br />

                <button type="button" onClick={() => createUser(email, password)}>Kayıt ol</button> <br />
            </div>
        </div>
    )
}

SignIn.getLayout = function (page) {
    return page;
};

export default SignIn
