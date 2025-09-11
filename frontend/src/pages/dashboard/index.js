import { useEffect } from 'react';
import { useRouter } from 'next/router';
// FIX 1: Use the robust path alias for the import
import { useAuth } from '@/context/AuthContext';

export default function Dashboard() {
  const { user, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    // If the authentication check is complete and there's no user, redirect to login
    if (!loading && !user) {
      router.push('/auth/login'); // Assuming your login page is at /auth/login
    }
  }, [user, loading, router]);

  // Show a loading state while the user's status is being checked
  if (loading || !user) {
    return <div>Loading...</div>;
  }

  // If we get here, the user is authenticated
  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-bold">Welcome to your Dashboard, {user.name || 'User'}!</h1>
      <p>This is your protected content.</p>
      {/* Your protected dashboard content here */}
    </div>
  );
}

// FIX 2: Removed the getStaticProps function.
// A protected dashboard page cannot be statically generated at build time.
// It must be rendered on the client-side to check for a logged-in user.
