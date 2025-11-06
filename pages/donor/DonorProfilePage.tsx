import React, { useState, useEffect } from 'react';
import { fetchDonorProfile, fetchAlertsForDonor, confirmDonorResponse } from '../../services/api';
import { DonorProfile, Alert } from '../../types';
import BloodDropIcon from '../../components/icons/BloodDropIcon';

const UserIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /></svg>;
const CalendarIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" /></svg>;
const LocationIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" /></svg>;
const ShieldIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 20.944A12.02 12.02 0 0012 22.056a12.02 12.02 0 009-1.112A12.02 12.02 0 0021 8.944c0-1.061-.108-2.098-.308-3.076z" /></svg>;

const DonorProfilePage: React.FC = () => {
    const [profile, setProfile] = useState<DonorProfile | null>(null);
    const [alerts, setAlerts] = useState<Alert[]>([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [modalOpen, setModalOpen] = useState(false);
    const [selectedAlert, setSelectedAlert] = useState<Alert | null>(null);
    const [confirming, setConfirming] = useState(false);

    useEffect(() => {
        const loadData = async () => {
            setLoading(true);
            setError(null);
            try {
                const profileData = await fetchDonorProfile();
                if (profileData) {
                    setProfile(profileData);
                    if (profileData.alertStatus) {
                        const alertData = await fetchAlertsForDonor(profileData.bloodType);
                        setAlerts(alertData);
                    }
                } else {
                    setError("Could not load your donor profile. Please try again later.");
                }
            } catch (e) {
                console.error(e);
                setError("An unexpected error occurred while loading your data.");
            }
            setLoading(false);
        };
        loadData();
    }, []);

    const handleRespondClick = (alert: Alert) => {
        setSelectedAlert(alert);
        setModalOpen(true);
    };
    
    const handleConfirmResponse = async () => {
        if (!selectedAlert) return;
        setConfirming(true);
        await confirmDonorResponse(selectedAlert.id);
        setConfirming(false);
        setModalOpen(false);
        setAlerts(alerts.filter(a => a.id !== selectedAlert.id));
    };

    if (loading) {
        return <div className="text-center p-10">Loading Donor Dashboard...</div>;
    }

    if (error) {
         return (
            <div className="text-center p-10 bg-red-50 border border-red-200 rounded-lg">
                <h2 className="text-xl font-bold text-red-700">Error Loading Dashboard</h2>
                <p className="text-red-600 mt-2">{error}</p>
            </div>
        );
    }
    
    if (!profile) {
        return <div className="text-center p-10">No profile data found.</div>
    }


    return (
        <div className="space-y-8">
            {/* Header */}
            <div className="flex items-center gap-4">
                <UserIcon />
                <div>
                    <h1 className="text-3xl font-bold text-gray-900">Donor Dashboard</h1>
                    <p className="text-gray-500">{profile.email}</p>
                </div>
            </div>

            {/* Profile Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <InfoCard icon={<BloodDropIcon className="h-8 w-8 text-red-500" />} title="Blood Type" value={profile.bloodType} />
                <InfoCard icon={<CalendarIcon />} title="Last Donation" value={profile.lastDonationDate ? new Date(profile.lastDonationDate).toLocaleDateString() : 'N/A'} />
                <AlertStatusCard status={profile.alertStatus} />
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                 <InfoCard icon={<LocationIcon />} title="My Location" value={profile.location ? `Lat: ${profile.location.lat.toFixed(2)}, Lon: ${profile.location.lon.toFixed(2)}` : 'Not Set'} actionButton={<button className="mt-2 text-sm font-semibold text-blue-600 hover:underline">Update Location</button>} />
                 <InfoCard icon={<ShieldIcon />} title="Anonymous DLT ID" value={<span className="font-mono text-sm">{profile.dltAnonymousID}</span>} description="This is your secure, private identifier on the distributed ledger." />
            </div>

            {/* Active Alerts */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                 <h2 className="text-xl font-bold text-gray-800 mb-4">Active Emergency Alerts ({alerts.length})</h2>
                 <div className="space-y-4">
                    {alerts.length > 0 ? alerts.map(alert => (
                        <AlertCard key={alert.id} alert={alert} onRespond={handleRespondClick} />
                    )) : <p className="text-center py-8 text-gray-500">No active alerts for your blood type nearby. Thank you for being ready!</p>}
                 </div>
            </div>

            {/* Donation History */}
            <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
                <h2 className="text-xl font-bold text-gray-800 mb-4">Donation History</h2>
                <div className="overflow-x-auto">
                    {profile.donationHistory.length > 0 ? (
                        <table className="min-w-full divide-y divide-gray-200">
                            <thead className="bg-gray-50">
                                <tr>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Hospital</th>
                                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Blood Type</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white divide-y divide-gray-200">
                                {profile.donationHistory.map(donation => (
                                    <tr key={donation.id}>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900">{new Date(donation.date).toLocaleDateString()}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{donation.hospitalName}</td>
                                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-800">{donation.requestType}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    ) : (
                        <p className="text-center py-8 text-gray-500">You have no donation history yet.</p>
                    )}
                </div>
            </div>

            {/* Confirmation Modal */}
            {modalOpen && selectedAlert && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                    <div className="bg-white p-8 rounded-xl shadow-2xl max-w-md w-full">
                        <h2 className="text-2xl font-bold text-gray-900">Confirm Your Response</h2>
                        <p className="text-gray-600 mt-2">Are you sure you can donate for this <span className="font-bold">{selectedAlert.urgencyLevel.toLowerCase()}</span> request from <span className="font-bold">{selectedAlert.hospitalName}</span>?</p>
                        <div className="mt-6 flex justify-end gap-4">
                            <button onClick={() => setModalOpen(false)} className="px-6 py-2 text-gray-700 bg-gray-100 rounded-lg hover:bg-gray-200 font-semibold">Cancel</button>
                            <button onClick={handleConfirmResponse} disabled={confirming} className="px-6 py-2 text-white bg-green-600 rounded-lg hover:bg-green-700 font-semibold disabled:bg-green-400">
                                {confirming ? 'Confirming...' : 'Yes, I Can Donate'}
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

// Sub-components for the dashboard
const InfoCard: React.FC<{ icon: React.ReactNode; title: string; value: React.ReactNode; description?: string; actionButton?: React.ReactNode }> = ({ icon, title, value, description, actionButton }) => (
    <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm flex flex-col">
        <div className="flex items-start gap-4">
            {icon}
            <div className="flex-1">
                <p className="text-sm font-medium text-gray-500">{title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{value}</p>
                 {description && <p className="text-xs text-gray-400 mt-2">{description}</p>}
            </div>
        </div>
         {actionButton && <div className="mt-auto pt-4">{actionButton}</div>}
    </div>
);

const AlertStatusCard: React.FC<{ status: boolean }> = ({ status }) => (
     <div className="bg-white p-6 rounded-xl border border-gray-200 shadow-sm">
         <p className="text-sm font-medium text-gray-500">Alert Status</p>
         <div className="flex items-center justify-between mt-2">
            <p className={`text-2xl font-bold ${status ? 'text-green-600' : 'text-gray-500'}`}>{status ? 'Active' : 'Paused'}</p>
            <button className={`relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 ${status ? 'bg-green-600' : 'bg-gray-300'}`}>
                <span className={`inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200 ${status ? 'translate-x-5' : 'translate-x-0'}`} />
            </button>
         </div>
         <p className="text-xs text-gray-400 mt-2">{status ? 'You will receive notifications for nearby emergencies.' : 'You will not receive any alerts.'}</p>
     </div>
);

const getUrgencyClasses = (urgency: 'IMMEDIATE' | 'HIGH' | 'STANDARD') => {
    switch(urgency) {
        case 'IMMEDIATE': return { border: 'border-red-500', bg: 'bg-red-50', text: 'text-red-700', button: 'bg-red-600 hover:bg-red-700' };
        case 'HIGH': return { border: 'border-yellow-500', bg: 'bg-yellow-50', text: 'text-yellow-700', button: 'bg-yellow-500 hover:bg-yellow-600' };
        default: return { border: 'border-blue-500', bg: 'bg-blue-50', text: 'text-blue-700', button: 'bg-blue-600 hover:bg-blue-700' };
    }
};

const AlertCard: React.FC<{ alert: Alert; onRespond: (alert: Alert) => void }> = ({ alert, onRespond }) => {
    const { border, bg, text, button } = getUrgencyClasses(alert.urgencyLevel);
    return (
        <div className={`p-4 rounded-lg border-l-4 ${border} ${bg}`}>
            <div className="flex flex-col sm:flex-row justify-between sm:items-center">
                <div>
                    <span className={`text-xs font-bold uppercase ${text}`}>{alert.urgencyLevel} Urgency</span>
                    <p className="font-bold text-gray-800">{alert.hospitalName}</p>
                    <p className="text-sm text-gray-600">~{alert.distanceKm}km away</p>
                </div>
                <div className="mt-4 sm:mt-0">
                    <button onClick={() => onRespond(alert)} className={`px-5 py-2 text-white font-semibold rounded-lg shadow-sm transition-transform transform hover:scale-105 ${button}`}>
                        I Can Donate
                    </button>
                </div>
            </div>
        </div>
    );
};

export default DonorProfilePage;