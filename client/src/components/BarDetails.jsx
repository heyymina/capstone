import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import ReviewForm from "./ReviewForm";
import { AuthContext } from "../context/AuthContext";

const BarDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [bar, setBar] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    axios.get(`/api/bars/${id}`).then((res) => setBar(res.data));
    axios.get(`/api/reviews/${id}`).then((res) => setReviews(res.data));
  }, [id]);

  return (
    <div>
      {bar && (
        <>
          <h1>{bar.name}</h1>
          <p>{bar.location}</p>
          <p>Average Rating: {bar.average_rating || "No ratings yet"}</p>

          <h2>Reviews</h2>
          <ul>
            {reviews.map((review) => (
              <li key={review.id}>
                <p>Rating: {review.rating} ⭐</p>
                <p>{review.comment}</p>
              </li>
            ))}
          </ul>

          {user && <ReviewForm barId={id} setReviews={setReviews} />}
        </>
      )}
    </div>
  );
};

export default BarDetails;
