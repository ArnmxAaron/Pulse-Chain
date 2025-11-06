import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BloodType, Request } from '../../types';
import { createEmergencyRequest } from '../../services/api';

const NewRequestPage: React.FC = () => {
  const [bloodType, setBloodType] = useState<BloodType>(BloodType.OPlus);
  const [urgency, setUrgency] = useState<'HIGH' | 'IMMEDIATE' | 'STANDARD'>('HIGH');
  const [radius, setRadius] = useState(10);
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus('submitting');
    try {
      const requestData: Omit<Request, 'id' | 'hospitalId' | 'hospital' | 'createdAt' | 'dltRequestHash' | 'responses'> = {
        requiredBloodType: bloodType,
        urgencyLevel: urgency,
        searchRadiusKm: radius,
      };
      await createEmergencyRequest(requestData);
      setStatus('success');
      setTimeout(() => navigate('/admin/requests'), 2000);
    } catch (err) {
      console.error(err);
      setStatus('error');
    }
  };

  if (status === 'success') {
    return (
      <div className="max-w-2xl mx-auto bg-white p-10 rounded-xl border border-gray-200 shadow-sm text-center">
        <h2 className="text-3xl font-bold text-green-600">Request Sent Successfully!</h2>
        <p className="text-gray-600 mt-2">Nearby donors have been alerted. Redirecting to the requests dashboard...</p>
      </div>
    );
  }

  return (
    <div className="max-w-2xl mx-auto bg-white p-8 rounded-xl border border-gray-200 shadow-sm">
      <h1 className="text-2xl font-bold text-gray-900 mb-8">Create Emergency Request</h1>
      <form onSubmit={handleSubmit} className="space-y-8">
        <div>
          <label htmlFor="bloodType" className="block text-base font-semibold text-gray-700 mb-2">Required Blood Type</label>
          <select
            id="bloodType"
            value={bloodType}
            onChange={(e) => setBloodType(e.target.value as BloodType)}
            className="mt-1 block w-full pl-4 pr-10 py-3 text-base border-gray-300 focus:outline-none focus:ring-blue-500 focus:border-blue-500 rounded-md shadow-sm"
          >
            {Object.values(BloodType).map((bt) => (
              <option key={bt} value={bt}>{bt}</option>
            ))}
          </select>
        </div>

        <div>
          <label className="block text-base font-semibold text-gray-700 mb-2">Urgency Level</label>
          <div className="mt-2 grid grid-cols-3 gap-2 bg-gray-100 p-2 rounded-lg">
            {(['STANDARD', 'HIGH', 'IMMEDIATE'] as const).map((level) => (
              <button
                key={level}
                type="button"
                onClick={() => setUrgency(level)}
                className={`px-4 py-3 text-sm font-semibold rounded-md transition-colors ${
                  urgency === level ? 'bg-white text-blue-800 shadow' : 'bg-transparent text-gray-600 hover:bg-white/60'
                }`}
              >
                {level.charAt(0) + level.slice(1).toLowerCase()}
              </button>
            ))}
          </div>
        </div>

        <div>
          <label htmlFor="radius" className="block text-base font-semibold text-gray-700 mb-2">Search Radius: <span className="font-bold text-blue-800">{radius} km</span></label>
          <input
            id="radius"
            type="range"
            min="5"
            max="50"
            step="5"
            value={radius}
            onChange={(e) => setRadius(Number(e.target.value))}
            className="mt-1 w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer accent-blue-800"
          />
        </div>

        {status === 'error' && <p className="text-sm text-red-600">Failed to create request. Please try again.</p>}

        <div className="pt-4">
          <button
            type="submit"
            disabled={status === 'submitting'}
            className="w-full flex justify-center py-4 px-4 border border-transparent rounded-md shadow-sm text-lg font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 disabled:bg-red-400 disabled:cursor-not-allowed"
          >
            {status === 'submitting' ? 'Sending Alert...' : 'Send Alert to Donors'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default NewRequestPage;
