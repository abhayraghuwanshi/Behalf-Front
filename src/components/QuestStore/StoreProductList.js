import { Grid } from '@mui/material'; // Import Grid from MUI for layout
import { useEffect, useState } from 'react';
import UserStoreService from '../../service/UserStoreService'; // Import the new ProductService
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
            const response = await UserStoreService.getProducts(selectedCountry);
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
            {/* Add the copywriting text */}

            <Grid container spacing={2}>
                <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the left */}
                <Grid item xs={12} md={9}>
                    <div style={{ textAlign: 'center', marginBottom: '20px', color: 'white' }}>
                        <h1>Discover What’s Hot in Your City!</h1>
                        <p style={{ fontSize: '20px', color: '#ccc', lineHeight: '1.5' }}>
                            See the trending items everyone’s raving about near you. From exclusive gadgets to must-have fashion,
                            create a delivery quest or grab them instantly with our skip-the-queue option—score the best deals without the wait!
                        </p>
                    </div>
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
                </Grid>
                <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the right */}
            </Grid>

            <Grid container spacing={2} sx={{ marginTop: '20px' }}>
                <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the left */}
                <Grid item xs={12} md={9}>
                    <Grid container spacing={2}>
                        {products.map(product => (
                            <Grid item xs={12} md={4} key={product.productId}>
                                <ProductCard product={product} onAddOrUpdateCart={onAddOrUpdateCart} cart={cart} />
                            </Grid>
                        ))}
                    </Grid>
                </Grid>
                <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the right */}
            </Grid>
        </div>
    );
}

export default ProductList;
