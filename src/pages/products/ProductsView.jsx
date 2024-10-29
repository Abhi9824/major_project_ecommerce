// ProductsView Component

import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/productSlice';
import Navbar from '../../components/Navbar/Navbar';
import Caurousels from '../../components/productCarousels/Caurousels';
import { Link } from 'react-router-dom';

const ProductsView = () => {
    const dispatch = useDispatch();
    const { products, status, error } = useSelector((state) => state.products);

    useEffect(() => {
        dispatch(fetchProducts());
    }, [dispatch]);

    // Find the first men's and women's shoes when products are loaded
    const firstMensShoe = status === "success" ? products.find((product) => product.gender.includes('Mens')) : null;
    const firstWomensShoe = status === "success" ? products.find((product) => product.gender.includes('Womens')) : null;

    return (
        <div className='mainDiv'>
            <div className='main'>
                <Navbar />
            </div>
            
            {status === "Loading" && <p>Loading Products....</p>}
            {error && <p>{error}</p>}
            
            {/* Carousel Section */}
            <div className='carouselContainer'>
                <Caurousels />
            </div>
            
            {/* Row for Men's and Women's Products */}
            <div className='row productRow mt-4 py-4'>
                {firstMensShoe && (
                    <Link to={`/productList/category/Mens`} className='col-md-6 d-flex justify-content-around align-items-center text-decoration-none text-dark mb-3' style={{ backgroundColor: "#f5f5f5", borderRadius: "5px" }}>
                        <div>
                            <img src={firstMensShoe.images[0]} alt={firstMensShoe.title} className='img-fluid' />
                        </div>
                        <div className='mx-4'>
                            <h5 className='text-muted'>MEN'S <br /> NEW ARRIVALS</h5>
                            <h2 className='mt-4'>{firstMensShoe.title}</h2>
                            <p>{firstMensShoe.description}</p>
                        </div>
                    </Link>
                )}
                {firstWomensShoe && (
                    <Link to={`/productList/category/Womens`} className='col-md-6 d-flex justify-content-around align-items-center text-decoration-none text-dark mb-3' style={{ backgroundColor: "#f5f5f5", borderRadius: "5px" }}>
                        <div>
                            <img src={firstWomensShoe.images[0]} alt={firstWomensShoe.title} className='img-fluid' />
                        </div>
                        <div className='mx-4'>
                            <h5 className='text-muted'>WOMEN'S <br /> NEW ARRIVALS</h5>
                            <h2 className='mt-4'>{firstWomensShoe.title}</h2>
                            <p>{firstWomensShoe.description}</p>
                        </div>
                    </Link>
                )}
            </div>
        </div>
    );
};

export default ProductsView;
