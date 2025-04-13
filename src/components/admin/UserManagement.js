import CloseIcon from "@mui/icons-material/Close";
import {
    Autocomplete,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    IconButton,
    MenuItem,
    Paper,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
    Typography
} from "@mui/material";
import React, { useEffect, useState } from "react";
import AdminService from "../../service/AdminService";

export default function UserManagement() {
    const [userOptions, setUserOptions] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [role, setRole] = useState("ADMIN");
    const [roleUsers, setRoleUsers] = useState([]);
    const [open, setOpen] = useState(false);

    const handleSearch = async (event) => {
        const query = event.target.value;
        if (query.length > 1) {
            const users = await AdminService.searchUsers(query);
            setUserOptions(users);
        }
    };

    const fetchRoleUsers = async () => {
        const admins = await AdminService.getUsersByRole("ADMIN");
        const managers = await AdminService.getUsersByRole("MANAGER");
        setRoleUsers([...admins, ...managers]);
    };

    const assignUserRole = async () => {
        if (selectedUser) {
            await AdminService.assignUserRole(selectedUser.id, role);
            setSelectedUser(null);
            setRole("ADMIN");
            setOpen(false);
            fetchRoleUsers(); // Refresh role list
        }
    };

    const removeUserRole = async (userId, roleToRemove) => {
        await AdminService.removeUserRole(userId, roleToRemove);
        fetchRoleUsers();
    };

    useEffect(() => {
        fetchRoleUsers();
    }, []);

    return (
        <Grid container justifyContent="center">
            <Grid item xs={12} md={10} lg={9}>
                <div style={{ backgroundColor: "black", padding: "16px", minHeight: "100vh" }}>

                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "16px", marginBottom: "16px" }}>
                        <Typography variant="h6" sx={{ color: "white" }}>Manage Users</Typography>

                        <Button
                            variant="outlined"
                            sx={{ color: "white", borderColor: "white", "&:hover": { borderColor: "gray", backgroundColor: 'gray', color: 'white' } }}
                            onClick={() => setOpen(true)}
                        >
                            Assign Role to User
                        </Button>
                    </div>

                    <Dialog
                        open={open}
                        onClose={() => setOpen(false)}
                        fullWidth
                        maxWidth="sm"
                        PaperProps={{
                            style: { backgroundColor: "black", color: "white" },
                        }}
                    >
                        <DialogTitle sx={{ color: "white", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                            Assign Role
                            <IconButton
                                onClick={() => setOpen(false)}
                                sx={{ color: "white" }}
                            >
                                <CloseIcon />
                            </IconButton>
                        </DialogTitle>
                        <DialogContent >
                            <Autocomplete
                                fullWidth
                                options={userOptions}
                                getOptionLabel={(option) => `${option.email} (${option.firstName} ${option.lastName})`}
                                onInputChange={handleSearch}
                                onChange={(event, newValue) => setSelectedUser(newValue)}
                                renderInput={(params) => (
                                    <TextField
                                        {...params}
                                        label="Search user"
                                        variant="outlined"
                                        sx={{
                                            input: { color: "white" },
                                            label: { color: "white" },
                                            marginBottom: "16px",
                                        }}
                                        InputProps={{
                                            ...params.InputProps,
                                            style: { color: "white" },
                                        }}
                                        InputLabelProps={{ style: { color: "white" } }}
                                    />
                                )}
                                sx={{
                                    marginBottom: "16px",
                                    "& .MuiAutocomplete-popupIndicator": { color: "white" },
                                    "& .MuiAutocomplete-clearIndicator": { color: "white" },
                                    "& .MuiAutocomplete-option": {
                                        color: "white",
                                        backgroundColor: "#000",
                                        "&[aria-selected='true']": {
                                            backgroundColor: "#222",
                                        },
                                        "&:hover": {
                                            backgroundColor: "#333",
                                        },
                                    }
                                }}
                            />

                            <Select
                                fullWidth
                                value={role}
                                onChange={(e) => setRole(e.target.value)}
                                sx={{
                                    backgroundColor: "#111",
                                    color: "white",
                                    marginBottom: "16px",
                                    '.MuiSelect-icon': { color: 'white' }
                                }}
                            >
                                <MenuItem value="ADMIN" sx={{ color: "white", backgroundColor: "#000" }}>Admin</MenuItem>
                                <MenuItem value="MANAGER" sx={{ color: "white", backgroundColor: "#000" }}>Manager</MenuItem>
                            </Select>
                        </DialogContent>

                        <DialogActions sx={{ padding: "12px" }}>
                            <Button onClick={assignUserRole} variant="contained" color="primary">Assign</Button>
                        </DialogActions>
                    </Dialog>

                    <TableContainer component={Paper} sx={{ backgroundColor: "#111" }}>
                        <Table>
                            <TableHead>
                                <TableRow>
                                    <TableCell sx={{ color: "white" }}>Email</TableCell>
                                    <TableCell sx={{ color: "white" }}>Name</TableCell>
                                    <TableCell sx={{ color: "white" }}>Role</TableCell>
                                    <TableCell sx={{ color: "white" }}>Action</TableCell>
                                </TableRow>
                            </TableHead>
                            <TableBody>
                                {roleUsers.map((userRole, index) => (
                                    <TableRow key={index}>
                                        <TableCell sx={{ color: "white" }}>{userRole.user?.email}</TableCell>
                                        <TableCell sx={{ color: "white" }}>
                                            {userRole.user?.firstName} {userRole.user?.lastName}
                                        </TableCell>
                                        <TableCell sx={{ color: "white" }}>{userRole.role}</TableCell>
                                        <TableCell>
                                            <Button
                                                variant="outlined"
                                                color="error"
                                                size="small"
                                                onClick={() => removeUserRole(userRole.user.id, userRole.role)}
                                            >
                                                Remove
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </TableContainer>
                </div>
            </Grid>
        </Grid>
    );
}
