import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { useAuth } from '../SignIn/AuthContext';
import logo from './dropquest2.png';

const pages = [
  { name: 'Home', path: '/' },
  { name: 'Delivery-Quest', path: '/post' },
  { name: 'People-Search', path: '/people' },
];

function Navbar() {
  const { user, loading } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleClick = async (page) => {
    navigate(page.path);
  };

  const filteredPages = user
    ? [...pages, { name: 'My-Quest', path: '/viewQuest' }, { name: 'Profile', path: '/profile' }]
    : pages;

  const actionButtons = user
    ? []
    : [{ name: 'Login', path: '/login', color: '#1976d2' }];

  return (
    <>
      <AppBar position="fixed" sx={{ backgroundColor: 'black', left: '50%', transform: 'translateX(-50%)', borderRadius: '8px' }}>
        <Container maxWidth="lg">
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
                '&.active': { backgroundColor: '#1976d2' },
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
                    backgroundColor: location.pathname === page.path ? '#1976d2' : 'transparent',
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
    </>
  );
}

export default Navbar;
