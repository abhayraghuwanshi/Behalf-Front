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
import { useLocation, useNavigate } from 'react-router-dom';
import ProfileService from '../../service/ProfileService';
import TravelRequestService from '../../service/TravelRequestService';
import TravelRequestForm from "../FindPeople/TravelRequestForm";
import CreatePost from '../postcreation/CreatePost';
import { useAuth } from '../SignIn/AuthContext';
import logo from './dropquest2.png';


const pages = [
  { name: 'Home', path: '/' },
  { name: 'Delivery-Quest', path: '/post' },
  { name: 'People-Search', path: '/people' },
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


  const handleTravelCreation = async (payload) => {
    try {
      const response = await TravelRequestService.createTravelRequest({
        ...payload,
        creatorId: user?.id // Ensure user ID is attached
      });

      if (response) {
        console.log("Travel request created successfully:", response);
        alert("Travel request created successfully!"); // Show confirmation
        closeCreation(); // Close the modal
      } else {
        console.error("Failed to create travel request");
        alert("Failed to create travel request.");
      }
    } catch (error) {
      console.error("An error occurred during travel request creation:", error);
      alert("Error creating travel request. Please try again.");
    }
  };

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'black' }}>
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
                    textTransform: 'uppercase',
                  }}
                >
                  {page.name.trim()}
                </Box>
              ))}
            </Box>

            <div sx={{ display: 'flex', gap: 1 }}>
              {actionButtons.map((button) => (
                <button
                  key={button.name}
                  className="loginbutton"
                  onClick={() => handleClick(button)}
                >
                  {button.name}
                </button>
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
            handleSubmit={(data) => handleTravelCreation(data)}
          />
        </DialogContent>
      </Dialog>
    </>
  );
}

export default Navbar;