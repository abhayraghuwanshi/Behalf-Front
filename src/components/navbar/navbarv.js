import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { AwesomeButton } from "react-awesome-button";
import { useNavigate } from 'react-router-dom';
import CreatePost from '../postcreation/CreatePost';
import { useAuth } from '../SignIn/AuthContext';
import logo from './dropquest2.png';

import ProfileService from '../../service/ProfileService';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Delivery-Quest', path: '/post' },
  { name: 'People-Quest', path: '/people' },
];

function Navbar() {
  const { user, loading } = useAuth();
  const [isCreatingPost, setIsCreatingPost] = React.useState(false);
  const navigate = useNavigate();

  const openCreation = () => {
    setIsCreatingPost(true);
  };

  const closeCreation = () => {
    setIsCreatingPost(false);
  };

  const handleClick = async (page) => {
    console.log(page);
    if (page.action === 'openPostCreation') {
      openCreation();

    } else if (page.name === 'Logout') {
      try {
        const res = await ProfileService.logout();
        if (res.data === 'Success') {
          navigate('/post');
        } else {
          // Handle logout failure case
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

  // Dynamically determine action buttons based on authentication
  const actionButtons = user
    ? [{ name: 'Create', action: 'openPostCreation' }, { name: 'Logout', path: '/logout' }]
    : [{ name: 'Login', path: '/login' }];

  return (
    <>
      <AppBar position="static" sx={{ backgroundColor: 'black' }} >
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
                    '&:active': { cursor: 'default' },  // Changes cursor to default when button is clicked
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
      </AppBar >

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
    </>
  );
}

export default Navbar;
