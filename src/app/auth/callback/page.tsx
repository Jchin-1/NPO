'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { supabase } from '@/lib/auth';

export default function AuthCallbackPage() {
  const router = useRouter();

  useEffect(() => {
    const handleCallback = async () => {
      try {
        // Supabase handles the OAuth callback automatically
        const {
          data: { session },
          error,
        } = await supabase.auth.getSession();

        if (error) {
          console.error('Auth error:', error);
          router.push('/login?error=auth_failed');
          return;
        }

        if (session) {
          // Redirect to admin dashboard
          router.push('/admin');
        } else {
          router.push('/login');
        }
      } catch (err) {
        console.error('Callback error:', err);
        router.push('/login?error=callback_failed');
      }
    };

    handleCallback();
  }, [router]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-blue-50 to-white">
      <div className="text-center">
        <div className="mb-4">
          <div className="w-12 h-12 border-4 border-blue-600 border-t-transparent rounded-full animate-spin mx-auto"></div>
        </div>
        <p className="text-gray-700 text-lg">Signing you in...</p>
      </div>
    </div>
  );
}
