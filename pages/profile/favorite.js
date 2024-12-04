import { AuthContext } from '@/contexts/AuthContex';
import { FavoritesContext } from '@/contexts/FavoritesContext';
import React, { useContext, useEffect } from 'react'
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import { ThemeContext } from '@/contexts/ThemeContext';

const Favorite = () => {
    const { user } = useContext(AuthContext)
    const { systemTheme, setSystemTheme } = useContext(ThemeContext)
    const { getFavorite, favorites } = useContext(FavoritesContext)

    useEffect(() => {
        getFavorite(user?.uid)
    }, []);

    const isFavorite = (productId) => {
        console.log("isFavorite")
        addFavorite(user.uid, productId)
        setIsFavorited(!isFavorited)
    };

    return (
        <div>
            <div className="cardRow">
                    {
                        favorites ? favorites.map((item) => 
                        <div key={item.id} className="col-md-3 p-0">
                            <div className="homeCard">
                            <div className="favoriteButton" style={{ cursor: 'pointer' }}>
                                <FavoriteBorderIcon onClick={() => isFavorite(item.id)} sx={{ color: 'rgb(53, 212, 153)' }} />
                            </div>
                            
                            <img src={item.resim_url} className="productImage" alt={item.urunAdi} />
                                <h6 className="prdctName pt-4">{item.urunAdi.length > 30 ? item.urunAdi.substring(0, 30) + "..." : item.urunAdi}</h6>
                                <span style={{ color: systemTheme ? "red" : "black" }} className={`prdctPrice ${systemTheme && ``}`}>{item.fiyat} TL</span> <span>{item.sellers?.[0]?.saticiAdi}</span>
                            </div>
                        </div>
                        ) : null
                    }
            </div>
        </div>
    )
}

export default Favorite
