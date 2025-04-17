import { List, ListItem, ListItemText, Paper, Typography } from '@mui/material';
import React from 'react';

const NotificationPage = () => {
    const notifications = [
        { id: 1, message: "John Doe showed interest in your quest 'Deliver Package to NYC'." },
        { id: 2, message: "Jane Smith applied for your quest 'Pick up groceries'." },
        { id: 3, message: "Your quest 'Deliver Documents' has been completed successfully." },
    ];

    return (
        <div style={{ color: 'white', marginTop: '100px', padding: '20px' }}>
            <Typography variant="h4" gutterBottom style={{ textAlign: 'center', color: '#90caf9' }}>
                Notifications
            </Typography>
            <Paper elevation={3} style={{ padding: '20px', backgroundColor: '#1E1E1E' }}>
                <List>
                    {notifications.map((notification) => (
                        <ListItem key={notification.id} style={{ borderBottom: '1px solid #333' }}>
                            <ListItemText
                                primary={notification.message}
                                primaryTypographyProps={{ style: { color: 'white' } }}
                            />
                        </ListItem>
                    ))}
                </List>
            </Paper>
        </div>
    );
};

export default NotificationPage;
