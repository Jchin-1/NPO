'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/auth';
import { ArrowLeft, Loader } from 'lucide-react';
import Link from 'next/link';

interface Volunteer {
  id: string;
  name: string;
  email: string;
  phone?: string;
  availability?: string;
  skills?: string;
  is_active: boolean;
  created_at: string;
}

export default function AdminVolunteersPage() {
  const router = useRouter();
  const { user, loading, isAdmin } = useAuth();
  const [volunteers, setVolunteers] = useState<Volunteer[]>([]);
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
      fetchVolunteers();
    }
  }, [isAdmin]);

  const fetchVolunteers = async () => {
    try {
      setIsLoading(true);
      setError('');

      const { data, error: fetchError } = await supabase
        .from('volunteers')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        setError('Failed to fetch volunteers');
        console.error('Fetch error:', fetchError);
        return;
      }

      setVolunteers(data || []);
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while fetching volunteers');
    } finally {
      setIsLoading(false);
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
          <h1 className="text-3xl font-bold text-gray-900">Volunteer Applications</h1>
          <p className="text-gray-600 mt-1">Total: {volunteers.length} volunteers</p>
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
        ) : volunteers.length === 0 ? (
          <div className="text-center py-12">
            <p className="text-gray-600 text-lg">No volunteer applications found</p>
          </div>
        ) : (
          <div className="space-y-4">
            {volunteers.map((volunteer) => (
              <div key={volunteer.id} className="bg-white rounded-lg shadow p-6 border-l-4 border-green-600">
                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <h3 className="text-lg font-bold text-gray-900">{volunteer.name}</h3>
                    <p className="text-gray-600">{volunteer.email}</p>
                    {volunteer.phone && <p className="text-gray-600">{volunteer.phone}</p>}
                  </div>
                  <div className="flex items-start justify-end">
                    <span className={`px-3 py-1 rounded-full text-sm font-semibold ${
                      volunteer.is_active ? 'bg-green-100 text-green-800' : 'bg-gray-100 text-gray-800'
                    }`}>
                      {volunteer.is_active ? 'Active' : 'Inactive'}
                    </span>
                  </div>
                </div>

                {volunteer.skills && (
                  <div className="mt-4">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Skills:</p>
                    <p className="text-gray-600 text-sm">{volunteer.skills}</p>
                  </div>
                )}

                {volunteer.availability && (
                  <div className="mt-2">
                    <p className="text-sm font-semibold text-gray-700 mb-1">Availability:</p>
                    <p className="text-gray-600 text-sm">{volunteer.availability}</p>
                  </div>
                )}

                <p className="text-xs text-gray-500 mt-4">Applied: {new Date(volunteer.created_at).toLocaleDateString()}</p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
