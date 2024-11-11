import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './Privacy.css';

const PrivacyPolicy = () => {
  const { slug } = useParams();  // This will capture the slug if present
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        let response;
        if (slug) {
          // Fetch a specific Privacy Policy page by slug
          response = await axios.get(`https://customizeproserver-ez6b5n9b.b4a.run/customPage/pages/${slug}`);
        } else {
          // Fetch the default Privacy Policy page or a list
          response = await axios.get('https://customizeproserver-ez6b5n9b.b4a.run/customPage/pages/privacy-policy');  // Adjust endpoint accordingly
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
    <div className="privacy-policy-container">
      <h1>{page.title}</h1>
      <div dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
}

export default PrivacyPolicy;
