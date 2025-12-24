'use client';

import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CleanupRecommendationsError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      <div className="bg-white shadow border-b border-gray-200">
        <div className="section-container py-6">
          <Link href="/admin" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
        </div>
      </div>

      <div className="section-container py-12 text-center">
        <div className="text-5xl mb-4">⚠️</div>
        <h1 className="text-2xl font-bold text-gray-900 mb-2">Error loading cleanup recommendations</h1>
        <p className="text-gray-600 mb-6">{error.message || 'An unexpected error occurred.'}</p>

        <button onClick={() => reset()} className="btn-primary">
          Try Again
        </button>
      </div>
    </div>
  );
}
