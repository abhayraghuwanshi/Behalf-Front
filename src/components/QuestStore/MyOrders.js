import { Box, Button, Card, CardActions, CardContent, Dialog, DialogContent, DialogTitle, Grid, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { BACKEND_API_URL } from './../../env.js';

function MyOrders() {
    const [myOrders, setMyOrders] = useState([]);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const userId = 1; // Replace with the actual user id from authentication

    useEffect(() => {
        fetchMyOrders();
    }, []);

    const fetchMyOrders = async () => {
        const response = await fetch(`${BACKEND_API_URL}/api/store/myorders?userId=${userId}`);
        const data = await response.json();
        setMyOrders(data);
    };

    const handleViewDetails = (order) => {
        setSelectedOrder(order);
    };

    const handleCloseDialog = () => {
        setSelectedOrder(null);
    };

    return (
        <Box sx={{ p: 3, backgroundColor: '#000', minHeight: '100vh', color: 'white' }}>
            <Grid container spacing={3}>
                {myOrders.map((order) => (
                    <Grid item xs={12} sm={6} md={4} key={order.id}>
                        <Card sx={{ minWidth: 275, backgroundColor: '#1e1e1e', color: 'white' }}>
                            <CardContent>
                                <Typography variant="h6" color="white">
                                    Order #{order.id}
                                </Typography>
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                    Status: {order.status}
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
                <DialogTitle sx={{ backgroundColor: '#1e1e1e', color: 'white' }}>Order Details</DialogTitle>
                <DialogContent sx={{ backgroundColor: '#1e1e1e', color: 'white' }}>
                    {selectedOrder && (
                        <Box>
                            <Typography variant="body1">Order ID: {selectedOrder.id}</Typography>
                            <Typography variant="body1">Address: {selectedOrder.address}</Typography>
                            <Typography variant="body1">Status: {selectedOrder.status}</Typography>
                            {/* Add more details as needed */}
                        </Box>
                    )}
                </DialogContent>
            </Dialog>
        </Box>
    );
}

export default MyOrders;
