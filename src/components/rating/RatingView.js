import axios from "axios";
import { useEffect, useState } from "react";

const API_BASE_URL = "http://localhost:8080/public/api/ratings"; // update your backend URL

const RatingView = ({ userId }) => {
    const [loading, setLoading] = useState(true);
    const [ratingData, setRatingData] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchRatings = async () => {
            try {
                setLoading(true);
                const res = await axios.get(`${API_BASE_URL}`); // include userType
                setRatingData(res.data);
            } catch (err) {
                setError(err.response?.data || err.message);
            } finally {
                setLoading(false);
            }
        };

        if (userId) {
            fetchRatings();
        }
    }, [userId]);

    if (loading) return <p>Loading ratings...</p>;
    if (error) return <p style={{ color: "red" }}>Error: {error}</p>;

    // Support both API shape and direct array
    if (Array.isArray(ratingData)) {
        return (
            <div style={{ maxWidth: 600, margin: "32px auto", padding: 24, background: "#181818", border: "1px solid #333", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.25)", fontFamily: 'Amazon Ember, Arial, sans-serif', color: '#fff' }}>
                <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: 16 }}>User Ratings</h2>
                {ratingData.map((entry) => (
                    <div key={entry.id} style={{ marginBottom: 32, borderBottom: '1px solid #333', paddingBottom: 16 }}>
                        <div style={{ display: 'flex', alignItems: 'center', marginBottom: 8 }}>
                            <span style={{ color: '#bbb', fontWeight: 600, marginRight: 16 }}>User Type: {entry.userType}</span>
                            <span style={{ color: '#aaa', fontSize: 13 }}>Rated on: {new Date(entry.createdAt).toLocaleString()}</span>
                        </div>
                        <ul style={{ listStyleType: "none", paddingLeft: 0, marginBottom: 0 }}>
                            {entry.ratingDetails.map((detail) => (
                                <li key={detail.id} style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
                                    <span style={{ minWidth: 120, color: '#fff', fontWeight: 500 }}>{detail.category.charAt(0).toUpperCase() + detail.category.slice(1)}:</span>
                                    <span style={{ marginLeft: 8, fontWeight: 700, color: '#ff9900', fontSize: 18, letterSpacing: 1 }}>
                                        {Array.from({ length: 5 }).map((_, i) => (
                                            <span key={i} style={{ color: i < detail.score ? '#ff9900' : '#333', fontSize: 20, marginRight: 1 }}>★</span>
                                        ))}
                                    </span>
                                    <span style={{ marginLeft: 12, color: '#fff', fontWeight: 500 }}>{detail.score} / 5</span>
                                </li>
                            ))}
                        </ul>
                        {entry.ratingDetails.some(d => d.comment) ? (
                            <div style={{ marginTop: 8, marginLeft: 8, color: '#90caf9', fontStyle: 'italic', fontSize: 15 }}>
                                {entry.ratingDetails.filter(d => d.comment).map((d, idx) => (
                                    <div key={idx} style={{ marginBottom: 4 }}>&quot;{d.comment}&quot;</div>
                                ))}
                            </div>
                        ) : null}
                    </div>
                ))}
            </div>
        );
    }

    if (!ratingData || ratingData.ratingsCount === 0) {
        return <p style={{ color: '#fff', background: '#181818', padding: 16, borderRadius: 8, textAlign: 'center' }}>No ratings available for this user yet.</p>;
    }

    const { averageScores, ratingsCount, recentFeedback } = ratingData;

    return (
        <div style={{ maxWidth: 600, margin: "32px auto", padding: 24, background: "#181818", border: "1px solid #333", borderRadius: 12, boxShadow: "0 2px 8px rgba(0,0,0,0.25)", fontFamily: 'Amazon Ember, Arial, sans-serif', color: '#fff' }}>
            <h2 style={{ color: '#fff', fontWeight: 700, marginBottom: 16 }}>User Ratings</h2>
            <p style={{ color: '#fff', fontWeight: 500, fontSize: 16 }}>Total ratings: {ratingsCount}</p>
            <div style={{ marginBottom: 20 }}>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: 8 }}>Average Scores</h4>
                {averageScores ? (
                    <ul style={{ listStyleType: "none", paddingLeft: 0, marginBottom: 0 }}>
                        {Object.entries(averageScores).map(([category, avgScore]) => (
                            <li key={category} style={{ marginBottom: 10, display: 'flex', alignItems: 'center' }}>
                                <span style={{ minWidth: 120, color: '#fff', fontWeight: 500 }}>{category.charAt(0).toUpperCase() + category.slice(1)}:</span>
                                <span style={{ marginLeft: 8, fontWeight: 700, color: '#ff9900', fontSize: 18, letterSpacing: 1 }}>
                                    {Array.from({ length: 5 }).map((_, i) => (
                                        <span key={i} style={{ color: i < Math.round(avgScore) ? '#ff9900' : '#333', fontSize: 20, marginRight: 1 }}>★</span>
                                    ))}
                                </span>
                                <span style={{ marginLeft: 12, color: '#fff', fontWeight: 500 }}>{avgScore.toFixed(2)} / 5</span>
                            </li>
                        ))}
                    </ul>
                ) : (
                    <p style={{ color: '#bbb' }}>No ratings yet.</p>
                )}
            </div>
            <div>
                <h4 style={{ color: '#fff', fontWeight: 600, marginBottom: 8 }}>Recent Feedback</h4>
                <ul style={{ paddingLeft: 0, listStyleType: 'none' }}>
                    {recentFeedback && recentFeedback.length > 0 ? (
                        recentFeedback.map((feedback, index) => (
                            <li key={index} style={{ color: '#90caf9', fontStyle: 'italic', marginBottom: 6 }}>
                                &quot;{feedback.comment}&quot;
                            </li>
                        ))
                    ) : (
                        <li><p style={{ color: '#bbb' }}>No feedback yet.</p></li>
                    )}
                </ul>
            </div>
        </div>
    );
};

export default RatingView;
