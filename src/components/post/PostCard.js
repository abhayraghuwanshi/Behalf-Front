import TruckIcon from '@mui/icons-material/LocalShipping'; // Import a truck icon
import ShareIcon from '@mui/icons-material/Share';
import { Avatar, Box, Card, MenuItem, Select, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import React, { useState } from 'react';
import './PostList.css';

const Post = ({ postSession, allIds, onAccept, user, postData }) => {
  const [isReferExpanded, setIsReferExpanded] = useState(false);
  const [questMessage, setQuestMessage] = useState("");
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [selectedReferId, setSelectedReferId] = useState("");

  const openInterestedDialog = () => setIsPopUpOpen(true);
  const closeInterestedDialog = () => { setIsPopUpOpen(false); setQuestMessage(""); }
  const openReferDialog = () => setIsReferExpanded(true);
  const closeReferDialog = () => { setIsReferExpanded(false); setQuestMessage(""); setSelectedReferId("") }

  const handleAccept = () => {
    if (user == null) {
      alert("Signin To accept")
      return;
    }
    if (!onAccept) {
      console.error("onAccept function is missing");
      return;
    }
    if (!questMessage) {
      alert("Error: Missing required questMsg");
      return;
    }
    onAccept({ ...postSession, questRequestMsg: questMessage, questAcceptorId: user.id }, '');
    closeInterestedDialog();
  };

  const handleRefer = async () => {
    if (user == null) {
      alert("Signin To accept")
      return;
    }
    if (!onAccept) {
      console.error("onAccept function is missing");
      return;
    }
    if (!selectedReferId) {
      alert("Please select a user to refer");
      return;
    }
    if (!questMessage) {
      alert("Please enter a message before sending");
      return;
    }
    await onAccept({ ...postSession, referId: selectedReferId, referedFirst: true }, questMessage);
    closeReferDialog();
  };

  const handleShare = () => {
    const shareUrl = `${window.location.origin}/post/${postData.id}`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Share link copied to clipboard!");
    });
  };

  return (
    <Card sx={{
      width: '42vw',
      padding: 2,
      margin: 2,
      border: '1px #90caf9 solid',
      backgroundColor: "transparent",
      // boxShadow: "none",
      display: 'flex', // Use flexbox for layout
      alignItems: 'flex-start', // Align items to the top
    }}>
      {/* Left side: Image/Icon */}
      <Box sx={{ marginRight: 2, display: 'flex', justifyContent: 'center', alignItems: 'center', minWidth: 60 }}>
        <Avatar sx={{ bgcolor: 'white', color: 'black' }}>
          <TruckIcon />
        </Avatar>
      </Box>

      {/* Right side: Content */}
      <Box sx={{ flexGrow: 1, textAlign: 'left' }}>
        <Typography variant="body1" gutterBottom sx={{ color: "white", cursor: "auto", fontWeight: 'bold' }}>
          {postData.questInstructions}
        </Typography>

        <Typography variant="body2" sx={{ color: "white", cursor: "auto" }}>
          Author: {postData.questCreatorId}
        </Typography>

        <Typography variant="body2" sx={{ color: "white", cursor: "auto" }}>
          Created: {new Date(postData.creationTimestamp).toLocaleDateString()}
        </Typography>

        <Typography variant="body2" sx={{ color: "white", cursor: "auto" }}>
          Reward: {postData.questReward} rupees
        </Typography>

        <Typography variant="body2" sx={{ color: "white", cursor: "auto" }}>
          {/* <AccessTimeIcon sx={{ color: "white", fontSize: 'inherit', marginRight: '4px' }} /> */}
          Valid for: {postData.questValidity} days
        </Typography>

        <Box display="flex" justifyContent="flex-start" gap={1} mt={2}>
          <Button
            variant="outlined"
            sx={{
              color: "purple",
              borderColor: "purple",
              "&:hover": { borderColor: "gray" },
            }}
            onClick={openInterestedDialog}
          >
            Interested
          </Button>
          <Button onClick={handleShare} variant="outlined"
            sx={{
              color: "purple",
              borderColor: "purple",
              "&:hover": { borderColor: "gray" },
            }}>

            Share
            <ShareIcon sx={{ marginLeft: '5px' }} />
          </Button>
        </Box>
      </Box>

      {/* Dialogs (Popups) */}
      <Dialog
        open={isPopUpOpen}
        onClose={closeInterestedDialog}
        fullWidth
        maxWidth="sm"
        sx={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          "& .MuiPaper-root": {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
            overflowY: "hidden",
            width: "100vw"
          }
        }}
      >
        <DialogContent sx={{ maxHeight: "none", overflow: "hidden" }}>
          <Typography variant="h5" sx={{ color: "white" }}>
            {postData.questInstructions}
          </Typography>
          <input
            type="text"
            value={questMessage}
            onChange={(e) => setQuestMessage(e.target.value)}
            placeholder="Enter Message"
            required
            style={{
              backgroundColor: "black",
              color: "white",
              border: "1px solid white",
              padding: "8px",
              width: "100%",
            }}
          />
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={handleAccept} sx={{ color: "white" }}>
            Send
          </Button>
          <Button onClick={closeInterestedDialog} sx={{ color: "white" }}>
            Close
          </Button>
        </DialogActions>
      </Dialog>

      <Dialog open={isReferExpanded} onClose={closeReferDialog} fullWidth maxWidth="sm"
        sx={{ "& .MuiPaper-root": { backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(5px)" } }}>
        <DialogContent>
          <Select
            value={selectedReferId}
            onChange={(e) => setSelectedReferId(e.target.value)}
            displayEmpty
            fullWidth
            sx={{ color: "white", border: "1px solid white" }}
          >
            <MenuItem value="" disabled>Select a User</MenuItem>
            {Object.values(allIds).map((user) => (
              <MenuItem key={user.id} value={user.id}>{user.firstName} {user.lastName}</MenuItem>
            ))}
          </Select>
          <input
            type="text"
            value={questMessage}
            onChange={(e) => setQuestMessage(e.target.value)}
            placeholder="Enter Message"
            required
            style={{
              backgroundColor: "transparent",
              color: "white",
              border: "1px solid white",
              padding: "8px",
              width: "100%"
            }}
            default="I am refering you"
          />
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={handleRefer} sx={{ color: "white" }}>Send</Button>
          <Button onClick={closeReferDialog} sx={{ color: "white" }}>Close</Button>
        </DialogActions>
      </Dialog>
    </Card >
  );
};

export default Post;