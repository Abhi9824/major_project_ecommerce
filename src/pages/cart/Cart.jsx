import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartProducts, updateCartItem, removeFromCart, increaseQuantity,decreaseQuantity } from '../../features/cartSlice';
import Navbar from '../../components/Navbar/Navbar';
import { Link } from 'react-router-dom';
// import './Cart.css'; // You can add custom CSS here if needed.

const Cart = () => {
  const dispatch = useDispatch();
  const { cartProducts, cartError, cartStatus } = useSelector((state) => state.cart);

  // ...

  const handleIncreaseQuantity = (id) => {
    dispatch(increaseQuantity(id)); // Dispatch increase quantity action
  };

  const handleDecreaseQuantity = (id) => {
    dispatch(decreaseQuantity(id)); // Dispatch decrease quantity action
  };

  const handleRemoveItem=(id)=>{
    dispatch(removeFromCart(id))
  }

  return (
    <div>
      {/* Navbar and other components */}
      <div className="container mt-5">
        <h3 className="fw-bolder">SHOPPING CART</h3>
        <div className="row">
          <div className="col-md-12">
            {cartStatus === 'loading' && <p>Loading Cart...</p>}
            {cartError && <p>{cartError}</p>}

            {cartProducts?.length === 0 ? (
              <p>No items in cart</p>
            ) : (
              <table className="table">
                <thead>
                  <tr>
                    <th scope="col">Product</th>
                    <th scope="col">Description</th>
                    <th scope="col">Price</th>
                    <th scope="col">Quantity</th>
                    <th scope="col">Subtotal</th>
                    <th scope="col">Action</th>
                  </tr>
                </thead>
                <tbody>
                  {cartProducts?.map((product) => (
                    <tr key={product.productId._id}>
                      <td>
                        <Link to={`/productDetails/${product.productId._id}`}>
                          <img
                            src={product.productId.images?.[0] || product.productId.images?.[1]}
                            alt={product.productId.title}
                            style={{ width: '120px' }}
                          />
                        </Link>
                      </td>
                      <td>
                        <p className="fw-bold">{product.productId.brand}</p>
                        <p>{product.productId.title}</p>
                      </td>
                      <td>₹{product.productId.price}</td>
                      <td>
                        <button onClick={() => handleDecreaseQuantity(product.productId._id)}>-</button>
                        <select
                          className="form-select"
                          value={product.productId.quantity || 1}
                          readOnly // Prevent manual input, only allow changes via buttons
                          style={{ width: '80px', display: 'inline-block' }}
                        >
                          {/* No options needed since it's displayed as a value */}
                          <option value={product.productId.quantity}>{product.productId.quantity}</option>
                        </select>
                        <button onClick={() => handleIncreaseQuantity(product.productId._id)}>+</button>
                      </td>
                      <td>₹{product.productId.price * product.productId.quantity}</td>
                      <td>
                        <button
                          className="btn btn-danger"
                          onClick={() => handleRemoveItem(product.productId._id)}
                        >
                          Remove
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};


export default Cart;