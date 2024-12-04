import { createContext, useContext, useEffect, useState } from "react";

export const FavoritesContext = createContext(null)

const FavoritesContextProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([])

    const addFavorite = (userId,urunId) => {
        console.log("userId: ", userId, "urunId: ", urunId )
        const add = async () => {
            console.log("çalıştı")
            const data = {
                userId,
                urunId
            };
    
            const response = await fetch("http://localhost:8080/api/favorites/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                // Eğer hata durumu varsa fırlat
                const errorData = await response.json();
                throw new Error(errorData.message || "An error occurred");
            }
    
            return response.json();
        };
    
        add().then((data) => {
            console.log("thende")
            console.log(data)
        }).catch((error) => {
            console.log(error)
        });
    }

    const removeFavorite = (userId, urunId) => {
        const remove = async () => {
            console.log("çalıştı")
            const data = {
                userId,
                urunId
            };
    
            const response = await fetch("http://localhost:8080/api/favorites/remove", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                // Eğer hata durumu varsa fırlat
                const errorData = await response.json();
                throw new Error(errorData.message || "An error occurred");
            }
    
            return response.json();
        };
    
        remove().then((data) => {
            console.log("thende")
            console.log(data)
        }).catch((error) => {
            console.log(error)
        });
    }

    const getFavorite = (userId) => {
        console.log("userId: ", userId)
        const get = async () => {
            const data = {
                userId
            }
    
            const response = await fetch("http://localhost:8080/api/favorites/list", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            if (!response.ok) {
                // Eğer hata durumu varsa fırlat
                const errorData = await response.json();
                throw new Error(errorData.message || "An error occurred");
            }
    
            return response.json();
        };
    
        get().then((data) => {
            console.log("thende")
            console.log("favorileri listele ",data)
            setFavorites(data)
        }).catch((error) => {
            console.log(error)
        });
    }
    return (
        <FavoritesContext.Provider value={{
            addFavorite,
            removeFavorite,
            getFavorite,
            favorites
        }}>
            { children }
        </FavoritesContext.Provider>
    );
}

export default FavoritesContextProvider