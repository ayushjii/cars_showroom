import React, { useState } from "react";
import axios from 'axios';
import { useNavigate } from "react-router-dom";

function Newcar({ submit }) {
  const navigate = useNavigate(); 

  const [form, setForm] = useState({
    company: "",
    name: "",
    color: "",
    type: "",
    speed: "",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.post("http://localhost:3500/api/posts", form);
      // alert("Car added!");
      navigate("/")
    } catch (error) {
      console.error("Failed to submit car:", error);
    }
  };

  return (
    <div>
      <h1>New Car</h1>
      <form onSubmit={handleSubmit}>
        <input name="company" placeholder="Company" onChange={handleChange} required />
        <input name="name" placeholder="Car Name" onChange={handleChange} required />
        <input name="color" placeholder="Color" onChange={handleChange} required />
        <input name="type" placeholder="Type" onChange={handleChange} required />
        <input name="speed" placeholder="Top Speed" type="number" onChange={handleChange} required />
        <button type="submit">{submit || "Submit"}</button>
      </form>
    </div>
  );
}


export default Newcar;
