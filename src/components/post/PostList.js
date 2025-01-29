import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import dayjs from "dayjs";
import React, { useEffect, useState } from "react";
import PostService from "../../service/PostService";
import { useAuth } from '../SignIn/AuthContext';
import Post from "./PostCard";
import "./PostList.css";

const PostList = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [minPrice, setMinPrice] = useState(0);
  const [maxPrice, setMaxPrice] = useState(10000);
  const [dateFilter, setDateFilter] = useState("");
  const [categoryFilter, setCategoryFilter] = useState("");

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

  const handleAccept = async (post, message) => {
    if (!user || !user.id) {
      return;
    }

    console.log("Post data:", post);  // ✅ Debugging step

    if (!post.questCreatorId || !post.id) {
      console.error("Missing questCreatorId or questId", post);
      alert("Error: Missing required fields");
      return;
    }

    const postAgreement = {
      questCreatorId: post.questCreatorId,
      questId: post.id,
      questStatus: "PENDING",
      questAcceptorId: user.id,
      questRequestMsg: message
    };

    try {
      const response = await PostService.agreePost(postAgreement);
      if (response.status === 200 || response.status === 201) {
        alert("Agreement created!");
      }
    } catch (error) {
      console.error("Error creating agreement:", error);
      alert("Failed to create agreement");
    }
  };


  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await PostService.getPosts();
        if (response.status === 200) {
          console.log("API Data:", response.data); // Debugging
          setPosts(response.data);
          setFilteredPosts(response.data);
        } else {
          console.error("Failed to fetch posts. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching posts:", error);
      }
    };

    fetchPosts();
  }, []);

  useEffect(() => {
    const filtered = posts.filter(
      (post) =>
        post.questReward >= minPrice &&
        post.questReward <= maxPrice &&
        (!dateFilter || new Date(post.date) >= new Date(dateFilter)) &&
        (!categoryFilter || post.questLabel === categoryFilter)
    );
    setFilteredPosts(filtered);
  }, [posts, minPrice, maxPrice, dateFilter, categoryFilter]);

  return (
    <div className="post-list-layout">
      <div className="filter-controls">
        <h3>Filters</h3>
        <div className="filter-row">
          <div className="filter-item">
            <label>
              Min Price:
              <input
                type="number"
                value={minPrice}
                onChange={(e) => setMinPrice(Number(e.target.value))}
              />
            </label>
          </div>
          <div className="filter-item">
            <label>
              Max Price:
              <input
                type="number"
                value={maxPrice}
                onChange={(e) => setMaxPrice(Number(e.target.value))}
              />
            </label>
          </div>
          <div className="filter-item">
            <LocalizationProvider dateAdapter={AdapterDayjs}>
              <DemoContainer components={["DatePicker"]}>
                <DatePicker
                  label="Post Date"
                  value={dateFilter ? dayjs(dateFilter) : null}
                  onChange={(newValue) =>
                    setDateFilter(newValue ? newValue.toISOString() : "")
                  }
                />
              </DemoContainer>
            </LocalizationProvider>
          </div>
          <div className="filter-item">
            <label>
              Category:
              <select
                value={categoryFilter}
                onChange={(e) => setCategoryFilter(e.target.value)}
              >
                <option value="">All Categories</option>
                {dropDownOptions.map((option) => (
                  <option key={option} value={option}>
                    {option}
                  </option>
                ))}
              </select>
            </label>
          </div>
          <button className="apply-filter-button" onClick={() => { }}>
            Apply Filters
          </button>
        </div>
      </div>


      <div className="post-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id} className="post-card">
              <Post postData={post} onAccept={(postData, message) => handleAccept(postData, message)} />
            </div>
          ))
        ) : (
          <p>No posts found.</p>
        )}
      </div>
    </div>
  );
};

export default PostList;
