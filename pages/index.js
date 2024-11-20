import Head from "next/head";
import { ScrapeContext } from "../contexts/ScrapeContext"
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "@/contexts/AuthContex";
import { LinearProgress, Skeleton } from "@mui/material";

const Home = () => {
  const { datas, getRandomData, productsByCategory } = useContext(ScrapeContext)
  const { user } = useContext(AuthContext)
  const [showMessage, setShowMessage] = useState(false);

  useEffect(()=> {
    getRandomData()
    // 3 saniye sonra durumu değiştir
    const timer = setTimeout(() => {
      setShowMessage(true)
    }, 1000)

    // Temizlik fonksiyonu
    return () => clearTimeout(timer);
  }, [user])

  return (
    <>
      <Head>
        <title>PriceWise</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      {showMessage ? (
          user ? user.emailVerified ? 
          <div className="container-fluid home">
            <div className="cardRow">
                  {
                    datas ? datas.map((item) => 
                      <div key={item.id} className="col-md-3 mt-3 p-0">
                        <div className="homeCard">
                          <img src={item.resim_url} className="productImage" alt={item.urunAdi} />
                          <>
                            <h6 className="prdctName pt-4">{item.urunAdi.length > 30 ? item.urunAdi.substring(0, 30) + "..." : item.urunAdi}</h6>
                            <span className="prdctPrice">{item.fiyat} TL</span> <span>{item.sellers?.[0]?.saticiAdi}</span>
                          </>
                        </div>
                      </div>
                    ) : null
                  }
            </div>
          </div> :
          null : 
          <div className="container-fluid home">
            <div className="cardRow">
                  {
                    datas ? datas.map((item) => 
                      <div key={item.id} className="col-md-3 mt-3 p-0">
                        <div className="homeCard">
                          <img src={item.resim_url} className="productImage" alt={item.urunAdi} />
                          <>
                            <h6 className="prdctName pt-4">{item.urunAdi.length > 30 ? item.urunAdi.substring(0, 30) + "..." : item.urunAdi}</h6>
                            <span className="prdctPrice">{item.fiyat} TL</span>
                          </>
                        </div>
                      </div>
                    ) : null
                  }
            </div>
          </div>
      ) : (
        <div className="skeleton">
          <LinearProgress />
        </div>
      )}
    </>
  );
}

export default Home
