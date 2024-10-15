import { ScrapeContext } from '../../contexts/ScrapeContext'
import React, { useContext, useEffect, useState } from 'react'
import { useRouter } from 'next/router';
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
        <div className="container">
            <div className="row">
                <div className="col-md-3">
                </div>
                <div className="col-md-9 pr-3">
                    {
                        datas ? datas.map((item, index) => 
                            <div>
                                <div className="productCard mt-3" key={index}>
                                    <img src={item.resim_url} className="productImage" alt={item.urunAdi} />
                                    <span className="productName">{item.urunAdi}</span>
                                    <span className="productPrice">${item.fiyat}</span>
                                    <button className="buyButton">Add to Cart</button>
                                </div>
                            </div>
                        ) : null
                    }
                </div>
            </div>
        </div>
    )
}

export default Search
