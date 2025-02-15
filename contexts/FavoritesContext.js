import { createContext, useContext, useEffect, useState } from "react";

export const FavoritesContext = createContext(null)

const FavoritesContextProvider = ({ children }) => {
    const [favorites, setFavorites] = useState([])

    const addFavorite = (userId,urunId) => {
        const add = async () => {
            const data = {
                userId,
                urunId
            }
    
            const response = await fetch("http://localhost:8080/api/favorites/add", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(data)
            });

            const responseText = await response.text()
            
            try {
                const responseJson = JSON.parse(responseText)
            } catch (error) {
                console.error("JSON parse hatası:", error)
            }
        }
    
        add().then((data) => {
            getFavorite(userId)
        }).catch((error) => {
            console.log(error)
        })
    }

    const removeFavorite = (userId, urunId) => {
        const remove = async () => {
            console.log("remmove çalıştı")
            const data = {
                userId,
                urunId
            }
    
            const response = await fetch("http://localhost:8080/api/favorites/remove", {
                method: "DELETE",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ userId, urunId })
            })
            
            const responseText = await response.text(); // Yanıtı düz metin olarak al
            console.log("Yanıt içeriği:", responseText); // Gelen yanıtı ekrana yazdır
            
            try {
                const responseJson = JSON.parse(responseText); // JSON'a çevir
                console.log("JSON formatında yanıt:", responseJson);
            } catch (error) {
                console.error("JSON parse hatası:", error);
            }
        }
    
        remove().then((data) => {
            getFavorite(userId)
        }).catch((error) => {
            console.log(error)
        })
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
            setFavorites,
            favorites
        }}>
            { children }
        </FavoritesContext.Provider>
    );
}

export default FavoritesContextProvider