import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import React, { useState } from 'react';
import './PostList.css';

const bull = (
  <Box
    component="span"
    sx={{ display: 'inline-block', mx: '2px', transform: 'scale(0.8)' }}
  >
    •
  </Box>
);

const Post = ({ postData, onAccept }) => {
  const [isExpanded, setIsExpanded] = useState(false);
  const [questMessage, setQuestMessage] = useState("");
  const toggleDescription = () => {
    setIsExpanded(!isExpanded);
  };

  const [isPopUpOpen, setIsPopUpOpen] = React.useState(false);

  const openInterestedDialog = () => {
    setIsPopUpOpen(true);
  };

  const closeInterestedDialog = () => {
    setIsPopUpOpen(false);
  };

  const handleAccept = () => {
    if (!questMessage) {

      alert("Error: Missing required questMsg");
      return;
    }
    onAccept(postData, questMessage); // ✅ Pass questMessage from state
    closeInterestedDialog(); // Close popup after sending
  };

  return (
    <div>
      <div>
        <div>
          <div>
            {postData.questInstructions}
          </div>
          <div>
            {postData.questReward} rupee
            <br />
            {postData.questValidity}
          </div>
          <div>{postData.questLabel}</div>
        </div>
      </div>

      <Button onClick={openInterestedDialog} >Interested</Button>

      <Dialog open={isPopUpOpen} onClose={closeInterestedDialog} fullWidth maxWidth="sm">
        <DialogContent>

          <div>
            <input
              type="text"
              value={questMessage}
              onChange={(e) => setQuestMessage(e.target.value)}
              placeholder="Enter Message"
              required
            />
          </div>

        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={handleAccept}>Send</Button>
          <Button onClick={closeInterestedDialog}>Close</Button>
        </DialogActions>
      </Dialog>

    </div >
  );
};

export default Post;
