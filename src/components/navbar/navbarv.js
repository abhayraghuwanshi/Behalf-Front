import MailIcon from '@mui/icons-material/Mail';
import AppBar from '@mui/material/AppBar';
import Avatar from '@mui/material/Avatar';
import Badge from '@mui/material/Badge';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Container from '@mui/material/Container';
import IconButton from '@mui/material/IconButton';
import Toolbar from '@mui/material/Toolbar';
import React from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import CountrySelector from '../Country/CountrySelector';
import { useCountry } from '../navbar/CountryProvider';
import { useAuth } from '../SignIn/AuthContext';
import logo from './dropquest6.png';

const pages = [
  { name: 'Delivery Requests', path: '/post' },
  { name: 'My Requests', path: '/requests' },
  { name: 'Store', path: '/store' },
];

function Navbar() {
  const { user } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const { selectedCountry, setSelectedCountry } = useCountry();

  const handleClick = (page) => navigate(page.path);

  const handleCountryChange = (e) => setSelectedCountry(e.target.value);

  const filteredPages = user ? [...pages] : pages;

  const inputStyles = {
    '& .MuiInputLabel-root': { color: 'white' },
    '& .MuiOutlinedInput-input': { color: 'white' },
  };

  return (
    <AppBar position="fixed" sx={{ backgroundColor: 'black', borderRadius: '8px' }}>
      <Container>
        <Toolbar disableGutters sx={{ minHeight: '60px', display: 'flex', justifyContent: 'space-between' }}>

          {/* Left Side - Logo & Pages */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Box
              component="img"
              src={logo}
              alt="Logo"
              sx={{
                width: '120px',
                height: '40px',
                objectFit: 'contain',
                cursor: 'pointer',
              }}
              onClick={() => navigate('/')}
            />
            <Box sx={{ display: 'flex', gap: 2, marginLeft: '20px' }}>
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
                    textDecoration: location.pathname === page.path ? 'underline' : 'none',
                    textDecorationColor: location.pathname === page.path ? 'purple' : 'none',
                    textDecorationThickness: '4px',
                    textUnderlineOffset: '10px',
                    height: '40px',
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Right Side - Actions */}
          <Box sx={{ display: 'flex', gap: '10px', alignItems: 'center' }}>
            <CountrySelector
              selectedCountry={selectedCountry}
              handleCountryChange={handleCountryChange}
              inputStyles={{
                ...inputStyles,
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                },
                '& .MuiSvgIcon-root': {
                  fontSize: '20px',
                },
              }}
              sx={{
                display: 'flex',
                alignItems: 'center',
                height: '40px',
              }}
            />

            {user ? (
              <>
                {/* Notification Icon */}
                <IconButton
                  onClick={() => navigate('/notification')}
                  sx={{
                    height: '40px',
                    width: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Badge color="error" variant="dot">
                    <MailIcon sx={{ color: 'white', fontSize: '24px' }} />
                  </Badge>
                </IconButton>

                {/* Profile Avatar */}
                <IconButton
                  onClick={() => navigate('/profile')}
                  sx={{
                    height: '40px',
                    width: '40px',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Avatar src={user?.profileImage || ''} alt={user?.name || 'User'} sx={{ width: 32, height: 32 }} />
                </IconButton>
              </>
            ) : (
              <Button
                onClick={() => navigate('/login')}
                sx={{
                  color: 'white',
                  borderRadius: '4px',
                  backgroundColor: '#1976d2',
                  height: '40px',
                  padding: '6px 12px',
                  '&:hover': { backgroundColor: '#1565c0' },
                }}
              >
                Login
              </Button>
            )}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
}

export default Navbar;
