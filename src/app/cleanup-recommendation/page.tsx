'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle, MapPin } from 'lucide-react';
import { submitCleanupRecommendation, type CleanupRecommendationFormData } from '@/app/actions/snow-requests';

export default function CleanupRecommendationPage() {
  const [formData, setFormData] = useState<CleanupRecommendationFormData>({
    name: '',
    email: '',
    phone: '',
    locationName: '',
    locationType: 'park',
    address: '',
    description: '',
    cleanupType: 'litter',
    urgency: 'medium',
  });

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    const result = await submitCleanupRecommendation(formData);

    if (result.success) {
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        locationName: '',
        locationType: 'park',
        address: '',
        description: '',
        cleanupType: 'litter',
        urgency: 'medium',
      });

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } else {
      setError(result.error || 'An error occurred while submitting your recommendation');
    }

    setLoading(false);
  };

  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white">
        <div className="section-container">
          <div className="flex items-start gap-4 mb-6">
            <MapPin className="w-12 h-12 flex-shrink-0" />
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Recommend a Public Space for Cleanup</h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                See a public area that needs attention? Share your recommendation with us. We review all submissions and prioritize cleanup efforts based on community feedback.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-white">
        <div className="section-container">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Why Report a Location?</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12\">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl mb-3">🔍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Help Identify Problem Areas</h3>
            <p className="text-gray-700">Bring attention to overlooked public spaces that need maintenance.</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl mb-3">📍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Community-Driven Cleanup</h3>
            <p className="text-gray-700">Your feedback helps us plan targeted cleanup initiatives across the region.</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl mb-3">⭐</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Make an Impact</h3>
            <p className="text-gray-700">Be part of keeping our community parks, streets, and public spaces clean.</p>
          </div>
        </div>
        </div>
      </div>

      {/* Form Section */}
      <section className="bg-white border-t border-gray-200">
        <div className="section-container">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Submit Your Recommendation</h2>

          {/* Success Message */}
          {success && (
            <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
              <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-green-900">Thank You!</p>
              <p className="text-green-800">Your cleanup recommendation has been submitted successfully. We appreciate your feedback!</p>
            </div>
          </div>
        )}

        {/* Error Message */}
        {error && (
          <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded-lg flex items-start gap-3">
            <AlertCircle className="w-6 h-6 text-red-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-red-900">Error</p>
              <p className="text-red-800">{error}</p>
            </div>
          </div>
        )}

        <form onSubmit={handleSubmit} className="space-y-6">
          {/* Your Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Your Information</h3>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Full Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Your name"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="your.email@example.com"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
                  required
                />
              </div>

              <div className="md:col-span-2">
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-gray-500">(optional)</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(xxx) xxx-xxxx"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
                />
              </div>
            </div>
          </div>

          {/* Location Information */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Location Details</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Location Name <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="locationName"
                  value={formData.locationName}
                  onChange={handleChange}
                  placeholder="e.g., Brampton Central Park, Main Street near City Hall"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Location Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="locationType"
                    value={formData.locationType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
                    required
                  >
                    <option value="park">Park</option>
                    <option value="street">Street/Sidewalk</option>
                    <option value="playground">Playground</option>
                    <option value="parking-lot">Parking Lot</option>
                    <option value="other">Other Public Space</option>
                  </select>
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Cleanup Type <span className="text-red-600">*</span>
                  </label>
                  <select
                    name="cleanupType"
                    value={formData.cleanupType}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
                    required
                  >
                    <option value="litter">Litter/Garbage</option>
                    <option value="graffiti">Graffiti</option>
                    <option value="overgrowth">Overgrowth/Vegetation</option>
                    <option value="snow-removal">Snow Removal</option>
                    <option value="multiple">Multiple Issues</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Full address or intersection"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
                  required
                />
              </div>
            </div>
          </div>

          {/* Cleanup Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Cleanup Details</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Description <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="description"
                  value={formData.description}
                  onChange={handleChange}
                  placeholder="Please describe the issue in detail. What needs to be cleaned up? How severe is the problem?"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base resize-none"
                  rows={5}
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Urgency Level <span className="text-red-600">*</span>
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {['low', 'medium', 'high'].map((level) => (
                    <label key={level} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="urgency"
                        value={level}
                        checked={formData.urgency === level}
                        onChange={handleChange}
                        className="mr-3 w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-600"
                      />
                      <span className="text-base font-medium text-gray-700 capitalize">
                        {level === 'low' && '🟢 Low - Can wait'}
                        {level === 'medium' && '🟡 Medium - Should address soon'}
                        {level === 'high' && '🔴 High - Urgent attention needed'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex gap-4">
            <button
              type="submit"
              disabled={loading}
              className="btn-primary disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? 'Submitting...' : 'Submit Recommendation'}
            </button>
            <button
              type="reset"
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 text-base focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              onClick={() => setFormData({
                name: '',
                email: '',
                phone: '',
                locationName: '',
                locationType: 'park',
                address: '',
                description: '',
                cleanupType: 'litter',
                urgency: 'medium',
              })}
            >
              Clear Form
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Your Feedback Matters:</strong> Every recommendation is reviewed by our team. We prioritize locations based on urgency, impact on the community, and available resources. Thank you for helping keep our Peel Region clean and safe!
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="section-container mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded-lg border border-gray-200">
            <summary className="font-semibold text-gray-900 cursor-pointer">What happens after I submit a recommendation?</summary>
            <p className="mt-3 text-gray-700">Your recommendation will be reviewed by our team. If it&apos;s in our service area and feasible to address, we&apos;ll add it to our cleanup schedule. You&apos;ll receive confirmation that we received your submission.</p>
          </details>

          <details className="bg-white p-4 rounded-lg border border-gray-200">
            <summary className="font-semibold text-gray-900 cursor-pointer">Can I recommend locations outside the Peel Region?</summary>
            <p className="mt-3 text-gray-700">Our services are focused on Brampton, Mississauga, and Caledon. We may refer recommendations for other areas to the appropriate municipality.</p>
          </details>

          <details className="bg-white p-4 rounded-lg border border-gray-200">
            <summary className="font-semibold text-gray-900 cursor-pointer">How long does cleanup usually take?</summary>
            <p className="mt-3 text-gray-700">Timeline depends on the scope of work, weather conditions, and available resources. High-urgency items are typically addressed within 2-4 weeks of approval.</p>
          </details>

          <details className="bg-white p-4 rounded-lg border border-gray-200">
            <summary className="font-semibold text-gray-900 cursor-pointer">Can I volunteer to help with the cleanup?</summary>
            <p className="mt-3 text-gray-700">Absolutely! Visit our <a href="/volunteer" className="text-blue-600 font-semibold hover:underline">Volunteer page</a> to join our team and contribute to community cleanup efforts.</p>
          </details>
        </div>
        </div>
      </section>
    </div>
  );
}
