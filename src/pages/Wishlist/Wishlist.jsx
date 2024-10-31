import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { toggleWishlist } from "../../features/productSlice"
import Navbar from '../../components/Navbar/Navbar'
import "./Wishlist.css"
import { Link } from 'react-router-dom'

const Wishlist = () => {
  const dispatch = useDispatch();
  const { products, status, error, wishlistProducts } = useSelector((state) => state.products);

  console.log(wishlistProducts);

  // console.log(wishlistProducts.length);
  
  useEffect(() => {
    // dispatch(toggleWishlist());
  }, []);

  const addToCartHandler=()=>{
    // const product=
    dispatch(addToCartHandler())

  }
  
  return (
    <div>
      <Navbar />
      <div className='wishlist-body'>
        <p className='fs-4 fw-bold'>MY WISHLIST ({wishlistProducts.length})</p>
        {status === 'loading' && <p>Loading....</p>}
        {status === "success" && wishlistProducts.length > 0 && (
          <div className="wishlist-products">
            <div className="row py-4">
              {wishlistProducts.map((product) => (
                <div key={product._id} className="col-md-3 mb-4">
                  <div className="wishlist-item card">
                    <Link to={`/productDetails/${product._id}`}>
                      <img 
                        src={product.images[0]} 
                        alt={product.name} 
                        className='product-image card-img-top' 
                        onMouseOver={e => e.currentTarget.src = product.images[1]} 
                        onMouseOut={e => e.currentTarget.src = product.images[0]}
                      />
                    </Link>
                    <div className="card-body ">
                      <p className="card-text">{product.brand}</p>
                      <h5 className="card-title fw-bold">{product.title}</h5>
                      <p className="card-text">${product.price.toFixed(2)}</p>
                      <button
                        className={`btn ${product.isWishlist ? 'btn-danger' : 'btn-secondary'}`}
                        onClick={() => dispatch(toggleWishlist(product._id))}
                      >
                        {product.isWishlist ? "Remove from Wishlist" : "Add to Wishlist"}
                      </button>

                      <button className='addTobagBtn' onClick={() => addToCartHandler(product._id)}>Add to Bag</button>
                      
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Wishlist;
