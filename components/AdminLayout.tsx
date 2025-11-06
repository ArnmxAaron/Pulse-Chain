import React, { useContext } from 'react';
import { NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom';
import BloodDropIcon from './icons/BloodDropIcon';
import { AuthContext } from '../context/AuthContext';

const DashboardIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" /></svg>;
const RequestsIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-3 7h3m-3 4h3m-6-4h.01M9 16h.01" /></svg>;
const NewRequestIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v3m0 0v3m0-3h3m-3 0H9m12 0a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>;
const LogoutIcon = () => <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" /></svg>;

const AdminLayout: React.FC = () => {
  const location = useLocation();
  const { logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };
  
  const getPageTitle = () => {
    switch (location.pathname) {
      case '/admin':
        return 'Dashboard Overview';
      case '/admin/requests':
        return 'Emergency Requests';
      case '/admin/new-request':
        return 'Create New Request';
      default:
        return 'Admin Portal';
    }
  };

  const navLinks = [
    { to: '/admin', label: 'Dashboard', icon: <DashboardIcon /> },
    { to: '/admin/requests', label: 'Requests', icon: <RequestsIcon /> },
    { to: '/admin/new-request', label: 'New Request', icon: <NewRequestIcon /> },
  ];

  return (
    <div className="flex h-screen bg-gray-50 text-gray-900">
      <aside className="w-64 flex-shrink-0 bg-[#001f3f] flex flex-col">
        <div className="h-20 flex items-center justify-center border-b border-white/10">
           <NavLink to="/" className="flex items-center gap-3 text-2xl font-bold text-white">
            <div className="bg-red-500 p-2 rounded-lg">
              <BloodDropIcon className="h-6 w-6" />
            </div>
            <span>PulseChain</span>
          </NavLink>
        </div>
        <nav className="flex-grow p-4">
          <ul className="space-y-2">
            {navLinks.map((link) => (
              <li key={link.to}>
                <NavLink
                  to={link.to}
                  end={link.to === '/admin'}
                  className={({ isActive }) =>
                    `flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-base ${
                      isActive ? 'bg-white/10 text-white font-semibold' : 'text-gray-300 hover:bg-white/5 hover:text-white'
                    }`
                  }
                >
                  {link.icon}
                  {link.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>
        <div className="p-4 border-t border-white/10">
           <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-colors duration-200 text-base text-gray-300 hover:bg-white/5 hover:text-white"
          >
            <LogoutIcon />
            Logout
          </button>
        </div>
      </aside>
      <div className="flex-1 flex flex-col overflow-hidden">
        <header className="bg-white border-b border-gray-200 shadow-sm">
          <div className="px-8 py-5">
            <h1 className="text-3xl font-bold text-gray-800">{getPageTitle()}</h1>
            <p className="text-sm text-gray-500 mt-1">Logged in as: admin@pulsechain.com</p>
          </div>
        </header>
        <main className="flex-1 overflow-x-hidden overflow-y-auto bg-gray-50 p-8">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default AdminLayout;
