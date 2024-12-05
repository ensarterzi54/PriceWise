import { AuthContext } from '@/contexts/AuthContex';
import { FavoritesContext } from '@/contexts/FavoritesContext';
import React, { useContext, useEffect, useState } from 'react';
import FavoriteIcon from '@mui/icons-material/Favorite';
import { ThemeContext } from '@/contexts/ThemeContext';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';

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
    
    const handleOpen = (product) => {
        console.log("ç")
        setSelectedProduct(product)
        setOpen(true)
    };

    const handleClose = () => setOpen(false);

    useEffect(() => {
        getFavorite(user?.uid);
    }, [selectedProduct]);

    const handleConfirm = (id) => {
        if (selectedProduct) {
            removeFavorite(user.uid, selectedProduct.id);
            setSelectedProduct(null)
            handleClose();
        }
    };

    return (
        <div>
            <div className="cardRow">
                {favorites &&
                    favorites.map((item) => (
                        <div key={item.id} className="col-md-3 p-0">
                            <div className="homeCard">
                                <div className="favoriteButton" style={{ cursor: 'pointer' }}>
                                    <FavoriteIcon
                                        onClick={() => handleOpen(item)} // Pass item to modal
                                        sx={{ color: 'rgb(53, 212, 153)' }}
                                    />
                                </div>

                                <img src={item.resim_url} className="productImage" alt={item.urunAdi} />
                                <h6 className="prdctName pt-4">
                                    {item.urunAdi.length > 30 ? item.urunAdi.substring(0, 30) + '...' : item.urunAdi}
                                </h6>
                                <span style={{ color: systemTheme ? 'red' : 'black' }} className="prdctPrice">
                                    {item.fiyat} TL
                                </span>
                                <span>{item.sellers?.[0]?.saticiAdi}</span>
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
