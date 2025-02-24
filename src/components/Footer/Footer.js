import { Box, Container, Link, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{
            color: 'white', py: 10,
            backgroundColor: '#323131 ',
            maxWidth: '92vw', borderRadius: '8px', marginLeft: '3.5vw'
        }}>
            <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>

                {/* Logo Section */}
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                    <img src="/logo.png" alt="Company Logo" width={48} height={48} />
                    <Typography variant="h6">Your Company</Typography>
                </Box>

                {/* Address Section */}
                <Box sx={{ mt: { xs: 3, md: 0 }, textAlign: { xs: 'center', md: 'left' } }}>
                    <Typography>123 Business Street</Typography>
                    <Typography>City, State, 12345</Typography>
                    <Typography>Email: contact@yourcompany.com</Typography>
                </Box>

                {/* Social Links (Optional) */}
                <Box sx={{ mt: { xs: 3, md: 0 }, display: 'flex', gap: 3 }}>
                    <Link href="#" aria-label="Facebook" color="inherit" underline="none">📘</Link>
                    <Link href="#" aria-label="Twitter" color="inherit" underline="none">🐦</Link>
                    <Link href="#" aria-label="LinkedIn" color="inherit" underline="none">🔗</Link>
                </Box>
            </Container>

            {/* Copyright Section */}
            <Typography variant="body2" align="center" color="gray" mt={4}>
                &copy; {new Date().getFullYear()} Your Company. All rights reserved.
            </Typography>
        </Box>
    );
};

export default Footer;