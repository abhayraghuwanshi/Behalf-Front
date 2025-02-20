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
      setIsCreatingPost(true);
    } else if (location.pathname === '/people') {
      setIsCreatingPeopleQuest(true);
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

  const filteredPages = user
    ? [...pages, { name: 'My-Quest', path: '/viewQuest' }, { name: 'Profile', path: '/profile' }]
    : pages;

  const actionButtons = user
    ? [
      ...(location.pathname === '/post' || location.pathname === '/people'
        ? [{ name: 'Create', action: 'openPostCreation', color: '#8e24aa' }]
        : []),
      { name: 'Logout', path: '/logout', color: '#d32f2f' },
    ]
    : [{ name: 'Login', path: '/login', color: '#1976d2' }];

  const handleTravelCreation = async (payload) => {
    try {
      const response = await TravelRequestService.createTravelRequest({
        ...payload,
        creatorId: user?.id
      });

      if (response) {
        console.log("Travel request created successfully:", response);
        alert("Travel request created successfully!");
        closeCreation();
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
      <AppBar position="fixed" sx={{ backgroundColor: 'black', maxWidth: '90vw', left: '50%', transform: 'translateX(-50%)', borderRadius: '8px' }}>
        <Container maxWidth="lg"> {/* ✅ Reduced width */}
          <Toolbar disableGutters sx={{ justifyContent: 'space-between', minHeight: '40px' }}>
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
              <img src={logo} alt="Logo" style={{ width: '100px', height: '60px' }} />
            </Typography>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {filteredPages.map((page) => (
                <Button
                  key={page.name}
                  onClick={() => handleClick(page)}
                  sx={{
                    color: 'white',
                    fontSize: '14px',
                    textTransform: 'uppercase',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    '&:hover': { backgroundColor: '#1565c0' },
                  }}
                >
                  {page.name.trim()}
                </Button>
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {actionButtons.map((button) => (
                <Button
                  key={button.name}
                  onClick={() => handleClick(button)}
                  sx={{
                    color: 'white',
                    fontSize: '14px',
                    padding: '6px 12px',
                    borderRadius: '4px',
                    backgroundColor: button.color,
                    '&:hover': { backgroundColor: '#7b1fa2' },
                  }}
                >
                  {button.name}
                </Button>
              ))}
            </Box>
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
