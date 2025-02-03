import AccessTimeIcon from '@mui/icons-material/AccessTime';
import AttachMoneyIcon from '@mui/icons-material/AttachMoney';
import { Box, Card, Chip, MenuItem, Select, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import React, { useState } from 'react';
import { AwesomeButton } from "react-awesome-button";
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
    console.log({ ...postSession, referId: selectedReferId, questStatus: 'REFFERED', referMessage: questMessage })

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

    console.log("Refer Details:", {
      referId: selectedReferId,
      questMessage,
    });

    await onAccept({ ...postSession, referId: selectedReferId, referedFirst: true }, questMessage);
    console.log("finish")
    closeReferDialog();
  };


  return (
    // <Tilt tiltMaxAngleX={10} tiltMaxAngleY={10} perspective={1000}>
    <Card sx={{
      maxWidth: 400,
      padding: 2,
      margin: 2,
      textAlign: 'center',
      border: '1px white solid',
      backgroundColor: "transparent",
      boxShadow: "none"
    }}>
      <Typography variant="body1" gutterBottom sx={{ color: "white" }}>
        {postData.questInstructions}
      </Typography>

      <Typography variant="body2" sx={{ color: "white" }}>
        <AttachMoneyIcon sx={{ color: "white" }} /> {postData.questReward} rupees
      </Typography>
      <Typography variant="body2" sx={{ color: "white" }}>
        <AccessTimeIcon sx={{ color: "white" }} /> {postData.questValidity} days
      </Typography>
      <Chip label={postData.questLabel} variant="outlined" sx={{ mt: 1, color: "white", borderColor: "white" }} />

      <Box display="flex" justifyContent="center" gap={2} mt={2}>
        <AwesomeButton onPress={openInterestedDialog}>Interested</AwesomeButton>
        <AwesomeButton onPress={openReferDialog}>Refer a Friend</AwesomeButton>
      </Box>

      <Dialog open={isPopUpOpen} onClose={closeInterestedDialog} fullWidth maxWidth="sm"
        sx={{ "& .MuiPaper-root": { backgroundColor: "rgba(0, 0, 0, 0.5)", backdropFilter: "blur(5px)" } }}>
        <DialogContent>
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
        </DialogContent>
        <DialogActions>
          <Button size="small" onClick={handleAccept} sx={{ color: "white" }}>Send</Button>
          <Button onClick={closeInterestedDialog} sx={{ color: "white" }}>Close</Button>
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
    </Card>
    // </Tilt>
  );
};

export default Post;
