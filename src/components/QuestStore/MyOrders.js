import CloseIcon from '@mui/icons-material/Close'; // Import CloseIcon
import { Box, Button, Card, CardActions, CardContent, Dialog, DialogContent, DialogTitle, Grid, IconButton, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import ProductService from '../../service/ProductService'; // Import the new ProductService
import { useAuth } from '../SignIn/AuthContext'; // Import the AuthContext

function MyOrders() {
    const [myOrders, setMyOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const { user } = useAuth();

    useEffect(() => {
        if (user?.id) {
            fetchMyOrders();
        }
    }, [user?.id]); // Ensure the hook runs when user.id changes

    const fetchMyOrders = async () => {
        try {
            const data = await ProductService.getMyOrders(user.id);
            setMyOrders(data || []);
        } catch (error) {
            console.error("Error fetching orders:", error);
        }
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseDialog = () => {
        setSelectedOrder(null);
    };

    if (!user?.id) {
        return <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>Access Denied. Please log in.</div>;
    }

    return (
        <Box sx={{ p: 3, backgroundColor: '#000', minHeight: '100vh', color: 'white' }}>
            <Typography variant="h4" align="center" gutterBottom>
                My Orders
            </Typography>
            <Grid container spacing={3}>
                {myOrders.map((order) => (
                    <Grid item xs={12} sm={6} md={4} key={order.orderId}>
                        <Card sx={{ minWidth: 275, backgroundColor: '#1e1e1e', color: 'white' }}>
                            <CardContent>
                                <Typography variant="h6" color="white">
                                    Order #{order.orderId}
                                </Typography>
                                <Typography variant="body2" sx={{ mt: 1 }}>
                                    Status: {order.status}
                                </Typography>
                                <Typography variant="body2">
                                    Address: {order.address}, {order.country}
                                </Typography>
                                <Typography variant="body2">
                                    Total Price: {order.discountPrice.toFixed(2)} {order.items[0]?.currencyCode || 'INR'}
                                </Typography>
                                <Typography variant="body2">
                                    Created At: {new Date(order.createdAt).toLocaleString()}
                                </Typography>
                            </CardContent>
                            <CardActions>
                                <Button size="small" variant="outlined" color="primary" onClick={() => handleViewDetails(order)}>
                                    View Details
                                </Button>
                            </CardActions>
                        </Card>
                    </Grid>
                ))}
            </Grid>

            <Dialog open={!!selectedOrder} onClose={handleCloseDialog} fullWidth maxWidth="sm">
                <DialogTitle sx={{ backgroundColor: '#1e1e1e', color: 'white', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    Order Details
                    <IconButton onClick={handleCloseDialog} sx={{ color: 'white' }}>
                        <CloseIcon />
                    </IconButton>
                </DialogTitle>
                <DialogContent sx={{ backgroundColor: '#1e1e1e', color: 'white' }}>
                    {selectedOrder && (
                        <Box>
                            <Typography variant="body1">Order ID: {selectedOrder.orderId}</Typography>
                            <Typography variant="body1">Address: {selectedOrder.address}, {selectedOrder.country}</Typography>
                            <Typography variant="body1">Status: {selectedOrder.status}</Typography>
                            <Typography variant="body1">Total Price: {selectedOrder.discountPrice.toFixed(2)} {selectedOrder.items[0]?.currencyCode || 'INR'}</Typography>
                            <Typography variant="body1">Created At: {new Date(selectedOrder.createdAt).toLocaleString()}</Typography>
                            <Typography variant="h6" sx={{ mt: 2 }}>Items:</Typography>
                            {selectedOrder.items.map((item, index) => (
                                <Box key={index} sx={{ mt: 1, p: 1, border: '1px solid #555', borderRadius: '8px' }}>
                                    <Typography variant="body2">Product Name: {item.productName}</Typography>
                                    <Typography variant="body2">Quantity: {item.quantity}</Typography>
                                    <Typography variant="body2">Price Per Unit: {item.pricePerUnit.toFixed(2)} {selectedOrder.items[0]?.currencyCode || 'INR'}</Typography>
                                    <Typography variant="body2">Total Price: {item.totalPrice.toFixed(2)} {selectedOrder.items[0]?.currencyCode || 'INR'}</Typography>
                                </Box>
                            ))}
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default MyOrders;
