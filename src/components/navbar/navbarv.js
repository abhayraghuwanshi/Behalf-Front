import {
  DialogTitle,
  MenuItem,
  TextField
} from "@mui/material";
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React, { useState } from 'react';
import { AwesomeButton } from "react-awesome-button";
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileService from '../../service/ProfileService';
import CreatePost from '../postcreation/CreatePost';
import { useAuth } from '../SignIn/AuthContext';
import logo from './dropquest2.png';

const TravelRequestForm = ({ open, handleClose, handleSubmit }) => {
  const [formData, setFormData] = useState({
    category: "traveler",
    fromLocation: "",
    toLocation: "",
    travelDate: "",
    price: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const onSubmit = () => {
    handleSubmit(formData);
    handleClose();
  };

  return (
    <Dialog open={open} onClose={handleClose} style={{ margin: '10px 10px 10px 10px' }}>
      <DialogTitle sx={{ color: 'white' }}>Create Travel Request</DialogTitle>
      <DialogContent>
        <TextField
          select
          fullWidth
          label="Category"
          name="category"
          value={formData.category}
          onChange={handleChange}
          margin="dense"
          sx={{
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, color: 'white' },
            '& .MuiSvgIcon-root': { color: 'white' },
          }}
        >
          <MenuItem value="traveler" sx={{ color: 'white' }}>I am traveling</MenuItem>
          <MenuItem value="seeker" sx={{ color: 'white' }}>I need someone traveling</MenuItem>
        </TextField>
        <TextField
          fullWidth
          label="From Location (Lat,Lng)"
          name="fromLocation"
          value={formData.fromLocation}
          onChange={handleChange}
          margin="dense"
          sx={{
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, color: 'white' },
          }}
        />
        <TextField
          fullWidth
          label="To Location (Lat,Lng)"
          name="toLocation"
          value={formData.toLocation}
          onChange={handleChange}
          margin="dense"
          sx={{
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, color: 'white' },
          }}
        />
        <TextField
          fullWidth
          type="date"
          label="Travel Date"
          name="travelDate"
          value={formData.travelDate}
          onChange={handleChange}
          margin="dense"
          InputLabelProps={{ shrink: true }}
          sx={{
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, color: 'white' },
          }}
        />
        <TextField
          fullWidth
          type="number"
          label="Price"
          name="price"
          value={formData.price}
          onChange={handleChange}
          margin="dense"
          sx={{
            '& .MuiInputLabel-root': { color: 'white' },
            '& .MuiOutlinedInput-root': { '& fieldset': { borderColor: 'white' }, color: 'white' },
          }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" sx={{ color: 'white' }}>
          Cancel
        </Button>
        <Button onClick={onSubmit} color="primary" sx={{ color: 'white' }}>
          Submit
        </Button>
      </DialogActions>
    </Dialog>
  );
};


const pages = [
  { name: 'Home', path: '/' },
  { name: 'Delivery-Quest', path: '/post' },
  { name: 'People-Quest', path: '/people' },
];

function Navbar() {
  const { user, loading } = useAuth();
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [isCreatingPeopleQuest, setIsCreatingPeopleQuest] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const openCreation = () => {
    if (location.pathname === '/post') {
      setIsCreatingPost(true); // Open Delivery Quest creation
    } else if (location.pathname === '/people') {
      setIsCreatingPeopleQuest(true); // Open People Quest creation
    }
  };

  const closeCreation = () => {
    setIsCreatingPost(false);
    setIsCreatingPeopleQuest(false);
  };

  const handleClick = async (page) => {
    if (page.action === 'openPostCreation') {
      openCreation();
    } else if (page.name === 'Logout') {
      try {
        const res = await ProfileService.logout();
        if (res.data === 'Success') {
          navigate('/post');
        } else {
          console.error('Logout failed:', res.data);
        }
      } catch (error) {
        console.error('An error occurred during logout:', error);
      }
    } else {
      navigate(page.path);
    }
  };

  // Filter pages based on authentication
  const filteredPages = user
    ? [...pages, { name: 'My-Quest', path: '/viewQuest' }, { name: 'Profile', path: '/profile' }]
    : pages;

  // Dynamically determine action buttons based on authentication and current page
  const actionButtons = user
    ? [
      ...(location.pathname === '/post' || location.pathname === '/people'
        ? [{ name: 'Create', action: 'openPostCreation' }]
        : []),
      { name: 'Logout', path: '/logout' },
    ]
    : [{ name: 'Login', path: '/login' }];

  return (
    <>
      <AppBar sx={{ backgroundColor: 'black' }}>
        <Container maxWidth="xl">
          <Toolbar disableGutters>
            <Typography
              variant="h6"
              noWrap
              component="div"
              sx={{
                mr: 2,
                fontWeight: 700,
                letterSpacing: '.3rem',
                color: 'inherit',
                textDecoration: 'none',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            >
              <img src={logo} alt="Logo" style={{ width: '120px', height: '80px' }} />
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'flex-start',
                gap: 1,
              }}
            >
              {filteredPages.map((page) => (
                <Box
                  key={page.name}
                  onClick={() => handleClick(page)}
                  sx={{
                    my: 2,
                    color: 'white',
                    cursor: 'pointer',
                    padding: '8px 16px',
                    borderRadius: '4px',
                    '&:hover': { backgroundColor: '#1565c0' },
                    '&:active': { cursor: 'default' },
                    textTransform: 'uppercase',
                  }}
                >
                  {page.name}
                </Box>
              ))}
            </Box>

            <div sx={{ display: 'flex', gap: 1 }}>
              {actionButtons.map((button) => (
                <AwesomeButton
                  key={button.name}
                  className="loginbutton"
                  onReleased={() => handleClick(button)}
                >
                  {button.name}
                </AwesomeButton>
              ))}
            </div>
          </Toolbar>
        </Container>
      </AppBar>

      {/* Dialog for Delivery Quest Creation */}
      <Dialog open={isCreatingPost} onClose={closeCreation} fullWidth maxWidth="sm">
        <DialogContent>
          <CreatePost />
        </DialogContent>
        <DialogActions>
          <Button onClick={closeCreation} sx={{ color: '#1976d2' }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      {/* Dialog for People Quest Creation */}
      <Dialog open={isCreatingPeopleQuest} onClose={closeCreation} fullWidth maxWidth="sm">
        <DialogContent>
          <TravelRequestForm
            open={isCreatingPeopleQuest}
            handleClose={closeCreation}
            handleSubmit={(data) => {
              console.log('New People Quest:', data);
              closeCreation();
            }}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Navbar;