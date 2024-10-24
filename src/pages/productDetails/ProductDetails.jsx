import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CarouselProducts from '../../components/productCarousels/CarouselProducts';
import Navbar from '../../components/Navbar/Navbar';
import { fetchProducts } from '../../features/productSlice';
import './productDetails.css';
import {toggleWishlist} from "../../features/productSlice"
// import { fetchCartProducts } from '../../features/cartSlice';
import { addToCart } from '../../features/cartSlice';

const ProductDetails = () => {
  const dispatch = useDispatch();
  const productId = useParams();
  console.log(productId);

  const { products, status, error, wishlistProducts } = useSelector((state) => state.products);
  const{cartProducts, cartStatus,cartError}=useSelector((state)=>state.cart)

  console.log(cartProducts)


  const productData = products?.find((prod) => prod._id === productId.productId);
  console.log("Matched", productData);
  console.log(wishlistProducts)

  useEffect(() => {


    dispatch(fetchProducts());
  }, [dispatch]);

  const handleWishlistClick = () => {
    console.log("Clicked product ID:", productId.productId); // Log the product ID
    dispatch(toggleWishlist(productId.productId));
   
  };

  const addToCartHandler=(productId)=>{
   const  quantity=1;
   dispatch(addToCart({ productId: productId, quantity }));
   console.log("Add successfully to Cart")

  }
  

  return (
    <>
      <Navbar />
      <div className='row py-2 bodyDiv'>
        {status === "Loading" && 
        
          (<div class="spinner-border text-success  loadingDiv" role="status">
  <span class="visually-hidden">Loading...</span>
</div>)
        }
        {status === "Failed" && error && (
          <p className="text-danger text-center">{error}</p>
        )}
        <div className='col-12 col-md-6'>
          <CarouselProducts productData={productData} />
        </div>
        {productData && (
  <div className='col-12 col-md-5 mt-2 detailsDiv'>
    <div className='d-flex justify-content-between align-items-center'>
      <h5>{productData.brand.toUpperCase()}</h5>
      <button className="btn btn-link text-decoration-none">
        Size Guide
      </button>
    </div>
    <h4 className='fw-bolder'>{productData.title}</h4>
    <p>${productData.price.toFixed(2)}</p>
    <p>MRP Inclusive of all taxes</p>
    <p className='description'>{productData.description}</p>
    <ul>
      {productData.features.map((feature, index) => (
        <li key={index}>{feature}</li>
      ))}
    </ul>
    <div className='d-flex justify-content-between align-items-center wishlishtDiv py-2'>
  <div className='sizeSelect flex-grow-1 me-2'>
    <select name="size" className="form-select w-100" defaultValue="">
      <option value="" disabled>Select Size</option>
      {productData.size.map((size, index) => (
        <option key={index} value={size}>
          {size}
        </option>
      ))}
    </select>
  </div>
  <div className='wishlistBtn flex-grow-1 ms-2'>
    <button
      className={`btn w-100 ${productData.isWishlist ? 'btn-danger' : 'btn-secondary'}`}
      onClick={handleWishlistClick}
    >
      {productData.isWishlist ? 'Remove from Wishlist' : 'Add to Wishlist'}
    </button>
  </div>
</div>

    <div className='py-3 addTobagBtnDiv'>
    <button className='addTobagBtn' onClick={() => addToCartHandler(productData._id)}>Add to Bag</button>
    </div>
  </div>
)}
{cartStatus === "failed" && cartError && (
          <p className="text-danger text-center">{cartError}</p>
        )}

       
      </div>
    </>
  );
}

export default ProductDetails;
