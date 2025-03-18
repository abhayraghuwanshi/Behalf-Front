import { Typography } from '@mui/joy';
import Grid from '@mui/joy/Grid';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import { useAuth } from '../SignIn/AuthContext';
import img from './travelbyplane3.png';

function Home() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();

  const handleClick = () => {
    navigate("/login");
  }

  const questRecommendations = [
    {
      "id": 1,
      "questCreatorId": 2,
      "questInstructions": "Deliver a laptop to New York",
      "questValidity": "2025-04-20T13:00:00.000+00:00",
      "questReward": 5000,
      "creationTimestamp": "2025-03-10T11:45:42.245+00:00",
      "userInformation": {
        "id": 2,
        "email": "john.doe@gmail.com",
        "firstName": "John",
        "lastName": "Doe",
        "picture": "https://example.com/john_doe.png"
      }
    },
    {
      "id": 2,
      "questCreatorId": 3,
      "questInstructions": "Need a book from Chicago",
      "questValidity": "2025-04-25T13:00:00.000+00:00",
      "questReward": 2000,
      "creationTimestamp": "2025-03-12T11:45:42.245+00:00",
      "userInformation": {
        "id": 3,
        "email": "jane.smith@gmail.com",
        "firstName": "Jane",
        "lastName": "Smith",
        "picture": "https://example.com/jane_smith.png"
      }
    },
    {
      "id": 3,
      "questCreatorId": 4,
      "questInstructions": "Deliver a phone to Los Angeles",
      "questValidity": "2025-04-30T13:00:00.000+00:00",
      "questReward": 3000,
      "creationTimestamp": "2025-03-15T11:45:42.245+00:00",
      "userInformation": {
        "id": 4,
        "email": "alice.jones@gmail.com",
        "firstName": "Alice",
        "lastName": "Jones",
        "picture": "https://example.com/alice_jones.png"
      }
    }
  ];

  const popularItems = [
    {
      "id": 101,
      "itemName": "Wireless Headphones",
      "price": 150,
      "image": "https://example.com/wireless_headphones.png"
    },
    {
      "id": 102,
      "itemName": "Smartwatch",
      "price": 200,
      "image": "https://example.com/smartwatch.png"
    },
    {
      "id": 103,
      "itemName": "Gaming Console",
      "price": 500,
      "image": "https://example.com/gaming_console.png"
    },
    {
      "id": 104,
      "itemName": "Bluetooth Speaker",
      "price": 100,
      "image": "https://example.com/bluetooth_speaker.png"
    }
  ];

  const howItWorks = [
    {
      "step": 1,
      "title": "Create Delivery Quest",
      "description": "Users can create quests for items they need delivered."
    },
    {
      "step": 2,
      "title": "Choose from Applied Users",
      "description": "Select a suitable user from those who have applied to complete the quest."
    },
    {
      "step": 3,
      "title": "Share Details and Accept Delivery",
      "description": "Share necessary details with the chosen user and confirm the delivery."
    }
  ];

  const handleSeeMoreQuests = () => {
    navigate("/quests");
  };

  const handleSeeMoreItems = () => {
    navigate("/items");
  };

  return (
    <div style={{ color: 'white' }}>
      {/* Introduction */}
      <Grid container spacing={2} sx={{ flexGrow: 1, minHeight: '50vh', alignItems: 'center', mt: 2 }}>
        <Grid xs={12} md={2} />
        <Grid xs={12} md={4} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
          <Typography level="h2" sx={{ mb: 2, color: 'white' }}>Deliver & Earn</Typography>
          <Typography sx={{ mt: 1, color: 'white' }}>
            Connect with people who need items delivered. Complete quests, earn rewards.
          </Typography>
          <Typography sx={{ mt: 1, color: 'white' }}>
            Your trip, your reward
          </Typography>
          {/* Conditionally render the Sign Up button if the user is not signed in */}
          <Typography sx={{ mt: 1, color: 'white' }}>
            {user ? <a href="/post" style={{ color: 'white' }}>create quest</a> : <a href="/login" style={{ color: 'white' }}>Sign in</a>
            }
          </Typography>
        </Grid>
        <Grid xs={12} md={4} sx={{ display: 'flex', justifyContent: 'center' }}>
          <div className="transparent-container">
            <img src={img} alt="Helping" className="transparent-container-image" />
          </div>
        </Grid>
        <Grid xs={12} md={2} />
      </Grid>

      {/* How It Works */}
      <h2 style={{ textAlign: 'center' }}>How it works</h2>
      <Grid container spacing={2} sx={{ mt: 2, mb: 4 }}>
        <Grid xs={12} md={1.5}> </Grid>
        {howItWorks.map((step) => (
          <Grid key={step.step} xs={12} md={3}>
            <div style={{ backgroundColor: '#2b2b2b', padding: '10px', borderRadius: '5px', height: '300px', textAlign: 'center' }}>
              <Typography level="body1" sx={{ color: 'white' }}>{step.title}</Typography>
              <Typography level="body2" sx={{ color: 'white', marginTop: '10px' }}>{step.description}</Typography>
            </div>
          </Grid>
        ))}
        <Grid xs={12} md={1.5}></Grid>
      </Grid>

      {/* Quest Recommendations */}
      <h2 style={{ textAlign: 'center', marginTop: '60px' }}>Delivery Quest for you</h2>
      <Grid container spacing={2} >
        <Grid xs={12} md={1.5}></Grid>
        {questRecommendations.slice(0, 3).map((quest) => (
          <Grid key={quest.id} xs={12} md={3}>
            <div style={{ backgroundColor: '#383838', padding: '10px', borderRadius: '5px', height: '300px', textAlign: 'center' }}>
              <Typography level="body1" sx={{ color: 'white' }}>{quest.questInstructions}</Typography>
              <Typography level="body2" sx={{ color: 'white' }}>Reward: {quest.questReward}</Typography>
            </div>
          </Grid>
        ))}
        <Grid xs={12} md={1.5}>
        </Grid>
      </Grid>
      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          style={{ color: 'white', padding: '5px 10px', backgroundColor: 'transparent', border: '1px solid white' }}
          onReleased={handleSeeMoreQuests}
        >
          <Typography style={{ color: 'white' }}>See More Quests</Typography>
        </button>
      </div>

      {/* Popular Items */}
      <h1 style={{ textAlign: 'center', marginTop: '60px' }}> Buy popular items  </h1>
      <div style={{ textAlign: 'center', fontSize: '20px', marginBottom: '10px' }}>Browse and buy trending products directly from our shop.
        No need to wait — get what you need, fast and hassle-free.</div>
      <Grid container spacing={2}>
        <Grid xs={12} md={1.5}></Grid>
        {popularItems.slice(0, 3).map((item) => (
          <Grid key={item.id} xs={12} md={3}>
            <div style={{ backgroundColor: '#383838', padding: '10px', borderRadius: '5px', textAlign: 'center', height: '300px' }}>
              <img src={item.image} alt={item.itemName} width="50" height="50" />
              <Typography sx={{ color: 'white' }}>{item.itemName}</Typography>
              <Typography sx={{ color: 'white' }}>Price: {item.price}</Typography>
            </div>
          </Grid>
        ))}
        <Grid xs={12} md={1.5}>
        </Grid>
      </Grid>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          style={{ color: 'white', padding: '5px 10px', backgroundColor: 'transparent', border: '1px solid white' }}
          onClick={handleSeeMoreItems}
        >
          <Typography style={{ color: 'white' }}>See More Items</Typography>
        </button>
      </div>

    </div>
  );
}

export default Home;
