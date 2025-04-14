import { Avatar, Box, Button, Card, Typography } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import imageService from '../../service/FileService';

const ProductCard = ({ product, onAddOrUpdateCart, cart }) => {
    const [imageUrls, setImageUrls] = useState([]);
    const [quantity, setQuantity] = useState(0);

    useEffect(() => {
        const fetchImages = async () => {
            try {
                const formattedImageUrls = product.imageUrls.map((url) => {
                    const parts = url.split('/');
                    return parts.length > 1 ? `${parts[0]}/file/${parts[1]}` : url;
                });
                const fetchedImages = await imageService.prefetchImages(formattedImageUrls);
                setImageUrls(Object.values(fetchedImages).filter(Boolean));
            } catch (error) {
                console.error('Error fetching product images:', error);
            }
        };

        fetchImages();
    }, [product.imageUrls]);

    useEffect(() => {
        // Update the quantity from the cart if the product is already in it
        const cartItem = cart.find(item => item.productId === product.productId);
        setQuantity(cartItem ? cartItem.quantity : 0);
    }, [cart, product.productId]);

    const handleAddToCart = () => {
        const newQuantity = quantity + 1;
        setQuantity(newQuantity);
        onAddOrUpdateCart(product, newQuantity);
    };

    const handleRemoveFromCart = () => {
        const newQuantity = quantity - 1;
        setQuantity(newQuantity);
        onAddOrUpdateCart(product, newQuantity);
    };

    return (
        <Card
            sx={{
                width: "300px",
                padding: 2,
                marginBottom: 2,
                border: "1px solid #333",
                borderRadius: "12px",
                backgroundColor: "#1E1E1E", // Black background
                boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
                transition: "transform 0.2s, box-shadow 0.2s",
                cursor: "pointer",
                color: "#ffffff", // White text
                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 8px 16px rgba(0, 0, 0, 0.7)"
                }
            }}
        >
            {/* Image Section */}
            <Box sx={{ textAlign: "center", marginBottom: 2 }}>
                {imageUrls.length > 0 ? (
                    <img
                        src={imageUrls[0]}
                        alt={product.name}
                        style={{ width: '100%', height: '200px', borderRadius: '8px', objectFit: 'cover' }}
                    />
                ) : (
                    <Avatar sx={{ bgcolor: '#333', color: '#ffffff', width: '100%', height: '200px', fontSize: "2rem" }}>
                        {product.name[0]} {/* Default placeholder */}
                    </Avatar>
                )}
            </Box>

            {/* Content Section */}
            <Box sx={{ textAlign: 'left' }}>
                <Typography variant="h6" gutterBottom sx={{ color: "#ffffff", fontWeight: 'bold' }}>
                    {product.name}
                </Typography>
                <Typography variant="body1" sx={{ color: "#ffffff" }}>
                    Price: {product.currency} {product.finalPrice}
                </Typography>
                <Typography variant="body2" sx={{ color: "#ffffff", marginTop: 1 }}>
                    {product.storeName} ({product.storeLocation})
                </Typography>
            </Box>

            {/* Action Buttons */}
            <Box display="flex" justifyContent="space-between" mt={2}>
                {quantity > 0 ? (
                    <Box display="flex" alignItems="center">
                        <Button
                            sx={{
                                color: "#ffffff",
                                backgroundColor: "#333",
                                "&:hover": { backgroundColor: "#555" },
                            }}
                            onClick={handleRemoveFromCart}
                        >
                            -
                        </Button>
                        <Typography sx={{ margin: '0 10px', color: "#ffffff" }}>{quantity}</Typography>
                        <Button
                            sx={{
                                color: "#ffffff",
                                backgroundColor: "#333",
                                "&:hover": { backgroundColor: "#555" },
                            }}
                            onClick={handleAddToCart}
                        >
                            +
                        </Button>
                    </Box>
                ) : (
                    <Button
                        sx={{
                            color: "#ffffff",
                            backgroundColor: "#333",
                            "&:hover": { backgroundColor: "#555" },
                        }}
                        onClick={handleAddToCart}
                    >
                        Add to Cart
                    </Button>
                )}
                <Button
                    sx={{
                        color: "#ffffff",
                        backgroundColor: "#333",
                        "&:hover": { backgroundColor: "#555" },
                    }}
                >
                    Details
                </Button>
            </Box>
        </Card>
    );
};

export default ProductCard;
