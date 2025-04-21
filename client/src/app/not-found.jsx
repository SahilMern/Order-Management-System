import Link from 'next/link'
import { FaHome, FaSearch } from 'react-icons/fa'

export default function NotFound() {
  return (
    <div className="min-h-screen  flex items-center justify-center px-4">
      <div className="max-w-md w-full text-center bg-white p-8 rounded-xl shadow-lg">
        <div className="text-8xl font-bold text-blue-600 mb-6">404</div>
        <h1 className="text-3xl font-bold text-gray-800 mb-3">Page Not Found</h1>
        <p className="text-gray-600 mb-8">
          Oops! The page you're looking for doesn't exist or has been moved.
        </p>
        
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link
            href="/"
            className="flex items-center justify-center gap-2 px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
          >
            <FaHome />
            Go Home
          </Link>
          <Link
            href="/products"
            className="flex items-center justify-center gap-2 px-6 py-3 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-50 transition"
          >
            <FaSearch />
            Browse Products
          </Link>
        </div>
      </div>
    </div>
  )
}