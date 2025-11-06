// FIX: Create the Admin RequestsDashboard component.
import React, { useEffect, useState } from 'react';
import { fetchRequests } from '../../services/api';
import { Request } from '../../types';
import { generateRequestSummary } from '../../services/geminiService';
import BloodDropIcon from '../../components/icons/BloodDropIcon';

const getUrgencyClasses = (urgency: 'IMMEDIATE' | 'HIGH' | 'STANDARD') => {
  switch(urgency) {
    case 'IMMEDIATE': return { border: 'border-red-500', bg: 'bg-red-50', text: 'text-red-700' };
    case 'HIGH': return { border: 'border-yellow-500', bg: 'bg-yellow-50', text: 'text-yellow-700' };
    default: return { border: 'border-blue-500', bg: 'bg-blue-50', text: 'text-blue-700' };
  }
};

const RequestCard: React.FC<{ request: Request }> = ({ request }) => {
  const { border, bg, text } = getUrgencyClasses(request.urgencyLevel);
  const [summary, setSummary] = useState<string>('Generating summary...');
  const [isSummaryLoading, setIsSummaryLoading] = useState(true);

  useEffect(() => {
    const getSummary = async () => {
      setIsSummaryLoading(true);
      const generatedSummary = await generateRequestSummary(request);
      setSummary(generatedSummary);
      setIsSummaryLoading(false);
    };
    getSummary();
  }, [request]);

  return (
    <div className={`bg-white p-6 rounded-xl border-l-4 ${border} shadow-sm`}>
      <div className="flex justify-between items-start">
        <div>
          <p className={`text-sm font-bold uppercase ${text}`}>{request.urgencyLevel}</p>
          <p className="text-2xl font-bold text-gray-900 mt-1">{request.requiredBloodType}</p>
          <p className="text-sm text-gray-500">{request.hospital.name}</p>
        </div>
        <div className="text-right">
          <p className="text-2xl font-bold text-gray-800">{request.responses.length}</p>
          <p className="text-sm text-gray-500">Responses</p>
        </div>
      </div>
      <div className="mt-4 pt-4 border-t border-gray-200">
        <p className="text-xs text-gray-500 font-semibold mb-1">AI Summary:</p>
        <p className={`text-sm text-gray-700 ${isSummaryLoading ? 'animate-pulse' : ''}`}>
          {summary}
        </p>
      </div>
      <div className="text-xs text-gray-400 mt-4 text-right">
        ID: {request.id} &bull; {new Date(request.createdAt).toLocaleString()}
      </div>
    </div>
  );
};

const RequestsDashboard: React.FC = () => {
  const [requests, setRequests] = useState<Request[]>([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState<'ALL' | 'IMMEDIATE' | 'HIGH' | 'STANDARD'>('ALL');

  useEffect(() => {
    const loadData = async () => {
      setLoading(true);
      const reqs = await fetchRequests();
      setRequests(reqs);
      setLoading(false);
    };
    loadData();
  }, []);

  const filteredRequests = requests.filter(r => filter === 'ALL' || r.urgencyLevel === filter);

  if (loading) {
    return <div className="text-center p-10">Loading active requests...</div>;
  }

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div className="bg-white p-1 rounded-lg shadow-sm border border-gray-200 flex items-center">
          {(['ALL', 'IMMEDIATE', 'HIGH', 'STANDARD'] as const).map(level => (
            <button
              key={level}
              onClick={() => setFilter(level)}
              className={`px-4 py-2 text-sm font-semibold rounded-md transition-colors ${
                filter === level ? 'bg-blue-800 text-white shadow' : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              {level}
            </button>
          ))}
        </div>
      </div>
      
      {filteredRequests.length > 0 ? (
        <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
          {filteredRequests.map(req => (
            <RequestCard key={req.id} request={req} />
          ))}
        </div>
      ) : (
        <div className="text-center py-20 bg-white rounded-lg border border-gray-200">
            <div className="flex justify-center items-center mx-auto h-12 w-12 bg-green-100 rounded-full">
                <BloodDropIcon className="h-6 w-6 text-green-700" />
            </div>
            <h3 className="mt-4 text-lg font-medium text-gray-900">All Clear!</h3>
            <p className="mt-1 text-sm text-gray-500">There are no active requests matching your filter.</p>
        </div>
      )}
    </div>
  );
};

export default RequestsDashboard;
