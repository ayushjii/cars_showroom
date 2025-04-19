import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";


function EditCar() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [form, setForm] = useState({
    car_company: "",
    car_name: "",
    color: "",
    type: "",
    speed: "",
  });

  useEffect(() => {
    axios
      .get(`http://localhost:3500/posts/${id}`)
      .then((res) => setForm(res.data))
      .catch((err) => console.error("Failed to fetch car:", err));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.patch(`http://localhost:3500/api/posts/${id}`, form);
      // alert("Car updated!");
      navigate("/");
    } catch (error) {
      console.error("Failed to update car:", error);
    }
  };

  return (
    <div>
      <h1>Edit Car</h1>
      <form onSubmit={handleSubmit}>
        <input name="car_company" value={form.car_company} onChange={handleChange} required />
        <input name="car_name" value={form.car_name} onChange={handleChange} required />
        <input name="color" value={form.color} onChange={handleChange} required />
        <input name="type" value={form.type} onChange={handleChange} required />
        <input name="speed" value={form.speed} onChange={handleChange} type="number" required />
        <button type="submit">Update Car</button>
      </form>
    </div>
  );
}

export default EditCar;
