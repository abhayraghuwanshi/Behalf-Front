import {
    Button,
    Dialog,
    DialogContent,
    DialogTitle,
    Grid,
    MenuItem,
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableRow,
    TextField,
} from "@mui/material";
import { useEffect, useState } from "react";
import * as productService from "./../../service/AdminProductService";
import * as priceService from "./../../service/PriceService";

function PriceManagement() {
    const [prices, setPrices] = useState([]);
    const [products, setProducts] = useState([]);
    const [open, setOpen] = useState(false);
    const [form, setForm] = useState({
        productId: "",
        storeId: "",
        price: "",
        discount: "",
        currencyCode: "",
        effectiveFrom: "",
        effectiveTo: "",
        description: "",
    });

    useEffect(() => {
        fetchPrices();
        fetchProducts();
    }, []);

    const fetchPrices = async () => {
        const data = await priceService.getPrices();
        setPrices(data);
    };

    const fetchProducts = async () => {
        const data = await productService.getProducts();
        setProducts(data);
    };

    const handleCreate = async () => {
        const product = products.find((p) => p.id === Number(form.productId));
        const payload = {
            productId: Number(form.productId),
            storeId: form.storeId ? Number(form.storeId) : undefined,
            price: parseFloat(form.price),
            discount: form.discount ? parseFloat(form.discount) : 0,
            currencyCode: form.currencyCode,
            effectiveFrom: form.effectiveFrom,
            effectiveTo: form.effectiveTo,
        };
        await priceService.createPrice(payload);
        fetchPrices();
        setOpen(false);
        setForm({
            productId: "",
            storeId: "",
            price: "",
            discount: "",
            currencyCode: "",
            effectiveFrom: "",
            effectiveTo: "",
            description: "",
        });
    };

    return (
        <Grid container justifyContent="center" style={{ color: "white", minHeight: "100vh" }}>
            <Grid item xs={9} style={{ padding: "0 12px" }}>
                <Grid container spacing={1.5}>
                    <Grid item xs={12}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", margin: "16px 0" }}>
                            <h2 style={{ color: "white" }}>Product Prices</h2>
                            <Button
                                variant="outlined"
                                onClick={() => setOpen(true)}
                                sx={{ color: "white", borderColor: "white", height: 40 }}
                            >
                                Create Price
                            </Button>
                        </div>
                    </Grid>

                    <Grid item xs={12}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell style={{ color: "white" }}>Product</TableCell>
                                    <TableCell style={{ color: "white" }}>Store ID</TableCell>
                                    <TableCell style={{ color: "white" }}>Price</TableCell>
                                    <TableCell style={{ color: "white" }}>Discount</TableCell>
                                    <TableCell style={{ color: "white" }}>Currency</TableCell>
                                    <TableCell style={{ color: "white" }}>Effective From</TableCell>
                                    <TableCell style={{ color: "white" }}>Effective To</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {prices.map((p) => (
                                    <TableRow key={p.id}>
                                        <TableCell style={{ color: "white" }}>{p.productId || "-"}</TableCell>
                                        <TableCell style={{ color: "white" }}>{p.storeId || "-"}</TableCell>
                                        <TableCell style={{ color: "white" }}>{p.price}</TableCell>
                                        <TableCell style={{ color: "white" }}>{p.discount}</TableCell>
                                        <TableCell style={{ color: "white" }}>{p.currencyCode}</TableCell>
                                        <TableCell style={{ color: "white" }}>{p.effectiveFrom}</TableCell>
                                        <TableCell style={{ color: "white" }}>{p.effectiveTo}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </Grid>

                    <Grid item xs={12}>
                        <Dialog
                            open={open}
                            onClose={() => setOpen(false)}
                            PaperProps={{
                                sx: {
                                    backgroundColor: "black",
                                    color: "white",
                                },
                            }}
                        >
                            <DialogTitle>
                                Create Price
                                <Button
                                    onClick={() => setOpen(false)}
                                    sx={{ position: "absolute", right: 8, top: 8, color: "white" }}
                                >
                                    X
                                </Button>
                            </DialogTitle>
                            <DialogContent>
                                <TextField
                                    select
                                    label="Product"
                                    fullWidth
                                    margin="dense"
                                    value={form.productId}
                                    onChange={(e) => setForm({ ...form, productId: e.target.value })}
                                    InputProps={{
                                        style: { color: "white", border: "1px solid white", borderRadius: "4px" },
                                    }}
                                    InputLabelProps={{
                                        style: { color: "white" },
                                    }}
                                >
                                    {products.map((p) => (
                                        <MenuItem key={p.id} value={p.id} sx={{ backgroundColor: "black", color: "white" }}>
                                            {p.name}
                                        </MenuItem>
                                    ))}
                                </TextField>

                                <TextField
                                    label="Store ID"
                                    fullWidth
                                    margin="dense"
                                    value={form.storeId}
                                    onChange={(e) => setForm({ ...form, storeId: e.target.value })}
                                    InputProps={{
                                        style: { color: "white", border: "1px solid white", borderRadius: "4px" },
                                    }}
                                    InputLabelProps={{
                                        style: { color: "white" },
                                    }}
                                />

                                <TextField
                                    label="Price"
                                    fullWidth
                                    margin="dense"
                                    type="number"
                                    value={form.price}
                                    onChange={(e) => setForm({ ...form, price: e.target.value })}
                                    InputProps={{
                                        style: { color: "white", border: "1px solid white", borderRadius: "4px" },
                                    }}
                                    InputLabelProps={{
                                        style: { color: "white" },
                                    }}
                                />

                                <TextField
                                    label="Discount"
                                    fullWidth
                                    margin="dense"
                                    type="number"
                                    value={form.discount}
                                    onChange={(e) => setForm({ ...form, discount: e.target.value })}
                                    InputProps={{
                                        style: { color: "white", border: "1px solid white", borderRadius: "4px" },
                                    }}
                                    InputLabelProps={{
                                        style: { color: "white" },
                                    }}
                                />

                                <TextField
                                    label="Currency Code"
                                    fullWidth
                                    margin="dense"
                                    value={form.currencyCode}
                                    onChange={(e) => setForm({ ...form, currencyCode: e.target.value })}
                                    InputProps={{
                                        style: { color: "white", border: "1px solid white", borderRadius: "4px" },
                                    }}
                                    InputLabelProps={{
                                        style: { color: "white" },
                                    }}
                                />

                                <TextField
                                    label="Effective From"
                                    type="date"
                                    fullWidth
                                    margin="dense"
                                    InputLabelProps={{ shrink: true, style: { color: "white" } }}
                                    value={form.effectiveFrom}
                                    onChange={(e) => setForm({ ...form, effectiveFrom: e.target.value })}
                                    InputProps={{
                                        style: { color: "white", border: "1px solid white", borderRadius: "4px" },
                                    }}
                                />

                                <TextField
                                    label="Effective To"
                                    type="date"
                                    fullWidth
                                    margin="dense"
                                    InputLabelProps={{ shrink: true, style: { color: "white" } }}
                                    value={form.effectiveTo}
                                    onChange={(e) => setForm({ ...form, effectiveTo: e.target.value })}
                                    InputProps={{
                                        style: { color: "white", border: "1px solid white", borderRadius: "4px" },
                                    }}
                                />

                                <TextField
                                    label="Description"
                                    fullWidth
                                    margin="dense"
                                    value={form.description}
                                    onChange={(e) => setForm({ ...form, description: e.target.value })}
                                    InputProps={{
                                        style: { color: "white", border: "1px solid white", borderRadius: "4px" },
                                    }}
                                    InputLabelProps={{
                                        style: { color: "white" },
                                    }}
                                />

                                <Button
                                    variant="contained"
                                    fullWidth
                                    onClick={handleCreate}
                                    sx={{ mt: 2 }}
                                >
                                    Save
                                </Button>
                            </DialogContent>
                        </Dialog>
                    </Grid>
                </Grid>
            </Grid>
        </Grid>
    );
}

export default PriceManagement;