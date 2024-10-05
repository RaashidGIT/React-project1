// src/components/Details.js

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

const Details = () => {
    const { id } = useParams(); // Get the product ID from the URL
    const [product, setProduct] = useState(null); // State to hold product details

    useEffect(() => {
        // Fetch product details from the API
        fetch(`http://localhost:3000/bootstrap/${id}`)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then(data => setProduct(data))
            .catch(error => console.error('Error fetching product details:', error));
    }, [id]);

    // Show loading or error message while fetching
    if (!product) {
        return <div>Loading...</div>;
    }

    return (
        <div>
            <h2>{product.cardtitle}</h2>
            <img src={product.image} alt={product.cardtitle} style={{ width: '100%', maxHeight: '400px', objectFit: 'cover' }} />
            <p>{product.description}</p>
            <p>Price: ${product.price.toFixed(2)}</p>
            {/* You can add more details here */}
        </div>
    );
}

export default Details;
