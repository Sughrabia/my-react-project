import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import './createproduct.css';

const EditProductPage = () => {
  const { id } = useParams(); // Get the product ID from the URL
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    imageUrl: '',
    oldPrice: '',
    newPrice: '',
  });
  const [imageFile, setImageFile] = useState(null); // State to store the uploaded file
  const [loading, setLoading] = useState(true); // Add loading state
  const navigate = useNavigate(); // Initialize useNavigate

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value }); // Update the state correctly
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file); // Store the file in state
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/product/edit/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setProductData(data); // Populate the form with the product data
        setLoading(false);    // Set loading to false when data is fetched
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false);    // In case of error, stop the loading state
      }
    };
  
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Creating form data for image and other fields
    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('category', productData.category);
    formData.append('oldPrice', productData.oldPrice);
    formData.append('newPrice', productData.newPrice);
    if (imageFile) {
      formData.append('image', imageFile); // Append image file if uploaded
    }

    try {
      const response = await fetch(`http://localhost:5000/product/edit/${id}`, {
        method: 'PUT',
        body: formData, // Use FormData to send files
      });

      if (response.ok) {
        alert('Product updated successfully');
        navigate('/product'); // Redirect to the products page after update
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

  // Render a loading message while fetching the product data
  if (loading) {
    return <div>Loading product data...</div>;
  }

  return (
    <div className="create-product-container">
      <h1>Edit Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={productData.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={productData.category}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Old Price:
          <input
            type="number"
            name="oldPrice"
            value={productData.oldPrice}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          New Price:
          <input
            type="number"
            name="newPrice"
            value={productData.newPrice}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Image:
          <input
            type="file"
            name="image"
            onChange={handleImageChange}
          />
        </label>
        {imageFile && (
          <img src={URL.createObjectURL(imageFile)} alt="Preview" width="100" />
        )}
        <button type="submit">Update Product</button>
      </form>
    </div>
  );
};

export default EditProductPage;
