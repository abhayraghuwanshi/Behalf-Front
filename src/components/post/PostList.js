import { Box, Button, Dialog, DialogContent, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import PostService from "../../service/PostService";
import ProfileService from "../../service/ProfileService";
import CreatePost from "../postcreation/CreatePost";
import { useAuth } from "../SignIn/AuthContext";
import PostCard from "./PostCard";
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
  const [searchTerm, setSearchTerm] = useState("");
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const dropDownOptions = [
    "PICKUP_DELIVERY",
  ];

  const handleAccept = async (postSession) => {
    if (!user?.id) {
      alert("Sign in to share");
      return;
    }
    console.log(postSession);
    if (!postSession.questCreatorId) {
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

  const applyFilters = () => {
    const filtered = posts.filter(
      (post) =>
        post.questReward >= filters.minPrice &&
        post.questReward <= filters.maxPrice &&
        (!filters.dateFilter || new Date(post.date) >= new Date(filters.dateFilter)) &&
        (!filters.categoryFilter || post.questLabel === filters.categoryFilter) &&
        (post.questInstructions.toLowerCase().includes(searchTerm.toLowerCase()) ||
          post.id.toString().includes(searchTerm))
    );
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    fetchPosts();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [posts, filters, searchTerm]);

  return (
    <div style={{ marginTop: '100px', marginLeft: '40px', marginRight: '40px' }}>
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", marginBottom: "20px" }}>
        <Typography variant="h4" sx={{ textAlign: "left", flexGrow: 1, color: 'white' }}>📦 Delivery Quests</Typography>
        <Button
          variant="outlined"
          sx={{ color: "white", borderColor: "white", marginLeft: "auto", "&:hover": { borderColor: "gray", backgroundColor: 'gray', color: 'white' } }}
          onClick={() => setIsCreatingPost(true)}
        >
          Create Post
        </Button>
      </Box>
      <FilterControls
        minPrice={filters.minPrice}
        maxPrice={filters.maxPrice}
        dateFilter={filters.dateFilter}
        searchTerm={searchTerm}
        setMinPrice={(value) => setFilters({ ...filters, minPrice: value })}
        setMaxPrice={(value) => setFilters({ ...filters, maxPrice: value })}
        setDateFilter={(value) => setFilters({ ...filters, dateFilter: value })}
        setSearchTerm={setSearchTerm}
      />

      <div className="post-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) =>
            post ? (
              <PostCard
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

      {/* Dialog for Delivery Quest Creation */}
      <Dialog open={isCreatingPost} onClose={() => setIsCreatingPost(false)} fullWidth maxWidth="sm">
        <DialogContent>
          <CreatePost open={isCreatingPost} handleClose={() => setIsCreatingPost(false)} />
        </DialogContent>
      </Dialog>
    </div>
  );
};

export default PostList;