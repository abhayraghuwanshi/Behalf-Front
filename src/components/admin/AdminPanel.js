import { Grid, Tab, Tabs } from "@mui/material";
import { useMenu } from "../../context/MenuContext";
import { useAuth } from "../SignIn/AuthContext"; // Import authentication context
import DiscountPage from "./DiscountManagement";
import InventoryManagement from "./InventoryManagement";
import PriceManagement from "./PriceManagement";
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
        <div style={{ color: "white", minHeight: "100vh" }}>
            <Grid container spacing={2}>
                <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the left */}
                <Grid item xs={12} md={9}>
                    <Tabs
                        value={adminTab}
                        onChange={handleTabChange}
                        textColor="inherit"
                        indicatorColor="secondary"
                        sx={{ color: "white" }}
                    >
                        <Tab label="Admin Store" sx={{ color: "white" }} />
                        <Tab label="Add Users" sx={{ color: "white" }} />
                        <Tab label="Inventory Management" sx={{ color: "white" }} />
                        <Tab label="Product Management" sx={{ color: "white" }} />
                        <Tab label="Discount Management" sx={{ color: "white" }} />
                        <Tab label="Price Management" sx={{ color: "white" }} />
                    </Tabs>
                </Grid>
                <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the right */}
            </Grid>

            {adminTab === 0 && <StoreManagement />}
            {adminTab === 1 && <UserManagement />}
            {adminTab === 2 && <InventoryManagement />}
            {adminTab === 3 && <ProductManagementPage />}
            {adminTab === 4 && <DiscountPage />}
            {adminTab === 5 && <PriceManagement />}
        </div>
    );
}
