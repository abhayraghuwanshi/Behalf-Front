import { Box, Button, Typography } from '@mui/joy';
import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import imageService from '../../service/FileService';
import UserStoreService from '../../service/UserStoreService';

const ProductDetail = () => {
    const { productId } = useParams();
    const [product, setProduct] = useState(null);
    const [loading, setLoading] = useState(true);
    const [imageUrls, setImageUrls] = useState([]);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            const data = await UserStoreService.getProductById(productId);
            setProduct(data);
            setLoading(false);
        };
        if (productId) fetchProduct();
    }, [productId]);

    useEffect(() => {
        const fetchImages = async () => {
            if (!product || !product.imageUrls) return;
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
    }, [product]);

    if (loading) {
        return (
            <Box sx={{ backgroundColor: "#000", color: "#fff", padding: 4 }}>
                <Typography variant="h4">Loading...</Typography>
            </Box>
        );
    }

    if (!product) {
        return (
            <Box sx={{ backgroundColor: "#000", color: "#fff", padding: 4 }}>
                <Typography variant="h4">Product not found</Typography>
            </Box>
        );
    }

    return (
        <Box sx={{ backgroundColor: "#1e1e1e", color: "#000", marginTop: '70px' }}>
            <Box sx={{ display: 'flex', gap: 4 }}>
                {/* Image Gallery */}
                <Box sx={{ flex: '0 0 400px', display: 'flex', flexDirection: 'column', gap: 2 }}>
                    {imageUrls.length > 0 ? (
                        imageUrls.map((url, idx) => (
                            <img
                                key={idx}
                                src={url}
                                alt={product.name + ' image ' + (idx + 1)}
                                style={{ width: '100%', maxWidth: 400, height: 'auto', borderRadius: '8px', border: '1px solid #eee', marginBottom: 8, background: '#fff' }}
                            />
                        ))
                    ) : (
                        <Typography>No images available</Typography>
                    )}
                </Box>
                {/* Product Details */}
                <Box sx={{ flex: 1, pl: 4, color: '#fff' }}>
                    <Typography level="h2" sx={{ fontWeight: 700, mb: 1, color: '#fff' }}>{product.name}</Typography>
                    <Typography level="body1" sx={{ color: '#bbb', mb: 2 }}>{product.description}</Typography>
                    <Typography sx={{ fontWeight: 600, fontSize: 28, color: '#fff', mb: 1 }}>
                        ₹{product.finalPrice} {product.originalPrice && (
                            <span style={{ textDecoration: 'line-through', color: '#888', fontSize: 18, marginLeft: 8 }}>
                                ₹{product.originalPrice}
                            </span>
                        )}
                        {product.originalPrice && product.finalPrice && product.originalPrice > product.finalPrice && (
                            <span style={{ color: '#ff7043', fontWeight: 600, marginLeft: 12 }}>
                                ({Math.round(100 * (product.originalPrice - product.finalPrice) / product.originalPrice)}% OFF)
                            </span>
                        )}
                    </Typography>
                    <Typography sx={{ color: 'green', fontWeight: 500, mb: 2 }}>inclusive of all taxes</Typography>
                    <Typography sx={{ fontWeight: 500, mb: 1 }}>Brand: {product.brand}</Typography>
                    <Typography sx={{ mb: 1 }}>Store: {product.storeName}</Typography>
                    <Typography sx={{ mb: 1 }}>Location: {product.storeLocation || 'N/A'}</Typography>
                    <Typography sx={{ mb: 1 }}>Available: {product.quantityAvailable}</Typography>
                    <Button
                        sx={{
                            marginTop: 2,
                            color: "#fff",
                            backgroundColor: "#ff3e6c",
                            fontWeight: 700,
                            fontSize: 18,
                            px: 4,
                            py: 1.5,
                            borderRadius: 2,
                            '&:hover': { backgroundColor: '#d81b60' },
                        }}
                    >
                        Add to Cart
                    </Button>
                </Box>
            </Box>
        </Box>
    );
};

export default ProductDetail;
