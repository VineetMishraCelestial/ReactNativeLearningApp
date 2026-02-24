import { useState } from 'react';
import { client } from '../../graphql/apolloClient';
import { GET_COUNTRIES } from '../../graphql/queries/countries';

type Country = {
  code: string;
  name: string;
  emoji: string;
};

// type GetCountriesResponse = {
//   countries: Country[];
// };

type GetCountriesResponse = {
    countries: {
      code: string;
      name: string;
      emoji: string;
    }[];
  };

export const useWalletViewModel = () => {
  const [countries, setCountries] = useState<Country[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchCountries = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const { data } = await client.query<GetCountriesResponse>({
        query: GET_COUNTRIES,
      });
  
      setCountries(data?.countries ?? []);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return { countries, fetchCountries, loading, error };
};