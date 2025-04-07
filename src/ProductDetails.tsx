import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Carousel from './components/Carousel';
import {  saveBuyer, saveComment, fetchComments,fetchProducts, getImageUrl, Product } from './utils/appwriteClients';

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
    const loadProductAndComments = async () => {
      const prods = await fetchProducts();
      const found = prods.find((p) => p.id === id);
      setProduct(found || null);
  
      if (id) {
        const loadedComments = await fetchComments(id);
        const formattedComments = loadedComments.map((doc) => ({
          name: doc.name,
          comment: doc.comment,
          timestamp: doc.timestamp,
        }));
        setComments(formattedComments);
      }
    };
    loadProductAndComments();
  }, [id]);
  

  const handleAddComment = async () => {
    if (!product || !commentInput.trim()) return;
  
    const newComment = {
      name: '', // Or replace with actual logged-in user later
      comment: commentInput,
      timestamp: new Date().toLocaleString(),
    };
  
    // Save to Appwrite
    await saveComment(newComment.name, newComment.comment, newComment.timestamp, product.id!);
  
    // Show immediately
    setComments([newComment, ...comments]);
    setCommentInput('');
  };

  

  const handleBuyConfirm =  async() => {
      // Save buyer info to Appwrite
  if (product && product.id) {
    await saveBuyer(customerName, customerEmail, product.id);
  } else {
    console.error('Product or Product ID is missing.');
  }
    const whatsappURL = `https://wa.me/+2348033204246?text=Name:%20${encodeURIComponent(
      customerName
    )}%0AProduct:%20${encodeURIComponent(product?.name || '')}%0AQuantity:%201%0APrice:%20₦${product?.price}`;
    window.open(whatsappURL, '_blank');
    setShowBuyModal(false);
  };

  if (!product) {
    return (
      <div className="flex items-center justify-center space-x-2 h-40">
      <span className="w-3 h-3 bg-gradient-to-r from-blue-800 to-cyan-400 rounded-full animate-bounce"></span>
      <span className="w-3 h-3 bg-gradient-to-r from-blue-800 to-cyan-400 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
      <span className="w-3 h-3 bg-gradient-to-r from-blue-800 to-cyan-400 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
    </div>
    
    );
  }
  
  
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
            <h3>Please enter Your Details</h3>
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
            <button className='button1' onClick={handleBuyConfirm}>Confirm Buy</button>
            <button className='button2' onClick={() => setShowBuyModal(false)}>Cancel</button>
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
