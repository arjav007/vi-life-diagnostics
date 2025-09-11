import '../styles/globals.css';
// Import your AuthProvider from its location in your context folder
import { AuthProvider } from '../context/AuthContext';
import Layout from '../components/layout/layout'; // Assuming you have a Layout component

function MyApp({ Component, pageProps }) {
  return (
    // Wrap the entire application with the AuthProvider
    <AuthProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthProvider>
  );
}

export default MyApp;
