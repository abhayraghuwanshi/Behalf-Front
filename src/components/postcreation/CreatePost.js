import { Button, Dialog, DialogActions, DialogContent, DialogTitle, MenuItem, TextField } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import axios from "axios";
import dayjs from "dayjs";
import React, { useState } from "react";
import { BACKEND_API_URL } from "../../env";
import PostService from "../../service/PostService";
import CountrySelector from '../Country/CountrySelector';
import { useAuth } from '../SignIn/AuthContext';

const packagingOptions = [
  "With Box",
  "Without Box",
  "With Bill",
  "Without Bill",
  "Fragile",
  "Gift Wrapped",
  "Sealed",
  "Eco-Friendly",
  "Original Packaging",
  "Custom Packaging",
];

const CreatePost = ({ open, handleClose, onPostCreated }) => {
  const { user } = useAuth();
  const [questInstructions, setQuestInstructions] = useState("");
  const [questValidity, setQuestValidity] = useState(dayjs().format("YYYY-MM-DD"));
  const [questReward, setQuestReward] = useState("");
  const [locationFrom, setLocationFrom] = useState("");
  const [locationFromDetail, setLocationFromDetail] = useState("");
  const [locationTo, setLocationTo] = useState("");
  const [locationToDetail, setLocationToDetail] = useState("");
  const [questCurrency, setQuestCurrency] = useState("INR");
  const [questStatus, setQuestStatus] = useState("Pending");
  const [image, setImage] = useState(null);
  const [preview, setPreview] = useState(null);
  const [selectedPackaging, setSelectedPackaging] = useState([]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      setPreview(URL.createObjectURL(file));
    }
  };

  const handleSubmit = async () => {
    if (!user) {
      alert("Login to create a post");
      return;
    }

    if (!questInstructions || !questValidity || !questReward || !locationTo) {
      alert("Please fill in all required fields.");
      return;
    }

    try {
      let imageUrl = "";
      if (image) {
        const formData = new FormData();
        formData.append("file", image);

        const uploadResponse = await axios.post(
          `${BACKEND_API_URL}/api/v1/document/quest/file`,
          formData,
          {
            headers: { "Content-Type": "multipart/form-data" },
            withCredentials: true,
          }
        );

        imageUrl = uploadResponse.data;
      }

      const post = {
        questCreatorId: user.id,
        questInstructions,
        questValidity: dayjs(questValidity).toDate(),
        questReward: parseFloat(questReward),
        locationFrom,
        locationTo,
        locationToDetail,
        locationFromDetail,
        questCurrency,
        questStatus,
        imageUrl, // Store image URL
        packagingOptions: selectedPackaging,
      };

      const response = await PostService.createPost(post);
      if (response.status === 200 || response.status === 201) {
        alert("Post created!");
        onPostCreated && onPostCreated();
        handleClose();
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    }
  };


  const inputStyles = {
    '& .MuiOutlinedInput-root': {
      '& fieldset': { borderColor: 'white' },
      '&:hover fieldset': { borderColor: 'purple' },
    },
    '& .MuiInputLabel-root': { color: 'white' },
    '& .MuiOutlinedInput-input': { color: 'white' },
  };

  return (
    <Dialog open={open} onClose={handleClose} sx={{ '& .MuiPaper-root': { backgroundColor: 'black', color: 'white' } }}>
      <DialogTitle>Create Quest</DialogTitle>
      <DialogContent>
        <TextField
          fullWidth
          label="Product Instructions"
          placeholder="Can you bring this product ..."
          value={questInstructions}
          onChange={(e) => setQuestInstructions(e.target.value)}
          margin="dense"
          multiline
          rows={4}
          sx={inputStyles}
        />

        <TextField
          fullWidth
          multiline
          label="Pickup Instructions"
          placeholder="Pickup from any Nike Store, Vietnam"
          value={locationFromDetail}
          onChange={(e) => setLocationFromDetail(e.target.value)}
          margin="dense"
          rows={2}
          sx={inputStyles}
        />

        <TextField
          fullWidth
          multiline
          label="Delivery Instruction"
          placeholder="Delivery in Aahika Apartment, Bangalore"
          value={locationToDetail}
          onChange={(e) => setLocationToDetail(e.target.value)}
          margin="dense"
          rows={2}
          sx={inputStyles}
        />

        <div style={{ display: 'flex', gap: '10px' }}>

          <TextField
            select
            fullWidth
            label="Packaging Options"
            value={selectedPackaging}
            onChange={(e) => setSelectedPackaging(e.target.value)}
            SelectProps={{
              MenuProps: {
                PaperProps: {
                  style: {
                    backgroundColor: 'black',
                    color: 'white',
                  },
                },
              },
            }}
            sx={inputStyles}
          >
            {packagingOptions.map((option) => (
              <MenuItem key={option} value={option}>
                {option}
              </MenuItem>
            ))}
          </TextField>



          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <DatePicker
              label="Quest Validity"
              value={questValidity ? dayjs(questValidity) : null}
              onChange={(newValue) => setQuestValidity(newValue ? newValue.format("YYYY-MM-DD") : "")}
              slotProps={{
                textField: {
                  fullWidth: true,
                  sx: inputStyles,
                },
              }}
            />
          </LocalizationProvider>

        </div>


        <div style={{ display: 'flex', gap: '10px' }}>

          <TextField
            fullWidth
            label="Currency"
            value={questCurrency}
            onChange={(e) => setQuestCurrency(e.target.value)}
            margin="dense"
            sx={inputStyles}
          />

          <TextField
            fullWidth
            label="Quest Reward"
            type="number"
            value={questReward}
            onChange={(e) => setQuestReward(e.target.value)}
            margin="dense"
            sx={inputStyles}
          />
        </div>
        <div style={{ display: 'flex', gap: '10px' }} >
          <CountrySelector
            selectedCountry={locationFrom}
            handleCountryChange={(e) => setLocationFrom(e.target.value)}
            inputStyles={inputStyles}
            label={"From Location"}
          />
          <CountrySelector
            selectedCountry={locationTo}
            handleCountryChange={(e) => setLocationTo(e.target.value)}
            inputStyles={inputStyles}
            label={"To Location"}
          />
        </div>


        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          style={{ marginTop: '10px', color: 'white' }}
        />
        {preview && <img src={preview} alt="Preview" style={{ marginTop: '10px', maxWidth: '100%' }} />}
      </DialogContent>
      <DialogActions>
        <Button onClick={handleClose} color="secondary">Cancel</Button>
        <Button onClick={handleSubmit} color="primary" variant="contained">Submit</Button>
      </DialogActions>
    </Dialog>
  );
};

export default CreatePost;