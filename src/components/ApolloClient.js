import { ApolloClient, InMemoryCache } from '@apollo/client';

const getTokenFromLocalStorage = () => {
    return localStorage.getItem('token'); 
  };

const token = getTokenFromLocalStorage();

const client = new ApolloClient({
  uri: 'http://localhost:8081/query',
  cache: new InMemoryCache(),
  headers: {
    Authorization: `Bearer ${token}`,
  },
});

export default client;
