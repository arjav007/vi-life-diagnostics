import '../styles/globals.css';
// FIX: Using a more robust path alias
import { AuthProvider } from '@/context/AuthContext'; 
import Layout from '@/components/layout/layout';

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

