'use client';

import { useState } from 'react';
import { AlertCircle, CheckCircle, Gift } from 'lucide-react';
import { submitFoodClothsDrive, type FoodClothsDriveFormData } from '@/app/actions/snow-requests';

export default function FoodClothesDrivePage() {
  const [formData, setFormData] = useState<FoodClothsDriveFormData>({
    name: '',
    email: '',
    phone: '',
    address: '',
    driveType: 'both',
    itemsDescription: '',
    quantity: '',
    pickupDate: '',
    pickupTime: '',
    specialInstructions: '',
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

    const result = await submitFoodClothsDrive(formData);

    if (result.success) {
      setSuccess(true);
      setFormData({
        name: '',
        email: '',
        phone: '',
        address: '',
        driveType: 'both',
        itemsDescription: '',
        quantity: '',
        pickupDate: '',
        pickupTime: '',
        specialInstructions: '',
      });

      setTimeout(() => {
        setSuccess(false);
      }, 5000);
    } else {
      setError(result.error || 'An error occurred while submitting your request');
    }

    setLoading(false);
  };

  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white">
        <div className="section-container">
          <div className="flex items-start gap-4 mb-6">
            <Gift className="w-12 h-12 flex-shrink-0" />
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Food & Clothes Drive</h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                Have donations to give? Schedule a volunteer pickup from your home. We collect food and clothing items to help families in need across our community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <div className="bg-white">
        <div className="section-container">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">How It Works</h2>
          <div className="grid md:grid-cols-3 gap-6 mb-12\">
          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl mb-3">📝</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Fill Out Form</h3>
            <p className="text-gray-700">Tell us what you&apos;d like to donate and when you&apos;re available for pickup.</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl mb-3">📍</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Confirm Pickup</h3>
            <p className="text-gray-700">A volunteer will contact you to confirm the pickup date and time.</p>
          </div>

          <div className="bg-white p-6 rounded-lg border border-gray-200">
            <div className="text-3xl mb-3">🚗</div>
            <h3 className="text-lg font-semibold text-gray-900 mb-2">Volunteer Pickup</h3>
            <p className="text-gray-700">Our volunteers will come to your home and collect the donations.</p>
          </div>
        </div>
        </div>
      </div>

      {/* Form Section */}
      <section className="bg-white border-t border-gray-200">
        <div className="section-container">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Schedule Your Donation Pickup</h2>

        {/* Success Message */}
        {success && (
          <div className="mb-6 p-4 bg-green-50 border border-green-200 rounded-lg flex items-start gap-3">
            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0 mt-0.5" />
            <div>
              <p className="font-semibold text-green-900">Thank You!</p>
              <p className="text-green-800">Your donation request has been received. A volunteer will contact you shortly to confirm the pickup details.</p>
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

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Phone Number <span className="text-red-600">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(xxx) xxx-xxxx"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Home Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleChange}
                  placeholder="Street address for pickup"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
                  required
                />
              </div>
            </div>
          </div>

          {/* Donation Details */}
          <div>
            <h3 className="text-lg font-semibold text-gray-900 mb-4">Donation Details</h3>
            <div className="space-y-6">
              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  What are you donating? <span className="text-red-600">*</span>
                </label>
                <div className="grid md:grid-cols-3 gap-4">
                  {['food', 'clothes', 'both'].map((type) => (
                    <label key={type} className="flex items-center cursor-pointer">
                      <input
                        type="radio"
                        name="driveType"
                        value={type}
                        checked={formData.driveType === type}
                        onChange={handleChange}
                        className="mr-3 w-5 h-5 text-blue-600 focus:ring-2 focus:ring-blue-600"
                      />
                      <span className="text-base font-medium text-gray-700 capitalize">
                        {type === 'food' && '🍎 Food Only'}
                        {type === 'clothes' && '👕 Clothes Only'}
                        {type === 'both' && '📦 Food & Clothes'}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Items Description <span className="text-red-600">*</span>
                </label>
                <textarea
                  name="itemsDescription"
                  value={formData.itemsDescription}
                  onChange={handleChange}
                  placeholder="Please describe the items (e.g., canned goods, frozen vegetables, winter clothes, shoes, etc.)"
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base resize-none"
                  rows={4}
                  required
                />
              </div>

              <div className="grid md:grid-cols-2 gap-6">
                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Approximate Quantity <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    name="quantity"
                    value={formData.quantity}
                    onChange={handleChange}
                    placeholder="e.g., 5 boxes, 10 bags, 3 large bags"
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
                    required
                  />
                </div>

                <div>
                  <label className="block text-base font-medium text-gray-700 mb-2">
                    Preferred Pickup Date <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="date"
                    name="pickupDate"
                    value={formData.pickupDate}
                    onChange={handleChange}
                    className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
                    required
                  />
                </div>
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Preferred Pickup Time <span className="text-red-600">*</span>
                </label>
                <input
                  type="time"
                  name="pickupTime"
                  value={formData.pickupTime}
                  onChange={handleChange}
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base"
                  required
                />
              </div>

              <div>
                <label className="block text-base font-medium text-gray-700 mb-2">
                  Special Instructions <span className="text-gray-500">(optional)</span>
                </label>
                <textarea
                  name="specialInstructions"
                  value={formData.specialInstructions}
                  onChange={handleChange}
                  placeholder="E.g., gate code, directions, best entrance, accessibility notes, etc."
                  className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-600 focus:border-transparent text-base resize-none"
                  rows={3}
                />
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
              {loading ? 'Submitting...' : 'Schedule Pickup'}
            </button>
            <button
              type="reset"
              className="px-6 py-3 border-2 border-gray-300 text-gray-700 font-bold rounded-lg hover:bg-gray-50 text-base focus:ring-2 focus:ring-offset-2 focus:ring-blue-600"
              onClick={() => setFormData({
                name: '',
                email: '',
                phone: '',
                address: '',
                driveType: 'both',
                itemsDescription: '',
                quantity: '',
                pickupDate: '',
                pickupTime: '',
                specialInstructions: '',
              })}
            >
              Clear Form
            </button>
          </div>
        </form>

        {/* Info Box */}
        <div className="mt-8 p-4 bg-blue-50 border border-blue-200 rounded-lg">
          <p className="text-sm text-blue-900">
            <strong>Important:</strong> All donations must be clean, in good condition, and unexpired (for food items). Please ensure food items are packaged securely. A volunteer will contact you within 24 hours to confirm the pickup.
          </p>
        </div>
      </div>

      {/* FAQ Section */}
      <div className="section-container mt-12">
        <h2 className="text-2xl font-bold text-gray-900 mb-6">Frequently Asked Questions</h2>
        <div className="space-y-4">
          <details className="bg-white p-4 rounded-lg border border-gray-200">
            <summary className="font-semibold text-gray-900 cursor-pointer">What items can I donate?</summary>
            <p className="mt-3 text-gray-700">Food: Non-perishable items, canned goods, dry goods. Clothes: Clean, gently-used clothing in all sizes. Please avoid heavily worn or stained items.</p>
          </details>

          <details className="bg-white p-4 rounded-lg border border-gray-200">
            <summary className="font-semibold text-gray-900 cursor-pointer">How long does pickup take?</summary>
            <p className="mt-3 text-gray-700">Typically 10-15 minutes. Our volunteers will call 30 minutes before arrival to confirm they&apos;re on the way.</p>
          </details>

          <details className="bg-white p-4 rounded-lg border border-gray-200">
            <summary className="font-semibold text-gray-900 cursor-pointer">Can I get a donation receipt?</summary>
            <p className="mt-3 text-gray-700">Yes! We&apos;ll send you an email receipt and can provide a formal donation letter for tax purposes if needed.</p>
          </details>

          <details className="bg-white p-4 rounded-lg border border-gray-200">
            <summary className="font-semibold text-gray-900 cursor-pointer">What if I need to reschedule?</summary>
            <p className="mt-3 text-gray-700">Contact us as soon as possible at the email or phone number on your confirmation. We&apos;ll work with you to find a better time.</p>
          </details>
        </div>
        </div>
      </section>
    </div>
  );
}
