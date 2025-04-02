import ArrowForwardIcon from '@mui/icons-material/ArrowForward';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ShareIcon from '@mui/icons-material/Share';
import ShoppingBagIcon from '@mui/icons-material/ShoppingBag';
import { Avatar, Box, Card, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import Stack from '@mui/material/Stack';
import React, { useEffect, useState } from 'react';
import imageService from "../../service/FileService";
import './PostList.css';


const Post = ({ postSession, onAccept, user, postData }) => {
  const [isReferExpanded, setIsReferExpanded] = useState(false);
  const [questMessage, setQuestMessage] = useState("");
  const [isPopUpOpen, setIsPopUpOpen] = useState(false);
  const [selectedReferId, setSelectedReferId] = useState("");
  const [imageUrl, setImageUrl] = useState("");

  useEffect(() => {
    const fetchImage = async () => {
      if (postData.imageUrl) {
        const [bucketName, imageId] = postData.imageUrl.split('/');
        try {
          const fetchedImageUrl = await imageService.fetchImage(`${bucketName}/file/${imageId}`);
          setImageUrl(fetchedImageUrl);
        } catch (error) {
          console.error("Error fetching image:", error);
        }
      }
    };

    fetchImage();

    // Cleanup to release memory
    return () => {
      if (imageUrl) {
        imageService.releaseImage(imageUrl);
      }
    };
  }, [postData.imageUrl]);

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
    onAccept({ ...postSession, questRequestMsg: questMessage, questAcceptorId: user.id, questStatus: 'PENDING' }, '');
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

  const viewDetail = (id) => {
    const shareUrl = `${window.location.origin}/post/id`;
    navigator.clipboard.writeText(shareUrl).then(() => {
      alert("Share link copied to clipboard!");
    });
  };

  return (
    <Card sx={{
      width: "300px",
      padding: 2,
      marginBottom: 2,
      border: "1px solid #333",
      borderRadius: "12px",
      backgroundColor: "#1E1E1E", // Black background
      boxShadow: "0 4px 8px rgba(0, 0, 0, 0.5)",
      transition: "transform 0.2s, box-shadow 0.2s",
      cursor: "pointer",
      color: "#ffffff", // White text
      "&:hover": {
        transform: "translateY(-4px)",
        boxShadow: "0 8px 16px rgba(0, 0, 0, 0.7)"
      }
    }}>

      <Stack direction="row" spacing={1} sx={{ justifyContent: 'center', marginBottom: '10px' }}>
        <Chip label={postData.locationTo} color="primary" />
        <ArrowForwardIcon />
        <Chip label={postData.locationFrom} color="success" />
      </Stack>


      {/* Image Section */}
      <Box sx={{ textAlign: "center", marginBottom: 2 }}>
        {imageUrl ? (
          <img
            src={imageUrl}
            alt="Quest"
            style={{ width: '100%', height: '200px', borderRadius: '8px', objectFit: 'cover' }}
          />
        ) : (
          <Avatar sx={{ bgcolor: '#333', color: '#ffffff', width: '100%', height: '200px', fontSize: "2rem" }}>
            <ShoppingBagIcon sx={{ height: '100px', width: '100%' }} /> {/* Default icon */}
          </Avatar>
        )}
      </Box>

      {/* Content Section */}
      <Box sx={{ textAlign: 'left' }}>
        <Typography variant="h6" gutterBottom sx={{ color: "#ffffff", fontWeight: 'bold' }}>
          {postData.questInstructions}
        </Typography>


        <Typography variant="h6" sx={{ color: "#ffffff", fontWeight: 'bold', marginTop: 1 }}>
          Reward: {postData.questReward} {postData.questCurrency}
        </Typography>
      </Box>

      {/* Action Buttons */}
      <Box display="flex" justifyContent="space-between" mt={2}>
        <Button
          sx={{
            color: "#ffffff",
            backgroundColor: "#333",
            "&:hover": { backgroundColor: "#555" },
          }}
          onClick={openInterestedDialog}
        >
          <FavoriteIcon sx={{ paddingRight: "5px" }} />
          Interested
        </Button>
        <Button
          sx={{
            color: "#ffffff",
            backgroundColor: "#333",
            "&:hover": { backgroundColor: "#555" },
          }}
          onClick={handleShare}
        >
          Share
          <ShareIcon sx={{ marginLeft: '5px' }} />
        </Button>

        <Button onClick={() => window.location.href = `/post/${postData.id}`}
          sx={{
            color: "white",
            backgroundColor: "#4d4d4d",
            "&:hover": { borderColor: "gray" },
          }}>
          Details
        </Button>
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
    </Card >
  );
};

export default Post;