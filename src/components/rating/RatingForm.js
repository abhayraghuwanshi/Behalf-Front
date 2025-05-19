import { useState } from "react";
import ratingService from "./ratingService";

const initialRatings = {
  overall: 0,
  communication: 0,
  packaging: 0,
  payment: 0,
  punctuality: 0,
  care: 0,
  reliability: 0,
  // adjust fields based on userType (creator/traveler)
};

const RatingForm = ({ questId, userId, userType, onSuccess }) => {
  // userType = 'creator' or 'traveler'
  // questId = id of quest
  // userId = id of user being rated

  const [ratings, setRatings] = useState(initialRatings);
  const [comments, setComments] = useState({});
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  // Define categories depending on userType
  const categories = userType === "creator"
    ? ["overall", "communication", "packaging", "payment"]
    : ["overall", "punctuality", "care", "communication", "reliability"];

  const handleScoreChange = (category, value) => {
    setRatings((prev) => ({ ...prev, [category]: Number(value) }));
  };

  const handleCommentChange = (category, value) => {
    setComments((prev) => ({ ...prev, [category]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    // Build payload according to backend expectation
    const ratingDetails = categories.map((cat) => ({
      category: cat,
      score: ratings[cat] || 0,
      comment: comments[cat] || "",
    }));

    const payload = {
      questId,
      userId,
      userType,
      ratingDetails,
    };

    try {
      await ratingService.submitRating(payload);
      setLoading(false);
      onSuccess && onSuccess();
    } catch (err) {
      setError(err);
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ maxWidth: 500, margin: "auto" }}>
      <h3>Rate {userType === "creator" ? "Creator" : "Traveler"}</h3>

      {categories.map((cat) => (
        <div key={cat} style={{ marginBottom: 15 }}>
          <label>
            <strong>{cat.charAt(0).toUpperCase() + cat.slice(1)}</strong>:
            <select
              value={ratings[cat]}
              onChange={(e) => handleScoreChange(cat, e.target.value)}
              required
            >
              <option value="">Select score</option>
              {[1, 2, 3, 4, 5].map((score) => (
                <option key={score} value={score}>
                  {score}
                </option>
              ))}
            </select>
          </label>
          <br />
          <textarea
            placeholder={`Comment on ${cat} (optional)`}
            value={comments[cat] || ""}
            onChange={(e) => handleCommentChange(cat, e.target.value)}
            rows={2}
            style={{ width: "100%", marginTop: 5 }}
          />
        </div>
      ))}

      {error && (
        <div style={{ color: "red", marginBottom: 10 }}>
          Error: {typeof error === "string" ? error : JSON.stringify(error)}
        </div>
      )}

      <button type="submit" disabled={loading}>
        {loading ? "Submitting..." : "Submit Rating"}
      </button>
    </form>
  );
};

export default RatingForm;
