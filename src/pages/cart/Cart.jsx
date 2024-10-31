import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartProducts, removeFromCart, setSelectedSize, updateCartItem } from '../../features/cartSlice';
import { toggleWishlist } from '../../features/productSlice';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
import "./cart.css";

const Cart = () => {
  const dispatch = useDispatch();
  const { cartProducts, cartError, cartStatus, selectedSize } = useSelector((state) => state.cart);

  useEffect(() => {
    dispatch(fetchCartProducts());
  }, [dispatch]);

  const handleIncreaseQuantity = (product) => {
    const newQuantity = product.quantity + 1;
    dispatch(updateCartItem({ id: product._id, quantity: newQuantity }));
  };

  const handleDecreaseQuantity = (product) => {
    if (product.quantity > 1) {
      const newQuantity = product.quantity - 1;
      dispatch(updateCartItem({ id: product._id, quantity: newQuantity }));
    }
  };

  const handleSizeChange = (productId, newSize) => {
    const product = cartProducts.find((prod) => prod._id === productId);
    if (product) {
      dispatch(updateCartItem({ _id: productId, quantity: product.quantity, selectedSize: newSize }));
    }
  };

  const handleRemoveItem = (id) => {
    dispatch(removeFromCart(id)).then(() => {
      dispatch(fetchCartProducts());
    });
  };
  

  const handleWishlistClick = (product) => {
    dispatch(removeFromCart(product.productId._id))
      .then(() => dispatch(toggleWishlist(product.productId._id)))
      .then(() => dispatch(fetchCartProducts()));
  };
  
  
  // Calculate subtotal, discount, tax, and grand total
  const subtotal = cartProducts?.length ? cartProducts?.reduce((acc, product) => acc + product.productId.price * product.quantity, 0):0;
  const discount = subtotal > 30000 ? 0.1 * subtotal : 0;
  const tax = 0.05 * (subtotal - discount);
  const shipping = subtotal > 50000 ? 0 : 100;
  const grandTotal = subtotal - discount + tax + shipping;

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h3 className="fw-bolder heading">SHOPPING CART</h3>
        <div className="row ">
        {cartStatus === 'loading' && <p>Loading Cart...</p>}
          {cartError && <p>{cartError}</p>}

        {/* Left column */}
        <div className='col-md-6'>
          
          {cartProducts?.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            cartProducts.map((product)=>{
              return(
             
             <div className="card cart-card mb-4 p-3" key={product._id}>
             <div className="row-card g-0">
              <div className='col-md-4'>
              <Link to={`/productDetails/${product.productId._id}`}>
              <img src={product.productId.images[0]} alt={product.productId.title} 

              className="img-fluid"
              style={{ objectFit: 'cover', height: '100%' }}
              />
</Link> </div>

<div className='col-md-4 mx-3'>
  <div className="card-body d-flex flex-column align-items-start">
    <h5 className="card-title fw-bold">{product.productId.title}</h5>
    <p className="card-text">Price: ${product.productId.price.toFixed(2)}</p>
    <p className="mb-1">Size: 
                              <select 
                                className="form-select form-select-sm d-inline w-auto ms-2"
                                onChange={(e) => handleSizeChange(product.productId._id, e.target.value)}
                                value={product.selectedSize}
                              >
                                {product.productId.size.map((size, index) => (
                                  <option key={index} value={size}>{size} UK</option>
                                ))}
                              </select>
                            </p>
    {/* <p className="card-text">Quantity: {product.quantity}</p> */}
    
    <p className="mb-2 py-2">
                              Quantity: 
                              <button className="btn btn-light btn-sm mx-2" onClick={() => handleDecreaseQuantity(product)}>-</button>
                              <span>{product.quantity}</span>
                              <button className="btn btn-light btn-sm mx-2" onClick={() => handleIncreaseQuantity(product)}>+</button>
                            </p>
                            <button
                            className="btn btn-danger btn-sm mt-2"
                            onClick={() => handleRemoveItem(product.productId._id)}
                          >
                            Remove From Cart
                          </button>

                          <button
                            className="btn danger btn-sm mt-2"
                            onClick={() => handleWishlistClick(product)}
                          >
                            Move to Wishlist
                          </button>
  </div>
</div>


</div></div>
                        )            })






          )
          }
          
          
        </div>


 {/* price details */}
 <div className="col-md-4">
            <div className="card priceCard px-3 d-flex">
                <h5 className='fw-bold'>PRICE DETAILS</h5>
                <hr className='mt-0'/>
                <p>Price({cartProducts.length} Item): <span className='float-end'>${subtotal.toFixed(2)}</span></p>
                <p>Discount: <span className='float-end'>${discount.toFixed(2)}</span></p>
                <p>Tax: <span className='float-end'>${tax.toFixed(2)}</span></p>
                <p>Shipping Charges: <span $ className='float-end'>${shipping.toFixed(2)}</span></p>
                <hr />
                <h5 className='fw-bold'>Grand Total: <span className='float-end'>${grandTotal.toFixed(2)}</span></h5><hr/>
                <p>You will save ${discount.toFixed(0)} on this order.</p>
                <Link to={`/checkout`}>
                    <button className="btn checkoutBtn mt-3 w-100">Checkout</button>
                </Link>
            </div>
        </div>
       




      </div>
    </div>
    
    </div>
  );
};

export default Cart;
