import Link from "next/link"
import { AuthContext } from "../../contexts/AuthContex"
import React, { useContext, useEffect, useState } from 'react'
import { IconButton, InputAdornment, TextField } from "@mui/material"
import { ScrapeContext } from "../../contexts/ScrapeContext"
import { useRouter } from 'next/router';
import SearchIcon from '@mui/icons-material/Search';
const NavBar = () => {
    const [value, setValue] = useState("")
    const { signOutWithGoogle, user } = useContext(AuthContext)
    const { getData, datas } = useContext(ScrapeContext)
    const router = useRouter();

    const imgStyle = {
        width: '30px',
        borderRadius: '15px',
        margin: '2px',
    }

    useEffect(()=> {
        console.log("datasnavbar: ", datas)
    }, [datas])

    const search = (value) => {
        // getData(value)
        router.push(`/search/${value}`)
    }

    return (
        <div className="nav container pl-5 pr-5 pt-3 pb-2">
            <div className="mt-2" style={{"font-weight": "bold"}}>
                <Link href="/">PriceWise</Link>
            </div>
            <div className="mu-input">
                <TextField 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                    sx={{ width: '75ch' }} 
                    label="Neyi ucuza aramak istersin?" 
                    variant="outlined" 
                    size="small"
                    slotProps={{
                        input: {
                            endAdornment: 
                            <InputAdornment position="start">
                                <IconButton type="button" aria-label="search" onClick={() => search(value)}>
                                    <SearchIcon />
                                </IconButton>
                            </InputAdornment>,
                        },
                    }}
                />
            </div>
            <div>
                { 
                    <>
                        <img src={ user && user.photoURL } style={ imgStyle } alt="" /> 
                        { user ? user.email : null }
                    </>
                }
                {
                    user ? <Link className="ml-2" href="/" onClick={() => signOutWithGoogle()}>çıkış</Link> :
                    <Link className="ml-2" href="/login">Giriş Yap</Link>
                }
            </div>
        </div>
    )
}

export default NavBar
