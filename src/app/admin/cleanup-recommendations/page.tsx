'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/auth';
import { ArrowLeft, Loader, MapPin } from 'lucide-react';
import Link from 'next/link';

interface CleanupRecommendation {
  id: string;
  name: string;
  email: string;
  phone?: string;
  location_name: string;
  location_type: string;
  address: string;
  description: string;
  cleanup_type: string;
  urgency: 'low' | 'medium' | 'high';
  status: string;
  admin_notes?: string;
  created_at: string;
}

export default function AdminCleanupRecommendationsPage() {
  const router = useRouter();
  const { user, loading, isAdmin } = useAuth();
  const [recommendations, setRecommendations] = useState<CleanupRecommendation[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (!loading && user && !isAdmin) {
      router.push('/');
    }
  }, [user, loading, isAdmin, router]);

  useEffect(() => {
    if (isAdmin) {
      fetchRecommendations();
    }
  }, [isAdmin]);

  const fetchRecommendations = async () => {
    try {
      setIsLoading(true);
      setError('');

      const { data, error: fetchError } = await supabase
        .from('cleanup_recommendations')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        setError('Failed to fetch cleanup recommendations');
        console.error('Fetch error:', fetchError);
        return;
      }

      setRecommendations(data || []);
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while fetching recommendations');
    } finally {
      setIsLoading(false);
    }
  };

  const getUrgencyColor = (urgency: string) => {
    switch (urgency) {
      case 'high':
        return 'bg-red-100 text-red-800';
      case 'medium':
        return 'bg-yellow-100 text-yellow-800';
      case 'low':
        return 'bg-blue-100 text-blue-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'reviewed':
        return 'bg-blue-100 text-blue-800';
      case 'in-progress':
        return 'bg-yellow-100 text-yellow-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'not-actionable':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <div className="text-center">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-700">Loading...</p>
        </div>
      </div>
    );
  }

  if (!user || !isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Header */}
      <div className="bg-white shadow border-b border-gray-200">
        <div className="section-container py-6">
          <Link href="/admin" className="flex items-center gap-2 text-blue-600 hover:text-blue-700 font-semibold mb-4">
            <ArrowLeft className="w-5 h-5" />
            Back to Dashboard
          </Link>
          <h1 className="text-3xl font-bold text-gray-900">Cleanup Recommendations</h1>
          <p className="text-gray-600 mt-1">Total: {recommendations.length} recommendations</p>
        </div>
      </div>

      {/* Content */}
      <div className="section-container py-12">
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        {isLoading ? (
          <div className="flex justify-center items-center h-64">
            <Loader className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        ) : recommendations.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No cleanup recommendations found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {recommendations.map((rec) => (
              <div key={rec.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-purple-600">
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  <div className="flex-1">
                    <div className="flex items-start gap-2 mb-2">
                      <MapPin className="w-5 h-5 text-purple-600 flex-shrink-0 mt-0.5" />
                      <div>
                        <h3 className="text-lg font-bold text-gray-900">{rec.location_name}</h3>
                        <p className="text-gray-600 text-sm">{rec.address}</p>
                      </div>
                    </div>

                    <div className="mt-3 mb-3">
                      <p className="text-gray-700 text-sm">{rec.description}</p>
                    </div>

                    <div className="flex flex-wrap gap-2 mb-3">
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                        Type: {rec.location_type.charAt(0).toUpperCase() + rec.location_type.slice(1)}
                      </span>
                      <span className="px-2 py-1 bg-gray-100 text-gray-700 text-xs font-semibold rounded">
                        Cleanup: {rec.cleanup_type.toUpperCase()}
                      </span>
                    </div>

                    <div className="text-sm text-gray-600">
                      <p><strong>Submitted by:</strong> {rec.name} ({rec.email})</p>
                      {rec.phone && <p><strong>Phone:</strong> {rec.phone}</p>}
                      <p className="text-xs text-gray-500 mt-2">Submitted: {new Date(rec.created_at).toLocaleDateString()}</p>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2 md:items-end">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getUrgencyColor(rec.urgency)}`}>
                      {rec.urgency.charAt(0).toUpperCase() + rec.urgency.slice(1)} Urgency
                    </span>
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(rec.status)}`}>
                      {rec.status.charAt(0).toUpperCase() + rec.status.slice(1)}
                    </span>
                  </div>
                </div>

                {rec.admin_notes && (
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Admin Notes:</p>
                    <p className="text-gray-600 text-sm">{rec.admin_notes}</p>
                  </div>
                )}
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
