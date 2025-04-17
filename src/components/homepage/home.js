import { Typography } from '@mui/joy';
import Grid from '@mui/joy/Grid';
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../../App.css';
import PostService from '../../service/PostService';
import ProductService from '../../service/ProductService';
import { useCountry } from '../navbar/CountryProvider';
import Post from '../post/PostCard';
import ProductCard from '../QuestStore/ProductCard';
import { useAuth } from '../SignIn/AuthContext';
import img from './main-6.png';

function Home() {
  const navigate = useNavigate();
  const { user, loading } = useAuth();
  const [popularItems, setPopularItems] = useState([]);
  const [questRecommendations, setQuestRecommendations] = useState([]);
  const { selectedCountry } = useCountry(); // Get the selected country from CountryProvider


  const howItWorks = [
    {
      "step": 1,
      "title": "Create Delivery Quest",
      "description": "Users can create quests for items they need delivered.",
      "src": require('./main-1.png') // Use require to load the image
    },
    {
      "step": 2,
      "title": "Choose from Applied Users",
      "description": "Select a suitable user from those who have applied to complete the quest.",
      "src": require('./main-2.png') // Use require to load the image
    },
    {
      "step": 3,
      "title": "Share Details and Accept Delivery",
      "description": "Share necessary details with the chosen user and confirm the delivery.",
      "src": require('./main-3.png') // Use require to load the image

    }
  ];

  const handleSeeMoreQuests = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
    navigate("/post");
  };

  const handleSeeMoreItems = () => {
    window.scrollTo(0, 0); // Scroll to the top of the page
    navigate("/store");
  };

  useEffect(() => {
    const fetchPopularItems = async (selectedCountry) => {
      try {
        const response = await ProductService.getProducts(selectedCountry);

        // Map the API response to the required format

        setPopularItems(response);
      } catch (error) {
        console.error("Error fetching popular items:", error);
      }
    };

    if (selectedCountry) {
      fetchPopularItems(selectedCountry);
    }
  }, [selectedCountry]); // Add selectedCountry as a dependency

  useEffect(() => {
    const fetchQuests = async () => {
      try {
        const response = await PostService.getPosts({ userCountry: selectedCountry });
        if (response.status === 200) {
          setQuestRecommendations(response.data.content);
        }
      } catch (error) {
        console.error('Error fetching quests:', error);
      }
    };

    if (selectedCountry) {
      fetchQuests();
    }
  }, [selectedCountry]);

  return (
    <div style={{ color: 'white' }}>
      {/* Introduction */}
      <Grid container spacing={2} sx={{ flexGrow: 1, minHeight: '50vh', alignItems: 'center', mt: 2 }}>
        <Grid xs={12} md={1.5} />
        <Grid xs={12} md={4.5} sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textAlign: 'center' }}>
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
        <Grid xs={12} md={4.5} sx={{ display: 'flex', justifyContent: 'center' }}>
          <div className="transparent-container">
            <img src={img} alt="Helping" className="transparent-container-image" />
          </div>
        </Grid>
        <Grid xs={12} md={1.5} />
      </Grid>

      {/* How It Works */}
      <h1 style={{ textAlign: 'center' }}>How it works</h1>
      <Grid container spacing={2} sx={{ mt: 2, mb: 4 }}>
        <Grid xs={12} md={1.5}> </Grid>
        {howItWorks.map((step) => (
          <Grid key={step.step} xs={12} md={3}>
            <img src={step.src} alt={step.title} style={{ width: '100%', height: 'auto', borderRadius: '5px' }} />
            {/* <div style={{ backgroundColor: '#2b2b2b', padding: '10px', borderRadius: '5px', height: '300px', textAlign: 'center' }}>
              <Typography level="body1" sx={{ color: 'white' }}>{step.title}</Typography>
              <Typography level="body2" sx={{ color: 'white', marginTop: '10px' }}>{step.description}</Typography>
            </div> */}
          </Grid>
        ))}
        <Grid xs={12} md={1.5}></Grid>
      </Grid>

      {/* Quest Recommendations */}
      <h2 style={{ textAlign: 'center', marginTop: '60px' }}>Delivery Quest for you</h2>
      <Grid container spacing={1.5}>
        <Grid xs={12} md={1.5}></Grid>
        {questRecommendations.slice(0, 3).map((quest) => (
          <Grid key={quest.id} xs={12} md={3}>
            <Post postData={quest} />
          </Grid>
        ))}
        <Grid xs={12} md={1.5}></Grid>
      </Grid>

      <div style={{ textAlign: 'center', marginTop: '20px' }}>
        <button
          style={{ color: 'white', padding: '5px 10px', backgroundColor: 'transparent', border: '1px solid white' }}
          onClick={handleSeeMoreQuests}
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
          <Grid key={item.productId} xs={12} md={3}>
            <ProductCard product={item} />
          </Grid>
        ))}
        <Grid xs={12} md={1.5}></Grid>
      </Grid>

      <div style={{ textAlign: 'center', marginTop: '20px', marginBottom: '20px' }}>
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
