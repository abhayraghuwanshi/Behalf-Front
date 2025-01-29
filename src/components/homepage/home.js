import { Typography } from '@mui/joy';
import AspectRatio from '@mui/joy/AspectRatio';
import Grid from '@mui/joy/Grid';
import { Button } from '@mui/material';
import React from 'react';
import '../../App.css';

function Home() {

  return (
    <div>
      <Grid container spacing={1} sx={{ flexGrow: 1, height: '50vh', alignItems: 'center' }}>
        <Grid xs={12} md={2} />
        <Grid xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}>
          <AspectRatio ratio="4/3" sx={{ width: '100%', height: '100%' }}>
            <img
              src="static/helping.jpg"
              alt="Description of the image"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </AspectRatio>
        </Grid>
        <Grid
          xs={12}
          md={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            height: '100%',
            padding: 0, // Remove padding if any
          }}
        >
          <Typography level="h1" component="h1" sx={{ mb: 2 }}>
            Do a Side Hustle or, create one
          </Typography>
          <Button variant="contained" color="primary" sx={{ mb: 1 }}>
            Sign up
          </Button>
          <Typography>
            or <a href="/signin">Sign in</a>
          </Typography>
        </Grid>
        <Grid xs={12} md={2} />
      </Grid>


      <Grid container spacing={1} sx={{ flexGrow: 1, height: '80vh', alignItems: 'center', marginTop: 1 }}>
        <Grid xs={12} md={2} />
        <Grid
          xs={12}
          md={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            height: '100%',
          }}
        >
          <Typography level="h1" component="h1" sx={{ mb: 2 }}>
            Opportunities
          </Typography>
          <Typography>
            From Job applications to house hunting we find you an assistance
          </Typography>
          <button>Find</button>
        </Grid>
        <Grid xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
          <AspectRatio ratio="4/3" sx={{ width: '100%', height: '100%' }}>
            <img
              src="static/todo2.jpg"
              alt="Description of the image"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </AspectRatio>
        </Grid>
        <Grid xs={12} md={2} />
      </Grid>




      <Grid container spacing={1} sx={{ flexGrow: 1, height: '80vh', alignItems: 'center', marginTop: 1 }}>
        <Grid xs={12} md={2} />
        <Grid xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
          <AspectRatio ratio="4/3" sx={{ width: '100%', height: '100%' }}>
            <img
              src="static/timesaving-1.png"
              alt="Description of the image"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </AspectRatio>
        </Grid>
        <Grid
          xs={12}
          md={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            height: '100%',
          }}
        >
          <Typography level="h1" component="h1" sx={{ mb: 2 }}>
            Earn money
          </Typography>
          <Typography>
            Let us assist you in the earning extra bugs.
          </Typography>
        </Grid>

        <Grid xs={12} md={2} />
      </Grid>

      <Grid container spacing={1} sx={{ flexGrow: 1, height: '80vh', alignItems: 'center', marginTop: 1 }}>
        <Grid xs={12} md={2} />
        <Grid
          xs={12}
          md={4}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            textAlign: 'center',
            height: '100%',
          }}
        >
          <Typography level="h1" component="h1" sx={{ mb: 2 }}>
            Stay Informed
          </Typography>
          <Typography>
            Receive regular update so that you remain in control
          </Typography>
        </Grid>
        <Grid xs={12} md={4} sx={{ display: 'flex', alignItems: 'center' }}>
          <AspectRatio sx={{ width: '100%', height: '100%' }}>
            <img
              src="static/rules1.jpg"
              alt="Description of the image"
              style={{ objectFit: 'cover', width: '100%', height: '100%' }}
            />
          </AspectRatio>
        </Grid>
        <Grid xs={12} md={2} />
      </Grid>

    </div>

  );
}

export default Home;
