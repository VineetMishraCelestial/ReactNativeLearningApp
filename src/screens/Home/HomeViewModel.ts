
import {productService,ApiError,} from '../../services';
import { useEffect, useState } from 'react';
import { Product } from '../../models/Products';

export const useHomeViewModel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);

  const fetchProducts = async (): Promise<void> => {
    try {
      setLoading(true);
      setError(null);

      const response = await productService.getProducts();
      console.log('API RESPONSE:', response);
      console.log('PRODUCTS:', response.products);
      setProducts(response.products);
    } catch (err) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError('Failed to load products');
      }
    } finally {
      setLoading(false);
    }
  };

  // Load products when screen opens
  useEffect(() => {
    fetchProducts();
  }, []);

  return {
    products,
    loading,
    error,
    fetchProducts, // useful for pull-to-refresh
  };
};
