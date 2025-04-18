import React from "react";
import { Link } from "react-router-dom";

function Main({ posts }) {
  return (
    <div>
      <h1>CARS</h1>
      <Link to={"/newcar"}>
        <button id="newcars">New Cars</button>
      </Link>
      <div>
        <ul id="carslist">
          {posts.map((post) => (
            <li key={posts.id}>
              <h1>{posts.car_name}</h1>
              <h3>{posts.car_company}</h3>
              <h5>{posts.color}</h5>
              <h5>{posts.type}</h5>
              <h5>{posts.speed}</h5>
              <a className="edit" href={`/edit/${post.id}`}>
                Edit
              </a>
              <a className="delete" href={`/api/posts/delete/${post.id}`}>
                Delete
              </a>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default Main;
