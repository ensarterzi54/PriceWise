import Link from "next/link"
import { AuthContext } from "../../contexts/AuthContex"
import React, { useContext } from 'react'

const NavBar = () => {
    const { loginWithGoogle } = useContext(AuthContext)
    return (
        <div>
            NavBar
            <button onClick={() => loginWithGoogle()}>giriş</button>
        </div>
    )
}

export default NavBar
