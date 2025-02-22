import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import React, { useState } from "react";
import PostService from "../../service/PostService"; // Assuming this handles the API call for creating the post
import { useAuth } from '../SignIn/AuthContext';

const CreatePost = ({ open, handleClose, onPostCreated }) => {
  const { user } = useAuth();
  const [questInstructions, setQuestInstructions] = useState("");
  const [questValidity, setQuestValidity] = useState("");
  const [questReward, setQuestReward] = useState("");
  const [questLabel, setQuestLabel] = useState(""); // Default empty category

  const dropDownOptions = [
    "PICKUP_DELIVERY",
  ];

  const handleSubmit = async () => {
    if (!user) {
      alert("Login to create a post");
      return;
    }

    if (!questInstructions || !questValidity || !questReward || !questLabel) {
      alert("Please fill in all fields.");
      return;
    }

    const post = {
      questCreatorId: user.id,
      questInstructions,
      questValidity,
      questReward: parseFloat(questReward),
      questLabel, // Added category
    };

    try {
      const response = await PostService.createPost(post);
      if (response.status === 200 || response.status === 201) {
        alert("Post created!");
        onPostCreated && onPostCreated(); // Optional callback
        handleClose();
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    }
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': { backgroundColor: 'black', color: 'white' } }}>
      <DialogTitle sx={{ color: 'white' }}>Create Quest</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Quest Instructions"
          name="questInstructions"
          value={questInstructions}
          onChange={(e) => setQuestInstructions(e.target.value)}
          margin="dense"
          multiline
          rows={4}
          sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white' } }}
        />
        <TextField
          fullWidth
          label="Quest Validity"
          name="questValidity"
          value={questValidity}
          onChange={(e) => setQuestValidity(e.target.value)}
          margin="dense"
          sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white' } }}
        />
        <TextField
          fullWidth
          label="Quest Reward (₹)"
          name="questReward"
          type="number"
          value={questReward}
          onChange={(e) => setQuestReward(e.target.value)}
          margin="dense"
          sx={{ '& .MuiInputLabel-root': { color: 'white' }, '& .MuiOutlinedInput-root': { color: 'white' } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" sx={{ color: 'white' }}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" sx={{ color: 'white' }}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePost;
