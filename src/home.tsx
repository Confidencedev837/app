import React, { useEffect, useState } from 'react';
import ProductCard from './components/ProductCard';
import { fetchProducts, Product } from './utils/appwriteClients';
import { useSearch } from './context/SearchContext';

const Home: React.FC = () => {
  const { query } = useSearch();

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

  // Filter products based on the search query
  const filteredProducts = products.filter((prod) =>
    prod.name.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="home">
      <h1>Your one stop shop for all your needs!!</h1>
      
      {loading ? (
        <div className="flex items-center justify-center space-x-2 h-40">
          <span className="w-3 h-3 bg-gradient-to-r from-blue-800 to-cyan-400 rounded-full animate-bounce"></span>
          <span className="w-3 h-3 bg-gradient-to-r from-blue-800 to-cyan-400 rounded-full animate-bounce [animation-delay:-0.2s]"></span>
          <span className="w-3 h-3 bg-gradient-to-r from-blue-800 to-cyan-400 rounded-full animate-bounce [animation-delay:-0.4s]"></span>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="no-products">
          We don't have what you're looking for "{query}".
        </div>     
      ) : (
        <div className="product-grid">
          {filteredProducts.map((prod) => (
            <ProductCard
              key={prod.id as string}
              {...prod}
              id={prod.id as string}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
