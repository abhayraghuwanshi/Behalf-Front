import { LinkedIn, Twitter } from '@mui/icons-material';
import FacebookIcon from '@mui/icons-material/Facebook';
import { Box, Container, Link, Typography } from '@mui/material';

const Footer = () => {
    return (
        <Box component="footer" sx={{
            color: 'white', py: 10,
            backgroundColor: '#323131 ',
            borderRadius: '8px'
        }}>
            <Container maxWidth="lg" sx={{ display: 'flex', flexDirection: { xs: 'column', md: 'row' }, justifyContent: 'space-between', alignItems: 'center' }}>

                {/* Logo Section */}
                <Box sx={{ gap: 2 }}>
                    <img src="/logo.png" alt="Company Logo" width={48} height={48} />
                    <Typography variant="h6">Your Company</Typography>

                    <Typography>A902, Aaahika Apartment</Typography>
                    <Typography>Bangalore</Typography>
                    <Typography>Email: abhay.ott@gmail.com</Typography>
                </Box>

                {/* Social Links (Optional) */}
                <Box sx={{ mt: { xs: 3, md: 0 }, display: 'flex', gap: 3 }}>
                    <Link href="#" aria-label="Facebook" color="inherit" underline="none"><FacebookIcon /></Link>
                    <Link href="#" aria-label="Twitter" color="inherit" underline="none"><Twitter></Twitter></Link>
                    <Link href="#" aria-label="LinkedIn" color="inherit" underline="none"><LinkedIn /></Link>
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