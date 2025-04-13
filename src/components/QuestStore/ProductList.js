import { Grid } from '@mui/material'; // Import Grid from MUI for layout
import React, { useEffect, useState } from 'react';
import ProductService from '../../service/ProductService'; // Import the new ProductService
import ProductCard from './ProductCard'; // Import ProductCard
import './ProductList.css'; // Ensure this file contains your desired styles

function ProductList({ onAddOrUpdateCart, cart, selectedCountry }) {


    const [products, setProducts] = useState([]);
    const [filterName, setFilterName] = useState("");
    const [filterPrice, setFilterPrice] = useState("");

    useEffect(() => {
        fetchProducts(selectedCountry);
    }, [selectedCountry]); // Fetch products when the selected country changes

    const fetchProducts = async (selectedCountry) => {
        try {
            const response = await ProductService.getProducts(selectedCountry);
            setProducts(response);
        } catch (error) {
            console.error("Error fetching products:", error);
        }
    };

    const handleFilter = () => {
        fetchProducts(filterName, filterPrice);
    };

    return (
        <div className="product-list-container">
            <div className="filter-container">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={filterName}
                    onChange={e => setFilterName(e.target.value)}
                />
                <input
                    type="number"
                    placeholder="Max Price"
                    value={filterPrice}
                    onChange={e => setFilterPrice(e.target.value)}
                />
                <button onClick={handleFilter}>Filter</button>
            </div>
            <div className="products-grid">
                {products.map(product => (
                    <Grid key={product.productId} item xs={12} md={3}>
                        <ProductCard key={product.productId} product={product} onAddOrUpdateCart={onAddOrUpdateCart} />
                    </Grid>
                ))}
            </div>
        </div >
    );
}

export default ProductList;
