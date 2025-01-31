import { Card, CardContent, Chip, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import React, { useState } from 'react';
import './PostList.css';


const Post = ({ postData, allIds, onAccept }) => {
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
    <Card variant="outlined" sx={{ maxWidth: 400, padding: 2, margin: 2, textAlign: 'center' }}>
      <CardContent>
        {/* <Typography variant="h6" gutterBottom>
          Creator ID: {postData.questCreatorId}
          {allIds[postData?.questCreatorId]?.email || "Email not found"}
        </Typography> */}

        <Typography variant="body1" gutterBottom>
          {postData.questInstructions}
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Reward: {postData.questReward} rupees
        </Typography>
        <Typography variant="body2" color="textSecondary">
          Validity: {postData.questValidity} days
        </Typography>
        <Chip label={postData.questLabel} variant="outlined" sx={{ mt: 1 }} />
      </CardContent>

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
    </Card>
  );
};

export default Post;
