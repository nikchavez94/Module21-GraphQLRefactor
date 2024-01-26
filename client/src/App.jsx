import './App.css';
import { ApolloClient, InMemoryCache, ApolloProvider, createHttpLink } from '@apollo/client';
import { setContext } from '@apollo/client/link/context';
import { Outlet } from 'react-router-dom';

import Navbar from './components/Navbar';

// Todo: Replace 'YOUR_GRAPHQL_ENDPOINT' with your actual GraphQL endpoint
const graphqlEndpoint = '/graphql';

// Todo: Implement logic to retrieve JWT token
const getAuthToken = () => {
  // Logic to get the JWT token from local storage, cookies, or any other method
  // For example, you might use localStorage.getItem('token') or document.cookie
  // Replace 'YOUR_JWT_LOGIC' with your actual logic
  return localStorage.getItem("id_token");
};

// Create an http link for the Apollo Client
const httpLink = createHttpLink({
  uri: graphqlEndpoint,
});

// Create an auth link to attach the JWT token to each request
const authLink = setContext((_, { headers }) => {
  const token = getAuthToken();
  return {
    headers: {
      ...headers,
      authorization: token ? `Bearer ${token}` : '', // Attach the token to the Authorization header
    },
  };
});

// Create the Apollo Client with an in-memory cache
const client = new ApolloClient({
  link: authLink.concat(httpLink),
  cache: new InMemoryCache(),
});

function App() {
  return (
    <ApolloProvider client={client}>
      <Navbar />
      <Outlet />
    </ApolloProvider>
  );
}

export default App;