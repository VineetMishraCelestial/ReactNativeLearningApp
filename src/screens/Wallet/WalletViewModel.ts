import { useState } from "react";
import { client } from "../../graphql/apolloClient";
import { GET_PRODUCTS } from "../../graphql/queries/products";

type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  images: string[];
  slug: string;
  creationAt: string;
};

type GetProductsResponse = {
  products: Product[];
};

const LIMIT = 10;

export const useWalletViewModel = () => {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [hasMore, setHasMore] = useState(true);

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);

    try {
      const { data } = await client.query<GetProductsResponse>({
        query: GET_PRODUCTS,
        variables: {
          limit: LIMIT,
          offset: 0,
        },
        fetchPolicy: "network-only",
      });

      setProducts(data?.products ?? []);
      setHasMore((data?.products?.length ?? 0) === LIMIT);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const loadMore = async () => {
    if (loadingMore || !hasMore) return;

    setLoadingMore(true);

    try {
      const { data } = await client.query<GetProductsResponse>({
        query: GET_PRODUCTS,
        variables: {
          limit: LIMIT,
          offset: products.length,
        },
      });

      const newProducts = data?.products ?? [];

      setProducts(prev => [...prev, ...newProducts]);

      if (newProducts.length < LIMIT) {
        setHasMore(false);
      }
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoadingMore(false);
    }
  };

  return {
    products,
    fetchProducts,
    loadMore,
    loading,
    loadingMore,
    error,
  };
};


// import { useState } from 'react';
// import { client } from '../../graphql/apolloClient';
// import { GET_COUNTRIES } from '../../graphql/queries/countries';

// type Country = {
//   code: string;
//   name: string;
//   emoji: string;
// };

// // type GetCountriesResponse = {
// //   countries: Country[];
// // };

// type GetCountriesResponse = {
//     countries: {
//       code: string;
//       name: string;
//       emoji: string;
//     }[];
//   };

// export const useWalletViewModel = () => {
//   const [countries, setCountries] = useState<Country[]>([]);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState<string | null>(null);

//   const fetchCountries = async () => {
//     setLoading(true);
//     setError(null);
  
//     try {
//       const { data } = await client.query<GetCountriesResponse>({
//         query: GET_COUNTRIES,
//       });
  
//       setCountries(data?.countries ?? []);
//     } catch (err: any) {
//       setError(err.message);
//     } finally {
//       setLoading(false);
//     }
//   };

//   return { countries, fetchCountries, loading, error };
// };