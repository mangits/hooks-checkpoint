import './App.css';
import React,{ useState, useEffect } from 'react'
import ProductContext from './context/Context.js'
import ProductsList from './ProductsList.js'
import Nav from './Nav.js'

function App() {
  const [products, updateProducts] = useState(null);
  const [update, setUpdate] = useState(false);
  const [activeImg, setActiveImg] = useState(null);

  console.log("App")

  useEffect(()=> {
    console.log("App useEffect");
    fetch("http://18.224.200.47/products/list")
    .then(response => response.json())
    .then(data =>updateProducts(data));
    }, [update])
  if (!update) {setUpdate(true)}

  return (
    <ProductContext.Provider value={{
      products,
      activeImg,
      setActiveImg
    }}>
      {/* <Nav/> */}
      <div className="App">
        <ProductsList />
      </div>
    </ProductContext.Provider>
  );
}

export default App;

// Make an API call to get a product list (Products data service, subsection "list")
// Make an API call to get specific details on a given product when its entry is clicked (Products data service - subsection ":productId")
// Display a list of products as cards with text of description
// Make each product clickable so that when clicked, it displays an image from the API for that product (Products data service - subsection "styles")
// Make it so that only one product's photo is visible at a time, and clicking it again closes the photo (NOTE: If a product does not have a viable photo on the API, allow for this eventuality with good conditional rendering).