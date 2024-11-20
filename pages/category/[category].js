import React, { useContext, useEffect } from 'react'
import { useRouter } from 'next/router';
import styles from "../category/category.module.css"
import { ScrapeContext } from '@/contexts/ScrapeContext';
import Link from 'next/link';

const Category = () => {
    const router = useRouter();
    const { category, id } = router.query
    const { productsByCategory, filterProducts } = useContext(ScrapeContext)

    useEffect(() => {
        productsByCategory(id)
        if(filterProducts) {
            console.log(filterProducts)
            console.log("category sayfasında ", filterProducts.length)
        }
    }, [category])

    return (
        <div className={`container ${styles.category}`}>
            <h5>"{category}" kategorisine ait ürünler</h5>
            <div className={`container ${styles.search}`}>
                <div className="row">
                    <div className="col-md-3">
                    </div>
                    <div className="col-md-9">
                        {
                            filterProducts ? filterProducts.map((item, index) => 
                                <div key={item.id} className={`${styles.productCard} mt-3`}>
                                    <img src={item.resim_url} className={styles.productImage} alt={item.urunAdi} />
                                    <div className={`${styles.cardInfo} pb-2 ml-4`}>
                                        <span className={`${styles.productName} pb-2`}>{item.urunAdi}</span>
                                        <span>{item.sellers?.[0]?.saticiAdi}</span>
                                        <span className={`${styles.productPrice} ml-2 mr-2`}>{item.fiyat} TL</span>
                                        {/* <span>Satıcı: { item.sellers[0].saticiAdi }</span> */}
                                        <Link href={item.url} target="_blank">Satıcıya git</Link>
                                    </div>
                                    {/* <button className={styles.buyButton}>Add to Cart</button> */}
                                </div>
                            ) : null
                        }
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Category
