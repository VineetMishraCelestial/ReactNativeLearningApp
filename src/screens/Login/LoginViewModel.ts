import { useState } from 'react';
import { client } from '../../graphql/apolloClient';
import { LOGIN_MUTATION } from '../../graphql/queries/auth';
import { authStorage, ApiError } from '../../services';

type LoginResponse = {
  login: {
    access_token: string;
    refresh_token: string;
  };
};

type LoginVariables = {
  email: string;
  password: string;
};

export const useLoginViewModel = () => {
  const [email, setEmail] = useState<string>('john@mail.com');
  const [password, setPassword] = useState<string>('changeme');
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  const validate = (): boolean => {
    if (!email.trim()) {
      setError('Email is required');
      return false;
    }

    if (!password.trim()) {
      setError('Password is required');
      return false;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return false;
    }

    setError(null);
    return true;
  };

  const login = async (): Promise<boolean> => {
    if (!validate()) return false;

    try {
      setLoading(true);

      const { data } = await client.mutate<LoginResponse, LoginVariables>({
        mutation: LOGIN_MUTATION,
        variables: {
          email,
          password,
        },
      });
      console.log('GraphQL Full Response:', data);
      // const accessToken = data?.login.access_token;
      // const refreshToken = data?.login.refresh_token;

      // if (!accessToken || !refreshToken) {
      //   throw new Error('Invalid login response');
      // }

      // // Save tokens securely
      // await authStorage.setTokens(accessToken, refreshToken);

      setError(null);
      return true;

    } catch (err: any) {
      if (err instanceof ApiError) {
        setError(err.message);
      } else {
        setError(err.message || 'Something went wrong. Please try again.');
      }
      return false;
    } finally {
      setLoading(false);
    }
  };

  return {
    email,
    password,
    error,
    loading,
    setEmail,
    setPassword,
    login,
  };
};




// import { useState } from 'react';
// import {authService,authStorage,ApiError,} from '../../services';


// export const useLoginViewModel = () => {
//   const [email, setEmail] = useState<string>('emilys');
//   const [password, setPassword] = useState<string>('emilyspass');
//   const [error, setError] = useState<string | null>(null);
//   const [loading, setLoading] = useState<boolean>(false);

//   const validate = (): boolean => {
//     if (!email.trim()) {
//       setError('Username is required');
//       return false;
//     }

//     if (!password.trim()) {
//       setError('Password is required');
//       return false;
//     }

//     if (password.length < 6) {
//       setError('Password must be at least 6 characters');
//       return false;
//     }

//     setError(null);
//     return true;
//   };

//   const login = async (): Promise<boolean> => {
//     if (!validate()) return false;

//     try {
//       setLoading(true);

//       const response = await authService.login(email, password);

//       await authStorage.setTokens(
//       response.accessToken,
//       response.refreshToken
//     );
      
//       setError(null);

//       // 🔥 REAL API CALL
//       await authService.login(email, password);

//       return true; // success
//     } catch (err) {
//       if (err instanceof ApiError) {
//         setError(err.message);
//       } else {
//         setError('Something went wrong. Please try again.');
//       }
//       return false;
//     } finally {
//       setLoading(false);
//     }
//   };

//   return {
//     email,
//     password,
//     error,
//     loading,
//     setEmail,
//     setPassword,
//     login,
//   };
// };


