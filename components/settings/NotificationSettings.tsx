import React from 'react';
import { useSettings } from '../../hooks/useSettings';
import ToggleSwitch from '../ToggleSwitch';

const NotificationSettings: React.FC = () => {
    const { notificationSettings, setNotificationSettings } = useSettings();

    return (
        <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
            <div>
                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">Email Notification Preferences</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Enable or disable automated email notifications for key events. These require the Email settings to be configured.
                </p>
                 <div className="mt-4 divide-y divide-slate-200 dark:divide-slate-700">
                    <ToggleSwitch 
                        label="Admin: New Ticket Created"
                        description="Send an email to admins when a user creates a new ticket."
                        enabled={notificationSettings.adminOnNewTicket}
                        onChange={(e) => setNotificationSettings({ adminOnNewTicket: e })}
                    />
                    <ToggleSwitch 
                        label="User: New Ticket Confirmation"
                        description="Send a confirmation email to the user when they create a new ticket."
                        enabled={notificationSettings.userOnNewTicket}
                        onChange={(e) => setNotificationSettings({ userOnNewTicket: e })}
                    />
                     <ToggleSwitch 
                        label="User: Ticket Resolved"
                        description="Send an email to the user when their ticket is marked as resolved."
                        enabled={notificationSettings.userOnTicketResolved}
                        onChange={(e) => setNotificationSettings({ userOnTicketResolved: e })}
                    />
                    <ToggleSwitch 
                        label="Admin: Ticket Resolved"
                        description="Send an email to admins when any ticket is resolved."
                        enabled={notificationSettings.adminOnTicketResolved}
                        onChange={(e) => setNotificationSettings({ adminOnTicketResolved: e })}
                    />
                    <ToggleSwitch 
                        label="User: Ticket Status Updated"
                        description="Send an email to the user when their ticket status changes (e.g., to 'In Progress')."
                        enabled={notificationSettings.userOnTicketStatusChanged}
                        onChange={(e) => setNotificationSettings({ userOnTicketStatusChanged: e })}
                    />
                     <ToggleSwitch 
                        label="Technician: Ticket Assigned"
                        description="Send an email to a technician when a ticket is assigned to them."
                        enabled={notificationSettings.techOnTicketAssigned}
                        onChange={(e) => setNotificationSettings({ techOnTicketAssigned: e })}
                    />
                </div>
            </div>
        </div>
    );
};

export default NotificationSettings;
