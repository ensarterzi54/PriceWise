import { createContext, useEffect, useState } from "react";

export const ScrapeContext = createContext(null)

const ScrapeContextProvider = ({ children }) => {
    const [datas, setDatas] = useState([])
    const [categories, setCategories] = useState([])
    const [filterProducts, setFilterProducts] = useState([])
    
    const getData = (value) => {

        const postData = async () => {
            const response = await fetch("http://localhost:8080/api/products/search", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",  // JSON formatını belirtiyoruz
                },
                body: JSON.stringify({
                    "keyword": value
                }),  // Veriyi JSON formatına çeviriyoruz
            });
    
            if (!response.ok) {
                // Eğer hata durumu varsa fırlat
                const errorData = await response.json();
                throw new Error(errorData.message || "An error occurred");
            }

            return response.json();
        };
    
        postData().then((data) => {
            console.log("dataaa: ",data)
            setDatas(data)
        }).catch((error) => {
            console.log("error: ",error)
        });
    }

    const getRandomData = () => {
        const getData = async () => {
            const response = await fetch("http://localhost:8080/api/products/homepage", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",  // JSON formatını belirtiyoruz
                }
            });
    
            if (!response.ok) {
                // Eğer hata durumu varsa fırlat
                const errorData = await response.json();
                throw new Error(errorData.message || "An error occurred");
            }
    
            return response.json();
        };
    
        getData().then((data) => {
            setDatas(data)
            console.log("datas: ",data)
        }).catch((error) => {
            console.log("error: ",error)
        });
    }

    const getCategories = () => {
        const getCategoriesDatas = async () => {
            const response = await fetch("http://localhost:8080/api/categories", {
                method: "GET",
                headers: {
                    "Content-Type": "application/json",  // JSON formatını belirtiyoruz
                }
            });
    
            if (!response.ok) {
                // Eğer hata durumu varsa fırlat
                const errorData = await response.json();
                throw new Error(errorData.message || "An error occurred");
            }
    
            return response.json();
        };
    
        getCategoriesDatas().then((categories) => {
            setCategories(categories)
        }).catch((error) => {
            console.log("error: ",error)
        });
    }

    const productsByCategory = (id) => {
        const getProductsByCategory = async () => {
            const response = await fetch(`http://localhost:8080/api/categories/${id}/products`, {
                method: "GET",
                headers: {
                    "Content-Type": "application/json"
                }
            })
    
            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "An error occurred");
            }
    
            return response.json();
        };
    
        getProductsByCategory().then((categories) => {
            setFilterProducts(categories)
        }).catch((error) => {
            // alert(error.message);  // Hata mesajını kullanıcıya göster
        });
    }

    return (
        <ScrapeContext.Provider value={{
            getRandomData,
            getData,
            getCategories,
            productsByCategory,
            datas,
            categories,
            filterProducts
        }}>
            { children }
        </ScrapeContext.Provider>
    );
}

export default ScrapeContextProvider