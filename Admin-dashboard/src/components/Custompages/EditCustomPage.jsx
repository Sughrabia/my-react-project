import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';
import './custompage.css'
const EditCustomPage = () => {
  const { slug } = useParams(); // Get the slug from the URL parameters
  const [pageData, setPageData] = useState({ title: '', content: '', slug: '' });
  const navigate = useNavigate();

  // Fetch existing page data to pre-fill the form
  useEffect(() => {
    const fetchPageData = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/customPage/pages/${slug}`);
        setPageData(response.data); // Set the page data in state
      } catch (error) {
        console.error('Error fetching page data:', error);
      }
    };
    fetchPageData();
  }, [slug]);

  // Handle form submission to update the page
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      await axios.put(`http://localhost:5000/customPage/edit-pages/${slug}`, pageData); // Use the correct update API
      navigate('/custompages'); // Redirect to the custom pages management
    } catch (error) {
      console.error('Error updating page:', error);
    }
  };

  // Handle input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setPageData({ ...pageData, [name]: value });
  };

  return (
    <div className="custom-page-container">
      <h1>Edit Custom Page</h1>
      <form className="custom-page-form" onSubmit={handleSubmit}>
        <div>
          <label htmlFor="title">Title:</label>
          <input
            type="text"
            id="title"
            name="title"
            value={pageData.title}
            onChange={handleChange}
            required
          />
        </div>
        <div>
          <label htmlFor="slug">Slug:</label>
          <input
            type="text"
            id="slug"
            name="slug"
            value={pageData.slug}
            onChange={handleChange}
            required
            readOnly // Make slug read-only or editable based on your requirements
          />
        </div>
        <div>
          <label htmlFor="content">Content:</label>
          <textarea
            id="content"
            name="content"
            value={pageData.content}
            onChange={handleChange}
            required
          />
        </div>
        <button type="submit">Save Changes</button>
        <button type="button" onClick={() => navigate('/custompages')}>Cancel</button>
      </form>
    </div>
  );
};

export default EditCustomPage;
