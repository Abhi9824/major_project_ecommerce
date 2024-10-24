import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchProducts } from '../../features/productSlice'
// import ProductsList from './ProductList';
import Navbar from '../../components/Navbar/Navbar';
import Caurousels from '../../components/productCarousels/Caurousels';

const ProductsView = () => {

    const dispatch=useDispatch();

    const {products, status, error}=useSelector((state)=>{
      
     
      
      return state.products})

    console.log(products)

    const firstMensShoe=products && products
    .filter((product)=>product.gender==="Mens")[0]

    const firstWomensShoe=products && products
    .filter((product)=>product.gender==="Womens")[0]

    console.log(firstMensShoe)
    console.log(firstWomensShoe)



    useEffect(()=>{
        dispatch(fetchProducts())

    },[dispatch])
  return (
    <div>
     <Navbar/>
    {status==="Loading" && <p>Loading Products....</p>}
    {error && <p>{error}</p>}
    <div className='caurousels'>
    <Caurousels/></div>
    <div className='row'>
    <div className='col-md-6'>

    

    </div>

    </div>

    
   

      
    </div>
  )
}

export default ProductsView
