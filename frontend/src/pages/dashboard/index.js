// pages/dashboard.js
import { useEffect } from 'react'
import { useRouter } from 'next/router'
import { useAuth } from '../context/AuthContext'

export default function Dashboard() {
  const { user, loading } = useAuth()
  const router = useRouter()

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login')
    }
  }, [user, loading, router])

  // Show loading state during authentication check
  if (loading) {
    return <div>Loading...</div>
  }

  // Show login redirect message if not authenticated
  if (!user) {
    return <div>Redirecting to login...</div>
  }

  return (
    <div>
      <h1>Dashboard</h1>
      {/* Your protected content here */}
    </div>
  )
}

// This enables static generation
export async function getStaticProps() {
  return {
    props: {}
  }
}
