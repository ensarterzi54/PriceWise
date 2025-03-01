import Head from "next/head";
import { ScrapeContext } from "../contexts/ScrapeContext"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContex";
import { Box, Button, IconButton, LinearProgress, Skeleton, Typography } from "@mui/material";
import { ThemeContext } from "@/contexts/ThemeContext";
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { FavoritesContext } from "@/contexts/FavoritesContext";
import Link from "next/link";
import { moneyFormat } from "../functions"
import Modal from "@/components/modal";



const label = { inputProps: { 'aria-label': 'Checkbox demo' } };
const Home = () => {
  const { datas, getRandomData, productsByCategory } = useContext(ScrapeContext)
  const { user } = useContext(AuthContext)
  const { systemTheme, setSystemTheme } = useContext(ThemeContext)
  const { addFavorite, getFavorite, favorites, setFavorites } = useContext(FavoritesContext)
  const [showMessage, setShowMessage] = useState(false);
  const [open, setOpen] = useState(false);
  const [showModal, setShowModal] = useState(false)
  const [modalContent, setModalContent] = useState({ open: false, title: '', description: '' });

  const handleModalOpen = (title, description) => {
    setModalContent({ open: true, title, description });
  };
  
  const handleModalClose = () => {
    setModalContent({ open: false, title: '', description: '' });
  };

  useEffect(() => {
    console.log("[]")
    getRandomData()
  }, []);

  useEffect(()=> {
    console.log("[user]")
    getFavorite(user?.uid)
  }, [user])

  const isFavorite = (productId) => {
    if(user) {
      if(user.emailVerified) {
        addFavorite(user.uid, productId)
        getFavorite(user?.uid)
      } else {
        handleModalOpen('E-posta adresi doğrulanmadı.', 'Lütfen E-posta adresinize gelen bağlantıya tıklayarak doğrulayın.');
      }
    } else {
      handleModalOpen('Giriş Yapılmadı', 'Favorilere eklemek için lütfen giriş yapın.');
    }
    
  };

  const isNotFavorite = (productId) => {
    addFavorite(user.uid, productId)
  };

  return (
    <div style={{ color: systemTheme ? "red" : "black" }}>
      <Head>
        <title>PriceWise</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {
        datas ? (
          <div className="container-fluid home">
            <div className="cardRow">
              {
                datas ? datas.map((item) => 
                  <div key={item.id} className="col-md-3 mt-3 p-0">
                    <div className="homeCard">
                      <div className="favoriteButton" style={{ cursor: 'pointer' }}>
                        <span>
                              {favorites.some(fav => fav.id === item.id) ? (
                                <FavoriteIcon
                                  onClick={() => isNotFavorite(item.id)}
                                  sx={{
                                    color: 'rgb(33, 150, 83)',
                                    '&:hover': {
                                      transition: 'color 0.3s',
                                      color: 'rgb(33, 150, 83)'
                                    }
                                  }}
                                />
                              ) : (
                                <FavoriteBorderIcon
                                  onClick={() => isFavorite(item.id)}
                                  sx={{
                                    color: 'rgb(53, 212, 153)',
                                    '&:hover': {
                                      transition: 'color 0.3s',
                                      color: 'rgb(33, 150, 83)'
                                    }
                                  }}
                                />
                              )}
                            
                        </span>
                      </div>
                      
                      <img src={item.resim_url} className="productImage" alt={item.urunAdi} />
                        <h6 className="prdctName pt-4">{ item.urunAdi.length > 35 ? item.urunAdi.substring(0, 35) + "..." : item.urunAdi }</h6>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ color: systemTheme ? "red" : "black" }} className={`prdctPrice ${systemTheme && ``}`}>
                            { moneyFormat(item.fiyat) } TL
                          </span>
                          <span className="salesName"> 
                            { item.sellers?.[0]?.saticiAdi }
                          </span>
                        </div>
                    </div>
                  </div>
                ) : null
              }
            </div>
          </div>
        )
        : (
          <div className="skeleton" style={{ backgroundColor: systemTheme ? "black" : "rgb(246, 246, 246)" }}>
            <LinearProgress />
          </div>
        )
      }

      <Modal open={modalContent.open} handleClose={handleModalClose} title={modalContent.title} description={modalContent.description} />
    </div>
  );
}

export default Home