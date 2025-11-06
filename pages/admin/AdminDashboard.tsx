// FIX: Create the AdminDashboard component to resolve module errors.
import React, { useEffect, useState } from 'react';
import { fetchRequests } from '../../services/api';
import { Request } from '../../types';
import BloodDropIcon from '../../components/icons/BloodDropIcon';
import { Link } from 'react-router-dom';

const AdminDashboard: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const reqs = await fetchRequests();
      setRequests(reqs);
      setLoading(false);
    };
    loadData();
  }, []);

  const immediateRequests = requests.filter(r => r.urgencyLevel === 'IMMEDIATE').length;
  const totalResponses = requests.reduce((acc, curr) => acc + curr.responses.length, 0);

  const StatCard: React.FC<{ title: string; value: string | number; icon: React.ReactNode; color: string }> = ({ title, value, icon, color }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex items-center gap-6">
      <div className={`p-4 rounded-full ${color}`}>
        {icon}
      </div>
      <div>
        <p className="text-sm font-medium text-gray-500">{title}</p>
        <p className="text-3xl font-bold text-gray-900">{value}</p>
      </div>
    </div>
  );

  return (
    <div className="space-y-8">
      {/* Stats Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        <StatCard 
          title="Active Requests" 
          value={loading ? '...' : requests.length} 
          icon={<BloodDropIcon className="h-8 w-8 text-blue-800" />}
          color="bg-blue-100"
        />
        <StatCard 
          title="Immediate Urgency" 
          value={loading ? '...' : immediateRequests}
          icon={<BloodDropIcon className="h-8 w-8 text-red-800" />}
          color="bg-red-100"
        />
        <StatCard 
          title="Total Donor Responses" 
          value={loading ? '...' : totalResponses} 
          icon={<svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-green-800" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" /></svg>}
          color="bg-green-100"
        />
      </div>

      {/* Recent Requests Section */}
      <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-800">Recent Requests</h2>
          <Link to="/admin/requests" className="text-sm font-medium text-blue-800 hover:underline">
            View All
          </Link>
        </div>
        <div className="overflow-x-auto">
          {loading ? (
            <p>Loading recent requests...</p>
          ) : requests.length > 0 ? (
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Urgency</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Responses</th>
                  <th scope="col" className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.slice(0, 5).map(req => (
                  <tr key={req.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{req.requiredBloodType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.urgencyLevel}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{req.responses.length}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(req.createdAt).toLocaleDateString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          ) : (
            <p className="text-center py-8 text-gray-500">No requests found.</p>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;
