const BASE_API = "http://localhost:3000/api";


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




export async function getTeas() {
  try {
    const response = await fetch(`${BASE_API}/teas`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    const teas = await response.json();
    console.log("Fetched teas:", teas);
    return teas;
  } catch (err) {
    console.error("Error fetching teas:", err);
    return [];
  }
}


export async function getTeaById(teaId) {
  try {
    const response = await fetch(`${BASE_API}/teas/${teaId}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    return await response.json();
  } catch (err) {
    console.error(`Error fetching tea ${teaId}:`, err);
  }
}


export async function addTea(tea) {
  try {
    const response = await fetch(`${BASE_API}/teas`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(tea),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    return await response.json();
  } catch (err) {
    console.error("Error adding tea:", err);
  }
}


export async function deleteTea(teaId) {
  try {
    const response = await fetch(`${BASE_API}/teas/${teaId}`, {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);
    return await response.json();
  } catch (err) {
    console.error("Error deleting tea:", err);
  }
}


export async function getReviews(teaId) {
  try {
    const response = await fetch(`${BASE_API}/reviews/${teaId}`);
    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    return await response.json();
  } catch (err) {
    console.error(`Error fetching reviews for tea ${teaId}:`, err);
    return [];
  }
}


export async function addReview(token, teaId, rating, comment) {
  try {
    const response = await fetch(`${BASE_API}/reviews`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({ tea_id: teaId, rating, comment }),
    });

    if (!response.ok) throw new Error(`HTTP error! Status: ${response.status}`);

    return await response.json();
  } catch (err) {
    console.error("Error adding review:", err);
  }
}

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
