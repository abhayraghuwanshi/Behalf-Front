import React from 'react';
import { Route, BrowserRouter as Router, Routes } from 'react-router-dom';
import './App.css';
import Home from './components/homepage/home.js';
import MyQuestPage from './components/myquest/viewMyQuest.js';
import ResponsiveAppBar from './components/navbar/navbarv.js';
import PostList from './components/post/PostList.js';
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
          {/* <Route path="/post/:id" element={<PostDetail />} /> */}
          {/* <Route path="/create" element={<CreatePost />} /> */}
          <Route path='/viewQuest' element={<MyQuestPage />}></Route>
          <Route path='/login' element={<LoginPage />}></Route >
          <Route path="/profile" element={<UserProfile />} /> {/* Profile Route */}
        </Routes>
      </Router>
    </div>
  );
}

export default App;
