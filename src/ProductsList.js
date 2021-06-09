import ProductContext from './context/Context.js'
import React,{ useContext } from 'react'
import ProductCard from './ProductCard.js'

function ProductsList () {
  const context = useContext(ProductContext);

  console.log('ProductList() context: ', context);
  if (context.products !== null) {
    let tmp = context.products.map(product=> {
      return (<ProductCard product={product}/>)
//        return(<div>testing w/context value</div>)

    });
    console.log('contxt.products.map() - tmp', tmp);
    return (<div>{tmp}</div>)
  } else {
    return (<div>Test - Product Context is not ready</div>)
  }
}

export default ProductsList