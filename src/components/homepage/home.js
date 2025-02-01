import { Typography } from '@mui/joy';
import AspectRatio from '@mui/joy/AspectRatio';
import Grid from '@mui/joy/Grid';
import React from 'react';
import { AwesomeButton } from 'react-awesome-button';
import '../../App.css';

function Home() {
  return (
    <div>
      {/* Section 1 */}
      <Grid container spacing={2} sx={{ flexGrow: 1, minHeight: '50vh', alignItems: 'center', mt: 2, px: 3 }}>
        <Grid xs={12} md={2} />
        <Grid xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <AspectRatio ratio="4/3" sx={{ width: '100%', maxWidth: 400 }}>
            <img src="static/helping.jpg" alt="Helping" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </AspectRatio>
        </Grid>
        <Grid xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography level="h1" sx={{ mb: 2, color: 'white' }}>Do a Side Hustle or Create One</Typography>
          <AwesomeButton className='signup-button'>Sign Up</AwesomeButton>
          <Typography sx={{ mt: 1, color: 'white' }}>or <a href="/signin" style={{ color: 'white' }}>Sign in</a></Typography>
        </Grid>
        <Grid xs={12} md={2} />
      </Grid>

      {/* Section 2 */}
      <Grid container spacing={2} sx={{ flexGrow: 1, minHeight: '80vh', alignItems: 'center', mt: 2, px: 3 }}>
        <Grid xs={12} md={2} />
        <Grid xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography level="h1" sx={{ mb: 2, color: 'white' }}>
            Opportunities, <br /> From job applications to house hunting, we find you assistance
          </Typography>
          <AwesomeButton className='find-button' type='secondary'>Find</AwesomeButton>
        </Grid>
        <Grid xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <AspectRatio ratio="4/3" sx={{ width: '100%', maxWidth: 400 }}>
            <img src="static/todo2.jpg" alt="Tasks" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </AspectRatio>
        </Grid>
        <Grid xs={12} md={2} />
      </Grid>

      {/* Section 3 */}
      <Grid container spacing={2} sx={{ flexGrow: 1, minHeight: '80vh', alignItems: 'center', mt: 2, px: 3 }}>
        <Grid xs={12} md={2} />
        <Grid xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <AspectRatio ratio="4/3" sx={{ width: '100%', maxWidth: 400 }}>
            <img src="static/timesaving-1.png" alt="Time Saving" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </AspectRatio>
        </Grid>
        <Grid xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography level="h1" sx={{ mb: 2, color: 'white' }}>
            Earn Money <br /> Let us assist you in earning extra bucks.
          </Typography>
        </Grid>
        <Grid xs={12} md={2} />
      </Grid>

      {/* Section 4 */}
      <Grid container spacing={2} sx={{ flexGrow: 1, minHeight: '80vh', alignItems: 'center', mt: 2, px: 3 }}>
        <Grid xs={12} md={2} />
        <Grid xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography level="h1" sx={{ mb: 2, color: 'white' }}>
            Stay Informed, <br /> Receive regular updates to remain in control
          </Typography>
        </Grid>
        <Grid xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <AspectRatio ratio="4/3" sx={{ width: '100%', maxWidth: 400 }}>
            <img src="static/rules1.jpg" alt="Updates" style={{ objectFit: 'cover', width: '100%', height: '100%' }} />
          </AspectRatio>
        </Grid>
        <Grid xs={12} md={2} />
      </Grid>
    </div >
  );
}

export default Home;
