import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from './components/Carousel';
import { fetchProducts, getImageUrl, Product } from './utils/appwriteClients';

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const [product, setProduct] = useState<Product | null>(null);
  const [customerName, setCustomerName] = useState('');
  const [customerEmail, setCustomerEmail] = useState('');
  const [showBuyModal, setShowBuyModal] = useState(false);
  const [comments, setComments] = useState<
    { name: string; comment: string; timestamp: string }[]
  >([]);
  const [commentInput, setCommentInput] = useState('');

  useEffect(() => {
    const loadProduct = async () => {
      const prods = await fetchProducts();
      const found = prods.find((p) => p.id === id);
      setProduct(found || null);
    };
    loadProduct();
  }, [id]);

  const handleAddComment = () => {
    const newComment = {
      name: '', // Replace with user info if available
      comment: commentInput,
      timestamp: new Date().toLocaleString()
    };
    setComments([...comments, newComment]);
    setCommentInput('');
  };

  const handleBuyConfirm = () => {
    const whatsappURL = `https://wa.me/+2348033204246?text=Name:%20${encodeURIComponent(
      customerName
    )}%0AProduct:%20${encodeURIComponent(product?.name || '')}%0AQuantity:%201%0APrice:%20₦${product?.price}`;
    window.open(whatsappURL, '_blank');
    setShowBuyModal(false);
  };

  if (!product) return <p>Loading product...</p>;

  const imageUrls = product.imageIds.map((fid) => getImageUrl(fid));

  return (
    <div className="product-details">
      <h2>{product.name}</h2>
      <Carousel images={imageUrls} />
      <p>{product.description}</p>
      <p className="price">₦ {product.price.toLocaleString()}</p>
      <button className="buy-btn" onClick={() => setShowBuyModal(true)}>Buy</button>

      {showBuyModal && (
        <div className="modal">
          <div className="modal-content">
            <h3>Enter Your Details</h3>
            <input
              type="text"
              placeholder="Your Name"
              value={customerName}
              onChange={(e) => setCustomerName(e.target.value)}
            />
            <input
              type="email"
              placeholder="Your Email"
              value={customerEmail}
              onChange={(e) => setCustomerEmail(e.target.value)}
            />
            <button onClick={handleBuyConfirm}>Confirm Buy</button>
            <button onClick={() => setShowBuyModal(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="comments-section">
        <h3>Comments</h3>
        {comments.map((c, index) => (
          <div key={index} className="comment">
            <p>
              <strong>{c.name}</strong> ({c.timestamp}):
            </p>
            <p>{c.comment}</p>
          </div>
        ))}
        <textarea
          placeholder="Add a comment..."
          value={commentInput}
          onChange={(e) => setCommentInput(e.target.value)}
        ></textarea>
        <button onClick={handleAddComment}>Post Comment</button>
      </div>
    </div>
  );
};

export default ProductDetails;
