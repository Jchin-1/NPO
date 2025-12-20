import { Leaf, Heart, Users, Home, Wind, AlertCircle } from 'lucide-react';

export default function ActivitiesPage() {
  const projects = [
    {
      id: 1,
      title: 'Winter Support Program',
      description:
        'Comprehensive assistance for elderly residents during harsh winter months, including snow removal, roof clearing, and emergency warmth stations.',
      icon: Wind,
      color: 'blue',
      status: 'Active',
    },
    {
      id: 2,
      title: 'Meal Delivery Service',
      description:
        'Nutritious meal delivery for homebound seniors and low-income families, ensuring food security and social connection.',
      icon: Heart,
      color: 'red',
      status: 'Active',
    },
    {
      id: 3,
      title: 'Community Garden Initiative',
      description:
        'Growing fresh produce while building community bonds. Free vegetables for participants and a thriving gathering space.',
      icon: Leaf,
      color: 'green',
      status: 'Active',
    },
    {
      id: 4,
      title: 'Senior Tech Training',
      description:
        'Digital literacy classes helping seniors stay connected with family and access online services safely and confidently.',
      icon: Users,
      color: 'purple',
      status: 'Active',
    },
    {
      id: 5,
      title: 'Home Repair & Maintenance',
      description:
        'Volunteer teams providing free basic home repairs, weatherization, and safety improvements for low-income homeowners.',
      icon: Home,
      color: 'orange',
      status: 'Active',
    },
    {
      id: 6,
      title: 'Emergency Assistance Fund',
      description:
        'Rapid response funding for residents facing unexpected crises—medical expenses, utility shutoffs, or emergency housing.',
      icon: AlertCircle,
      color: 'pink',
      status: 'Active',
    },
  ];

  const colorClasses = {
    blue: { bg: 'bg-blue-50', border: 'border-blue-200', icon: 'text-blue-600', badge: 'bg-blue-100 text-blue-800' },
    red: { bg: 'bg-red-50', border: 'border-red-200', icon: 'text-red-600', badge: 'bg-red-100 text-red-800' },
    green: { bg: 'bg-green-50', border: 'border-green-200', icon: 'text-green-600', badge: 'bg-green-100 text-green-800' },
    purple: { bg: 'bg-purple-50', border: 'border-purple-200', icon: 'text-purple-600', badge: 'bg-purple-100 text-purple-800' },
    orange: { bg: 'bg-orange-50', border: 'border-orange-200', icon: 'text-orange-600', badge: 'bg-orange-100 text-orange-800' },
    pink: { bg: 'bg-pink-50', border: 'border-pink-200', icon: 'text-pink-600', badge: 'bg-pink-100 text-pink-800' },
  };

  return (
    <div>
      {/* Page Header */}
      <section className="bg-gradient-to-b from-blue-600 to-blue-700 text-white">
        <div className="section-container">
          <h1 className="text-4xl sm:text-5xl font-bold mb-4">Our Activities & Projects</h1>
          <p className="text-xl text-blue-100 max-w-2xl">
            Discover the diverse programs through which we serve our community every day
          </p>
        </div>
      </section>

      {/* Projects Grid */}
      <section className="bg-white">
        <div className="section-container">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {projects.map((project) => {
              const IconComponent = project.icon;
              const colors = colorClasses[project.color as keyof typeof colorClasses];

              return (
                <div
                  key={project.id}
                  className={`${colors.bg} border ${colors.border} rounded-lg p-8 hover:shadow-lg transition-shadow`}
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-14 h-14 rounded-lg flex items-center justify-center ${colors.bg} border ${colors.border}`}>
                      <IconComponent className={`w-8 h-8 ${colors.icon}`} />
                    </div>
                    <span className={`${colors.badge} text-xs font-semibold px-3 py-1 rounded-full`}>
                      {project.status}
                    </span>
                  </div>

                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    {project.title}
                  </h3>

                  <p className="text-gray-700 leading-relaxed">
                    {project.description}
                  </p>

                  <button className="mt-6 font-semibold text-blue-600 hover:text-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 px-2 py-1 rounded">
                    Learn More →
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="bg-gray-50 border-t border-gray-200">
        <div className="section-container text-center">
          <h2 className="section-title">Want to Get Involved?</h2>
          <p className="section-subtitle">
            Join our team of dedicated volunteers or benefit from our services
          </p>

          <div className="flex flex-col sm:flex-row justify-center gap-4">
            <button className="btn-primary">
              Become a Volunteer
            </button>
            <button className="btn-secondary">
              Request Assistance
            </button>
          </div>
        </div>
      </section>
    </div>
  );
}
