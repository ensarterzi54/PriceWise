import Link from "next/link"
import { AuthContext } from "../../contexts/AuthContex"
import React, { useContext } from 'react'

const NavBar = () => {
    const { signOutWithGoogle, user } = useContext(AuthContext)
    
    const imgStyle = {
        width: '30px',
        borderRadius: '15px',
        margin: '2px',
    }

    return (
        <div>
            NavBar
            { 
                <>
                    <img src={ user && user.photoURL } style={ imgStyle } alt="" /> 
                    { user ? user.email : null }
                </>
            }
            {
                user ? <Link href="/" onClick={() => signOutWithGoogle()}>çıkış</Link> :
                <Link href="/login">giriş</Link>
            }
            
            
        </div>
    )
}

export default NavBar
