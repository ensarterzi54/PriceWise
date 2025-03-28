import { AuthContext } from '@/contexts/AuthContex';
import { FavoritesContext } from '@/contexts/FavoritesContext';
import React, { useContext, useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ThemeContext } from '@/contexts/ThemeContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { useRouter } from 'next/router';
import { TextField } from '@mui/material';
import styles from "../favorite/favorite.module.css"
import { useTranslation } from 'react-i18next';
const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 400,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

const Favorite = () => {
    const { user } = useContext(AuthContext);
    const { systemTheme } = useContext(ThemeContext);
    const { getFavorite, removeFavorite, favorites } = useContext(FavoritesContext);
    const [open, setOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null)
    const [value, setValue] = useState('');
    const [filteredFavorites, setFilteredFavorites] = useState(favorites);
    const router = useRouter();
    const { t } = useTranslation();

    const handleOpen = (product) => {
        console.log("handleOpen' a parametre gelen ürün: ", product)
        setSelectedProduct(product)
        setOpen(true)
    };

    const handleClose = () => setOpen(false);
    
    useEffect(() => {
        console.log("selectedProduct favourite içinde : ", selectedProduct)
        getFavorite(user?.uid);
    }, [selectedProduct, user]);

    useEffect(() => {
        if (!value) {
            setFilteredFavorites(favorites);
        } else {
            const filtered = favorites.filter((item) =>
                item.urunAdi.toLowerCase().includes(value.toLowerCase())
            );
            setFilteredFavorites(filtered);
        }
    }, [value, favorites]);

    const handleConfirm = (id) => {
        if (selectedProduct) {
            removeFavorite(user.uid, selectedProduct.id);
            console.log("Favori silindi")
            setSelectedProduct(null)
            handleClose();
            getFavorite(user?.uid);
        }
    };

    const handleFocus = () => {
        console.log("Odaklandı")
    }

    const handleBlur = () => {
        console.log("Odaktan çıkıldı")
    }

    return (
        <div className="container">
            <div className={`${styles.search} mb-4`}>
                <div>
                    <h3>{t('My Favorites')}</h3>
                </div>
                <TextField 
                    value={value} 
                    onChange={(e) => setValue(e.target.value)} 
                    onFocus={handleFocus} // Odaklanma olayı
                    onBlur={handleBlur}
                    sx={{ 
                        marginRight: '20px',
                        width: '40ch',
                        '& .MuiOutlinedInput-root': {
                            backgroundColor: '#f0f0f0',
                            '& fieldset': {
                                borderColor: '#ccc'
                            },
                            '&:hover fieldset': {
                                borderColor: '#888'
                            },
                            '&.Mui-focused fieldset': {
                                borderColor: '#555'
                            },
                        },
                        '& .MuiInputBase-input': {
                            color: '#333',
                            padding: '10px'
                        },
                    }} 
                    label={t('Search your favorites')} 
                    variant="outlined" 
                    size="small"
                    InputLabelProps={{
                        style: { color: '#333' } // Label color
                    }}
                />
            </div>
            <div className="cardRow">
                {filteredFavorites  &&
                    filteredFavorites .map((item) => (
                        <div key={item.id} className="col-md-3 mb-3 p-0">
                            <div className="homeCard" style={{width: '90%'}}>
                                <div className="favoriteButton" style={{ cursor: 'pointer' }}>
                                    <FavoriteIcon
                                        onClick={() => handleOpen(item)} // Pass item to modal
                                        sx={{
                                            color: '#F2B28C',
                                            transition: 'color 0.3s ease, transform 0.3s ease', // Renk ve ölçek geçişi ekler
                                            cursor: 'pointer', // İmleci el işareti yapar
                                            '&:hover': {
                                                color: 'rgb(34, 179, 120)', // Hover durumunda farklı bir yeşil tonu
                                                transform: 'scale(1.2)' // Hafif büyüme efekti ekler
                                            },
                                            '&:active': {
                                                transform: 'scale(0.9)' // Tıklanınca küçülerek basılma efekti verir
                                            }
                                        }}
                                    />
                                </div>

                                <img src={item.resim_url} className="productImage" alt={item.urunAdi} />
                                <div>
                                    <h6 className="prdctName pt-4">
                                        {item.urunAdi.length > 30 ? item.urunAdi.substring(0, 30) + '...' : item.urunAdi}
                                    </h6>
                                    <div>
                                        <span style={{ color: systemTheme ? 'red' : 'black' }} className="prdctPrice">
                                            {item.fiyat} TL
                                        </span>
                                        <span className="salesName">{item.sellers?.[0]?.saticiAdi}</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
            </div>

            {/* Modal for confirmation */}
            <Modal disableScrollLock open={open} onClose={handleClose} aria-labelledby="modal-modal-title" aria-describedby="modal-modal-description">
                <Box sx={style}>
                    <Typography id="modal-modal-title" variant="h6" component="h2">
                        {selectedProduct ? `${selectedProduct.urunAdi} favorilerimden çıkarılsın mı?` : ''}
                    </Typography>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between', marginTop: 2 }}>
                        <Button variant="contained" color="primary" onClick={() => handleConfirm(selectedProduct.id)}>
                            Evet
                        </Button>
                        <Button variant="outlined" color="secondary" onClick={handleClose}>
                            Hayır
                        </Button>
                    </Box>
                </Box>
            </Modal>
        </div>
    );
};

export default Favorite;

Favorite.getLayout = function getLayout(page) {
    const ProfileLayout = require('../layout').default; // Layout'u dinamik olarak çağırıyoruz
    return <ProfileLayout>{page}</ProfileLayout>;
}