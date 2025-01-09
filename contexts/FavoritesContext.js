import { createContext, useContext, useEffect, useState } from "react";

export const FavoritesContext = createContext(null)

const FavoritesContextProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([])

    const addFavorite = (userId,urunId) => {
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
            console.log("remmove çalıştı")
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
                console.log("remove if içi")
                const errorData = await response.json();
                throw new Error(errorData.message || "An error occurred");
            }
            console.log("remove son satır")
            return response.json();
        };
    
        remove().then((data) => {
            console.log("remove thende")
            console.log(data)
            getFavorite(userId)
            console.log("remove then son satır")
        }).catch((error) => {
            console.log("remove catch")
            console.log(error)
            console.log("remove catch son satır")
        });
    }

    const getFavorite = (userId) => {
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
            console.log("getFavorite then")
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