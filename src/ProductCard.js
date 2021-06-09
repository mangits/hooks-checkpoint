import React,{ useState, useEffect, useContext } from 'react'
import ProductContext from './context/Context.js'
import './ProductCard.css'


function ProductCard({ product }) {
  const context = useContext(ProductContext);
  const [clicked, setClick] = useState(false)
  const [productId, setProductId] = useState(null)
  const [photoUrl, setPhotoUrl] = useState(`https://upload.wikimedia.org/wikipedia/commons/a/ac/No_image_available.svg`)
  const [details, setDetails] = useState(<></>)
  if (productId === null) {setProductId(product.id)}
  console.log("ProductCard()")

   useEffect(async () => {
    console.log("productCard() useEffect")
    await fetch(`http://18.224.200.47/products/${productId}/styles`)
      .then(res => res.json())
      .then(data => {
        let imgData = data.results[0].photos[0].thumbnail_url
        if (imgData !== null) {
          setPhotoUrl(imgData)
        }
      })
  }, [productId])

  useEffect(async () => {
    console.log("product Card usEffect details")
    await fetch(`http://18.224.200.47/products/${productId}`)
      .then(res => res.json())
      .then(data => {
          setDetails(
            <div className="details">
              <div>Slogan: {data.slogan}</div>
              <div>Category: {data.category}</div>
              <div>Cost: {data.default_price}</div>
            </div>
          )
        })
  }, [productId])

  return (
    <div className='productCard' id={product.id} onClick={(event) => {
      setClick(!clicked);
      context.setActiveImg(product.id)
    }}>
      <h1 className='productName'>{product.name}</h1>
      <div className='productDesc'>Product Description: {product.description}</div>
      {clicked ?
        <div>
          {details}
          {(context.activeImg === product.id) ?
          <img src={photoUrl} alt="cool" height="200"/> : <></>}

        </div> : <></>
      }
    </div>
  )
}

export default ProductCard;