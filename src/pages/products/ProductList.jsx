import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '../../features/productSlice';
import Navbar from '../../components/Navbar/Navbar';
import Filter from '../../components/SidebarFilter/Filter';
import "./product.css";
import { Link } from 'react-router-dom';
import { useParams } from 'react-router-dom';

const ProductList = () => {
  const dispatch = useDispatch();
  const { products, status, error, filteredProducts } = useSelector((state) => state.products);
  console.log(products);

  

  useEffect(() => {
    dispatch(fetchProducts());
    
    },[]
  )
    

  return (
    <>
      <Navbar />
      <div className='row py-2 topdiv'>
        <div className='col-md-3'>
          <Filter />
        </div>
        <div className='container py-2 col-md-9'>
          {status === "loading" && <p>Products Loading....</p>}
          {error && <p>{error}</p>}

          {filteredProducts && filteredProducts.length > 0 ? (
            <div className='row'>
              {filteredProducts.map((prod) => (
                <div className='col-md-4' key={prod._id}>
                
                  <div className='product-card'>
                  <Link to={`/productDetails/${prod._id}`} className='linkDecoration'>
                    <img 
                      src={prod.images[0]} 
                      alt={prod.name} 
                      className='product-image' 
                      onMouseOver={e => e.currentTarget.src = prod.images[1]} 
                      onMouseOut={e => e.currentTarget.src = prod.images[0]}
                    />
                    </Link>
                    <div className='card-body cardBody'>
                      <h5 className='card-title'>{prod.brand}</h5>
                    <p className='card-text fw-bold productTitle'>{prod.title}</p>
                      <p className='card-text'>${prod.price}</p>
                      <p className='card-text'>${prod.gender}</p>

                      {/* <p className='card-text'>{prod.rating}</p> */}

                    </div>
                    
                  </div>
                </div>
               
          

              ))}
            </div>
          ) : (
            <p>No products available</p>
          )}
        </div>
      </div>
    </>
  );
};

export default ProductList;
