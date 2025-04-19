import React, { useEffect, useState } from "react";
import Main from "./Main";
import axios from 'axios';
import Footer from "./Footer";
import Header from "./Header";

function Home() {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    axios
      .get("http://localhost:3500/posts")
      .then((res) => setPosts(res.data))
      .catch((err) => console.error("Failed to fetch cars:", err));
  }, []);

  return (
    <div>
      <Header />
      <Main posts={posts} setPosts={setPosts} />
      <Footer />
    </div>
  );
}

export default Home;
