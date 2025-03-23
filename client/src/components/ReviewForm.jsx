import React, { useState } from "react";
import axios from "axios";

const ReviewForm = ({ barId, setReviews }) => {
  const [rating, setRating] = useState(5);
  const [comment, setComment] = useState("");

  const submitReview = async (e) => {
    e.preventDefault();
    const res = await axios.post("/api/reviews", { bar_id: barId, rating, comment });
    setReviews((prev) => [...prev, res.data]);
    setComment("");
  };

  return (
    <form onSubmit={submitReview}>
      <h3>Leave a Review</h3>
      <input type="number" value={rating} min="1" max="5" onChange={(e) => setRating(e.target.value)} />
      <textarea value={comment} onChange={(e) => setComment(e.target.value)} placeholder="Your thoughts..." />
      <button type="submit">Submit</button>
    </form>
  );
};

export default ReviewForm;
