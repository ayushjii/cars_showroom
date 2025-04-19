import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";

function Main({ posts, setPosts }) {
  const handleDelete = async (id) => {
    try {
      const url =
    window.location.hostname === "localhost"
      ? "http://localhost:3500/api/posts"
      : "http://192.168.1.4:3500/api/posts";
    
      await axios.delete(url+`/${id}`);
      setPosts(posts.filter((post) => post.id !== id));
    } catch (error) {
      console.error("Failed to delete car:", error);
    }
  };

  return (
    <div>
      <h1>CARS</h1>
      <Link to="/new">
        <button>Add New Car</button>
      </Link>
      <ul>
        {posts.map((post) => (
          <li key={post.id}>
            <h2>{post.car_name}</h2>
            <p>{post.car_company} | {post.color} | {post.type} | {post.speed} km/h</p>
            <Link to={`/edit/${post.id}`}>Edit</Link>
            <button onClick={() => handleDelete(post.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default Main;
