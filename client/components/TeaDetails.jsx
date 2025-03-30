import React, { useState, useEffect, useContext } from "react";
import { useParams } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import ReviewForm from "./ReviewForm";
import { getTeaById, getReviews } from "../api"; // adjust path if needed

const TeaDetails = () => {
  const { id } = useParams();
  const { user } = useContext(AuthContext);
  const [tea, setTea] = useState(null);
  const [reviews, setReviews] = useState([]);

  useEffect(() => {
    async function fetchTeaData() {
      const teaData = await getTeaById(id);
      const reviewData = await getReviews(id);
      setTea(teaData);
      setReviews(reviewData);
    }

    fetchTeaData();
  }, [id]);

  return (
    <div>
      {tea && (
        <>
          <h1>{tea.name}</h1>
          <img src={tea.image_url} alt={tea.name} style={{ width: "200px" }} />
          <p>{tea.description}</p>
          <p><strong>Price:</strong> ${tea.price}</p>
          <p><strong>Category:</strong> {tea.category}</p>

          <h2>Reviews</h2>
          {reviews.length === 0 ? (
            <p>No reviews yet</p>
          ) : (
            <ul>
              {reviews.map((review) => (
                <li key={review.id}>
                  <p>Rating: {review.rating} ⭐</p>
                  <p>{review.comment}</p>
                </li>
              ))}
            </ul>
          )}

          {user && (
            <ReviewForm teaId={id} setReviews={setReviews} />
          )}
        </>
      )}
    </div>
  );
};

export default TeaDetails;
