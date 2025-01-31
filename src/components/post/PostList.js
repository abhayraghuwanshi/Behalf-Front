import React, { useEffect, useState } from "react";
import PostService from "../../service/PostService";
import ProfileService from "../../service/ProfileService";
import { useAuth } from "../SignIn/AuthContext";
import Post from "./PostCard"; // Assuming you have a Post component for displaying individual posts
import FilterControls from "./PostFilter";
import "./PostList.css";

const PostList = () => {
  const { user } = useAuth();
  const [posts, setPosts] = useState([]);
  const [filteredPosts, setFilteredPosts] = useState([]);
  const [allIds, setAllIds] = useState({}); // Initially empty
  const [userMap, setUserMap] = useState({}); // Initially empty
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

    console.log("Post data:", post); // ✅ Debugging step

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
      questRequestMsg: message,
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

          // Extract all unique questCreatorIds
          const creatorIds = [...new Set(response.data.map((post) => post.questCreatorId))];
          setAllIds(creatorIds); // ✅ Store only unique IDs
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
    const l = Object.keys(allIds).length;
    if (l === 0) return; // Skip if no IDs available

    const fetchPostByEmail = async () => {
      console.log("User userid:", allIds); // Debugging
      try {
        if (l === 0) return;
        const response = await ProfileService.fetchUserByEmail(allIds);
        if (response.status === 200) {
          console.log("User Info:", response); // Debugging

          setUserMap(response.data); // ✅ Now `allIds` is { questCreatorId: UserInformation }
          console.log("User map - ", response.data);
        } else {
          console.error("Failed to fetch user info. Status:", response.status);
        }
      } catch (error) {
        console.error("Error fetching user info:", error);
      }
    };

    fetchPostByEmail();
  }, [allIds]); // Fetch only when `allIds` updates


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
    <div>
      <FilterControls
        minPrice={minPrice}
        maxPrice={maxPrice}
        dateFilter={dateFilter}
        categoryFilter={categoryFilter}
        setMinPrice={setMinPrice}
        setMaxPrice={setMaxPrice}
        setDateFilter={setDateFilter}
        setCategoryFilter={setCategoryFilter}
        dropDownOptions={dropDownOptions}
      />

      <div className="post-grid">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
            <div key={post.id}>
              <Post
                postData={post}
                ids={userMap}
                onAccept={(postData, message) => handleAccept(postData, message)}
              />
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
