import { Button } from '@mui/base';
import React, { useEffect, useState } from 'react';
import ProductService from '../../service/ProductService'; // Import the new ProductService
import './ProductList.css'; // Ensure this file contains your desired styles

function ProductList({ onAddOrUpdateCart, cart }) {
    const [products, setProducts] = useState([]);
    const [filterName, setFilterName] = useState("");
    const [filterPrice, setFilterPrice] = useState("");

    useEffect(() => {
        fetchProducts();
    }, []);

    const fetchProducts = async (name, price) => {
        const data = await ProductService.getProducts(name, price); // Use the service to fetch products
        setProducts(data);
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
                {products.map(product => {
                    // Check if the product is already in the cart.
                    const cartItem = cart.find(item => item.id === product.id);
                    return (
                        <div className="product-card" key={product.id}>
                            <div className="product-image">
                                <img
                                    src={product.imageUrl ? product.imageUrl : "https://via.placeholder.com/150"}
                                    alt={product.name}
                                />
                                {!product.inStock && <span className="out-of-stock-label">Out of Stock</span>}
                            </div>
                            <div className="product-info">
                                <h3 className="product-title">{product.name}</h3>
                                <p className="product-price">${Number(product.price).toFixed(2)}</p>
                                {product.inStock ? (
                                    cartItem ? (
                                        <div className="quantity-selector">
                                            <Button color='primary' onClick={() => onAddOrUpdateCart(product, cartItem.quantity - 1)}>-</Button>
                                            <span style={{ color: 'white', marginRight: '5px', marginLeft: '5px' }}>{cartItem.quantity}</span>
                                            <Button color='primary' onClick={() => onAddOrUpdateCart(product, cartItem.quantity + 1)}>+</Button>
                                        </div>
                                    ) : (
                                        <button
                                            className="add-to-cart-btn"
                                            onClick={() => onAddOrUpdateCart(product, 1)}
                                        >
                                            Add to Cart
                                        </button>
                                    )
                                ) : (
                                    <button className="add-to-cart-btn" disabled>
                                        Out of Stock
                                    </button>
                                )}
                            </div>
                        </div>
                    );
                })}
            </div>
        </div >
    );
}

export default ProductList;
