import { Typography } from '@mui/joy';
import Grid from '@mui/joy/Grid';
import React from 'react';
import { AwesomeButton } from 'react-awesome-button';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import img from './travelbyplane3.png';

function Home() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  }

  return (
    <div>
      {/* Section 1 */}
      <Grid container spacing={2} sx={{ flexGrow: 1, minHeight: '50vh', alignItems: 'center', mt: 2, px: 3 }}>
        <Grid xs={12} md={2} />
        <Grid xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <div className="transparent-container">
            <img src={img} alt="Helping" className="transparent-container-image" />
          </div>
        </Grid>
        <Grid xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography level="h2" sx={{ mb: 2, color: 'white' }}>Deliver & Earn through quests</Typography>
          <AwesomeButton className='signup-button' onReleased={() => handleClick()}>Sign Up</AwesomeButton>
          <Typography sx={{ mt: 1, color: 'white' }}>or <a href="/login" style={{ color: 'white' }}>Sign in</a></Typography>
        </Grid>
        <Grid xs={12} md={2} />
      </Grid>

      {/* Section 2 */}
      {/* <Grid container spacing={2} sx={{ flexGrow: 1, minHeight: '80vh', alignItems: 'center', mt: 2, px: 3 }}>
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
      </Grid> */}

      {/* Section 3 */}
      {/* <Grid container spacing={2} sx={{ flexGrow: 1, minHeight: '80vh', alignItems: 'center', mt: 2, px: 3 }}>
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
      </Grid> */}

      {/* Section 4 */}
      {/* <Grid container spacing={2} sx={{ flexGrow: 1, minHeight: '80vh', alignItems: 'center', mt: 2, px: 3 }}>
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
      </Grid> */}
    </div >
  );
}

export default Home;
