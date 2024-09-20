import React, { useState, useEffect } from 'react';

const Post = () => {
  const [posts, setPosts] = useState([]);
  const [post, setPost] = useState(null); // Will hold the fetched post
  const [postId, setPostId] = useState(''); // Input value for the post ID

  // Fetch all posts
  const fetchAllPosts = async () => {
    try {
      const response = await fetch('http://localhost:5000/post');
      const data = await response.json();
      setPosts(data);
    } catch (error) {
      console.error('Error fetching posts', error);
    }
  };

  // Fetch post by ID
  const fetchPostById = async (id) => {
    try {
      const response = await fetch(`http://localhost:5000/post/${id}`);
      const data = await response.json();
      setPost(data); // Save the fetched post
    } catch (error) {
      console.error('Error fetching post by id', error);
    }
  };

  // UseEffect to fetch all posts when the component mounts
  useEffect(() => {
    fetchAllPosts();
  }, []);

  return (
    <div>
      <h1>Posts</h1>
      {/* Display list of posts */}
      <ul>
        {posts.map((post) => (
          <li key={post.id}>{post.title}</li>
        ))}
      </ul>

      <h2>Get Post by ID</h2>
      <input
        type="text"
        placeholder="Enter Post ID"
        value={postId}
        onChange={(e) => setPostId(e.target.value)}
      />
      <button onClick={() => fetchPostById(postId)}>Fetch Post</button>

      {/* Conditionally render the fetched post data */}
      {post && (
        <div>
          <h3>{post.title}</h3>
          <p>{post.content}</p>
          <p><strong>Author:</strong> {post.author}</p>
        </div>
      )}
    </div>
  );
};

export default Post;
