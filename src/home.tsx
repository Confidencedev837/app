import React, { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import { fetchProducts, Product } from './utils/appwriteClients';

const Home: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadProducts = async () => {
      try {
        const prods = await fetchProducts();
        setProducts(prods);
      } catch (error) {
        console.error('Failed to fetch products:', error);
      } finally {
        setLoading(false);
      }
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
          {products
            .filter((prod) => prod.id) // Filter out products without an id
            .map((prod) => (
              <ProductCard
              key={prod.id as string} // Ensure key is a string
              {...prod}
              id={prod.id as string} // Ensure id is a string
            />
            ))}
        </div>
      )}
    </div>
  );
};

export default Home;