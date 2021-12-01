import "../styles/globals.css";
import { ApolloClient, InMemoryCache } from "@apollo/client";
import { ApolloProvider } from "@apollo/react-hooks";
import { URI, TOKEN } from "../constants";

function MyApp({ Component, pageProps }) {
  const cache = new InMemoryCache();
  const client = new ApolloClient({
    uri: URI,
    cache: cache,
    headers: {
      "x-hasura-admin-secret": TOKEN,
    },
    queryDeduplication: false,
    defaultOptions: {
      watchQuery: {
        fetchPolicy: "cache-and-network",
      },
    },
  });

  return (
    <ApolloProvider client={client}>
      <Component {...pageProps} />
    </ApolloProvider>
  );
}

export default MyApp;
