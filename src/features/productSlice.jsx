import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchProducts = createAsyncThunk(
  "products/fetchProducts",
  async () => {
    try {
      const response = await axios.get("http://localhost:3000/products");
      if (response.status === 200) {
        return response.data;
      } else if (response.status === 404) {
        throw new Error("Cannot find products");
      }
    } catch (error) {
      throw error;
    }
  }
);

export const genderCategoryProducts=createAsyncThunk("products/genderCategoryProducts", async(categoryGender)=>{
  try{
    const response=await axios.get(`http://localhost:3000/products/category/${categoryGender}`)
    if(response.status===200){
      return response.data
    }else{
      throw new Error('Cannot find Products')
    }

  }catch(error){
    throw error
  }
})

//helper function
const applyFilters=(state)=>{
  let updatedProducts=[...state.products];

    // Filter by category if it's not "All"
    if (state.filterCategory.length > 0) {
      updatedProducts = updatedProducts.filter((prod) =>
        state.filterCategory.some((cat) => prod.category.includes(cat))
      );
    }

   //filter by gender
   if(state.gender.length>0){
    updatedProducts=updatedProducts.filter((prod)=>state.gender.some((g)=>prod.gender.includes(g)))
    console.log("gender",updatedProducts)
   }

    // Filter by rating if one is selected
  if (state.rating) {
    const ratingThreshold = parseInt(state.rating, 10);
    updatedProducts = updatedProducts.filter(
      (prod) => prod.rating >= ratingThreshold
    );
  }

  // Filter by price range
  updatedProducts = updatedProducts.filter(
    (prod) => prod.price <= state.price
  );

  // Sort products if a sort method is selected
  if (state.sortBy === "asc") {
    updatedProducts = updatedProducts.sort((a, b) => a.price - b.price);
  } else if (state.sortBy === "des") {
    updatedProducts = updatedProducts.sort((a, b) => b.price - a.price);
  }



  console.log("Updated Products After Filter: ", updatedProducts);
   return updatedProducts
}



const productSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    status: "idle",
    error: null,
    filterCategory: [],
    price: 80000,
    sortBy: "price",
    wishlist:false,
    rating: "",
    gender: [], // Changed to an array to store multiple selected gender options
  
    filteredProducts: [],
    wishlistProducts:[]
  },

  reducers: {
    filterByCategory: (state, action) => {  
      state.filterCategory = action.payload;
      // state.applyFilters(state)
      state.filteredProducts = applyFilters(state);

      
    },
    filterByGender: (state, action) => {
      state.gender = action.payload;
      
      state.filteredProducts = applyFilters(state);
    },
     
    filterRating: (state, action) => {
      state.rating = action.payload;
      console.log(action.payload)
      // const ratingThreshold = parseInt(action.payload, 10);

      // state.filteredProducts = state.filteredProducts.filter(
      //   (prod) => prod.rating >= ratingThreshold
      // );
      state.filteredProducts = applyFilters(state);
    },
    priceFilter: (state, action) => {
      state.price = action.payload;

      // state.filteredProducts = state.products.filter(
      //   (prod) => prod.price <= action.payload
      // );
      // state.applyFilters()
      state.filteredProducts = applyFilters(state);
    },
    sortByPrice: (state, action) => {
      state.sortBy = action.payload;

      // const sortedProducts = [...state.filteredProducts].sort((a, b) => {
      //   return action.payload === "asc" ? a.price - b.price : b.price - a.price;
      // });

      // state.filteredProducts = sortedProducts;

      state.filteredProducts = applyFilters(state);
    },
    toggleWishlist: (state, action) => {
      const productId = action.payload;
      // Find the product to toggle its wishlist status
      const product = state.products.find((prod) => prod._id === productId);
    
      if (product) {
        product.isWishlist = !product.isWishlist;
    
        // If the product is now in the wishlist, add it to wishlistProducts
        if (product.isWishlist) {
          state.wishlistProducts = [...state.wishlistProducts, product];
        } else {
          // If the product is removed from the wishlist, filter it out from wishlistProducts
          state.wishlistProducts = state.wishlistProducts.filter(
            (prod) => prod._id !== productId
          );
        }
        state.products = state.products.map((prod) =>
          prod._id === productId ? { ...prod, isWishlist: product.isWishlist } : prod
        );
      }
    },
    
    
    
    resetFilters: (state) => {
        // Reset all filters to their initial values
        state.filterCategory = [];
        state.price = 80000;
        state.sortBy = "price";
        state.rating = "";
        state.gender = [];
        // Reset the filteredProducts to include all products
        state.filteredProducts = state.products;
      },
    
  },
extraReducers:(builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
        state.status = "loading";
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        state.status = "success";
        state.products = action.payload.map(product => ({
          ...product,
          isWishlist: product.isWishlist || false // Ensure isWishlist is defined
      }));
        state.filteredProducts = action.payload; // Initialize filteredProducts with all products
        
      })
      .addCase(fetchProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
      .addCase(genderCategoryProducts.pending, (state)=>{
        state.status='loading'
      })
      .addCase(genderCategoryProducts.fulfilled, (state, action)=>{
        state.status='success'

        console.log("Fetched gender category products: ", action.payload);
        state.filteredProducts = action.payload;
        console.log("Fetched gender filtered products: ", state.filteredProducts);
        // const filteredByGender = action.payload.filter(prod => prod.gender.includes(state.gender[0])); // Assuming state.gender[0] contains the selected gender
        // console.log("Filtered products after fetching by gender: ", filteredByGender);
        // state.filteredProducts = filteredByGender.length > 0 ? filteredByGender : action.payload; 
        

      })
      .addCase(genderCategoryProducts.rejected, (state, action) => {
        state.status = "failed";
        state.error = action.error.message;
      })
  },
});

export default productSlice.reducer;
export const {
  filterByCategory,
  filterByGender,
  filterRating,
  sortByPrice,
  
  priceFilter,resetFilters,toggleWishlist
} = productSlice.actions;
