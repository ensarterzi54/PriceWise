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
import { useForm } from "react-hook-form";
import { ThemeContext } from "@emotion/react";

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
    const { signInWithGoogle, signInEmailPassword, createUserEmailAndPassword } = useContext(AuthContext)
    const { systemTheme } = useContext(ThemeContext)
    const [signInEmail, setSignInEmail] = useState("")
    const [signInPassword, setSignInPassword] = useState("")
    const [forgetPassword, setForgetPassword] = useState(false)

    const { register, handleSubmit, watch, formState: { errors } } = useForm();
    const { register: registerForm1, handleSubmit: handleSubmitForm1, reset: resetForm1, formState: { errors: errorsForm1 } } = useForm();
    const { register: registerForm2, handleSubmit: handleSubmitForm2, reset: resetForm2, formState: { errors: errorsForm2 } } = useForm();

    
    const onSubmitForm1 = (data) => {
        signInEmailPassword(data.email, data.password)
    }
    const onSubmitForm2 = (data) => {
        console.log("onSubmitSignIn")
        createUserEmailAndPassword(data.signInMail, data.signInPassword)
    }
    const login = (email, password) => {
        
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
                                <Box sx={{
                                    minWidth: 375,
                                    maxWidth: 100
                                }}>
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
                                                    <Tab label="Giriş yap" {...a11yProps(0)} sx={{ textTransform: 'none' }} />
                                                    <Tab label="Kayıt ol" {...a11yProps(1)} sx={{ textTransform: 'none' }} />
                                                </Tabs>
                                            </Box>
                                            <CustomTabPanel value={value} index={0}>
                                                <form onSubmit={handleSubmitForm1(onSubmitForm1)}>
                                                    <TextField 
                                                        id="outlined-basic" 
                                                        label="E-Posta" 
                                                        variant="outlined"
                                                        error={Boolean(errorsForm1.email)}
                                                        sx={{
                                                            width: '100%'
                                                        }}
                                                        {...registerForm1("email", { 
                                                            required: true,
                                                            pattern: {
                                                              value: /\S+@\S+\.\S+/,
                                                              message: "Lütfen geçerli bir E-posta adresi giriniz.",
                                                            } 
                                                        })}
                                                    />
                                                    {errorsForm1.email && 
                                                        <p className={`mb-0 pb-0 ${styles.errorMessage}`}>
                                                            {errorsForm1.email.message || "Lütfen E-posta adresinizi giriniz."}
                                                        </p>
                                                    }
                                                    <TextField 
                                                        id="outlined-basic" 
                                                        label="Şifre" 
                                                        type="password" 
                                                        variant="outlined"
                                                        error={Boolean(errorsForm1.password)}
                                                        sx={{
                                                            width: '100%',
                                                            marginTop: '16px'
                                                        }} 
                                                        {...registerForm1("password", { 
                                                            required: true, 
                                                            minLength: { value: 6, message: "Şifre en az 6 karakter olmalıdır." } 
                                                        })}
                                                    />
                                                    {errorsForm1.password && (
                                                        <p className={`mb-0 pb-0 ${styles.errorMessage}`}>
                                                            {errorsForm1.password.message || "Lütfen şifrenizi giriniz."}
                                                        </p>
                                                    )}
                                                    
                                                    <div className="mt-2 mb-1">
                                                        <span className={styles.forgot} onClick={() => setForgetPassword(true)}>Şifremi unuttum</span>
                                                    </div>

                                                    <Button 
                                                        type="submit"
                                                        variant="contained" 
                                                        sx={{width: '100%', textTransform: "none"}}
                                                    >Giriş yap
                                                    </Button> <br /><br />
                                                        
                                                </form>
                                                <button className="btn btn-outline-primary" style={{ width: "100%" }} onClick={() => loginWithGoogle()}>
                                                    <img src="/images/google-logo.png" alt="" style={{ width: "20px" }} />  Google ile giriş yap
                                                </button><br /><br />

                                            </CustomTabPanel>
                                            <CustomTabPanel value={value} index={1}>
                                                <form onSubmit={handleSubmitForm2(onSubmitForm2)}>
                                                    <TextField 
                                                        id="outlined-basic" 
                                                        label="E-Posta" 
                                                        variant="outlined" 
                                                        error={Boolean(errorsForm2.signInMail)}
                                                        sx={{width: '100%'}}
                                                        {...registerForm2("signInMail", { 
                                                            required: true,
                                                            pattern: {
                                                              value: /\S+@\S+\.\S+/,
                                                              message: "Lütfen geçerli bir E-posta adresi giriniz.",
                                                            }
                                                        })}
                                                    />
                                                    {errorsForm2.signInMail && 
                                                        <p className={`mb-0 pb-0 ${styles.errorMessage}`}>
                                                            {errorsForm2.signInMail.message || "Lütfen E-posta adresinizi giriniz."}
                                                        </p>
                                                    }
                                                    <TextField 
                                                        id="outlined-basic" 
                                                        label="Şifre" 
                                                        type="password" 
                                                        variant="outlined"
                                                        error={Boolean(errorsForm2.signInPassword)}
                                                        sx={{
                                                            width: '100%',
                                                            marginTop: '16px'
                                                        }}
                                                        {...registerForm2("signInPassword", { 
                                                            required: true, 
                                                            minLength: { value: 6, message: "Şifre en az 6 karakter olmalıdır." } 
                                                        })}
                                                    />
                                                    {errorsForm2.signInPassword && (
                                                        <p className={`mb-0 pb-0 ${styles.errorMessage}`}>
                                                            {errorsForm2.signInPassword.message || "Lütfen şifrenizi giriniz."}
                                                        </p>
                                                    )}
                                                    <Button
                                                        type="submit"
                                                        variant="contained" 
                                                        sx={{ 
                                                            width: '100%',
                                                            textTransform: "none",
                                                            marginTop: '16px'
                                                        }}
                                                        style={{ color: systemTheme ? "black" : "red" }}
                                                    >Kayıt ol
                                                    </Button> <br /><br />
                                                </form>
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