// src/components/ProductCard.js
import React from 'react';
import { useNavigate } from 'react-router-dom';
import './productCard.css'; 

const ProductCard = ({ id, title, description, image }) => {
    const navigate = useNavigate();

    const handleDetails = () => {
        navigate(`/checkout/${id}`); // Navigate to the checkout page for specific product
    };

    return (
        <div className="product-card">
            <img src={image} alt={title} className="product-image" />
            <h2 className="product-name">{title}</h2>
            <p className="product-price">{description}</p>
            <button className="view-details" onClick={handleDetails}>View Details</button>
        </div>
    );
};

export default ProductCard;
