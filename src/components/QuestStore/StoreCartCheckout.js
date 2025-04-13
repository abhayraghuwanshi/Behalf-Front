import {
    Box,
    Button,
    Grid,
    List,
    ListItem,
    ListItemText,
    Paper,
    TextField,
    Typography
} from '@mui/material';
import React, { useState } from 'react';
import ProductService from '../../service/ProductService'; // Import the new ProductService
import { useAuth } from '../SignIn/AuthContext';

const CartCheckout = ({ cart, onAddOrUpdateCart, selectedCountry }) => {
    const { user } = useAuth();
    const [address, setAddress] = useState('');
    const [responseOrder, setResponseOrder] = useState(null);

    // Calculate total price from the cart
    const totalPrice = cart.reduce((sum, item) => sum + item.discountPrice * item.quantity, 0);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (!user) {
            alert('Please login to place an order.');
            return;
        }
        if (!address) {
            alert('Address is required.');
            return;
        }

        const checkoutData = {
            userId: user.id,
            address,
            country: selectedCountry, // Include the selected country
        };

        try {
            const data = await ProductService.placeOrder(checkoutData); // Call the Place Order API
            setResponseOrder(data);
            alert(`Order placed successfully! Order ID: ${data.id}`);
        } catch (error) {
            console.error("Error placing order:", error);
            alert("Failed to place the order. Please try again.");
        }
    };

    const handleDelete = (item) => {
        onAddOrUpdateCart({ id: item.productId, storeId: item.storeId }, 0); // Set quantity to 0 to delete
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3, minHeight: '100vh', backgroundColor: '#000', color: 'white' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Checkout
            </Typography>
            <Grid container spacing={3}>
                <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the left */}
                <Grid item xs={12} md={9}>
                    <Grid container spacing={3}>
                        {/* Delivery Address Form */}
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 3, backgroundColor: '#1e1e1e', color: 'white' }}>
                                <Typography variant="h6" gutterBottom color="primary">
                                    Delivery Address
                                </Typography>
                                <form onSubmit={handleSubmit}>
                                    <TextField
                                        label="Address"
                                        variant="outlined"
                                        fullWidth
                                        margin="normal"
                                        value={address}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                        InputProps={{ sx: { color: "white" } }}
                                        InputLabelProps={{ sx: { color: "white" } }}
                                        sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" }, "&:hover fieldset": { borderColor: "blue" } } }}
                                    />
                                    <Button variant="contained" color="primary" type="submit" fullWidth sx={{ mt: 2 }}>
                                        Place Order
                                    </Button>
                                </form>
                                {responseOrder && (
                                    <Typography variant="body1" color="success.main" sx={{ mt: 2 }}>
                                        Checkout Successful! Order ID: {responseOrder.id}
                                    </Typography>
                                )}
                            </Paper>
                        </Grid>
                        {/* Order Summary */}
                        <Grid item xs={12} md={6}>
                            <Paper sx={{ p: 3, backgroundColor: '#1e1e1e', color: 'white' }}>
                                <Typography variant="h6" gutterBottom color="primary">
                                    Order Summary
                                </Typography>
                                <List>
                                    {cart.map((item, index) => (
                                        <ListItem key={index} divider>
                                            <ListItemText
                                                primary={item.productName}
                                                secondary={
                                                    <>
                                                        <Typography variant="body2" sx={{ color: 'white' }}>
                                                            Original Price: {item.currencyCode} {item.originalPrice.toFixed(2)}
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: 'white' }}>
                                                            Discount: {item.discountPercent}% (-{item.currencyCode} {item.discountAmount.toFixed(2)})
                                                        </Typography>
                                                        <Typography variant="body2" sx={{ color: 'white' }}>
                                                            Final Price: {item.currencyCode} {item.discountPrice.toFixed(2)} x {item.quantity}
                                                        </Typography>
                                                    </>
                                                }
                                                sx={{ color: 'white' }}
                                            />
                                            <Box sx={{ display: 'flex', gap: 1 }}>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => onAddOrUpdateCart(item, item.quantity > 1 ? item.quantity - 1 : 0)}
                                                    sx={{ color: 'white', borderColor: 'white' }}
                                                >
                                                    -
                                                </Button>
                                                <Button
                                                    variant="outlined"
                                                    color="primary"
                                                    onClick={() => onAddOrUpdateCart(item, item.quantity + 1)}
                                                    sx={{ color: 'white', borderColor: 'white' }}
                                                >
                                                    +
                                                </Button>
                                            </Box>
                                        </ListItem>
                                    ))}
                                </List>
                                <Box sx={{ display: 'flex', justifyContent: 'space-between', mt: 2 }}>
                                    <Typography variant="h6">Total:</Typography>
                                    <Typography variant="h6">
                                        {cart.length > 0 ? `${cart[0].currencyCode} ${totalPrice.toFixed(2)}` : '0.00'}
                                    </Typography>
                                </Box>
                            </Paper>
                        </Grid>
                    </Grid>
                </Grid>
                <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the right */}
            </Grid>
        </Box>
    );
};

export default CartCheckout;
