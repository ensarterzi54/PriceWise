import { createContext, useState } from "react";

export const AiContext = createContext(null)

const AiContextProvider = ({ children }) => {
    const [detail, setDetail] = useState("")

    const askAi = (productName, ai) => {
        const sendDeepSeek = async () => {
            const response = await fetch(`http://localhost:8080/api/details/${ai}`, {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    "product_name": productName
                })
            });

            const responseText = await response.text()
            
            try {
                const responseJson = JSON.parse(responseText)
                return responseJson;
            } catch (error) {
                console.error("JSON parse hatası:", error)
            }
        }
    
        sendDeepSeek().then((data) => {
            console.log("thende")
            console.log("data", data)
            setDetail(data.meaningful_text)
            console.log("thende detail: ", detail)
        }).catch((error) => {
            console.log(error)
        })
    }

    return (
        <AiContext.Provider value={{
            askAi,
            setDetail,
            detail
        }}>
            { children }
        </AiContext.Provider>
    );
}

export default AiContextProvider