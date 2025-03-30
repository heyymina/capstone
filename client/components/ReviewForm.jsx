import React, { useState } from "react";
import axios from "axios";

const ReviewForm = ({ teaId, setReviews }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = async (e) => {
    e.preventDefault();

    try {
      const res = await axios.post("/api/reviews", {
        tea_id: teaId,
        rating,
        comment,
      });

      setReviews((prev) => [...prev, res.data]);
      setComment("");
      setRating(5);
    } catch (err) {
      console.error("Error submitting review:", err);
    }
  };

  return (
    <form onSubmit={submitReview}>
      <h3>Leave a Review</h3>

      <label>
        Rating (1–5):
        <input
          type="number"
          value={rating}
          min="1"
          max="5"
          onChange={(e) => setRating(Number(e.target.value))}
          required
        />
      </label>

      <label>
        Comment:
        <textarea
          value={comment}
          onChange={(e) => setComment(e.target.value)}
          placeholder="Your thoughts..."
          required
        />
      </label>

      <button type="submit">Submit</button>
    </form>
  );
};

export default ReviewForm;
