import React, { useEffect, useState } from "react";
import PostService from "../../service/PostService";
import ProfileService from "../../service/ProfileService";
import { useAuth } from "../SignIn/AuthContext";
import Post from "./PostCard";
import FilterControls from "./PostFilter";
import "./PostList.css";

const PostList = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [userMap, setUserMap] = useState({});
  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000,
    dateFilter: "",
    categoryFilter: "",
  });


  const dropDownOptions = [
    "PHOTOGRAPHY",
    "GRAPHIC_DESIGN",
    "PET_SITTING",
    "SEWING",
    "HANDIWORK",
    "PICKUP_DELIVERY",
    "BOOK_KEEPING",
    "ONLINE_TUTORIAL",
  ];

  // Handle accepting a post
  const handleAccept = async (postSession) => {
    if (!user?.id) {
      alert("Sign in to share");
      return;
    }

    if (!postSession.questCreatorId || !postSession.id) {
      alert("Error: Missing required fields");
      return;
    }

    try {
      const response = await PostService.agreePost(postSession);
      if (response.status === 200 || response.status === 201) {
        alert("Agreement created!");
      }
    } catch (error) {
      console.error("Error creating agreement:", error);
      alert("Failed to create agreement");
    }
  };

  // Fetch posts from the API
  const fetchPosts = async () => {
    try {
      const response = await PostService.getPosts();
      if (response.status === 200) {
        setPosts(response.data);
        setFilteredPosts(response.data);
        fetchUserInfo();
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  // Fetch user information for post creators
  const fetchUserInfo = async () => {
    try {
      const response = await ProfileService.fetchUserByEmail();
      if (response.status === 200) {
        setUserMap(response.data);
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  // Apply filters to posts
  const applyFilters = () => {
    const filtered = posts.filter(
      (post) =>
        post.questReward >= filters.minPrice &&
        post.questReward <= filters.maxPrice &&
        (!filters.dateFilter || new Date(post.date) >= new Date(filters.dateFilter)) &&
        (!filters.categoryFilter || post.questLabel === filters.categoryFilter)
    );
    setFilteredPosts(filtered);
  };

  // Fetch posts on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  // Apply filters when filters or posts change
  useEffect(() => {
    applyFilters();
  }, [posts, filters]);

  return (
    <div>
      <FilterControls
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        dateFilter={filters.dateFilter}
        categoryFilter={filters.categoryFilter}
        setMinPrice={(value) => setFilters({ ...filters, minPrice: value })}
        setMaxPrice={(value) => setFilters({ ...filters, maxPrice: value })}
        setDateFilter={(value) => setFilters({ ...filters, dateFilter: value })}
        setCategoryFilter={(value) => setFilters({ ...filters, categoryFilter: value })}
        dropDownOptions={dropDownOptions}
      />

      <div className="post-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) =>
            post ? (
              <Post
                key={post.id}
                postData={post}
                allIds={userMap}
                onAccept={handleAccept}
                user={user}
                postSession={{
                  questCreatorId: post.questCreatorId,
                  questId: post.id,
                }}

              />
            ) : null
          )
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default PostList;