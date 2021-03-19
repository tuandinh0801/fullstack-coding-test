import "styles/globals.css";
import { ChakraProvider } from "@chakra-ui/react";
import Layout from "components/layout/Layout";
import Header from "containers/Header";
import { AuthProvider } from "hooks/auth/useAuthenticate";
import ProtectRoute from "containers/ProtectRoute";

const MyApp = ({ Component, pageProps }) => {
  return (
    <ChakraProvider>
      <Layout>
        <AuthProvider>
          <ProtectRoute>
            <Header />
            <Component {...pageProps} />
          </ProtectRoute>
        </AuthProvider>
      </Layout>
    </ChakraProvider>
  );
};

export default MyApp;
