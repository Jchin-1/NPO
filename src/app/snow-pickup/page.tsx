'use client';

import { useState } from 'react';
import { Wind, AlertCircle } from 'lucide-react';
import { submitSnowRequest } from '@/app/actions/snow-requests';

interface FormData {
  name: string;
  phone: string;
  address: string;
  priority: string;
}

export default function SnowPickupPage() {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    phone: '',
    address: '',
    priority: 'medium',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate form
    if (!formData.name || !formData.phone || !formData.address) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    // Validate phone format
    const phoneRegex = /^[\d\s\-\(\)]+$/;
    if (!phoneRegex.test(formData.phone)) {
      setError('Please enter a valid phone number');
      setLoading(false);
      return;
    }

    try {
      // Call server action
      const response = await submitSnowRequest(formData);

      if (response.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          phone: '',
          address: '',
          priority: 'medium',
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(response.error || 'Failed to submit request');
      }
    } catch (err) {
      setError('An error occurred. Please try again later.');
      console.error('Submission error:', err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white">
        <div className="section-container">
          <div className="flex items-start gap-4 mb-6">
            <Wind className="w-12 h-12 flex-shrink-0" />
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Snow Removal Service</h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                Free winter weather assistance for elderly and vulnerable residents
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Information Section */}
      <section className="bg-white border-b border-gray-200">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-start">
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">How It Works</h2>

              <div className="space-y-6">
                <div className="flex gap-4">
                  <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-blue-600">
                    1
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Submit Request</h3>
                    <p className="text-gray-700">
                      Fill out the form with your information and priority level
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-blue-600">
                    2
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">We Confirm</h3>
                    <p className="text-gray-700">
                      Our team will contact you within 24 hours to confirm details
                    </p>
                  </div>
                </div>

                <div className="flex gap-4">
                  <div className="bg-blue-100 w-10 h-10 rounded-full flex items-center justify-center flex-shrink-0 font-bold text-blue-600">
                    3
                  </div>
                  <div>
                    <h3 className="font-semibold text-gray-900 mb-2">Service Provided</h3>
                    <p className="text-gray-700">
                      Our volunteers will clear snow from driveway, walkway, and roof as needed
                    </p>
                  </div>
                </div>
              </div>

              <div className="mt-8 bg-blue-50 border border-blue-200 rounded-lg p-6">
                <div className="flex gap-3 items-start">
                  <AlertCircle className="w-5 h-5 text-blue-600 flex-shrink-0 mt-1" />
                  <div>
                    <p className="font-semibold text-blue-900 mb-2">Priority Levels</p>
                    <ul className="text-blue-800 space-y-1 text-sm">
                      <li>
                        <strong>High:</strong> Mobility impaired, medical equipment outside
                      </li>
                      <li>
                        <strong>Medium:</strong> Elderly resident, limited mobility
                      </li>
                      <li>
                        <strong>Standard:</strong> General request, average urgency
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Service Request Form */}
            <div>
              <h2 className="text-3xl font-bold text-gray-900 mb-6">Request Service</h2>

              {submitted && (
                <div className="mb-6 bg-green-50 border border-green-200 rounded-lg p-4">
                  <p className="text-green-800 font-semibold">
                    ✓ Request submitted successfully! We'll contact you soon.
                  </p>
                </div>
              )}

              {error && (
                <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4">
                  <p className="text-red-800 font-semibold">{error}</p>
                </div>
              )}

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Name Field */}
                <div>
                  <label htmlFor="name" className="block text-lg font-semibold text-gray-900 mb-2">
                    Full Name <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Smith"
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    required
                    aria-required="true"
                  />
                </div>

                {/* Phone Field */}
                <div>
                  <label htmlFor="phone" className="block text-lg font-semibold text-gray-900 mb-2">
                    Phone Number <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="tel"
                    id="phone"
                    name="phone"
                    value={formData.phone}
                    onChange={handleChange}
                    placeholder="(555) 123-4567"
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    required
                    aria-required="true"
                  />
                  <p className="text-gray-600 text-sm mt-2">We'll use this to confirm your request</p>
                </div>

                {/* Address Field */}
                <div>
                  <label htmlFor="address" className="block text-lg font-semibold text-gray-900 mb-2">
                    Street Address <span className="text-red-600">*</span>
                  </label>
                  <input
                    type="text"
                    id="address"
                    name="address"
                    value={formData.address}
                    onChange={handleChange}
                    placeholder="123 Main Street"
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                    required
                    aria-required="true"
                  />
                </div>

                {/* Priority Dropdown */}
                <div>
                  <label htmlFor="priority" className="block text-lg font-semibold text-gray-900 mb-2">
                    Priority Level
                  </label>
                  <select
                    id="priority"
                    name="priority"
                    value={formData.priority}
                    onChange={handleChange}
                    className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                  >
                    <option value="high">High - Mobility impaired or medical equipment</option>
                    <option value="medium">Medium - Elderly resident, limited mobility</option>
                    <option value="standard">Standard - General request</option>
                  </select>
                  <p className="text-gray-600 text-sm mt-2">
                    Help us prioritize requests for those most in need
                  </p>
                </div>

                {/* Submit Button */}
                <button
                  type="submit"
                  disabled={loading}
                  className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4 font-semibold"
                >
                  {loading ? 'Submitting...' : 'Submit Service Request'}
                </button>

                <p className="text-sm text-gray-600 text-center">
                  Our team will contact you within 24 hours to confirm
                </p>
              </form>
            </div>
          </div>
        </div>
      </section>

      {/* Additional Info */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="section-container">
          <h2 className="section-title">Frequently Asked Questions</h2>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Is there a cost?</h3>
              <p className="text-gray-700">
                No, our snow removal service is completely free for eligible seniors and vulnerable
                residents. We believe everyone deserves safe, accessible homes during winter.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">How quickly can you help?</h3>
              <p className="text-gray-700">
                High-priority requests are typically addressed within 24-48 hours. During heavy
                snow, response times may be longer depending on demand.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">What's included in the service?</h3>
              <p className="text-gray-700">
                We clear driveways, walkways, front steps, and roofs when safe to do so. We'll also
                check on the accessibility of your home's main entrances.
              </p>
            </div>

            <div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Can I request help for someone else?</h3>
              <p className="text-gray-700">
                Yes! If you're requesting on behalf of an elderly neighbor or family member, please
                call us at (555) 123-4567 to discuss their needs.
              </p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
