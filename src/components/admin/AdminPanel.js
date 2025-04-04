import { Box, Tab, Tabs } from "@mui/material";
import React from "react";
import { useMenu } from "../../context/MenuContext";
import InventoryManagement from "./InventoryManagement";
import StoreManagement from "./StoreManagement";
import UserManagement from "./UserManagement";

export default function AdminPanel() {
    const { adminTab, setAdminTab } = useMenu();

    const handleTabChange = (event, newValue) => {
        setAdminTab(newValue);
    };

    return (
        <div style={{ padding: "24px", backgroundColor: "black", color: "white", minHeight: "100vh" }}>
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
            </Tabs>

            <Box hidden={adminTab !== 0}>
                <StoreManagement />
            </Box>
            <Box hidden={adminTab !== 1}>
                <UserManagement />
            </Box>
            <Box hidden={adminTab !== 2}>
                <InventoryManagement />
            </Box>
        </div>
    );
}
