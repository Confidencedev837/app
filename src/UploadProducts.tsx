import React, { useState, useContext, ChangeEvent } from 'react';
import { useNavigate } from 'react-router-dom';
import { AdminContext } from './context/AdminContext';
import { createProduct, uploadImage, Product } from './utils/appwriteClients';

const UploadProduct: React.FC = () => {
  const { isAdmin } = useContext(AdminContext);
  const navigate = useNavigate();
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState<number>(0);
  const [images, setImages] = useState<File[]>([]);

  if (!isAdmin) {
    navigate('/admin/login');
    return null;
  }

  const handleImageChange = (e: ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setImages(Array.from(e.target.files));
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    // Upload images to Appwrite Storage and collect their file IDs.
    const uploadedImageIds = await Promise.all(images.map((img) => uploadImage(img)));
    const product: Product = {
      name,
      description,
      price,
      imageIds: uploadedImageIds
    };
    await createProduct(product);
    alert('Product uploaded successfully!');
    navigate('/admin/dashboard');
  };

  return (
    <div className="upload-product">
      <h2>Upload New Product</h2>
      <form onSubmit={handleSubmit} className="upload-form">
        <div className="form-group">
          <label>Product Name:</label>
          <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <textarea value={description} onChange={(e) => setDescription(e.target.value)} required></textarea>
        </div>
        <div className="form-group">
          <label>Price:</label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(parseFloat(e.target.value))}
            required
          />
        </div>
        <div className="form-group">
          <label>Images:</label>
          <input type="file" multiple onChange={handleImageChange} required />
        </div>
        <button type="submit" className="submit-btn">Upload Product</button>
      </form>
    </div>
  );
};

export default UploadProduct;
