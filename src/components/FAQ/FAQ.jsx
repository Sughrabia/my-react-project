import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './FAQ.css';

const FAQ = () => {
  const { slug } = useParams();  // This will capture the slug if present
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        let response;
        if (slug) {
          // Fetch a specific FAQ page by slug
          response = await axios.get(`https://customizeproserver-ez6b5n9b.b4a.run/customPage/pages/${slug}`);
        } else {
          // Fetch the default FAQ page or FAQ list
          response = await axios.get('https://customizeproserver-ez6b5n9b.b4a.run/customPage/pages/FAQ');  // Adjust endpoint accordingly
        }
        setPage(response.data);
      } catch (error) {
        console.error('Error fetching the page:', error);
      }
    };
    fetchPage();
  }, [slug]);

  if (!page) return <div>Loading...</div>;

  return (
    <div className="page-container">
      <h1 >{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
};

export default FAQ;
