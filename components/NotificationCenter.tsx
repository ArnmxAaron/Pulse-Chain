// FIX: Create the NotificationCenter component.
import React from 'react';
import { Notification } from '../types';
import BellIcon from './icons/BellIcon';

const NotificationCenter: React.FC<{ notifications: Notification[] }> = ({ notifications }) => {
    const unreadCount = notifications.filter(n => !n.read).length;

    return (
        <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-2xl border border-gray-200 overflow-hidden z-20">
            <div className="p-4 border-b border-gray-200">
                <h3 className="font-semibold text-gray-800">Notifications</h3>
                <p className="text-sm text-gray-500">{unreadCount > 0 ? `${unreadCount} unread` : 'No new notifications'}</p>
            </div>
            <div className="divide-y divide-gray-100 max-h-96 overflow-y-auto">
                {notifications.length > 0 ? notifications.map(notification => (
                    <div key={notification.id} className={`p-4 hover:bg-gray-50 ${!notification.read ? 'bg-blue-50' : ''}`}>
                        <div className="flex items-start gap-3">
                            {!notification.read && <span className="h-2 w-2 mt-1.5 bg-blue-500 rounded-full flex-shrink-0"></span>}
                            <div className={`flex-1 ${!notification.read ? '' : 'pl-5'}`}>
                                <p className="text-sm text-gray-700">{notification.message}</p>
                                <p className="text-xs text-gray-400 mt-1">{new Date(notification.createdAt).toLocaleString()}</p>
                            </div>
                        </div>
                    </div>
                )) : (
                    <div className="text-center py-10 px-4">
                        <BellIcon className="mx-auto h-8 w-8 text-gray-300" />
                        <p className="mt-2 text-sm text-gray-500">You're all caught up!</p>
                    </div>
                )}
            </div>
            <div className="p-2 bg-gray-50 text-center border-t border-gray-200">
                <button className="text-sm font-medium text-blue-800 hover:underline">Mark all as read</button>
            </div>
        </div>
    );
};

export default NotificationCenter;
