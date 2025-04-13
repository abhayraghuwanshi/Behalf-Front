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
        <Toolbar disableGutters sx={{ minHeight: '40px' }}>
          {/* Left Side - Logo & Pages */}
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <img
              src={logo}
              alt="Logo"
              style={{ width: '200px', height: '40px', cursor: 'pointer' }}
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
                    textDecorationColor: location.pathname === page.path ? 'orange' : 'none',
                    textDecorationThickness: '2px',
                    textUnderlineOffset: '10px',
                  }}
                >
                  {page.name}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Right Side - Actions */}
          <Box sx={{ position: 'absolute', right: '0', display: 'flex', gap: '10px', alignItems: 'center', height: '40px' }}>
            <CountrySelector
              selectedCountry={selectedCountry}
              handleCountryChange={handleCountryChange}
              inputStyles={{
                ...inputStyles,
                '& .MuiSelect-select': {
                  display: 'flex',
                  alignItems: 'center',
                  height: '40px', // Match height
                  fontSize: '20px', // Adjust font size

                },
                '& .MuiSvgIcon-root': {
                  fontSize: '20px', // Adjust flag icon size
                },
              }}
              sx={{
                height: '40px', // Match height
                display: 'flex',
                alignItems: 'center',
              }}
            />
            {user ? (
              <>
                {/* My-Quest with Message Icon */}
                <IconButton
                  onClick={() => navigate('/viewQuest')}
                  sx={{
                    height: '40px', // Consistent height
                    width: '40px', // Consistent width
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                  }}
                >
                  <Badge color="error" variant="dot">
                    <MailIcon sx={{ color: 'white', fontSize: '30px' }} /> {/* Adjust icon size */}
                  </Badge>
                </IconButton>

                {/* Profile with Avatar */}
                <IconButton
                  onClick={() => navigate('/profile')}
                  sx={{
                    height: '40px', // Consistent height
                    width: '40px', // Consistent width
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
                  height: '40px', // Consistent height
                  padding: '6px 12px', // Consistent padding
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