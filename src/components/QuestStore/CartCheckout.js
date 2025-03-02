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
import { useAuth } from '../SignIn/AuthContext';
import { BACKEND_API_URL } from './../../env.js';

function CartCheckout({ cart, onAddOrUpdateCart }) {
    const { user } = useAuth();
    const [address, setAddress] = useState('');
    const [responseOrder, setResponseOrder] = useState(null);

    // Calculate total price from the cart
    const totalPrice = cart.reduce((sum, item) => sum + Number(item.price) * item.quantity, 0);

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
        // Construct checkout data for multiple items
        const checkoutData = {
            userId: user.id,
            address,
            totalPrice,
            items: cart.map(item => ({ id: item.id, quantity: item.quantity }))
        };

        const response = await fetch(BACKEND_API_URL + '/api/store/checkout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(checkoutData)
        });
        const data = await response.json();
        setResponseOrder(data);
    };

    return (
        <Box sx={{ flexGrow: 1, p: 3, minHeight: '100vh', backgroundColor: '#000', color: 'white' }}>
            <Typography variant="h4" align="center" gutterBottom>
                Checkout
            </Typography>
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
                            {/* Add more fields here if needed */}
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
                                        primary={item.name}
                                        secondary={`$${Number(item.price).toFixed(2)} x ${item.quantity}`}
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
                            <Typography variant="h6">${totalPrice.toFixed(2)}</Typography>
                        </Box>
                    </Paper>
                </Grid>
            </Grid>
        </Box>
    );
}

export default CartCheckout;
