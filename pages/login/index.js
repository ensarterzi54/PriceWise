import React from 'react'

const Login = () => {
    const login = () => {

    }

    return (
        <div className="login">
            <form action={login}>
                <label htmlFor="mail">E-Posta</label><br />
                <input type="email" id="mail" name="mail" /><br /><br /><br />

                <label htmlFor="password">Şifre</label><br />
                <input type="password" id="password" name="password" /><br /> <br />

                <button type="submit">Search</button>
            </form>
            
        </div>
  )
}

export default Login