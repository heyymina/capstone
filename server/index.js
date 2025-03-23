const express = require("express");
const path = require("path");
const pg = require("pg");
const cors = require("cors");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

const SECRET_KEY = process.env.JWT_SECRET || "secretkey";
const DATABASE_URL = process.env.DATABASE_URL || "postgres://myk814@localhost:5432/rooftop_bars_db";

const client = new pg.Client(DATABASE_URL);
const app = express();

app.use(express.json());
app.use(cors());

// Serve static files
app.use(express.static(path.join(__dirname, "../client/dist")));
app.get("/", (req, res) =>
  res.sendFile(path.join(__dirname, "../client/dist/index.html"))
);

// Middleware to verify JWT tokens
function authenticateToken(req, res, next) {
  const authHeader = req.headers.authorization;
  if (!authHeader) return res.status(401).json({ error: "Access denied" });

  const token = authHeader.split(" ")[1];
  jwt.verify(token, SECRET_KEY, (err, user) => {
    if (err) return res.status(403).json({ error: "Invalid token" });
    req.user = user;
    next();
  });
}

// ================== API ROUTES ================== //

// Get all rooftop bars
app.get("/api/bars", async (req, res, next) => {
  try {
    const SQL = `SELECT * FROM rooftop_bars;`;
    const response = await client.query(SQL);
    res.json(response.rows);
  } catch (error) {
    next(error);
  }
});

// Get a single rooftop bar by ID
app.get("/api/bars/:id", async (req, res, next) => {
  try {
    const { id } = req.params;
    const SQL = `SELECT * FROM rooftop_bars WHERE id = $1;`;
    const response = await client.query(SQL, [id]);
    res.json(response.rows[0]);
  } catch (error) {
    next(error);
  }
});

// Get reviews for a rooftop bar
app.get("/api/reviews/:bar_id", async (req, res, next) => {
  try {
    const { bar_id } = req.params;
    const SQL = `SELECT * FROM reviews WHERE bar_id = $1;`;
    const response = await client.query(SQL, [bar_id]);
    res.json(response.rows);
  } catch (error) {
    next(error);
  }
});

// Register user
app.post("/api/users/register", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const hashedPassword = await bcrypt.hash(password, 10);
    const SQL = `INSERT INTO users(username, password) VALUES($1, $2) RETURNING *`;
    const result = await client.query(SQL, [username, hashedPassword]);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// User login
app.post("/api/users/login", async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const SQL = `SELECT * FROM users WHERE username = $1`;
    const result = await client.query(SQL, [username]);
    const user = result.rows[0];

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(401).json({ error: "Invalid username or password" });
    }

    const token = jwt.sign({ id: user.id, username: user.username }, SECRET_KEY, {
      expiresIn: "1h",
    });

    res.json({ message: "Login successful", token, user });
  } catch (error) {
    next(error);
  }
});

// Post a review for a rooftop bar
app.post("/api/reviews", authenticateToken, async (req, res, next) => {
  try {
    const { bar_id, rating, comment } = req.body;
    const SQL = `INSERT INTO reviews(user_id, bar_id, rating, comment) VALUES($1, $2, $3, $4) RETURNING *`;
    const result = await client.query(SQL, [req.user.id, bar_id, rating, comment]);
    res.json(result.rows[0]);
  } catch (error) {
    next(error);
  }
});

// ================== DATABASE INIT ================== //

const init = async () => {
  await client.connect();

  const SQL = `
  DROP TABLE IF EXISTS reviews;
  DROP TABLE IF EXISTS rooftop_bars;
  DROP TABLE IF EXISTS users;

  CREATE TABLE users (
    id SERIAL PRIMARY KEY,
    username VARCHAR(100) NOT NULL UNIQUE,
    password TEXT NOT NULL
  );

  CREATE TABLE rooftop_bars (
    id SERIAL PRIMARY KEY,
    name VARCHAR(100) NOT NULL,
    location TEXT NOT NULL,
    average_rating DECIMAL DEFAULT 0
  );

  CREATE TABLE reviews (
    id SERIAL PRIMARY KEY,
    user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
    bar_id INTEGER REFERENCES rooftop_bars(id) ON DELETE CASCADE,
    rating INTEGER CHECK (rating BETWEEN 1 AND 5),
    comment TEXT
  );

  INSERT INTO rooftop_bars (name, location) VALUES 
    ('Sky Lounge', 'New York, NY'),
    ('Cloud Nine', 'San Francisco, CA'),
    ('Horizon Bar', 'Chicago, IL');
  `;

  await client.query(SQL);
  console.log("Database initialized!");

  const port = process.env.PORT || 3000;
  app.listen(port, () => console.log(`Server running on port ${port}`));
};

// Start server
init();
