// services/api.ts
import { BloodType, Request, DonorProfile, Alert, Notification } from '../types';

// Mock data has been removed to prepare for real API integration.
// Functions now return empty states to test component handling.

const apiCall = async <T>(data: T, delay = 500): Promise<T> => {
  console.log('Simulating API call...');
  await new Promise(res => setTimeout(res, delay));
    if (data === undefined) {
        return data;
    }
  // This simulates the network latency and serialization/deserialization
  return JSON.parse(JSON.stringify(data));
};


export const fetchRequests = async (): Promise<Request[]> => {
  return apiCall([]);
};

export const fetchDonorProfile = async (): Promise<DonorProfile | null> => {
    // In a real app, you might get null if the user doesn't have a profile yet.
    // Returning null to test the component's error/empty handling.
    return apiCall(null);
};

export const fetchAlertsForDonor = async (bloodType: BloodType): Promise<Alert[]> => {
    return apiCall([]);
};

export const confirmDonorResponse = async (alertId: string): Promise<void> => {
    console.log(`API: Confirming response for alert ${alertId}...`);
    await apiCall(undefined, 1000);
    // In a real app, this would update the backend.
};

export const createEmergencyRequest = async (requestData: Omit<Request, 'id' | 'hospitalId' | 'hospital' | 'createdAt' | 'dltRequestHash' | 'responses'>): Promise<Request> => {
    console.log('API: Creating new emergency request...', requestData);
    const newRequest: Request = {
        id: `req_live_${Math.random().toString(16).slice(2)}`,
        hospitalId: 'h_live_1',
        hospital: { name: 'Live Hospital', location: { lat: 40.7128, lon: -74.0060 } },
        createdAt: new Date().toISOString(),
        dltRequestHash: `0x_live_${Math.random().toString(16).slice(2, 10)}`,
        responses: [],
        ...requestData,
    };
    // In a real app, this would be a POST request and return the created object.
    return apiCall(newRequest, 1000);
};

export const fetchNotifications = async (): Promise<Notification[]> => {
    return apiCall([]);
};

export const loginAdmin = async (password: string): Promise<{ success: boolean; message?: string }> => {
    console.log('API: Attempting admin login...');
    await new Promise(res => setTimeout(res, 1000));
    if (password === 'password123') {
        return { success: true };
    }
    if (password === 'pending') {
        return { success: false, message: 'pending' };
    }
    return { success: false, message: 'invalid' };
};