import {
  Box,
  Button,
  Dialog,
  DialogContent,
  Grid,
  Pagination,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import PostService from "../../service/PostService";
import { useCountry } from "../navbar/CountryProvider";
import CreatePost from "../postcreation/CreatePost";
import { useAuth } from "../SignIn/AuthContext";
import PostCard from "./PostCard";
import FilterControls from "./PostFilter";
import "./PostList.css";

const PAGE_SIZE = 30;

const PostList = () => {
  const { user } = useAuth();
  const { selectedCountry } = useCountry();

  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [totalPages, setTotalPages] = useState(1);
  const [currentPage, setCurrentPage] = useState(1);
  const [isCreatingPost, setIsCreatingPost] = useState(false);

  const [filters, setFilters] = useState({
    minPrice: 0,
    maxPrice: 10000,
    dateFilter: "",
    categoryFilter: "", // Placeholder if needed later
  });
  const [searchTerm, setSearchTerm] = useState("");

  const handleAccept = async (postSession) => {
    if (!user?.id) {
      alert("Sign in to share");
      return;
    }
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

  const fetchPosts = async (page) => {
    try {
      const response = await PostService.getPosts({
        userCountry: selectedCountry,
        page,
        pageSize: PAGE_SIZE,
      });
      if (response.status === 200) {
        setPosts(response.data.content);
        setFilteredPosts(response.data.content);
        setTotalPages(response.data.totalPages);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    }
  };

  const applyFilters = () => {
    const filtered = posts.filter((post) =>
      post.questReward >= filters.minPrice &&
      post.questReward <= filters.maxPrice &&
      (!filters.dateFilter || new Date(post.questValidity) >= new Date(filters.dateFilter)) &&
      (post.questInstructions?.toLowerCase().includes(searchTerm.toLowerCase()) ||
        post.id.toString().includes(searchTerm))
    );
    setFilteredPosts(filtered);
  };

  useEffect(() => {
    fetchPosts(currentPage - 1); // API is likely 0-indexed
  }, [currentPage, selectedCountry]);

  useEffect(() => {
    applyFilters();
  }, [posts, filters, searchTerm]);

  return (
    <div style={{ marginTop: '100px', display: "flex", justifyContent: "center", alignItems: "center", padding: '20</Grid>px', color: 'white', marginBottom: '40px' }}>
      <Box sx={{ display: "flex", flexDirection: "column", alignItems: "center", width: "100%" }}>
        <Grid container spacing={2} sx={{ marginBottom: "20px" }}>
          <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the left */}
          <Grid item xs={12} md={9}>
            <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", width: "100%" }}>
              <Typography variant="h4" sx={{ textAlign: "left", color: 'white' }}>📦 Delivery Requests</Typography>
              <Button
                variant="outlined"
                sx={{ color: "white", borderColor: "white", "&:hover": { borderColor: "gray", backgroundColor: 'gray', color: 'white' } }}
                onClick={() => setIsCreatingPost(true)}
              >
                Create Request
              </Button>
            </Box>
          </Grid>
          <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the right */}
        </Grid>

        {/* Filter Controls */}
        <Grid container spacing={2} sx={{ marginTop: '20px' }}>
          <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the left */}
          <Grid item xs={12} md={9}>
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
          </Grid>
          <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the right */}
        </Grid>

        {/* Posts Grid */}
        <Grid container spacing={2} sx={{ marginTop: '30px' }}>
          <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the left */}
          <Grid item xs={12} md={9}>
            <Grid container spacing={2}>
              {filteredPosts.length > 0 ? (
                filteredPosts.map((post) =>
                  post ? (
                    <Grid item xs={12} md={4} key={post.productId}>
                      <PostCard
                        postData={post}
                        onAccept={handleAccept}
                        user={user}
                        postSession={{
                          questCreatorId: post.questCreatorId,
                          questId: post.id,
                        }}
                      />
                    </Grid>
                  ) : null
                )
              ) : (
                <Typography sx={{ color: 'white', textAlign: 'center', width: '100%' }}>No posts found.</Typography>
              )}
            </Grid>
          </Grid>
          <Grid item xs={12} md={1.5}></Grid> {/* Empty space on the right */}
        </Grid>

        {/* Pagination */}
        <Box mt={4}>
          <Pagination
            count={totalPages}
            page={currentPage}
            onChange={(event, value) => setCurrentPage(value)}
            color="primary"
            sx={{
              '& .MuiPaginationItem-root': {
                color: 'white',
              },
              '& .Mui-selected': {
                backgroundColor: '#90caf9 !important',
              },
            }}
          />
        </Box>
      </Box>

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
