import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import CarouselProducts from '../../components/productCarousels/CarouselProducts';
import Navbar from '../../components/Navbar/Navbar';
import { fetchProducts, toggleWishlist } from '../../features/productSlice';
import { addToCart, setSelectedSize } from '../../features/cartSlice';
import './productDetails.css';
import {fetchCartProducts} from '../../features/cartSlice'
import RelatedProducts from './RelatedProducts';


const ProductDetails = () => {
  const dispatch = useDispatch();
  const productId = useParams();
  
  const { products, status, error, wishlistProducts,filterCategory } = useSelector((state) => state.products);
  const { cartProducts, cartStatus, cartError, selectedSize } = useSelector((state) => state.cart);

  const productData = products?.find((prod) => prod._id === productId.productId);

  useEffect(() => {
    dispatch(fetchProducts());
  }, [dispatch]);

    const handleWishlistClick = () => {
      dispatch(toggleWishlist(productId.productId));
    };

  const handleSizeChange = (event) => {
    dispatch(setSelectedSize(event.target.value));
  };

  const addToCartHandler = (productId, selectedSize) => {
    console.log("Selected Size cartDetails:", selectedSize); // Log the selected size
    console.log("Product ID:", productId);
    
    if (!selectedSize) {
        alert("Please select a size before adding to the cart."); // Alert for size selection
        return;
    }

    // Check if the product is already in the cart
    const existingItem = cartProducts.find((prod) => prod.productId._id === productId);
    console.log(existingItem)

    if (existingItem) {
        alert("This product is already added to the cart."); // Show alert for already added product
        return;
    }

    const quantity = 1;
    dispatch(addToCart({ productId, quantity, selectedSize }))
        .then(() => dispatch(fetchCartProducts()));
    console.log("Added successfully to the cart"); 
};

const relatedProducts = productData
    ? products.filter((prod) => prod.category === productData.category && prod._id !== productData._id)
    : [];

    console.log(relatedProducts)

  return (<>
    <div className='main'>
      <Navbar />
      <div className='row py-2 bodyDiv'>
        {status === "Loading" && 
          (<div className="spinner-border text-success loadingDiv" role="status">
            <span className="visually-hidden">Loading...</span>
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
              <button className="btn btn-link text-decoration-none">Size Guide</button>
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
            <div className='d-flex justify-content-between align-items-center wishlistDiv py-2'>
              <div className='sizeSelect flex-grow-1 me-2'>
                <select name="size" className="form-select w-100" defaultValue="" onChange={handleSizeChange}>
                  <option value="" disabled>Select Size</option>
                  {productData.size.map((size, index) => (
                    <option key={index} value={size}>{size}</option>
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
              <button className='addTobagBtn' onClick={() => addToCartHandler(productData._id,selectedSize)}>Add to Bag</button>
            </div>
          </div>
        )}
        {cartStatus === "failed" && cartError && (
          <p className="text-danger text-center">{cartError}</p>
        )}
      </div>

      </div>
      {/* Related Products Section */}
<RelatedProducts relatedProducts={relatedProducts} />

</>
  );
}
 

      
    


export default ProductDetails;
