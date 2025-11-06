// FIX: Create a complete landing page component to resolve module errors and provide an entry point for the application.
import React from 'react';
import { Link } from 'react-router-dom';
import BloodDropIcon from '../components/icons/BloodDropIcon';
import PulseChainLogoGraphic from '../components/icons/PulseChainLogoGraphic';

const ProblemIcon: React.FC<{ path: string }> = ({ path }) => (
    <div className="flex-shrink-0">
        <div className="flex items-center justify-center h-12 w-12 rounded-md bg-red-500 text-white">
            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d={path} />
            </svg>
        </div>
    </div>
);

const LandingPage: React.FC = () => {
  return (
    <div className="min-h-screen bg-gray-50 text-gray-800">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-10">
        <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-20">
            <Link to="/" className="flex items-center gap-3 text-2xl font-bold text-[#001f3f]">
              <div className="bg-red-500 p-2 rounded-lg">
                <BloodDropIcon className="h-6 w-6 text-white" />
              </div>
              <span>PulseChain</span>
            </Link>
            <div className="hidden md:flex items-center gap-8">
              <a href="#how-it-works" className="text-base font-medium text-gray-600 hover:text-blue-800 transition-colors">
                How It Works
              </a>
              <Link to="/donor/register" className="text-base font-medium text-gray-600 hover:text-blue-800 transition-colors">
                Donors
              </Link>
              <Link to="/admin/login" className="text-base font-medium text-gray-600 hover:text-blue-800 transition-colors">
                Hospitals
              </Link>
               <a href="#about" className="text-base font-medium text-gray-600 hover:text-blue-800 transition-colors">
                About Us
              </a>
            </div>
            <div className="flex items-center gap-4">
              <Link
                to="/admin/login"
                className="px-5 py-2.5 text-base font-medium text-white bg-blue-800 rounded-lg hover:bg-blue-900 transition-colors shadow-sm"
              >
                Admin Login
              </Link>
            </div>
          </div>
        </nav>
      </header>

      {/* Hero Section */}
      <main className="max-w-7xl mx-auto">
        <section className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-extrabold text-[#001f3f] tracking-tight">
            Connecting Blood Donors to<br />Hospitals in Real-Time
          </h1>
          <p className="mt-6 max-w-2xl mx-auto text-lg sm:text-xl text-gray-600">
            PulseChain is a decentralized platform that instantly alerts voluntary donors to urgent blood needs at nearby hospitals, saving precious time and lives.
          </p>
          <div className="mt-10 flex justify-center items-center gap-4">
            <Link
              to="/donor/register"
              className="px-8 py-4 text-lg font-bold text-white bg-red-600 rounded-lg hover:bg-red-700 transition-transform transform hover:scale-105 shadow-lg"
            >
              Join as a Lifesaver
            </Link>
            <Link
              to="/admin/login"
              className="px-8 py-4 text-lg font-bold text-blue-800 bg-blue-100 rounded-lg hover:bg-blue-200 transition-colors"
            >
              Hospital Portal
            </Link>
          </div>
        </section>

        {/* Logo Graphic Section */}
        <section className="px-4 sm:px-6 lg:px-8">
            <div className="max-w-4xl mx-auto">
                <PulseChainLogoGraphic className="w-full text-red-600" />
            </div>
        </section>

        {/* How It Works Section */}
        <section id="how-it-works" className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-16">
                <h2 className="text-3xl sm:text-4xl font-bold text-[#001f3f]">How PulseChain Works</h2>
                <p className="mt-4 text-lg text-gray-600">A simple, secure, and swift process to save lives.</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                <div className="text-center">
                    <div className="flex justify-center items-center mx-auto h-16 w-16 bg-red-100 text-red-600 rounded-full mb-4 font-bold text-2xl">1</div>
                    <h3 className="text-xl font-semibold text-gray-900">Hospital Sends Alert</h3>
                    <p className="mt-2 text-gray-600">When there's an urgent need, a hospital administrator creates an emergency request for a specific blood type.</p>
                </div>
                 <div className="text-center">
                    <div className="flex justify-center items-center mx-auto h-16 w-16 bg-blue-100 text-blue-800 rounded-full mb-4 font-bold text-2xl">2</div>
                    <h3 className="text-xl font-semibold text-gray-900">Donors are Notified</h3>
                    <p className="mt-2 text-gray-600">Registered donors with the matching blood type within the specified radius receive an instant, anonymous alert on their dashboard.</p>
                </div>
                 <div className="text-center">
                    <div className="flex justify-center items-center mx-auto h-16 w-16 bg-green-100 text-green-800 rounded-full mb-4 font-bold text-2xl">3</div>
                    <h3 className="text-xl font-semibold text-gray-900">Lives are Saved</h3>
                    <p className="mt-2 text-gray-600">Available donors respond, and the hospital can coordinate with confirmed donors. The entire process is fast, secure, and efficient.</p>
                </div>
            </div>
        </section>

        {/* Problem We Solve Section */}
        <section id="about" className="py-20 sm:py-24 lg:py-32 px-4 sm:px-6 lg:px-8 bg-white border-y border-gray-200">
            <div className="max-w-7xl mx-auto">
                 <div className="text-center mb-16">
                    <h2 className="text-3xl sm:text-4xl font-bold text-[#001f3f]">The Problem We Solve</h2>
                    <p className="mt-4 text-lg text-gray-600 max-w-3xl mx-auto">Traditional blood donation systems face critical delays that can mean the difference between life and death.</p>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-x-10 gap-y-12">
                    <div className="flex gap-4">
                        <ProblemIcon path="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <div>
                            <h4 className="text-lg leading-6 font-semibold text-gray-900">Slow Response Times in Crisis</h4>
                            <p className="mt-2 text-base text-gray-600">Manual phone calls and fragmented lists lead to dangerous delays in finding available donors.</p>
                        </div>
                    </div>
                     <div className="flex gap-4">
                        <ProblemIcon path="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V7a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        <div>
                            <h4 className="text-lg leading-6 font-semibold text-gray-900">Fragmented, Non-Digital Data</h4>
                            <p className="mt-2 text-base text-gray-600">Outdated spreadsheets and paper records make it impossible to get a real-time view of donor availability.</p>
                        </div>
                    </div>
                     <div className="flex gap-4">
                        <ProblemIcon path="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                        <div>
                            <h4 className="text-lg leading-6 font-semibold text-gray-900">Lack of Compatibility Info</h4>
                            <p className="mt-2 text-base text-gray-600">Time is wasted contacting donors who are not a match or are not eligible to donate at that moment.</p>
                        </div>
                    </div>
                     <div className="flex gap-4">
                        <ProblemIcon path="M12 11c0 3.517-1.009 6.789-2.756 9.348m-2.28-2.28A9.006 9.006 0 0012 21a9.006 9.006 0 006.036-2.932m-8.12-8.12A9.006 9.006 0 0112 3c2.49 0 4.73.994 6.364 2.636" />
                        <div>
                            <h4 className="text-lg leading-6 font-semibold text-gray-900">Critical Logistical Delays</h4>
                            <p className="mt-2 text-base text-gray-600">Coordinating between hospitals and donors is a manual, inefficient process that costs precious minutes.</p>
                        </div>
                    </div>
                </div>
                 <p className="mt-16 text-center text-xl text-gray-800 font-medium max-w-4xl mx-auto">
                    PulseChain replaces these manual failures with a decentralized, instantaneous network, dramatically improving patient outcomes.
                </p>
            </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="text-center py-8 text-sm text-gray-500 border-t border-gray-200 bg-white">
        PulseChain © 2025 - Your contribution saves lives.
      </footer>
    </div>
  );
};

export default LandingPage;