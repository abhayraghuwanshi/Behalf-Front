import React, { useState } from "react";
import PostService from "../../service/PostService"; // Assuming this handles the API call for creating the post
import { useAuth } from '../SignIn/AuthContext';

const CreatePost = ({ onPostCreated }) => {
  const { user } = useAuth();
  const [questInstructions, setQuestInstructions] = useState("");
  const [questValidity, setQuestValidity] = useState("");
  const [questReward, setQuestReward] = useState("");
  const [questLabel, setQuestLabel] = useState(""); // Default empty category

  const dropDownOptions = [
    "PICKUP_DELIVERY",
  ];

  const handleSubmit = async (event) => {
    event.preventDefault();

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
      }
    } catch (error) {
      console.error("Error creating post:", error);
      alert("Failed to create post");
    }
  };

  return (
    <div style={styles.container}>
      <form onSubmit={handleSubmit} style={styles.form}>

        {/* Quest Instructions Field */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Quest Instructions</label>
          <textarea
            value={questInstructions}
            onChange={(e) => setQuestInstructions(e.target.value)}
            placeholder="Enter quest instructions"
            rows="4"
            required
            style={styles.textarea}
          />
        </div>

        {/* Quest Validity Field */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Quest Validity</label>
          <input
            type="text"
            value={questValidity}
            onChange={(e) => setQuestValidity(e.target.value)}
            placeholder="Enter validity (e.g., '30 days')"
            required
            style={styles.input}
          />
        </div>

        {/* Quest Reward Field */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Quest Reward (₹)</label>
          <input
            type="number"
            value={questReward}
            onChange={(e) => setQuestReward(e.target.value)}
            placeholder="Enter reward amount"
            required
            min="0"
            style={styles.input}
          />
        </div>

        {/* Quest Category Dropdown */}
        <div style={styles.formGroup}>
          <label style={styles.label}>Quest Category</label>
          <select
            value={questLabel}
            onChange={(e) => setQuestLabel(e.target.value)}
            required
            style={styles.select}
          >
            <option value="" disabled>Select a category</option>
            {dropDownOptions.map((option) => (
              <option key={option} value={option}>
                {option.replace("_", " ")}
              </option>
            ))}
          </select>
        </div>

        {/* Submit Button */}
        <button type="submit" style={styles.button}>
          Create Quest
        </button>
      </form>
    </div>
  );
};

// CSS-in-JS Styling
const styles = {
  container: {
    margin: "0 auto",
    padding: "20px",
    borderRadius: "8px",
    boxShadow: "0 4px 8px rgba(0, 0, 0, 0.1)",
    backgroundColor: "#000", // Match TravelRequestForm background color
    color: "#fff", // Match TravelRequestForm text color
  },
  title: {
    textAlign: "center",
    fontSize: "24px",
    fontWeight: "bold",
    marginBottom: "20px",
  },
  form: {
    display: "flex",
    flexDirection: "column",
    gap: "15px",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "14px",
    fontWeight: "bold",
    marginBottom: "5px",
    color: "#fff", // Match TravelRequestForm label color
  },
  input: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #fff", // Match TravelRequestForm border color
    fontSize: "16px",
    backgroundColor: "#000", // Match TravelRequestForm input background color
    color: "#fff", // Match TravelRequestForm input text color
  },
  textarea: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #fff", // Match TravelRequestForm border color
    fontSize: "16px",
    resize: "vertical",
    backgroundColor: "#000", // Match TravelRequestForm textarea background color
    color: "#fff", // Match TravelRequestForm textarea text color
  },
  select: {
    padding: "10px",
    borderRadius: "4px",
    border: "1px solid #fff", // Match TravelRequestForm border color
    fontSize: "16px",
    backgroundColor: "#000", // Match TravelRequestForm select background color
    color: "#fff", // Match TravelRequestForm select text color
  },
  button: {
    padding: "10px 20px",
    borderRadius: "4px",
    border: "none",
    fontSize: "16px",
    fontWeight: "bold",
    color: "#fff",
    backgroundColor: "#007BFF",
    cursor: "pointer",
    transition: "background-color 0.3s",
  },
  buttonHover: {
    backgroundColor: "#0056b3",
  },
};

export default CreatePost;
