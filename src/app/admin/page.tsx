'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { BarChart3, FileText, Users, Trash2, LogOut, Gift } from 'lucide-react';
import { signOut } from '@/lib/auth';
import Link from 'next/link';

export default function AdminDashboardPage() {
  const router = useRouter();
  const { user, loading, isAdmin } = useAuth();

  useEffect(() => {
    if (!loading && !user) {
      router.push('/login');
    }
    if (!loading && user && !isAdmin) {
      router.push('/');
    }
  }, [user, loading, isAdmin, router]);

  const handleLogout = async () => {
    await signOut();
    router.push('/');
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
        <div className="section-container py-6 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-gray-900">Admin Dashboard</h1>
            <p className="text-gray-600 mt-1">Logged in as: {user.email}</p>
          </div>
          <button
            onClick={handleLogout}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700 font-semibold transition-colors"
          >
            <LogOut className="w-5 h-5" />
            Logout
          </button>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="section-container py-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-8">Manage Submissions</h2>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Snow Requests Card */}
          <Link href="/admin/snow-requests">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-blue-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Snow Removal</h3>
                <div className="bg-blue-100 p-3 rounded-lg">
                  <FileText className="w-6 h-6 text-blue-600" />
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm">Snow removal service requests from the community.</p>
              <div className="text-sm text-blue-600 font-semibold">View Details →</div>
            </div>
          </Link>

          {/* Volunteer Applications Card */}
          <Link href="/admin/volunteers">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-green-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Volunteers</h3>
                <div className="bg-green-100 p-3 rounded-lg">
                  <Users className="w-6 h-6 text-green-600" />
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm">Volunteer applications and registrations.</p>
              <div className="text-sm text-green-600 font-semibold">View Details →</div>
            </div>
          </Link>

          {/* Cleanup Recommendations Card */}
          <Link href="/admin/cleanup-recommendations">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-purple-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Cleanups</h3>
                <div className="bg-purple-100 p-3 rounded-lg">
                  <Trash2 className="w-6 h-6 text-purple-600" />
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm">Public space cleanup recommendations.</p>
              <div className="text-sm text-purple-600 font-semibold">View Details →</div>
            </div>
          </Link>

          {/* Donations Card */}
          <Link href="/admin/food-clothes-drives">
            <div className="bg-white rounded-lg shadow-lg p-6 hover:shadow-xl transition-shadow cursor-pointer border-l-4 border-amber-600">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-gray-900">Donations</h3>
                <div className="bg-amber-100 p-3 rounded-lg">
                  <Gift className="w-6 h-6 text-amber-600" />
                </div>
              </div>
              <p className="text-gray-600 mb-4 text-sm">Food & clothes drive donations for pickup.</p>
              <div className="text-sm text-amber-600 font-semibold">View Details →</div>
            </div>
          </Link>
        </div>

        {/* Stats Section */}
        <div className="mt-12 bg-white rounded-lg shadow-lg p-8">
          <h3 className="text-xl font-bold text-gray-900 mb-6 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-blue-600" />
            Quick Stats
          </h3>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="text-4xl font-bold text-blue-600 mb-2">—</div>
              <p className="text-gray-600">Total Snow Requests</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-green-600 mb-2">—</div>
              <p className="text-gray-600">Total Volunteers</p>
            </div>
            <div className="text-center">
              <div className="text-4xl font-bold text-purple-600 mb-2">—</div>
              <p className="text-gray-600">Cleanup Recommendations</p>
            </div>
          </div>
          <p className="text-center text-gray-500 text-sm mt-6">Stats will load when you view individual sections</p>
        </div>
      </div>
    </div>
  );
}
