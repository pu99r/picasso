import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";

interface Post {
  id: number;
  title: string;
  body: string;
}

const PostsPage = (): React.JSX.Element => {
  const [posts, setPosts] = useState<Post[]>([]);
  const [page, setPage] = useState(1);
  const navigate = useNavigate();
  const loader = useRef(null);

  useEffect(() => {
    fetch(`https://jsonplaceholder.typicode.com/posts?_limit=10&_page=${page}`)
      .then((response) => response.json())
      .then((data) => setPosts((prevPosts) => [...prevPosts, ...data]));
  }, [page]);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          setPage((prevPageNumber) => prevPageNumber + 1);
        }
      },
      {
        root: null,
        rootMargin: "20px",
        threshold: 1.0,
      }
    );

    const currentLoader = loader.current;

    if (currentLoader) {
      observer.observe(currentLoader);
    }

    return () => {
      if (currentLoader) {
        observer.unobserve(currentLoader);
      }
    };
  }, []);

  const longbody = (body: string) => {
    const maxLength = 100;
    return body.length > maxLength
      ? `${body.substring(0, maxLength)}...`
      : body;
  };
  const handleViewPost = (postId: number) => {
    navigate(`/posts/${postId}`);
  };

  return (
    <div>
      <h1>Посты</h1>
      <ul>
        {posts.map((post, index) => (
          <li key={post.id}>
            <p>
              <strong>
                {index + 1} - {post.title}
              </strong>
            </p>
            <p>{longbody(post.body)}</p>
            <button onClick={() => handleViewPost(post.id)}>Просмотр</button>
          </li>
        ))}
      </ul>
      <div ref={loader}>Загрузка</div>
    </div>
  );
};

export default PostsPage;
