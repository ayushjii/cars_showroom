const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const axios = require("axios");

const app = express();
const PORT = 3500;
const API_URL = "http://localhost:4000";

app.use(cors());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// Serve static files (if needed)
app.use(express.static("public"));

// Get all posts (cars)
app.get("/posts", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts`);
    res.json(response.data);
  } catch (error) {
    res.status(500).json({ error: "Failed to fetch cars" });
  }
});

// Get a single post (car) by ID
app.get("/posts/:id", async (req, res) => {
  try {
    const response = await axios.get(`${API_URL}/posts/${req.params.id}`);
    res.json(response.data);
  } catch (error) {
    res.status(404).json({ error: "Car not found" });
  }
});

// Create a new post (car)
app.post("/api/posts", async (req, res) => {
  try {
    const response = await axios.post(`${API_URL}/posts`, req.body);
    res.status(201).json(response.data);
  } catch (error) {
    res.status(400).json({ error: "Failed to create car" });
  }
});

// Update a post (car)
app.patch("/api/posts/:id", async (req, res) => {
  try {
    const response = await axios.patch(
      `${API_URL}/posts/${req.params.id}`,
      req.body
    );
    res.json(response.data);
  } catch (error) {
    res.status(400).json({ error: "Failed to update car" });
  }
});

// Delete a post (car)
app.delete("/api/posts/:id", async (req, res) => {
  try {
    await axios.delete(`${API_URL}/posts/${req.params.id}`);
    res.status(204).send();
  } catch (error) {
    res.status(500).json({ error: "Failed to delete car" });
  }
});

// Start the server
app.listen(PORT, () => {
  console.log(`Express backend running on http://localhost:${PORT}`);
});
