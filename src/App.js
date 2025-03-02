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
import QuestStore from './components/QuestStore/QuestStore.js';
import LoginPage from './components/SignIn/login.component.js';
import UserProfile from './components/UserProfile/UserProfile.js';


function App() {
  return (

    <div className="App">
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PostList />} />
          <Route path='/viewQuest' element={<MyQuestPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route >
          <Route path="/profile" element={<UserProfile />} /> {/* Profile Route */}
          <Route path="/people" element={<TravelRequestPage />} /> {/* Profile Route */}
          <Route path="/store" element={<QuestStore />} />
        </Routes>
        <Footer />
      </Router>
    </div>


  );
}

export default App;
