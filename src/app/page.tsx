import { Heart, Users, Award, Lightbulb } from 'lucide-react';
import Link from 'next/link';

export default function Home() {
  return (
    <div>
      {/* Hero Section */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6 leading-tight">
                Making a Difference in Our Community
              </h1>
              <p className="text-lg sm:text-xl text-blue-100 mb-8">
                We are dedicated to supporting vulnerable populations through compassionate service,
                innovative programs, and genuine care.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <Link
                  href="/snow-pickup"
                  className="btn-primary bg-white text-blue-600 hover:bg-gray-100"
                >
                  Request Snow Pickup
                </Link>
                <Link href="/contact" className="btn-primary opacity-80 hover:opacity-100">
                  Get Involved
                </Link>
              </div>
            </div>
            {/* Hero Image Placeholder */}
            <div className="hidden lg:block">
              <div className="bg-blue-500 rounded-lg aspect-video flex items-center justify-center overflow-hidden">
                <div className="w-full h-full bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center">
                  <div className="text-center">
                    <Users className="w-24 h-24 mx-auto mb-4 opacity-80" />
                    <p className="text-blue-100 text-lg">High-Impact Community Image</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Grid */}
      <section className="bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="section-title">Our Core Values</h2>
            <p className="section-subtitle">
              These principles guide everything we do
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Value 1 */}
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-red-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Heart className="w-8 h-8 text-red-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Compassion</h3>
              <p className="text-gray-700">
                We lead with empathy and genuine care for every individual we serve.
              </p>
            </div>

            {/* Value 2 */}
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Users className="w-8 h-8 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Community</h3>
              <p className="text-gray-700">
                Strengthening bonds and fostering connections within neighborhoods.
              </p>
            </div>

            {/* Value 3 */}
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Award className="w-8 h-8 text-green-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Excellence</h3>
              <p className="text-gray-700">
                Delivering high-quality programs and services with dedication.
              </p>
            </div>

            {/* Value 4 */}
            <div className="bg-gray-50 p-8 rounded-lg border border-gray-200 hover:shadow-lg transition-shadow">
              <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-4">
                <Lightbulb className="w-8 h-8 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold mb-3 text-gray-900">Innovation</h3>
              <p className="text-gray-700">
                Finding creative solutions to meet evolving community needs.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="bg-gray-50 border-y border-gray-200">
        <div className="section-container">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Mission Image Placeholder */}
            <div className="hidden lg:block">
              <div className="bg-gradient-to-br from-green-400 to-blue-500 rounded-lg aspect-video flex items-center justify-center">
                <div className="text-center">
                  <Award className="w-24 h-24 mx-auto mb-4 text-white opacity-80" />
                  <p className="text-white text-lg">Our Mission Impact</p>
                </div>
              </div>
            </div>

            <div>
              <h2 className="section-title">Our Mission</h2>
              <p className="text-lg text-gray-700 mb-6">
                To improve quality of life for vulnerable and underserved populations through
                compassionate, evidence-based programs and dedicated community partnerships.
              </p>
              <p className="text-lg text-gray-700 mb-6">
                We believe that every person deserves dignity, support, and access to resources
                that help them thrive. Through our comprehensive range of services—from winter
                weather assistance to community engagement programs—we work tirelessly to create
                positive change.
              </p>
              <p className="text-lg text-gray-700">
                Our approach combines direct service delivery with community advocacy, ensuring
                we not only meet immediate needs but also address root causes of inequality.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* About Us Section */}
      <section className="bg-white">
        <div className="section-container">
          <div className="text-center mb-12">
            <h2 className="section-title">About Community Care</h2>
            <p className="section-subtitle">
              Building stronger communities, one life at a time
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
            <div className="bg-blue-50 p-8 rounded-lg border border-blue-200">
              <div className="text-4xl font-bold text-blue-600 mb-2">15+</div>
              <p className="text-gray-700 font-semibold">Years of Service</p>
              <p className="text-gray-600 text-sm mt-2">
                Serving our community with dedication and compassion
              </p>
            </div>

            <div className="bg-green-50 p-8 rounded-lg border border-green-200">
              <div className="text-4xl font-bold text-green-600 mb-2">5000+</div>
              <p className="text-gray-700 font-semibold">Lives Impacted</p>
              <p className="text-gray-600 text-sm mt-2">
                Making a measurable difference in people&apos;s lives
              </p>
            </div>

            <div className="bg-purple-50 p-8 rounded-lg border border-purple-200">
              <div className="text-4xl font-bold text-purple-600 mb-2">100%</div>
              <p className="text-gray-700 font-semibold">Volunteer-Driven</p>
              <p className="text-gray-600 text-sm mt-2">
                Powered by dedicated community volunteers
              </p>
            </div>
          </div>

          <div className="prose prose-lg max-w-none">
            <p className="text-gray-700 mb-6">
              Founded on the principle that community care is everyone&apos;s responsibility, we have
              grown from a small grassroots initiative to a trusted partner serving thousands.
              Our success is measured not in dollars, but in the lives we touch and the lasting
              change we create.
            </p>

            <p className="text-gray-700 mb-6">
              We understand the unique challenges faced by elderly residents, low-income families,
              and other vulnerable populations. That&apos;s why our programs are designed with input
              from the communities we serve, ensuring they truly address real needs.
            </p>

            <p className="text-gray-700">
              Through partnerships with local organizations, government agencies, and dedicated
              volunteers, we continue to expand our reach and deepen our impact. When you choose
              to support Community Care, you&apos;re investing in a more compassionate, connected, and
              resilient community.
            </p>
          </div>

          <div className="mt-12 bg-gray-50 p-8 rounded-lg border border-gray-200">
            <h3 className="text-2xl font-bold mb-4 text-gray-900">Get Involved Today</h3>
            <p className="text-gray-700 mb-6">
              Whether you need our services or want to make a difference as a volunteer, we&apos;d love
              to hear from you.
            </p>
            <Link href="/contact" className="btn-primary inline-block">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
