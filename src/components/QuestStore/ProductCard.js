import { Typography } from '@mui/joy';
import React, { useEffect, useState } from 'react';
import imageService from '../../service/FileService';

const ProductCard = ({ product }) => {
    const [imageUrls, setImageUrls] = useState([]);

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

    return (
        <div style={{ backgroundColor: '#383838', padding: '10px', borderRadius: '5px', textAlign: 'center', height: '300px' }}>
            {imageUrls.length > 0 && (
                <img src={imageUrls[0]} alt={product.name} width="50" height="50" />
            )}
            <Typography sx={{ color: 'white' }}>{product.name}</Typography>
            <Typography sx={{ color: 'white' }}>Price: {product.currency} {product.finalPrice}</Typography>
            <Typography sx={{ color: 'white' }}>{product.storeName} ({product.storeLocation})</Typography>
        </div>
    );
};

export default ProductCard;
