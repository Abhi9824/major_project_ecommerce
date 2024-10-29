import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { fetchCartProducts, removeFromCart, setSelectedSize, updateCartItem } from '../../features/cartSlice';
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
    dispatch(removeFromCart(id));
    dispatch(fetchCartProducts());
  };

  // Calculate subtotal, discount, tax, and grand total
  const subtotal = cartProducts.reduce((acc, product) => acc + product.productId.price * product.quantity, 0);
  const discount = subtotal > 30000 ? 0.1 * subtotal : 0;
  const tax = 0.05 * (subtotal - discount);
  const shipping = subtotal > 50000 ? 0 : 100;
  const grandTotal = subtotal - discount + tax + shipping;

  return (
    <div>
      <Navbar />
      <div className="container mt-5">
        <h3 className="fw-bolder heading">SHOPPING CART</h3>
        <div className="row">
          {cartStatus === 'loading' && <p>Loading Cart...</p>}
          {cartError && <p>{cartError}</p>}
          {cartProducts?.length === 0 ? (
            <p>No items in cart</p>
          ) : (
            <div className="row py-4">
              {cartProducts.map((product) => {
                const productSubtotal = product.productId.price * product.quantity;
                return (
                  <div className="col-md-6 mb-4" key={product.productId._id}>
                    <div className="card h-100">
                      <div className="row g-0">
                        <div className="col-4">
                          <Link to={`/productDetails/${product.productId._id}`}>
                            <img
                              src={product.productId.images[0]}
                              alt={product.productId.title}
                              className="img-fluid rounded-start"
                              style={{ objectFit: 'cover', height: '100%' }}
                            />
                          </Link>
                        </div>
                        <div className="col-6  mx-4 d-flex flex-column justify-content-between p-3">
                          <div>
                            <p className="fw-bold mb-1">{product.productId.brand}</p>
                            <p className="mb-1">{product.productId.title}</p>
                            <h5 className="fw-bold">${product.productId.price}</h5>
                          </div>
                          <div>
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
                            <p className="mb-2">
                              Quantity: 
                              <button className="btn btn-light btn-sm mx-2" onClick={() => handleDecreaseQuantity(product)}>-</button>
                              <span>{product.quantity}</span>
                              <button className="btn btn-light btn-sm mx-2" onClick={() => handleIncreaseQuantity(product)}>+</button>
                            </p>
                          </div>
                          <button
                            className="btn btn-danger btn-sm mt-2"
                            onClick={() => handleRemoveItem(product.productId._id)}
                          >
                            Remove
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
          
          <div className="col-md-4">
            <div className="card p-3">
              <h5>Price Details</h5>
              <p>Subtotal: ${subtotal.toFixed(2)}</p>
              <p>Discount: ${discount.toFixed(2)}</p>
              <p>Tax: ${tax.toFixed(2)}</p>
              <p>Shipping Charges: ${shipping.toFixed(2)}</p>
              <h5>Grand Total: ${grandTotal.toFixed(2)}</h5>
              <button className="btn btn-primary mt-3 w-100">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Cart;
