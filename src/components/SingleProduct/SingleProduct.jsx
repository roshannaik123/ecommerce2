import RealtedProducts from "./RelatedProducts/RelatedProducts"
import {useState,useContext} from "react";
import {Context} from "../../utils/context";
import "./SingleProduct.scss";
import {
    FaFacebookF,
    FaTwitter,
    FaInstagram,
    FaLinkedinIn,
    FaPinterest,
    FaCartPlus,
}from "react-icons/fa";
import prod from "../../assets/products/earbuds-prod-1.webp";
import useFetch from"../../hooks/useFetch";
import { useParams } from "react-router-dom";
const SingleProduct = () => {
    const[quantity,setQuantity]=useState(1);
    const { id }=useParams();
    const { data }=useFetch(`/api/products?populate=*&[filters][id]=${id}`)
    const { handleAddToCart }=useContext(Context);
    
 const increment=()=>{
    setQuantity(prevState=>prevState + 1);
 };
 const decrement=()=>{
    setQuantity((prevState)=>{
    if(prevState === 1) return 1
    return prevState-1
    });
};
    if(!data) return;
 const product=data.data[0].attributes ;
    return (
    <div className="single-product-main-content">
        <div className="layout">
            <div className="single-product-page">
        <div className="left">
        <img src={
                process.env.REACT_APP_DEV_URL +
               product?.img?.data[0]?.attributes?.url
              }alt="no image found"/>
             </div>
        <div className="right">
            <span className="name">{product.title}</span>
            <span className="price">{product.price}</span>
            <span className="desc">{product.desc}</span>
        <div className="cart-buttons">

            <div className="quantity-buttons">
                <span onClick={decrement}>-</span>
                <span>{quantity}</span>
                <span onClick={increment}>+</span>
                <button className="add-to-cart-button" onClick={()=>{
                    handleAddToCart(data.data[0] , quantity);
                    setQuantity(1);
                }}>
                    <FaCartPlus size={20}/>
                    ADD TO CART
                </button>
            </div>
            <span className="divider"/>
            <div className="info-items"></div>
            <span className="text-bold">
                Category:{" "}
                </span>
                <span>{
                product.categories.data[0].attributes.title}</span>
                <span className="text-bold">
                    Share:
                </span>
         <span className="social-icons">
           <FaFacebookF size={16}/>
           <FaTwitter size={16}/>
           <FaInstagram size={16}/>
           <FaLinkedinIn size ={16}/>
           <FaPinterest size ={16}/>
         </span>
        </div>

        </div>
        </div>
        <RealtedProducts product={id} categoryId={product.categories.data[0].id}/>
        </div>
        </div>
)};

export default SingleProduct;
