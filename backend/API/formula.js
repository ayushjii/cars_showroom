const bodyParser = require("body-parser");
const express = require("express");
const fs = require("fs");
const path = require("path");
const app = express();

const port = 4000;

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const dataFilePath = path.join(__dirname, "../Data/cars.json");

let posts = JSON.parse(fs.readFileSync(dataFilePath, "utf-8"));

let lastId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) : 0;

app.get("/posts", (req, res) => {
  console.log(posts);
  res.json(posts);
});

app.get("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: " Post not found" });
  res.json(post);
  console.log(post);
});

app.post("/posts", (req, res) => {
  const newId = (lastId += 1);
  const post = {
    id: newId,
    car_company: req.body.company,
    car_name: req.body.name,
    color: req.body.color,
    type: req.body.type,
    speed: Number(req.body.speed),
  };
  lastId = newId;
  posts.push(post);
  fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
  console.log("New car has been added", post);
  res.status(201).json(post);
});

app.patch("/posts/:id", (req, res) => {
  const post = posts.find((p) => p.id === parseInt(req.params.id));
  if (!post) return res.status(404).json({ message: " Post not found" });

  if (req.body.car_company) post.car_company = req.body.car_company;
  if (req.body.car_name) post.car_name = req.body.car_name;
  if (req.body.color) post.color = req.body.color;
  if (req.body.type) post.type = req.body.type;
  if (req.body.speed) post.speed = Number(req.body.speed);
  fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
  console.log(post);
  res.json(post);
});

app.delete("/posts/:id", (req, res) => {
  const postIndex = posts.findIndex((p) => p.id === parseInt(req.params.id));
  if (postIndex === -1) {
    return res.status(404).json({ message: " Post not found" });
  }
  const del = posts.splice(postIndex, 1)[0];
  fs.writeFileSync(dataFilePath, JSON.stringify(posts, null, 2));
  console.log(postIndex, del);
  res.json({ message: "Post Deleted", del });
});

app.listen(port, () =>
  console.log(`API Server is running on http://localhost:${port}`)
);
