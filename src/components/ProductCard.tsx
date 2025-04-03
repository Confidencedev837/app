import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';
import { getImageUrl } from '../utils/appwriteClients';

interface ProductCardProps {
  id: string;
  name: string;
  description: string;
  price: number;
  imageIds: string[];
}

const ProductCard: React.FC<ProductCardProps> = ({ id, name, description, price, imageIds }) => {
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [likeCount, setLikeCount] = useState(0);

  // Convert file IDs to public URLs
  const imageUrls = imageIds.map((id) => getImageUrl(id));

  const handleLike = () => setLikeCount((prev) => prev + 1);

  return (
    <div className="product-card">
      <Carousel images={imageUrls} />
      <h3>{name}</h3>
      <p>
        {showFullDescription ? description : `${description.substring(0, 100)}...`}
        <button className="preview-btn" onClick={() => setShowFullDescription(!showFullDescription)}>
          {showFullDescription ? 'Hide' : 'Preview'}
        </button>
      </p>
      <p className="price">₦ {price.toLocaleString()}</p>
      <div className="card-actions">
        <button className="like-btn" onClick={handleLike}>Like ({likeCount})</button>
        <Link to={`/product/${id}`}>
          <button className="more-btn">More Info</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
