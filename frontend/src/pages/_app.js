// frontend/src/pages/_app.js - This is the CORRECT code
import '../styles/globals.css';
import { AuthProvider } from '../context/AuthContext';
import Layout from '../components/layout/layout';

function MyApp({ Component, pageProps }) {
  return (
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;