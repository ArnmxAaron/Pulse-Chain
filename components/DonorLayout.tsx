import React, { useState, useEffect, useRef } from 'react';
import { NavLink, Outlet, useNavigate, useLocation } from 'react-router-dom';
import BloodDropIcon from './icons/BloodDropIcon';
import BellIcon from './icons/BellIcon';
import { Notification } from '../types';
import { fetchNotifications } from '../services/api';
import NotificationCenter from './NotificationCenter';

const UserCircleIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg xmlns="http://www.w3.org/2000/svg" className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
      <path strokeLinecap="round" strokeLinejoin="round" d="M17.982 18.725A7.488 7.488 0 0012 15.75a7.488 7.488 0 00-5.982 2.975m11.963 0a9 9 0 10-11.963 0m11.963 0A8.966 8.966 0 0112 21a8.966 8.966 0 01-5.982-2.275M15 9.75a3 3 0 11-6 0 3 3 0 016 0z" />
    </svg>
  );

// Custom hook to get the previous value of a prop or state
function usePrevious<T>(value: T): T | undefined {
  const ref = useRef<T | undefined>(undefined);
  useEffect(() => {
    ref.current = value;
  });
  return ref.current;
}

const DonorLayout: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const [notificationsOpen, setNotificationsOpen] = useState(false);
    const [notifications, setNotifications] = useState<Notification[]>([]);
    const notificationRef = useRef<HTMLDivElement>(null);
    const audioRef = useRef<HTMLAudioElement>(null);

    const isRegisterPage = location.pathname === '/donor/register';

    const unreadCount = notifications.filter(n => !n.read).length;
    const prevUnreadCount = usePrevious(unreadCount);

    const PING_SOUND_DATA_URL = 'data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA';

    useEffect(() => {
        if (isRegisterPage) return; // Don't load notifications on register page
        const loadNotifications = async () => {
            const data = await fetchNotifications();
            setNotifications(data);
        };
        loadNotifications();
    }, [isRegisterPage]);

    useEffect(() => {
        if (isRegisterPage) return;
        // Play sound only when the number of unread notifications increases
        if (prevUnreadCount !== undefined && unreadCount > prevUnreadCount) {
            audioRef.current?.play().catch(error => {
                console.log("Audio playback was prevented by the browser:", error);
            });
        }
    }, [unreadCount, prevUnreadCount, isRegisterPage]);

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (notificationRef.current && !notificationRef.current.contains(event.target as Node)) {
                setNotificationsOpen(false);
            }
        };
        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, []);
    
    const AuthenticatedControls = () => (
         <div className="flex items-center gap-6">
           <div className="relative" ref={notificationRef}>
               <button onClick={() => setNotificationsOpen(o => !o)} className="relative text-gray-500 hover:text-blue-800 transition-colors">
                    <BellIcon className="h-6 w-6" />
                    {unreadCount > 0 && <span className="absolute top-0 right-0 block h-2 w-2 transform translate-x-1/2 -translate-y-1/2 rounded-full bg-red-500 ring-2 ring-white"></span>}
               </button>
               {notificationsOpen && <NotificationCenter notifications={notifications} />}
           </div>
           <NavLink
             to="/donor/profile"
             className={({ isActive }) =>
                `flex items-center gap-2 px-4 py-2 rounded-lg transition-colors duration-200 text-base font-medium ${
                isActive ? 'bg-blue-100 text-blue-800' : 'text-gray-600 hover:bg-gray-100'
                }`
             }
           >
            <UserCircleIcon className="h-5 w-5" />
             Profile
           </NavLink>
           <button onClick={() => navigate('/')} className="text-sm font-medium text-gray-600 hover:text-blue-800">
             Logout
           </button>
        </div>
    );

    const PublicControls = () => (
        <div className="flex items-center gap-4">
             <NavLink to="/" className="text-sm font-medium text-gray-600 hover:text-blue-800">
                Back to Home
            </NavLink>
            <NavLink
                to="/donor/register"
                className="px-4 py-2 text-sm font-medium text-white bg-red-600 rounded-lg hover:bg-red-700 transition-colors"
            >
                Register
            </NavLink>
        </div>
    );

    return (
        <div className="min-h-screen bg-white md:bg-gray-50 text-gray-900">
            {!isRegisterPage && <audio ref={audioRef} src={PING_SOUND_DATA_URL} preload="auto" />}
            <header className="bg-white border-b border-gray-200 shadow-sm sticky top-0 z-20">
                <nav className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <div className="flex justify-between items-center h-20">
                        <NavLink to="/" className="flex items-center gap-3 text-2xl font-bold text-[#001f3f]">
                            <div className="bg-red-500 p-2 rounded-lg">
                                <BloodDropIcon className="h-6 w-6 text-white" />
                            </div>
                            <span>PulseChain Donor</span>
                        </NavLink>
                        {isRegisterPage ? <PublicControls /> : <AuthenticatedControls />}
                    </div>
                </nav>
            </header>
            <main className="max-w-7xl mx-auto py-8 px-4 sm:px-6 lg:px-8">
                <Outlet />
            </main>
             <footer className="text-center py-6 text-sm text-gray-500 border-t border-gray-200 mt-12">
                PulseChain © 2025 - Your contribution saves lives.
            </footer>
        </div>
    );
};

export default DonorLayout;