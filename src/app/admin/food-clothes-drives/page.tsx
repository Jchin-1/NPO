'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/lib/AuthContext';
import { supabase } from '@/lib/auth';
import { ArrowLeft, Loader, Gift } from 'lucide-react';
import Link from 'next/link';

interface FoodClothsDrive {
  id: string;
  name: string;
  email: string;
  phone: string;
  address: string;
  drive_type: 'food' | 'clothes' | 'both';
  items_description: string;
  quantity: string;
  pickup_date: string;
  pickup_time: string;
  special_instructions?: string;
  status: string;
  created_at: string;
}

export default function AdminFoodClothesDrivesPage() {
  const router = useRouter();
  const { user, loading, isAdmin } = useAuth();
  const [donations, setDonations] = useState<FoodClothsDrive[]>([]);
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
      fetchDonations();
    }
  }, [isAdmin]);

  const fetchDonations = async () => {
    try {
      setIsLoading(true);
      setError('');

      const { data, error: fetchError } = await supabase
        .from('food_clothes_drives')
        .select('*')
        .order('created_at', { ascending: false });

      if (fetchError) {
        setError('Failed to fetch donations');
        console.error('Fetch error:', fetchError);
        return;
      }

      setDonations(data || []);
    } catch (err) {
      console.error('Error:', err);
      setError('An error occurred while fetching donations');
    } finally {
      setIsLoading(false);
    }
  };

  const getDriveTypeColor = (driveType: string) => {
    switch (driveType) {
      case 'food':
        return 'bg-amber-100 text-amber-800';
      case 'clothes':
        return 'bg-blue-100 text-blue-800';
      case 'both':
        return 'bg-purple-100 text-purple-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  const getDriveTypeIcon = (driveType: string) => {
    switch (driveType) {
      case 'food':
        return '🍎';
      case 'clothes':
        return '👕';
      case 'both':
        return '📦';
      default:
        return '📦';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending':
        return 'bg-gray-100 text-gray-800';
      case 'scheduled':
        return 'bg-blue-100 text-blue-800';
      case 'completed':
        return 'bg-green-100 text-green-800';
      case 'cancelled':
        return 'bg-red-100 text-red-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
        <Loader className="w-8 h-8 text-blue-600 animate-spin" />
      </div>
    );
  }

  if (!isAdmin) {
    return null;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white py-12 px-4 sm:px-6 lg:px-8">
      <div className="section-container">
        {/* Header */}
        <div className="flex items-center gap-4 mb-8">
          <Link
            href="/admin"
            className="p-2 hover:bg-gray-100 rounded-lg transition-colors"
            aria-label="Back to admin"
          >
            <ArrowLeft className="w-6 h-6 text-gray-600" />
          </Link>
          <div className="flex items-center gap-3">
            <div className="bg-amber-100 p-3 rounded-lg">
              <Gift className="w-6 h-6 text-amber-700" />
            </div>
            <h1 className="text-3xl font-bold text-gray-900">Food & Clothes Donations</h1>
          </div>
        </div>

        {/* Stats */}
        <div className="grid md:grid-cols-4 gap-4 mb-8">
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Total Donations</p>
            <p className="text-2xl font-bold text-gray-900">{donations.length}</p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Pending</p>
            <p className="text-2xl font-bold text-gray-900">
              {donations.filter((d) => d.status === 'pending').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Scheduled</p>
            <p className="text-2xl font-bold text-gray-900">
              {donations.filter((d) => d.status === 'scheduled').length}
            </p>
          </div>
          <div className="bg-white p-4 rounded-lg border border-gray-200">
            <p className="text-sm text-gray-600 mb-1">Completed</p>
            <p className="text-2xl font-bold text-gray-900">
              {donations.filter((d) => d.status === 'completed').length}
            </p>
          </div>
        </div>

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg text-red-800">
            {error}
          </div>
        )}

        {/* Loading State */}
        {isLoading && (
          <div className="flex items-center justify-center py-12">
            <Loader className="w-8 h-8 text-blue-600 animate-spin" />
          </div>
        )}

        {/* Donations List */}
        {!isLoading && donations.length === 0 && (
          <div className="bg-white rounded-lg border border-gray-200 p-12 text-center">
            <Gift className="w-12 h-12 text-gray-400 mx-auto mb-4" />
            <p className="text-lg text-gray-600">No donation requests yet</p>
          </div>
        )}

        {!isLoading && donations.length > 0 && (
          <div className="space-y-4">
            {donations.map((donation) => (
              <div
                key={donation.id}
                className="bg-white rounded-lg border border-gray-200 p-6 hover:shadow-md transition-shadow"
              >
                <div className="flex flex-col md:flex-row md:items-start md:justify-between gap-4">
                  {/* Left Side - Donor Info */}
                  <div className="flex-1">
                    <div className="flex items-center gap-2 mb-3">
                      <span className="text-2xl">{getDriveTypeIcon(donation.drive_type)}</span>
                      <h3 className="text-lg font-bold text-gray-900">{donation.name}</h3>
                      <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getDriveTypeColor(donation.drive_type)}`}>
                        {donation.drive_type === 'food' && '🍎 Food'}
                        {donation.drive_type === 'clothes' && '👕 Clothes'}
                        {donation.drive_type === 'both' && '📦 Both'}
                      </span>
                    </div>

                    <div className="space-y-2 text-sm">
                      <p className="text-gray-700">
                        <span className="font-semibold">Email:</span> {donation.email}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Phone:</span> {donation.phone}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Address:</span> {donation.address}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Items:</span> {donation.items_description}
                      </p>
                      <p className="text-gray-700">
                        <span className="font-semibold">Quantity:</span> {donation.quantity}
                      </p>
                    </div>

                    {donation.special_instructions && (
                      <div className="mt-3 p-3 bg-blue-50 rounded-lg border border-blue-200">
                        <p className="text-sm">
                          <span className="font-semibold text-blue-900">Special Instructions:</span>
                          <br />
                          <span className="text-blue-800">{donation.special_instructions}</span>
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Right Side - Pickup & Status */}
                  <div className="md:w-56 flex flex-col gap-3">
                    <div className="bg-blue-50 p-3 rounded-lg border border-blue-200">
                      <p className="text-xs text-blue-600 font-semibold mb-1">PICKUP SCHEDULED</p>
                      <p className="text-sm font-bold text-blue-900">{donation.pickup_date}</p>
                      <p className="text-sm text-blue-800">{donation.pickup_time}</p>
                    </div>

                    <div className="flex flex-col gap-2">
                      <span className={`px-3 py-2 rounded-lg text-sm font-semibold text-center ${getStatusColor(donation.status)}`}>
                        {donation.status.charAt(0).toUpperCase() + donation.status.slice(1)}
                      </span>
                      <p className="text-xs text-gray-600 text-center">
                        {new Date(donation.created_at).toLocaleDateString('en-US', {
                          month: 'short',
                          day: 'numeric',
                          year: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
