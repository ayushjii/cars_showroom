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
    const url =
    window.location.hostname === "localhost"
      ? "http://localhost:3500/posts"
      : "http://192.168.1.4:3500/posts";
    axios
      .get(url+`/${id}` , form)
      .then((res) => setForm(res.data))
      .catch((err) => console.error("Failed to fetch car:", err));
  }, [id]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    try { 
      const url =
      window.location.hostname === "localhost"
        ? `http://localhost:3500/api/posts/${id}`
        : `http://192.168.1.4:3500/api/posts/${id}`;
      await axios.patch(url, form);
      navigate("/");
    } catch (error) {
      console.error("Failed to update car:", error);
    }
  };

  return (
    <div>
      <h1>Edit Car</h1>
      <form onSubmit={handleSubmit}>
        <input name="car_company" value={form.car_company} onChange={handleChange} />
        <input name="car_name" value={form.car_name} onChange={handleChange} />
        <input name="color" value={form.color} onChange={handleChange} />
        <input name="type" value={form.type} onChange={handleChange} />
        <input name="speed" value={form.speed} onChange={handleChange} type="number" />
        <button type="submit">Update Car</button>
      </form>
    </div>
  );
}

export default EditCar;
