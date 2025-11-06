// FIX: Create types.ts to define shared data structures for the application.
export enum BloodType {
  APlus = 'A+',
  AMinus = 'A-',
  BPlus = 'B+',
  BMinus = 'B-',
  ABPlus = 'AB+',
  ABMinus = 'AB-',
  OPlus = 'O+',
  OMinus = 'O-',
}

export interface DonorResponse {
  donorId: string;
  timestamp: string;
}

export interface Request {
  id: string;
  hospitalId: string;
  hospital: {
    name: string;
    location: { lat: number; lon: number };
  };
  requiredBloodType: BloodType;
  urgencyLevel: 'IMMEDIATE' | 'HIGH' | 'STANDARD';
  createdAt: string;
  dltRequestHash: string;
  responses: DonorResponse[];
  searchRadiusKm: number;
}

export interface Donation {
  id: string;
  date: string;
  hospitalName: string;
  requestType: BloodType;
}

export interface DonorProfile {
  id: string;
  email: string;
  bloodType: BloodType;
  lastDonationDate: string | null;
  alertStatus: boolean;
  location: { lat: number; lon: number } | null;
  dltAnonymousID: string;
  donationHistory: Donation[];
}

export interface Alert {
  id: string;
  hospitalName: string;
  urgencyLevel: 'IMMEDIATE' | 'HIGH' | 'STANDARD';
  distanceKm: number;
  requiredBloodType: BloodType;
}

export interface Notification {
    id: string;
    message: string;
    createdAt: string;
    read: boolean;
    requestId: string;
}
