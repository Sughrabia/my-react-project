import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import './About.css';



const About= () => {
  const { slug } = useParams();  // This will capture the slug if present
  const [page, setPage] = useState(null);

  useEffect(() => {
    const fetchPage = async () => {
      try {
        let response;
        if (slug) {
          // Fetch a specific FAQ page by slug
          response = await axios.get(`https://glamgrabbackend-dxah8u9g.b4a.run/customPage/pages/${slug}`);
        } else {
          // Fetch the default FAQ page or FAQ list
          response = await axios.get('https://glamgrabbackend-dxah8u9g.b4a.run/customPage/pages/about-us');  // Adjust endpoint accordingly
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
    <div className="about-container">
      <h1>{page.title}</h1>
      <div className='about-description' dangerouslySetInnerHTML={{ __html: page.content }} />
    </div>
  );
};

export default About;
