import { Box, Grid, Tab, Tabs } from "@mui/material";
import React from "react";
import { useMenu } from "../../context/MenuContext";
import { useAuth } from "../SignIn/AuthContext"; // Import authentication context
import DiscountPage from "./DiscountManagement";
import InventoryManagement from "./InventoryManagement";
import ProductManagementPage from './ProductManagement';
import StoreManagement from "./StoreManagement";
import UserManagement from "./UserManagement";

export default function AdminPanel() {
    const { adminTab, setAdminTab } = useMenu();
    const { user } = useAuth(); // Get authentication status

    const handleTabChange = (event, newValue) => {
        setAdminTab(newValue);
    };

    if (!user?.id) {
        return <div style={{ color: "red", textAlign: "center", marginTop: "20px" }}>Access Denied. Please log in.</div>;
    }

    return (
        <div style={{ padding: "24px", backgroundColor: "black", color: "white", minHeight: "100vh" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the left */}
                <Grid item xs={12} md={9}>
                    <Tabs
                        value={adminTab}
                        onChange={handleTabChange}
                        textColor="inherit"
                        indicatorColor="primary"
                        sx={{ color: "white" }}
                    >
                        <Tab label="Admin Store" sx={{ color: "white" }} />
                        <Tab label="Add Users" sx={{ color: "white" }} />
                        <Tab label="Inventory Management" sx={{ color: "white" }} />
                        <Tab label="Product Management" sx={{ color: "white" }} />
                        <Tab label="Discount Management" sx={{ color: "white" }} />
                    </Tabs>
                </Grid>
                <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the right */}
            </Grid>

            <Box hidden={adminTab !== 0}>
                <StoreManagement />
            </Box>
            <Box hidden={adminTab !== 1}>
                <UserManagement />
            </Box>
            <Box hidden={adminTab !== 2}>
                <InventoryManagement />
            </Box>
            <Box hidden={adminTab !== 3}>
                <ProductManagementPage />
            </Box>
            <Box hidden={adminTab !== 4}>
                <DiscountPage />
            </Box>
        </div>
    );
}
