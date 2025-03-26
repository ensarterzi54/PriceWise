import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router'
import { AiContext } from '../../contexts/AiContext'
import Breadcrumbs from '@mui/material/Breadcrumbs';
import Link from '@mui/material/Link';
import HomeIcon from '@mui/icons-material/Home';
import WhatshotIcon from '@mui/icons-material/Whatshot';
import { Box } from '@mui/material';
import { Typewriter } from 'react-simple-typewriter'
import { moneyFormat } from '../../functions';
import styles from './productDetail.module.css'
import Button from '@/components/button';


const ProductDetail = () => {
    const router = useRouter()
    const { productDetail, urunAdi, fiyat, resim_url, sellers, whichAi } = router.query
    const { askAi, detail } = useContext(AiContext)
    const [productDetailText, setProductDetailText] = useState("")

    useEffect(() => {
        console.log("Router Query: ", router.query);
    }, [router.query]);

    useEffect(() => {
        if (detail) {
            setProductDetailText(detail);
        }
    }, [detail])

    useEffect(() => {
        console.log("saller: ",sellers, whichAi)

        if (urunAdi && whichAi) {
            askAi(urunAdi, whichAi)
        }
    }, [urunAdi, whichAi])
    
    const handleClick = (event) => {
        event.preventDefault()
        console.info('You clicked a breadcrumb.')
    }

    const handleNavigation = (path) => {
        router.push(path)
    }

    return (
        <div className={styles.productDetail}>
            <div className={styles.breadcrumbs} role="presentation" onClick={handleClick}>
                <Breadcrumbs aria-label="breadcrumb">
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href="/"
                        onClick={() => handleNavigation("/")}
                    >
                        <HomeIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        Ana Sayfa
                    </Link>
                    <Link
                        underline="hover"
                        sx={{ display: 'flex', alignItems: 'center' }}
                        color="inherit"
                        href="/"
                    >
                        <WhatshotIcon sx={{ mr: 0.5 }} fontSize="inherit" />
                        {urunAdi}
                    </Link>
                </Breadcrumbs>
            </div>
            <Box sx={{
                backgroundColor: 'rgba(255, 255, 255, 0.1)',
                boxShadow: '0 4px 12px rgba(74, 46, 46, 0.1)',
                padding: '25px 10px',
                marginTop: '20px',

            }}>
                <div className={styles.productInfo}>
                    <div className="row">
                        <div className="col-md-4">
                            <img src={resim_url} alt="ai" />
                        </div>
                        <div className="col-md-8">
                            <Box sx={{ 
                                height: '100%',
                                display: 'flex', 
                                flexDirection: 'column', 
                                backgroundColor: 'white', 
                                padding: '20px', 
                                borderRadius: '8px', 
                                boxShadow: '0 4px 12px rgba(74, 46, 46, 0.1)',
                            }}>
                                <h6 className="mt-2">{ urunAdi }</h6>
                                <hr />
                                <div>
                                    
                                    

                                    <div className="mt-3">
                                        {
                                            sellers == "Amazon" ? <img src="/images/amazon-5.png" style={{height: "40px", width: "auto", objectFit: "contain"}} alt="Amazon" /> : null
                                        }
                                        <span className={styles.price}>{ moneyFormat(Number(fiyat)) } TL</span>
                                        <div style={{ marginLeft: '50px', display: 'inline', justifyContent: 'center', alignItems: 'center' }}>
                                        <Button />
                                    </div>
                                    </div>
                                </div>

                                <div>
                                    
                                </div>
                                
                            </Box>
                        </div>
                    </div>
                </div>
            </Box>

            <Box
                sx={{
                    backgroundColor: 'rgba(255, 255, 255, 0.1)',
                    boxShadow: '0 4px 12px rgba(74, 46, 46, 0.1)',
                    padding: '25px 10px',
                    marginTop: '20px',
                }}
            >   
            <div>
                {
                    whichAi == "analyze_gemini" ? <img src="/images/gemini-2.jpg" style={{height: "40px", width: "auto", objectFit: "contain", marginBottom: '15px'}} alt="Amazon" /> : null
                }
            </div>

            <h5>
                {
                    <Typewriter
                        words={["Yapay Zeka ile Analiz Ediliyor..."]}
                        loop={1}
                        cursor
                        cursorStyle="_"
                        typeSpeed={10}
                        deleteSpeed={50}
                        delaySpeed={1000}
                    />
                }

            </h5>
                {
                    productDetailText && (
                        <Typewriter
                            words={[productDetailText]}
                            loop={1}
                            cursor
                            cursorStyle="_"
                            typeSpeed={10}
                            deleteSpeed={50}
                            delaySpeed={1000}
                        />
                    )
                }
            </Box>                            
        </div>
    )
}

export default ProductDetail
