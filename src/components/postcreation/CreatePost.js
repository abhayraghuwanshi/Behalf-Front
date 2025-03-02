import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import dayjs from "dayjs";
import React, { useState } from "react";
import PostService from "../../service/PostService"; // Assuming this handles the API call for creating the post
import { useAuth } from '../SignIn/AuthContext';

const CreatePost = ({ open, handleClose, onPostCreated }) => {
  const { user } = useAuth();
  const [questInstructions, setQuestInstructions] = useState("");
  const [questValidity, setQuestValidity] = useState(dayjs().format("DD-MM-YYYY"));
  const [questReward, setQuestReward] = useState("");

  const handleSubmit = async () => {
    if (!user) {
      alert("Login to create a post");
      return;
    }

    if (!questInstructions || !questValidity || !questReward) {
      alert("Please fill in all fields.");
      return;
    }

    const post = {
      questCreatorId: user.id,
      questInstructions,
      questValidity: dayjs(questValidity, "DD-MM-YYYY").toDate(),
      questReward: parseFloat(questReward),
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
          InputProps={{ sx: { color: "white" } }}
          InputLabelProps={{ sx: { color: "white" } }}
          sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" }, "&:hover fieldset": { borderColor: "blue" } } }}
        />
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <DatePicker
            label="Post Date"
            value={questValidity ? dayjs(questValidity, "DD-MM-YYYY") : null}
            onChange={(newValue) => setQuestValidity(newValue ? newValue.format("DD-MM-YYYY") : "")}
            slotProps={{
              textField: {
                fullWidth: true,
                InputProps: { sx: { color: "white" } },
                InputLabelProps: { sx: { color: "white" } },
                sx: {
                  "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" }, "&:hover fieldset": { borderColor: "blue" } },
                  "& .MuiSvgIcon-root": { color: "white" }, // Calendar icon color
                },
              },
            }}
          />
        </LocalizationProvider>
        <TextField
          fullWidth
          label="Quest Reward (₹)"
          name="questReward"
          type="number"
          value={questReward}
          onChange={(e) => setQuestReward(e.target.value)}
          margin="dense"
          InputProps={{ sx: { color: "white" } }}
          InputLabelProps={{ sx: { color: "white" } }}
          sx={{ "& .MuiOutlinedInput-root": { "& fieldset": { borderColor: "white" }, "&:hover fieldset": { borderColor: "blue" } } }}
        />
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary" sx={{ color: 'white' }}>Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained" sx={{ color: 'white', backgroundColor: 'purple' }}>Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePost;
