import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BloodType } from '../../types';
import BloodDropIcon from '../../components/icons/BloodDropIcon';

const DonorRegisterPage: React.FC = () => {
  const [email, setEmail] = useState('');
  const [bloodType, setBloodType] = useState<BloodType>(BloodType.APlus);
  const [agreed, setAgreed] = useState(false);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreed) {
      alert("You must agree to the terms to register.");
      return;
    }
    setStatus('submitting');
    // Simulate API call
    await new Promise(res => setTimeout(res, 1500));
    console.log('Registering donor:', { email, bloodType });
    setStatus('success');
    setTimeout(() => navigate('/donor/profile'), 2000);
  };
  
  if (status === 'success') {
    return (
        <div className="max-w-lg mx-auto bg-white p-10 rounded-xl border border-gray-200 shadow-xl text-center">
            <div className="flex justify-center items-center mx-auto h-16 w-16 bg-green-100 rounded-full mb-4">
                 <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-600" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <h2 className="text-3xl font-bold text-green-600">Registration Successful!</h2>
            <p className="text-gray-600 mt-2">Welcome to PulseChain! Redirecting to your new dashboard...</p>
        </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto bg-white rounded-2xl shadow-xl overflow-hidden border border-gray-200">
        <div className="md:flex">
            {/* Left Panel */}
            <div className="md:w-1/2 bg-[#001f3f] p-8 md:p-12 text-white flex flex-col justify-center items-center text-center">
                <div className="flex items-center gap-3 text-3xl font-bold">
                    <div className="bg-red-500 p-3 rounded-lg">
                        <BloodDropIcon className="h-8 w-8 text-white" />
                    </div>
                    <span>PulseChain</span>
                </div>
                <p className="mt-6 text-lg text-blue-100">
                   "The gift of blood is a gift to someone's life."
                </p>
                <p className="mt-4 text-blue-200">By registering, you are joining a vital network dedicated to saving lives in your community.</p>
            </div>
            {/* Right Panel - Form */}
            <div className="md:w-1/2 p-8 md:p-12">
                 <div className="text-center md:text-left mb-8">
                    <h1 className="text-3xl font-bold text-gray-900">Become a Lifesaver</h1>
                    <p className="text-gray-500 mt-1">Join our network of voluntary blood donors.</p>
                </div>
                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                    <label htmlFor="email" className="block text-sm font-semibold text-gray-700">
                        Email Address
                    </label>
                    <div className="mt-1">
                        <input
                        type="email"
                        name="email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                        className="block w-full px-4 py-3 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm"
                        placeholder="you@example.com"
                        />
                    </div>
                    </div>

                    <div>
                    <label htmlFor="bloodType" className="block text-sm font-semibold text-gray-700">
                        Your Blood Type
                    </label>
                    <select
                        id="bloodType"
                        value={bloodType}
                        onChange={(e) => setBloodType(e.target.value as BloodType)}
                        className="mt-1 block w-full pl-3 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm rounded-md"
                    >
                        {Object.values(BloodType).map((bt) => (
                        <option key={bt} value={bt}>{`Blood Type ${bt}`}</option>
                        ))}
                    </select>
                    </div>

                    <div className="flex items-start">
                        <div className="flex items-center h-5">
                            <input
                            id="agreement"
                            name="agreement"
                            type="checkbox"
                            checked={agreed}
                            onChange={(e) => setAgreed(e.target.checked)}
                            className="focus:ring-red-500 h-4 w-4 text-red-600 border-gray-300 rounded"
                            />
                        </div>
                        <div className="ml-3 text-sm">
                            <label htmlFor="agreement" className="font-medium text-gray-700">
                            I agree to be contacted for blood donations.
                            </label>
                            <p className="text-gray-500">Your data will be handled securely and anonymously.</p>
                        </div>
                    </div>

                    {status === 'error' && <p className="text-sm text-red-600 text-center">Registration failed. Please try again.</p>}

                    <div>
                    <button
                        type="submit"
                        disabled={status === 'submitting' || !agreed}
                        className="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed"
                    >
                        {status === 'submitting' ? 'Registering...' : 'Complete Registration'}
                    </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
  );
};

export default DonorRegisterPage;
