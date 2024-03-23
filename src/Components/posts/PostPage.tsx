import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostPage = (): JSX.Element => {
  const [post, setPost] = useState<Post | null>(null);
  const { postId } = useParams<string>();
  const navigate = useNavigate();

  useEffect(() => {
    const fetchPost = async () => {
      if (postId) {
        const response = await fetch(
          `https://jsonplaceholder.typicode.com/posts/${postId}`
        );
        const data: Post = await response.json();
        setPost(data);
      }
    };

    fetchPost();
  }, [postId]);

  const handleBackClick = () => {
    navigate(-1);
  };

  if (!post) {
    return <div className="post-loading">Загрузка...</div>;
  }

  return (
    <div className="post-container">
      <div className="post-content">
        <h1 className="post-title">{post.title}</h1>
        <p className="post-body">{post.body}</p>
        <button className="back-button" onClick={handleBackClick}>Назад</button>
      </div>
    </div>
  );
};

export default PostPage;