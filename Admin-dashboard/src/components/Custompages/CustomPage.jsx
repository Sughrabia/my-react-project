import React, { useState, useEffect } from 'react';
import axios from 'axios'; 
import { useNavigate, Link } from 'react-router-dom';
import './custompage.css';

const CustomPages = () => {
  const [pages, setPages] = useState([]);
  const navigate = useNavigate();

  // Fetch pages from the API when the component mounts
  useEffect(() => {
    const fetchPages = async () => {
      try {
        const response = await axios.get('http://localhost:5000/customPage/allpages');
        setPages(response.data);
      } catch (error) {
        console.log('Error fetching pages:', error);
      }
    };
    fetchPages();
  }, []);

  // Handle delete
  const handleDelete = async (slug) => {
    try {
      await axios.delete(`http://localhost:5000/customPage/pages/${slug}`);
      setPages(pages.filter(page => page.slug !== slug)); // Update UI
    } catch (error) {
      console.log('Error deleting page:', error);
    }
  };

  return (
    <div className="admin-custom-pages-container">
      <h1>Custom Pages Management</h1>
      <Link to="/create-custompage"> 
        <button className="create-page-btn" onClick={() => navigate('/admin/create-custom-page')}>
          Create New Page
        </button>
      </Link>

      <table className="custom-pages-table">
        <thead>
          <tr>
            <th>Page ID</th>
            <th>Page Title</th>
            <th>Page Slug</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {pages.map((page) => (
            <tr key={page.slug}> {/* Use slug or unique identifier */}
              <td>{page.id}</td>
              <td>{page.title}</td>
              <td>{page.slug}</td>
              <td>
                <button onClick={() => navigate(`/edit-custompage/${page.slug}`)}>Edit</button>
                <button onClick={() => handleDelete(page.slug)}>Delete</button> {/* Pass slug for deletion */}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default CustomPages;
