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

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Quest', path: '/post' },
  { name: 'MyQuests', path: '/viewQuest' },
  { name: 'Profile', path: '/profile' }, // Add Profile page
];
const actionButtons = [
  { name: 'Create', action: 'openPostCreation' },
  { name: 'Login', path: '/login' },
  { name: 'Logout', path: '/logout' },
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

  const handleClick = (page) => {
    console.log(page);
    if (page.action === 'openPostCreation') {
      openCreation();
    } else {
      navigate(page.path);
    }
  };

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
              LOGO
            </Typography>

            <Box
              sx={{
                flexGrow: 1,
                display: 'flex',
                justifyContent: 'flex-start',
                gap: 1,
              }}
            >
              {pages.map((page) => (
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
                  {page.name}
                </Box>
              ))}
            </Box>

            <Box sx={{ display: 'flex', gap: 1 }}>
              {actionButtons.map((button) => (
                <AwesomeButton
                  className='loginbutton'
                  onReleased={() => handleClick(button)}
                >
                  {button.name}
                </AwesomeButton>
              ))}
            </Box>
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
