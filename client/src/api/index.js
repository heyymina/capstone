const BASE_API = "http://localhost:3000/api"; 


// Get all users
export async function getUsers() {
  try {
    const response = await fetch(`${BASE_API}/users`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Error fetching users:", err);
    return [];
  }
}

// Register a new user
export async function registerUser(username, password) {
  try {
    const response = await fetch(`${BASE_API}/users/register`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Registration failed");

    return data;
  } catch (err) {
    console.error("Error registering user:", err);
    return { error: err.message };
  }
}

// Login a user
export async function loginUser(credentials) {
  try {
    const response = await fetch(`${BASE_API}/users/login`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(credentials),
    });

    const data = await response.json();
    if (!response.ok) throw new Error(data.error || "Login failed");

    return data;
  } catch (error) {
    console.error("Login failed:", error);
    return { error: error.message };
  }
}

// Delete a user (Admin functionality)
export async function deleteUser(userId) {
  try {
    const response = await fetch(`${BASE_API}/users/${userId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Error deleting user:", err);
  }
}

// ================== ROOFTOP BARS ================== //

// Get all rooftop bars
export async function getBars() {
  try {
    const response = await fetch(`${BASE_API}/bars`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const bars = await response.json();
    console.log("Fetched bars:", bars);
    return bars;
  } catch (err) {
    console.error("Error fetching bars:", err);
    return [];
  }
}

// Get a single rooftop bar by ID
export async function getBarById(barId) {
  try {
    const response = await fetch(`${BASE_API}/bars/${barId}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    return await response.json();
  } catch (err) {
    console.error(`Error fetching bar ${barId}:`, err);
  }
}

// Add a new rooftop bar (Admin functionality)
export async function addBar(bar) {
  try {
    const response = await fetch(`${BASE_API}/bars`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(bar),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    return await response.json();
  } catch (err) {
    console.error("Error adding bar:", err);
  }
}

// Delete a rooftop bar (Admin functionality)
export async function deleteBar(barId) {
  try {
    const response = await fetch(`${BASE_API}/bars/${barId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Error deleting bar:", err);
  }
}

// ================== REVIEWS ================== //

// Get reviews for a specific bar
export async function getReviews(barId) {
  try {
    const response = await fetch(`${BASE_API}/reviews/${barId}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    return await response.json();
  } catch (err) {
    console.error(`Error fetching reviews for bar ${barId}:`, err);
    return [];
  }
}

// Add a review for a rooftop bar
export async function addReview(token, barId, rating, comment) {
  try {
    const response = await fetch(`${BASE_API}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ bar_id: barId, rating, comment }),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    return await response.json();
  } catch (err) {
    console.error("Error adding review:", err);
  }
}

// Delete a review (Admin functionality)
export async function deleteReview(reviewId) {
  try {
    const response = await fetch(`${BASE_API}/reviews/${reviewId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Error deleting review:", err);
  }
}
