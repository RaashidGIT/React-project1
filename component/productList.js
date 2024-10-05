// src/components/ProductList.js
import React, { useEffect, useState } from 'react'; 
import ProductCard from './productCard'; // Ensure the import matches the filename

const ProductList = () => {
    const [products, setProducts] = useState([]); 

    useEffect(() => {
        fetch('http://localhost:3000/blogapp') // Corrected endpoint
            .then(response => response.json())
            .then(data => {
                const formattedProducts = data.map(item => ({
                    id: item._id, 
                    title: item.cardtitle,  // Ensure these properties match your data
                    description: item.description,
                    image: item.image 
                }));

                setProducts(formattedProducts); 
            })
            .catch(error => console.error('Error:', error));
    }, []);

    return (
        <div className="product-list" style={{ display: 'flex', flexWrap: 'wrap', justifyContent: 'center', gap: '10px' }}>
            {products.map(product => (
                <ProductCard key={product.id} id={product.id} title={product.title} description={product.description} image={product.image} />
            ))}
        </div>
    );
};

export default ProductList;
