import styles from "../login/login.module.css"
import PropTypes from 'prop-types';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';
import Link from "next/link"
import { AuthContext } from "../../contexts/AuthContex"
import React, { useContext, useState } from 'react'
import { Avatar, Button, TextField } from "@mui/material";
import Card from '@mui/material/Card';
import { SnackbarProvider, useSnackbar } from 'notistack';
import ForgotPassword from "../../components/forgotPassword";
import Logo from "@/components/logo";

const CustomTabPanel = (props) => {
    const { children, value, index, ...other } = props;

    return (
      <div
        role="tabpanel"
        hidden={value !== index}
        id={`simple-tabpanel-${index}`}
        aria-labelledby={`simple-tab-${index}`}
        {...other}
      >
        {value === index && <Box sx={{ p: 3 }}>{children}</Box>}
      </div>
    );
}

CustomTabPanel.propTypes = {
    children: PropTypes.node,
    index: PropTypes.number.isRequired,
    value: PropTypes.number.isRequired,
};

const a11yProps = (index) => {
    return {
      id: `simple-tab-${index}`,
      'aria-controls': `simple-tabpanel-${index}`,
    };
}

const Login = () => {
    const [value, setValue] = React.useState(0);
    const { signInWithGoogle, signInEmailPassword, createUserEmailAndPassword, resetPassword } = useContext(AuthContext)
    const [email, setEmail] = useState("")
    const [password, setPassword] = useState("")
    const [signInEmail, setSignInEmail] = useState("")
    const [signInPassword, setSignInPassword] = useState("")
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

    const handleChange = (event, newValue) => {
      setValue(newValue);
    };
  
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
                                            backgroundColor: '#f9fafb',
                                            border: '2px solid #b0bec5',
                                            borderRadius: '8px',
                                            boxShadow: '0 4px 12px rgba(0, 0, 0, 0.1)',
                                            padding: '16px', 
                                        }}
                                    >
                                        <Box sx={{ width: '100%' }}>
                                            <div className={`${styles.logo} mb-4 mt-3`}>
                                                <Link href="/" style={linkStyle}>
                                                    <Logo />
                                                </Link>
                                            </div>
                                            <h6 className="mb-4">Devam etmek için hesap oluştur ya da kayıt ol</h6>
                                            <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                                                <Tabs 
                                                    value={value}
                                                    onChange={handleChange}
                                                    textColor="inherit"
                                                    variant="fullWidth"
                                                    aria-label="full width tabs example"
                                                >
                                                    <Tab label="Giriş yap" {...a11yProps(0)} />
                                                    <Tab label="Kayıt ol" {...a11yProps(1)} />
                                                </Tabs>
                                            </Box>
                                            <CustomTabPanel value={value} index={0}>
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

                                            </CustomTabPanel>
                                            <CustomTabPanel value={value} index={1}>
                                                <TextField 
                                                    id="outlined-basic" 
                                                    label="E-Posta" 
                                                    variant="outlined" 
                                                    sx={{width: '100%'}} 
                                                    value={signInEmail} 
                                                    onChange={(e) => setSignInEmail(e.target.value)} 
                                                /> <br /><br />
                                                <TextField 
                                                    id="outlined-basic" 
                                                    label="Şifre" 
                                                    type="password" 
                                                    variant="outlined" 
                                                    sx={{width: '100%'}} 
                                                    value={signInPassword} 
                                                    onChange={(e) => setSignInPassword(e.target.value)} 
                                                /> <br /> <br />
                                                <Button 
                                                    variant="contained" 
                                                    sx={{ width: '100%', textTransform: "none"}}
                                                    onClick={() => createUser(signInEmail, signInPassword)}>Kayıt ol
                                                </Button> <br /><br />
                                            </CustomTabPanel>
                                        </Box>
                                    </Card>
                                </Box>
                            </div>
                        </div>
                    </SnackbarProvider>
            }
            
        </>
    );
}

Login.getLayout = function (page) {
    return page;
};

export default Login