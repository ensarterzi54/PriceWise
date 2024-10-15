import { createContext, useEffect, useState } from "react";

export const ScrapeContext = createContext(null)

const ScrapeContextProvider = ({ children }) => {
    const [datas, setDatas] = useState([])

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
            console.log(response)
    
            if (!response.ok) {
                // Eğer hata durumu varsa fırlat
                const errorData = await response.json();
                throw new Error(errorData.message || "An error occurred");
            }
    
            return response.json();
        };
    
        postData().then((data) => {
            // alert(data.message);
            console.log("dataaa: ",data)
            setDatas(data)
        }).catch((error) => {
            // alert(error.message);  // Hata mesajını kullanıcıya göster
        });
    }

    

    return (
        <ScrapeContext.Provider value={{
            getData,
            datas
        }}>
            { children }
        </ScrapeContext.Provider>
    );
}

export default ScrapeContextProvider