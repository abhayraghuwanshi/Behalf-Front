import React from 'react';
import "react-awesome-button/dist/styles.css";
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Footer from './components/Footer/Footer.js';
import Home from './components/homepage/home.js';
import MyQuestPage from './components/myquest/MyQuest.js';
import ResponsiveAppBar from './components/navbar/navbarv.js';
import PostDetail from './components/post/PostDetail.js';
import PostList from './components/post/PostList.js';
import ProductDetail from './components/QuestStore/ProductDetail';
import QuestStore from './components/QuestStore/QuestStore.js';
import LoginPage from './components/SignIn/login.component.js';
import UserProfile from './components/UserProfile/UserProfile.js';
import NotificationPage from './pages/notification/notification.js';

function App() {

  return (

    <div className="App">
      <Router>
        <ResponsiveAppBar />
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/post" element={<PostList />} />
          <Route path='/notification' element={<NotificationPage />} />
          <Route path='/login' element={<LoginPage />}></Route >
          <Route path="/profile" element={<UserProfile />} /> {/* Profile Route */}
          <Route path="/store" element={<QuestStore />} />
          <Route path="/requests" element={<MyQuestPage />} />
          <Route path="/post/:postId" element={<PostDetail />} />
          <Route path="/product/:productId" element={<ProductDetail />} />
        </Routes>
        <Footer />
      </Router>
    </div>


  );
}

export default App;
