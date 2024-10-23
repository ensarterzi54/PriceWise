import { ScrapeContext } from '../../contexts/ScrapeContext'
import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router';
import styles from "../search/search.module.css"
const Search = () => {
    const { getData, datas } = useContext(ScrapeContext)
    const router = useRouter();
    const { search } = router.query
    const photo = {
        "width": 150 
    }
    useEffect(() => {
        getData(search)
    }, [search])

    return (
        <div className={`container ${styles.search}`}>
            <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-9">
                    {
                        datas ? datas.map((item) => 
                            <div key={item.uniqueKey} className={`${styles.productCard} mt-3`}>
                                <img src={item.resim_url} className={styles.productImage} alt={item.urunAdi} />
                                <div className={`${styles.cardInfo} pb-2`}>
                                    <span className={`${styles.productName} pb-2`}>{item.urunAdi}</span>
                                    <span>{item.id}</span>
                                    <span>{item.uniqueKey}</span>
                                    <span className={`${styles.productPrice} ml-2 mr-2`}>{item.fiyat} TL</span>
                                </div>
                                <button className={styles.buyButton}>Add to Cart</button>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Search
