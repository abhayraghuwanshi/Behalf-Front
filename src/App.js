import React from 'react';
import "react-awesome-button/dist/styles.css";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import TravelRequestPage from './components/FindPeople/TravelRequestPage.js';
import Footer from './components/Footer/Footer.js';
import Home from './components/homepage/home.js';
import MyQuestPage from './components/myquest/viewMyQuest.js';
import ResponsiveAppBar from './components/navbar/navbarv.js';
import PostList from './components/post/PostList.js';
import LoginPage from './components/SignIn/login.component.js';
import UserProfile from './components/UserProfile/UserProfile.js';

function App() {
  return (

    <div className="App">
      {/* <div style={{ filter: 'blur(5px)' }}>
        <Swirl className="swirl" />
      </div> */}
      {/* <div style={{ position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', zIndex: -1, filter: 'blur(5px)' }}>
        <Swirl className="swirl" />
      </div> */}
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PostList />} />
          <Route path='/viewQuest' element={<MyQuestPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route >
          <Route path="/profile" element={<UserProfile />} /> {/* Profile Route */}
          <Route path="/people" element={<TravelRequestPage />} /> {/* Profile Route */}
        </Routes>
        <Footer />
      </Router>
    </div>


  );
}

export default App;
