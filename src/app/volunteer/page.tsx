'use client';

import { useState } from 'react';
import { Heart } from 'lucide-react';
import { submitVolunteerApplication } from '@/app/actions/snow-requests';

interface VolunteerFormData {
  name: string;
  email: string;
  phone: string;
  availability: string;
  skills: string;
}

export default function VolunteerPage() {
  const [formData, setFormData] = useState<VolunteerFormData>({
    name: '',
    email: '',
    phone: '',
    availability: '',
    skills: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    // Validate form
    if (!formData.name || !formData.email) {
      setError('Please fill in all required fields');
      setLoading(false);
      return;
    }

    // Validate email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(formData.email)) {
      setError('Please enter a valid email address');
      setLoading(false);
      return;
    }

    try {
      // Call server action to submit volunteer application
      const response = await submitVolunteerApplication(formData);

      if (response.success) {
        setSubmitted(true);
        setFormData({
          name: '',
          email: '',
          phone: '',
          availability: '',
          skills: '',
        });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        setError(response.error || 'Failed to submit application. Please try again.');
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
            <Heart className="w-12 h-12 flex-shrink-0" />
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold mb-4">Join Our Volunteer Team</h1>
              <p className="text-xl text-blue-100 max-w-2xl">
                Make a difference in the Peel Region. We&apos;re looking for dedicated volunteers to help us serve the community.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Benefits Section */}
      <section className="bg-white border-b border-gray-200 py-16">
        <div className="section-container">
          <h2 className="section-title text-center mb-12">Why Volunteer With Us?</h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
              <div className="text-4xl font-bold text-blue-600 mb-4">🤝</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Make an Impact</h3>
              <p className="text-gray-700">
                Directly help vulnerable members of our community during critical times
              </p>
            </div>

            <div className="bg-green-50 p-8 rounded-lg border border-green-200">
              <div className="text-4xl font-bold text-green-600 mb-4">👥</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Build Connections</h3>
              <p className="text-gray-700">
                Meet like-minded people and become part of a caring community
              </p>
            </div>

            <div className="bg-purple-50 p-8 rounded-lg border border-purple-200">
              <div className="text-4xl font-bold text-purple-600 mb-4">🎓</div>
              <h3 className="text-lg font-bold text-gray-900 mb-3">Grow Your Skills</h3>
              <p className="text-gray-700">
                Develop new skills and gain valuable experience while helping others
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Volunteer Application Form */}
      <section className="bg-white">
        <div className="section-container">
          <div className="max-w-2xl mx-auto">
            <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Volunteer Application</h2>

            {submitted && (
              <div className="mb-6 bg-green-50 border-2 border-green-200 rounded-lg p-4">
                <p className="text-green-800 font-semibold">
                  ✓ Thank you for your interest! We&apos;ve received your application and will be in touch soon.
                </p>
              </div>
            )}

            {error && (
              <div className="mb-6 bg-red-50 border-2 border-red-200 rounded-lg p-4">
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

              {/* Email Field */}
              <div>
                <label htmlFor="email" className="block text-lg font-semibold text-gray-900 mb-2">
                  Email Address <span className="text-red-600">*</span>
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="john@example.com"
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                  required
                  aria-required="true"
                />
              </div>

              {/* Phone Field */}
              <div>
                <label htmlFor="phone" className="block text-lg font-semibold text-gray-900 mb-2">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="(555) 123-4567"
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200"
                />
              </div>

              {/* Availability Field */}
              <div>
                <label htmlFor="availability" className="block text-lg font-semibold text-gray-900 mb-2">
                  Availability
                </label>
                <textarea
                  id="availability"
                  name="availability"
                  value={formData.availability}
                  onChange={handleChange}
                  placeholder="e.g., Weekends, Weekday evenings, Flexible"
                  rows={3}
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 resize-none"
                />
              </div>

              {/* Skills Field */}
              <div>
                <label htmlFor="skills" className="block text-lg font-semibold text-gray-900 mb-2">
                  Skills &amp; Expertise
                </label>
                <textarea
                  id="skills"
                  name="skills"
                  value={formData.skills}
                  onChange={handleChange}
                  placeholder="e.g., Snow removal, carpentry, organizing, event planning, etc."
                  rows={3}
                  className="w-full px-4 py-3 text-lg border-2 border-gray-300 rounded-lg focus:outline-none focus:border-blue-600 focus:ring-2 focus:ring-blue-200 resize-none"
                />
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={loading}
                className="w-full btn-primary disabled:opacity-50 disabled:cursor-not-allowed text-lg py-4 font-semibold"
              >
                {loading ? 'Submitting...' : 'Submit Application'}
              </button>

              <p className="text-sm text-gray-600 text-center">
                We&apos;ll review your application and contact you within 2 business days
              </p>
            </form>
          </div>
        </div>
      </section>
    </div>
  );
}
