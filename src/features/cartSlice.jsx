import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

// Fetch cart products
export const fetchCartProducts = createAsyncThunk("cart/fetchCartProducts", async () => {
  try {
    const response = await axios.get(`http://localhost:3000/cart`);
    if (response.status === 200) {
      // console.log(response.data)
      return response.data;
      
    } else if (response.status === 404) {
      throw new Error("No products found in the cart.");
    }
  } catch (error) {
    throw error;
  }
});

// Add product to cart
export const addToCart = createAsyncThunk('cart/addToCart', async ({ productId, quantity=1 }) => {
  try {
    const response = await axios.post(`http://localhost:3000/cart`, { productId, quantity });
    if (response.status === 201) {
      return response.data;
    } else {
      throw new Error("Error adding product to cart.");
    }
  } catch (error) {
    throw error;
  }
});

// Remove product from cart
export const removeFromCart = createAsyncThunk('cart/removeFromCart', async (productId) => {
  try {
    const response = await axios.delete(`http://localhost:3000/cart/${productId}`);
    if (response.status === 200) {
      console.log(response)
      return response.data;
    } else {
      throw new Error("Error removing product from cart.");
    }
  } catch (error) {
    throw error;
  }
});

// Update cart item quantity
export const updateCartItem = createAsyncThunk("cart/updateCartItem", async ({ id, quantity }) => {
  try {
    const response = await axios.put(`http://localhost:3000/cart/${id}`, { quantity });
    if (response.status === 200) {
      console.log(response.data)
      return response.data;
    } else {
      throw new Error("Error updating cart item.");
    }
  } catch (error) {
    throw error;
  }
});

const cartSlice = createSlice({
  name: "cart",
  initialState: {
    cartProducts: [],
    cartStatus: 'idle', 
    cartError: null, 
    isInCart: false,
    
  },
  reducers: {

    increaseQuantity: (state, action) => {
      const product = state.cartProducts.find((item) => item.productId._id === action.payload);
      if (product) {
        product.productId.quantity += 1; // Increment quantity by 1
      }
    },
    decreaseQuantity: (state, action) => {
      const product = state.cartProducts.find((item) => item.productId._id === action.payload);
      if (product && product.productId.quantity > 1) {
        product.productId.quantity -= 1; // Decrement quantity by 1 if it's greater than 1
      }
    },

    
  },
  extraReducers: (builder) => {
    builder
      // Fetch Cart Products
      .addCase(fetchCartProducts.pending, (state) => {
        state.cartStatus = "loading";
      })
      .addCase(fetchCartProducts.fulfilled, (state, action) => {
        state.cartStatus = "success";
        

        // console.log(action.payload)
        state.cartProducts = action.payload;
      })
      .addCase(fetchCartProducts.rejected, (state, action) => {
        state.cartStatus = "failed";
        state.cartError = action.error.message;
      })
      // Add to Cart
      .addCase(addToCart.pending, (state) => {
        state.cartStatus = "loading";
      })
      .addCase(addToCart.fulfilled, (state, action) => {
        state.cartStatus = "success";
        // console.log(action.payload)
       // Check if the product already exists in the cart
    const existingProduct = state.cartProducts.find((prod) => prod.productId._id === action.payload.productId._id);
    
    if (existingProduct) {
        // If product already exists, you can set an error or message to indicate that
        state.cartError = "Product already in the cart!";
    } else {
        // If product is not already in the cart, add it
        state.cartProducts.push(action.payload);
    }
      })
      .addCase(addToCart.rejected, (state, action) => {
        state.cartStatus = "failed";
        state.cartError = action.error.message;
      })
      // Remove from Cart
      .addCase(removeFromCart.pending, (state) => {
        state.cartStatus = "loading";
      })
      .addCase(removeFromCart.fulfilled, (state, action) => {
        state.cartStatus = "success";
        state.cartProducts = state.cartProducts.filter((prod) => prod._id !== action.payload._id);
      })
      .addCase(removeFromCart.rejected, (state, action) => {
        state.cartStatus = "failed";
        state.cartError = action.error.message;
      })
      // Update Cart Item
      .addCase(updateCartItem.pending, (state) => {
        state.cartStatus = "loading";
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.cartStatus = "success";
        const updatedProduct = state.cartProducts.find((item) => item._id === action.payload._id);
       
        if (updatedProduct) {
          console.log(action.payload.quantity)
          updatedProduct.quantity = action.payload.quantity;
        }
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.cartStatus = "failed";
        state.cartError = action.error.message;
      });
  }
});


export const {increaseQuantity,decreaseQuantity}=cartSlice.actions
export default cartSlice.reducer;
