// =====================================================
// Apollo core imports
// =====================================================

import {
    ApolloClient,        // Main GraphQL client (engine)
    InMemoryCache,       // Local cache for storing responses
    HttpLink,            // Sends request to GraphQL server
    ApolloLink,          // Used to combine multiple middleware links
    CombinedGraphQLErrors, // Used to detect GraphQL errors (v4 system)
  } from '@apollo/client';
  
  import { SetContextLink } from '@apollo/client/link/context'; // Modern way to modify request (e.g., add token)
  import { ErrorLink } from '@apollo/client/link/error';        // Handles global errors
  import { RetryLink } from '@apollo/client/link/retry';        // Retries failed requests
  
  import { authStorage } from '../services/authStorage';        // Your custom token storage
  
  
  // =====================================================
  // 1️⃣ HTTP LINK
  // This is where all GraphQL requests are finally sent.
  // =====================================================
  
  const httpLink = new HttpLink({
    // uri: 'https://countries.trevorblades.com/', // 🔥 Replace with your backend URL
    uri: "https://api.escuelajs.co/graphql"
  });
  
  
  // =====================================================
  // 2️⃣ AUTH LINK
  // This runs BEFORE every request.
  // It attaches the JWT token to request headers.
  // =====================================================
  
  const authLink = new SetContextLink(async (prevContext) => {
    // Get token from storage (AsyncStorage, SecureStore, etc.)
    const token = await authStorage.getAccessToken();
  
    return {
      headers: {
        // Keep existing headers
        ...(prevContext.headers ?? {}),
  
        // Add Authorization header if token exists
        Authorization: token ? `Bearer ${token}` : '',
      },
    };
  });
  
  
  // =====================================================
  // 3️⃣ RETRY LINK
  // If a request fails (e.g., bad network),
  // Apollo will retry automatically.
  // =====================================================
  
  const retryLink = new RetryLink({
    attempts: {
      max: 3, // Try request maximum 3 times
  
      // Retry only if it's NOT a GraphQL validation error
      // (GraphQL errors like "Invalid password" should not retry)
      retryIf: (error) => {
        return !!error && !CombinedGraphQLErrors.is(error);
      },
    },
  
    delay: {
      initial: 300,  // Start retry after 300ms
      max: 2000,     // Maximum delay between retries
      jitter: true,  // Adds randomness (prevents retry spikes)
    },
  });
  
  
  // =====================================================
  // 4️⃣ ERROR LINK
  // Handles GraphQL + Network errors globally.
  // =====================================================
  
  const errorLink = new ErrorLink(({ error }) => {
  
    // Only log errors in development mode
    if (!__DEV__) return;
  
    // If backend returned GraphQL errors
    if (CombinedGraphQLErrors.is(error)) {
      error.errors.forEach(({ message, locations, path }) => {
        console.warn(
          `[GraphQL Error] Message: ${message}, 
           Location: ${JSON.stringify(locations)}, 
           Path: ${path}`
        );
      });
    } else {
      // If it's a network error (no internet, server down, etc.)
      console.warn('[Network Error]', error?.message ?? error);
    }
  });
  
  
  // =====================================================
  // 5️⃣ APOLLO CLIENT INSTANCE
  // This combines all links and configures cache.
  // =====================================================
  
  export const client = new ApolloClient({
  
    // Order matters:
    // 1️⃣ Add token
    // 2️⃣ Retry if fails
    // 3️⃣ Handle errors
    // 4️⃣ Send request to server
    link: ApolloLink.from([
      authLink,
      retryLink,
      errorLink,
      httpLink,
    ]),
  
    // Apollo local cache
    cache: new InMemoryCache({
      typePolicies: {
        Query: {
          fields: {
            // Future pagination or cache customization goes here
          },
        },
      },
    }),
  
    // Default behavior for queries & mutations
    defaultOptions: {
      watchQuery: {
        fetchPolicy: 'cache-and-network', // Show cached data first, then update
        errorPolicy: 'all',               // Return both data & errors
      },
      query: {
        fetchPolicy: 'network-only',      // Always hit network
        errorPolicy: 'all',
      },
      mutate: {
        errorPolicy: 'all',
      },
    },
  });