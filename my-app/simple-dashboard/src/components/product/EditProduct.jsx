import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom'; 
import './createproduct.css';

const EditProductPage = () => {
  const { id } = useParams(); 
  const [productData, setProductData] = useState({
    name: '',
    category: '',
    imageUrl: '',
    oldPrice: '',
    newPrice: '',
  });
  const [imageFile, setImageFile] = useState(null); 
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  // Handle form input change
  const handleChange = (e) => {
    const { name, value } = e.target;
    setProductData({ ...productData, [name]: value }); // Update the state correctly
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    setImageFile(file); 
  };

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await fetch(`http://localhost:5000/product/edit/${id}`);
        if (!response.ok) {
          throw new Error('Failed to fetch product data');
        }
        const data = await response.json();
        setProductData(data);
        setLoading(false);   
      } catch (error) {
        console.error('Error fetching product:', error);
        setLoading(false); 
      }
    };
  
    fetchProduct();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const formData = new FormData();
    formData.append('name', productData.name);
    formData.append('category', productData.category);
    formData.append('oldPrice', productData.oldPrice);
    formData.append('newPrice', productData.newPrice);
    if (imageFile) {
      formData.append('image', imageFile); 
    }

    try {
      const response = await fetch(`http://localhost:5000/product/edit/${id}`, {
        method: 'PUT',
        body: formData,
      });

      if (response.ok) {
        alert('Product updated successfully');
        navigate('/product'); 
      } else {
        console.error('Failed to update product');
      }
    } catch (error) {
      console.error('Error updating product:', error);
    }
  };

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
