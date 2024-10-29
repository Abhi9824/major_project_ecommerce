import "./index.css"
import "bootstrap/dist/css/bootstrap.min.css"
import "bootstrap/dist/js/bootstrap.bundle";
import ProductsView from "./pages/products/ProductsView";
import {BrowserRouter as Router, Routes, Route} from "react-router-dom";
import ProductList from "./pages/products/ProductList";
import ProductDetails from "./pages/productDetails/ProductDetails";
import Wishlist from "./pages/Wishlist/Wishlist";
import Cart from "./pages/cart/Cart";


function App() {
  return (
    <div>
    <Router>
      <Routes>
        <Route path="/" element={<ProductsView/>}/>
        <Route path="/productList" element={<ProductList/>}/>
        <Route path="/productList/category/:categoryGender" element={<ProductList />}/>
        <Route path="/productDetails/:productId" element={<ProductDetails />}/>
        <Route path="/wishlist" element={<Wishlist />}/>
        <Route path="/cart" element={<Cart />}/>





      </Routes>
    </Router>
     
    </div>
  );
}

export default App;
