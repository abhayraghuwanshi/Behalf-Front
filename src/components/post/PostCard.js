import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Card, Chip, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import React, { useState } from 'react';
import { AwesomeButton } from "react-awesome-button";
import Tilt from "react-parallax-tilt";
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
    onAccept(postData, questMessage);
    closeInterestedDialog();
  };

  return (
    <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000}>
      <Card sx={{
        maxWidth: 400,
        padding: 2,
        margin: 2,
        textAlign: 'center',
        border: '1px white solid',
        backgroundColor: "transparent", // Make card transparent
        boxShadow: "none" // Remove box shadow
      }}>
        <div>
          <Typography variant="body1" gutterBottom sx={{ color: "white" }}>
            {postData.questInstructions}
          </Typography>
        </div>

        <div>
          <Typography variant="body2" sx={{ color: "white" }}>
            <AttachMoneyIcon sx={{ color: "white" }} /> {postData.questReward} rupees
          </Typography>
          <Typography variant="body2" sx={{ color: "white" }}>
            <AccessTimeIcon sx={{ color: "white" }} /> {postData.questValidity} days
          </Typography>
          <Chip label={postData.questLabel} variant="outlined" sx={{ mt: 1, color: "white", borderColor: "white" }} />
        </div>

        <AwesomeButton onPress={openInterestedDialog} >Interested</AwesomeButton>

        <Dialog open={isPopUpOpen} onClose={closeInterestedDialog} fullWidth maxWidth="sm"
          sx={{ "& .MuiPaper-root": { backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(5px)" } }}>
          <DialogContent>
            <div>
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
              />
            </div>
          </DialogContent>
          <DialogActions>
            <Button size="small" onClick={handleAccept} sx={{ color: "white" }}>Send</Button>
            <Button onClick={closeInterestedDialog} sx={{ color: "white" }}>Close</Button>
          </DialogActions>
        </Dialog>
      </Card>
    </Tilt>
  );
};

export default Post;
