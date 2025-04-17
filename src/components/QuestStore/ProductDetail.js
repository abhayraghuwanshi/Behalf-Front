import { Box, Button, Typography } from '@mui/joy';
import React from 'react';
import { useParams } from 'react-router-dom';

const ProductDetail = ({ products }) => {
    const { productId } = useParams();
    const product = products.find(p => p.productId === parseInt(productId));

    if (!product) {
        return (
            <Box sx={{ backgroundColor: "#000", color: "#fff", padding: 4 }}>
                <Typography variant="h4">Product not found</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ backgroundColor: "#000", color: "#fff", padding: 4 }}>
            <Typography variant="h4" gutterBottom>{product.productName}</Typography>
            <img
                src={`/${product.productImage}`}
                alt={product.productName}
                style={{ width: '100%', height: '300px', objectFit: 'cover', borderRadius: '8px' }}
            />
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Store: {product.storeName}
            </Typography>
            <Typography variant="body1">
                Location: {product.storeLocation || 'N/A'}
            </Typography>
            <Typography variant="body1" sx={{ marginTop: 2 }}>
                Original Price: {product.currencyCode} {product.originalPrice}
            </Typography>
            <Typography variant="body1">
                Discount Price: {product.currencyCode} {product.discountPrice}
            </Typography>
            <Typography variant="body1">
                Discount Percent: {product.discountPercent}%
            </Typography>
            <Button
                sx={{
                    marginTop: 2,
                    color: "#ffffff",
                    backgroundColor: "#333",
                    "&:hover": { backgroundColor: "#555" },
                }}
            >
                Add to Cart
            </Button>
        </Box>
    );
};

export default ProductDetail;
