import "./App.css";
import React from "react";
import PostPage from "../Components/posts/PostPage"
import PostsPage from "../Components/posts/PostsPage"
import { Routes, Route } from 'react-router-dom';

function App(): JSX.Element {
  return (
    <Routes>
      <Route path="/" element={<PostsPage />} />
      <Route path="/posts/:postId" element={<PostPage />} />
    </Routes>
  );
}

export default App;