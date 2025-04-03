import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import Carousel from './Carousel';
import { getImageUrl } from '../utils/appwriteClients';
// import { FaHome, FaIcons, FaInfo } from 'react-icons/fa'; 

interface ProductCardProps {
  id?: string;
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
      <Carousel images={imageUrls} /> {/* Pass the product's images */}
      <h3>{name}</h3>
      <p>
        {showFullDescription ? description : `${description.substring(0, 100)}...`}
        <button className="preview-btn" onClick={() => setShowFullDescription(!showFullDescription)}>
          {showFullDescription ? 'less' : 'more'}
        </button>
      </p>
      <p className="price">₦ {price.toLocaleString()}</p>
      <div className="card-actions">
        <button className="like-btn" onClick={handleLike}><span className="material-icons">thumb_up</span>Like ({likeCount})</button>
        <Link to={`/product/${id}`}>
          <button className="more-btn"><span className="material-icons">info</span>More Info</button>
        </Link>
      </div>
    </div>
  );
};

export default ProductCard;
