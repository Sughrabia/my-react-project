import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom'; // Import useNavigate hook
import './createproduct.css';

const CreateProductPage = () => {
  const [imageFile, setImageFile] = useState(null);
  const [newProduct, setNewProduct] = useState({
    name: '',
    category: '',
    imageUrl: '',
    oldPrice: '',
    newPrice: '',
  });

  const navigate = useNavigate(); // Initialize useNavigate

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewProduct({ ...newProduct, [name]: value });
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file); // Store the file in state
  };


  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name', newProduct.name);
    formData.append('category',newProduct.category);
    formData.append('oldPrice', newProduct.oldPrice);
    formData.append('newPrice', newProduct.newPrice);
    if (imageFile) {
      formData.append('image', imageFile); // Append image file if uploaded
    }

    try {
      const response = await fetch('http://localhost:5000/product/create', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(newProduct),
      });
      if (response.ok) {
        // Handle successful product creation
        alert('Product created successfully');
        setNewProduct({
          name: '',
          category: '',
          imageUrl: '',
          oldPrice: '',
          newPrice: '',
        });
        navigate('/product'); // Redirect to the products page after creation
      } else {
        console.error('Failed to create product');
      }
    } catch (error) {
      console.error('Error creating product:', error);
    }
  };

  return (
    <div className="create-product-container">
      <h1>Create New Product</h1>
      <form onSubmit={handleSubmit}>
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newProduct.name}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Category:
          <input
            type="text"
            name="category"
            value={newProduct.category}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          Old Price:
          <input
            type="number"
            name="oldPrice"
            value={newProduct.oldPrice}
            onChange={handleChange}
            required
          />
        </label>
        <label>
          New Price:
          <input
            type="number"
            name="newPrice"
            value={newProduct.newPrice}
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
        <button type="submit">Create Product</button>
      </form>
    </div>
  );
};

export default CreateProductPage;
