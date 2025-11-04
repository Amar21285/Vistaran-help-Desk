
import React, { useState } from 'react';
import ToggleSwitch from '../ToggleSwitch';
import TwoFactorAuthModal from '../modals/TwoFactorAuthModal';

const MOCK_AUDIT_LOGS = [
    { id: 1, user: 'Amarjeet yadav', action: 'Logged in', ip: '192.168.1.1', timestamp: '2024-05-21 10:30:15' },
    { id: 2, user: 'Amarjeet yadav', action: 'Updated ticket #TKT001 status to "In Progress"', ip: '192.168.1.1', timestamp: '2024-05-21 10:32:45' },
    { id: 3, user: 'BHANDUOP -001', action: 'Created new ticket #TKT1716298516853', ip: '10.0.0.52', timestamp: '2024-05-21 11:15:02' },
    { id: 4, user: 'Amarjeet yadav', action: 'Impersonated user "VIKHROLI -002"', ip: '192.168.1.1', timestamp: '2024-05-21 14:05:18' },
    { id: 5, user: 'Amarjeet yadav', action: 'Stopped user impersonation', ip: '192.168.1.1', timestamp: '2024-05-21 14:10:22' },
    { id: 6, user: 'Amarjeet yadav', action: 'Viewed Reports & Analytics page', ip: '192.168.1.1', timestamp: '2024-05-21 15:00:01' },
];

const SecuritySettings: React.FC = () => {
    const [is2faEnabled, setIs2faEnabled] = useState(false);
    const [is2faModalOpen, setIs2faModalOpen] = useState(false);

    return (
        <>
            <div className="space-y-6">
                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">Access & Security</h3>
                    <div className="mt-4 divide-y divide-slate-200 dark:divide-slate-700">
                        <ToggleSwitch 
                            label="Enable Two-Factor Authentication (2FA)"
                            description="Require a second verification step for all users upon login."
                            enabled={is2faEnabled}
                            onChange={(enabled) => {
                                if (enabled) { // Trying to turn it ON
                                    setIs2faModalOpen(true);
                                } else { // Trying to turn it OFF
                                    if (window.confirm("Are you sure you want to disable Two-Factor Authentication?")) {
                                        setIs2faEnabled(false);
                                        alert("2FA disabled.");
                                    }
                                }
                            }}
                        />
                    </div>
                </div>

                 <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4">Password Policy</h3>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-sm">
                        <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-md">
                            <span className="font-semibold">Minimum Length:</span> 8 characters
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-md">
                            <span className="font-semibold">Requires Uppercase:</span> Yes
                        </div>
                        <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-md">
                            <span className="font-semibold">Requires Number:</span> Yes
                        </div>
                         <div className="bg-slate-50 dark:bg-slate-700 p-3 rounded-md">
                            <span className="font-semibold">Requires Symbol:</span> No
                        </div>
                    </div>
                     <p className="text-xs text-slate-500 dark:text-slate-400 mt-3">* Password policies are enforced by the backend and cannot be changed here.</p>
                </div>


                <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4">Audit Log</h3>
                    <p className="text-sm text-slate-500 dark:text-slate-400 mb-4">
                        View a log of important actions performed by users in the system.
                    </p>
                    <div className="overflow-x-auto border border-slate-200 dark:border-slate-700 rounded-lg">
                        <table className="min-w-full divide-y divide-slate-200 dark:divide-slate-700">
                            <thead className="bg-slate-50 dark:bg-slate-700">
                                <tr>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase">User</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase">Action</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase">IP Address</th>
                                    <th className="px-4 py-3 text-left text-xs font-medium text-slate-500 dark:text-slate-300 uppercase">Timestamp</th>
                                </tr>
                            </thead>
                            <tbody className="bg-white dark:bg-slate-800 divide-y divide-slate-200 dark:divide-slate-700">
                                {MOCK_AUDIT_LOGS.map(log => (
                                    <tr key={log.id}>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm font-medium">{log.user}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-600 dark:text-slate-300">{log.action}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{log.ip}</td>
                                        <td className="px-4 py-3 whitespace-nowrap text-sm text-slate-500 dark:text-slate-400">{log.timestamp}</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
             {is2faModalOpen && (
                <TwoFactorAuthModal
                    onClose={() => setIs2faModalOpen(false)}
                    onEnable={() => {
                        setIs2faEnabled(true);
                        setIs2faModalOpen(false);
                        alert("Two-Factor Authentication has been enabled successfully!");
                    }}
                />
            )}
        </>
    );
};

export default SecuritySettings;
