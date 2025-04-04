import { Box, Tab, Tabs } from "@mui/material";
import React, { useState } from "react";
import InventoryManagement from "./InventoryManagement";
import StoreManagement from "./StoreManagement";
import UserManagement from "./UserManagement";

export default function AdminPanel() {
    const [activeTab, setActiveTab] = useState(0);

    const handleTabChange = (event, newValue) => {
        setActiveTab(newValue);
    };

    return (
        <div style={{ padding: "24px", backgroundColor: "black", color: "white", minHeight: "100vh" }}>
            <Tabs
                value={activeTab}
                onChange={handleTabChange}
                textColor="inherit"
                indicatorColor="primary"
                sx={{ color: "white" }}
            >
                <Tab label="Admin Store" sx={{ color: "white" }} />
                <Tab label="Add Users" sx={{ color: "white" }} />
                <Tab label="Inventory Management" sx={{ color: "white" }} />
            </Tabs>

            <Box hidden={activeTab !== 0}>
                <StoreManagement />
            </Box>
            <Box hidden={activeTab !== 1}>
                <UserManagement />
            </Box>
            <Box hidden={activeTab !== 2}>
                <InventoryManagement />
            </Box>
        </div>
    );
}
