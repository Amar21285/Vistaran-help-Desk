import React, { useState, useMemo } from 'react';
import { Ticket, User, TicketStatus } from '../types';
import ServerIcon from './icons/ServerIcon';

interface AdminDashboardProps {
    tickets: Ticket[];
    users: User[];
    setCurrentView: (view: string) => void;
}

const StatItem: React.FC<{ label: string; value: number | string }> = ({ label, value }) => (
    <div className="text-center p-4 bg-slate-100 dark:bg-slate-700/50 rounded-lg">
        <div className="text-3xl font-bold text-primary dark:text-primary-dark">{value}</div>
        <div className="text-sm text-slate-500 dark:text-slate-400">{label}</div>
    </div>
);

const TabButton: React.FC<{ label: string; isActive: boolean; onClick: () => void; }> = ({ label, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`py-2 px-4 font-semibold rounded-t-lg transition-colors duration-200 focus:outline-none ${
            isActive
                ? 'bg-white dark:bg-slate-800 text-primary dark:text-primary-dark border-b-2 border-primary'
                : 'text-slate-500 dark:text-slate-400 hover:text-slate-800 dark:hover:text-slate-200'
        }`}
    >
        {label}
    </button>
);

const AdminDashboard: React.FC<AdminDashboardProps> = ({ tickets, users, setCurrentView }) => {
    const [activeTab, setActiveTab] = useState('tickets');

    const stats = useMemo(() => {
        const open = tickets.filter(t => t.status === TicketStatus.OPEN || t.status === TicketStatus.IN_PROGRESS).length;
        const resolved = tickets.filter(t => t.status === TicketStatus.RESOLVED).length;
        return {
            totalTickets: tickets.length,
            openTickets: open,
            resolvedTickets: resolved,
            totalUsers: users.length,
        };
    }, [tickets, users]);

    return (
        <div className="space-y-6">
            <header className="bg-slate-800 dark:bg-slate-900/50 text-white p-6 rounded-lg shadow-lg">
                <h1 className="text-3xl font-bold">Help Desk Admin Dashboard</h1>
                <p className="mt-1 text-slate-300">System-wide overview, statistics, and server status.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md md:col-span-1">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b dark:border-slate-700 pb-2 mb-4">Server Status</h3>
                    <div className="space-y-3 text-slate-600 dark:text-slate-300">
                        <div className="flex items-center space-x-3">
                            <ServerIcon className="text-green-500" />
                            <span className="h-3 w-3 bg-green-500 rounded-full animate-pulse"></span>
                            <span>Server is running</span>
                        </div>
                        <p><strong>Uptime:</strong> 2 days, 14 hours, 32 minutes</p>
                        <p><strong>Memory usage:</strong> 87 MB</p>
                    </div>
                    <button onClick={() => alert('Refreshing server status...')} className="mt-4 w-full bg-slate-100 dark:bg-slate-700 hover:bg-slate-200 dark:hover:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold py-2 px-4 rounded-lg transition">Refresh Status</button>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md md:col-span-1">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b dark:border-slate-700 pb-2 mb-4">System Statistics</h3>
                    <div className="grid grid-cols-2 gap-4">
                        <StatItem label="Total Tickets" value={stats.totalTickets} />
                        <StatItem label="Open Tickets" value={stats.openTickets} />
                        <StatItem label="Total Users" value={stats.totalUsers} />
                        <StatItem label="Resolved" value={stats.resolvedTickets} />
                    </div>
                </div>

                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md md:col-span-1">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 border-b dark:border-slate-700 pb-2 mb-4">Quick Actions</h3>
                    <div className="space-y-3">
                        <button onClick={() => setCurrentView('users')} className="w-full flex items-center justify-center space-x-3 bg-primary text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-primary-hover transition text-base"><i className="fas fa-users-cog w-5"></i><span>Manage Users</span></button>
                        <button onClick={() => setCurrentView('reports')} className="w-full flex items-center justify-center space-x-3 bg-green-600 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-green-700 transition text-base"><i className="fas fa-chart-line w-5"></i><span>View Reports</span></button>
                        <button onClick={() => setCurrentView('app-settings')} className="w-full flex items-center justify-center space-x-3 bg-slate-700 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-slate-800 transition text-base"><i className="fas fa-cogs w-5"></i><span>App Settings</span></button>
                        <button onClick={() => setCurrentView('create-ticket')} className="w-full flex items-center justify-center space-x-3 bg-indigo-500 text-white font-semibold py-3 px-4 rounded-lg shadow-md hover:bg-indigo-600 transition text-base"><i className="fas fa-plus-circle w-5"></i><span>New Ticket</span></button>
                    </div>
                </div>
            </div>
            
            <div className="bg-slate-100 dark:bg-slate-900/50 border-b border-slate-200 dark:border-slate-700">
                <nav className="flex space-x-2">
                    <TabButton label="Recent Tickets" isActive={activeTab === 'tickets'} onClick={() => setActiveTab('tickets')} />
                    <TabButton label="New Users" isActive={activeTab === 'users'} onClick={() => setActiveTab('users')} />
                    <TabButton label="System Logs" isActive={activeTab === 'logs'} onClick={() => setActiveTab('logs')} />
                </nav>
            </div>
            
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md min-h-[300px]">
                {activeTab === 'users' && (
                    <div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Recent User Activity</h3>
                        <div className="overflow-x-auto">
                             <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                                <thead className="bg-slate-50 dark:bg-slate-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase">Name</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase">Email</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase">Role</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase">Joined</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                                    {[...users].sort((a,b) => new Date(b.joinedDate).getTime() - new Date(a.joinedDate).getTime()).slice(0, 5).map(user => (
                                        <tr key={user.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-slate-100">{user.name}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{user.email}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{user.role}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{new Date(user.joinedDate).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                {activeTab === 'tickets' && (
                     <div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">Recent Tickets</h3>
                        <div className="overflow-x-auto">
                            <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                                <thead className="bg-slate-50 dark:bg-slate-700">
                                    <tr>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase">ID</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase">Description</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase">Status</th>
                                        <th className="px-6 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase">Created</th>
                                    </tr>
                                </thead>
                                <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                                    {[...tickets].sort((a,b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()).slice(0, 5).map(ticket => (
                                        <tr key={ticket.id}>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-800 dark:text-slate-100">{ticket.id}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400 max-w-sm truncate">{ticket.description}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{ticket.status}</td>
                                            <td className="px-6 py-4 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{new Date(ticket.dateCreated).toLocaleDateString()}</td>
                                        </tr>
                                    ))}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
                 {activeTab === 'logs' && (
                     <div>
                        <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100">System Logs</h3>
                         <div className="flex flex-wrap gap-4 my-4">
                            <button onClick={() => alert('Refreshing logs...')} className="bg-blue-500 hover:bg-blue-600 text-white font-semibold py-2 px-4 rounded-lg transition text-sm">Refresh Logs</button>
                            <button onClick={() => confirm('Are you sure you want to clear logs?') && alert('Logs cleared.')} className="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded-lg transition text-sm">Clear Logs</button>
                         </div>
                        <div className="bg-slate-900 text-green-300 font-mono text-xs p-4 rounded-lg h-64 overflow-y-auto">
                            <p>[{new Date().toLocaleString()}] INFO: Server started on port 3000</p>
                            <p>[{new Date(Date.now() - 1000).toLocaleString()}] INFO: Database connected successfully</p>
                            <p>[{new Date(Date.now() - 2000).toLocaleString()}] INFO: Email service configured</p>
                            <p>[{new Date(Date.now() - 300000).toLocaleString()}] AUTH: User ITsupport@vistaran.in logged in</p>
                            <p>[{new Date(Date.now() - 1800000).toLocaleString()}] TICKET: New ticket created: TKT001</p>
                            <p>[{new Date(Date.now() - 2500000).toLocaleString()}] EMAIL: Notification sent for ticket TKT002</p>
                            <p>[{new Date(Date.now() - 3600000).toLocaleString()}] TICKET: Ticket TKT003 marked as resolved</p>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default AdminDashboard;