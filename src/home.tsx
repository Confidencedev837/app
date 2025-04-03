import React, { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import { fetchProducts, Product } from './utils/appwriteClients';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      const prods = await fetchProducts();
      setProducts(prods);
      setLoading(false);
    };
    loadProducts();
  }, []);

  return (
    <div className="home">
      <h1>Welcome to My Futuristic Store</h1>
      {loading ? (
        <p>Loading products...</p>
      ) : (
        <div className="product-grid">
          {products.map((prod) => (
            <ProductCard key={prod.id} {...prod} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
