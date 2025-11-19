import React, { createContext, useState, useContext, ReactNode, useEffect, useCallback } from 'react';

const DEFAULT_LOGO_URL = ''; // Default to icon
const DEFAULT_EMAILJS_SERVICE_ID = 'service_ee55frm';
const DEFAULT_EMAILJS_PUBLIC_KEY = 'Askap9zd4U9UO242i';

export interface NotificationSettings {
  adminOnNewTicket: boolean;
  userOnNewTicket: boolean;
  userOnTicketResolved: boolean;
  adminOnTicketResolved: boolean;
  techOnTicketAssigned: boolean;
  userOnTicketStatusChanged: boolean;
}

const DEFAULT_NOTIFICATION_SETTINGS: NotificationSettings = {
    adminOnNewTicket: true,
    userOnNewTicket: true,
    userOnTicketResolved: true,
    adminOnTicketResolved: true,
    techOnTicketAssigned: true,
    userOnTicketStatusChanged: true,
};

export interface EmailTemplate {
  subject: string;
  body: string;
}

export interface EmailTemplateSettings {
  adminOnNewTicket: EmailTemplate;
  userOnNewTicket: EmailTemplate;
  userOnTicketResolved: EmailTemplate;
  adminOnTicketResolved: EmailTemplate;
  techOnTicketAssigned: EmailTemplate;
  userOnTicketStatusChanged: EmailTemplate;
}

export const DEFAULT_EMAIL_TEMPLATES: EmailTemplateSettings = {
  adminOnNewTicket: {
    subject: `[New Ticket #{ticket.id}] {ticket.department} - {ticket.priority} Priority`,
    body: `<p>Hello Admin,</p>
<p>A new support ticket has been created by <strong>{user.name}</strong> and requires attention.</p>
<br>
<p><strong>Ticket ID:</strong> #{ticket.id}</p>
<p><strong>User:</strong> {user.name} ({user.email})</p>
<p><strong>Department:</strong> {ticket.department}</p>
<p><strong>Priority:</strong> {ticket.priority}</p>
<p><strong>Description:</strong></p>
<p>{ticket.description}</p>`
  },
  userOnNewTicket: {
    subject: `Your Support Ticket #{ticket.id} Has Been Received`,
    body: `<p>Hello {user.name},</p>
<p>Thank you for reaching out. We have received your support request. Here are the details:</p>
<br>
<p><strong>Ticket ID:</strong> #{ticket.id}</p>
<p><strong>Priority:</strong> {ticket.priority}</p>
<p><strong>Your Description:</strong></p>
<p>{ticket.description}</p>
<br>
<p>Our team will review your request and get back to you soon.</p>`
  },
  userOnTicketResolved: {
    subject: `Your Support Ticket #{ticket.id} has been resolved by {resolver.name}`,
    body: `<p>Hello {user.name},</p>
<p>Your support ticket regarding "{ticket.description}" has been resolved by our technician, <strong>{resolver.name}</strong>.</p>
<br>
<p><strong>Ticket ID:</strong> #{ticket.id}</p>
<p><strong>Resolution Notes:</strong></p>
<p>{ticket.notes}</p>
<br>
<p>If you feel the issue is not fully resolved, please create a new ticket referencing this one.</p>`
  },
  adminOnTicketResolved: {
    subject: `[Ticket Resolved #{ticket.id}] by {resolver.name}`,
    body: `<p>Hello Admin,</p>
<p>The support ticket <strong>#{ticket.id}</strong> has been marked as resolved by <strong>{resolver.name}</strong>.</p>
<br>
<p><strong>Ticket ID:</strong> #{ticket.id}</p>
<p><strong>Original User:</strong> {user.name} ({user.email})</p>
<p><strong>Description:</strong></p>
<p>{ticket.description}</p>
<p><strong>Resolution Notes by {resolver.name}:</strong></p>
<p>{ticket.notes}</p>`
  },
  userOnTicketStatusChanged: {
    subject: `Update on Your Support Ticket #{ticket.id}: Now "{ticket.status}"`,
    body: `<p>Hello {user.name},</p>
<p>Your support ticket has been updated by <strong>{updater.name}</strong>. The new status is now: <strong>{ticket.status}</strong>.</p>
<br>
<p><strong>Ticket ID:</strong> #{ticket.id}</p>
<p><strong>Description:</strong> {ticket.description}</p>
<p><strong>Notes from {updater.name}:</strong></p>
<p>{ticket.notes}</p>
<br>
<p>We are actively working on your request. Thank you for your patience.</p>`
  },
  techOnTicketAssigned: {
    subject: `[New Assignment by {assigner.name}] Ticket #{ticket.id} - {ticket.priority} Priority`,
    body: `<p>Hello {tech.name},</p>
<p>A new support ticket has been assigned to you by <strong>{assigner.name}</strong>.</p>
<br>
<p><strong>Ticket ID:</strong> #{ticket.id}</p>
<p><strong>User:</strong> {user.name} ({user.email})</p>
<p><strong>Priority:</strong> {ticket.priority}</p>
<p><strong>Description:</strong></p>
<p>{ticket.description}</p>`
  }
};

interface SettingsContextType {
  logoUrl: string;
  setLogoUrl: (url: string) => void;
  notificationSettings: NotificationSettings;
  setNotificationSettings: (settings: Partial<NotificationSettings>) => void;
  resetSettings: () => void;
  emailjsServiceId: string;
  setEmailjsServiceId: (id: string) => void;
  emailjsPublicKey: string;
  setEmailjsPublicKey: (key: string) => void;
  emailTemplates: EmailTemplateSettings;
  setEmailTemplates: (templates: Partial<EmailTemplateSettings>) => void;
}

const SettingsContext = createContext<SettingsContextType | undefined>(undefined);

export const SettingsProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const [logoUrl, setLogoUrlState] = useState<string>(DEFAULT_LOGO_URL);
  const [notificationSettings, setNotificationSettingsState] = useState<NotificationSettings>(DEFAULT_NOTIFICATION_SETTINGS);
  const [emailjsServiceId, setEmailjsServiceIdState] = useState<string>(DEFAULT_EMAILJS_SERVICE_ID);
  const [emailjsPublicKey, setEmailjsPublicKeyState] = useState<string>(DEFAULT_EMAILJS_PUBLIC_KEY);
  const [emailTemplates, setEmailTemplatesState] = useState<EmailTemplateSettings>(DEFAULT_EMAIL_TEMPLATES);


  useEffect(() => {
    try {
        const savedLogoUrl = localStorage.getItem('vistaran-helpdesk-logoUrl');
        if (savedLogoUrl) {
          setLogoUrlState(savedLogoUrl);
        }
        const savedNotificationSettings = localStorage.getItem('vistaran-helpdesk-notificationSettings');
        if (savedNotificationSettings) {
            setNotificationSettingsState(JSON.parse(savedNotificationSettings));
        }
        const savedServiceId = localStorage.getItem('vistaran-helpdesk-emailjsServiceId');
        if (savedServiceId) {
            setEmailjsServiceIdState(savedServiceId);
        } else {
            setEmailjsServiceIdState(DEFAULT_EMAILJS_SERVICE_ID);
        }
        const savedPublicKey = localStorage.getItem('vistaran-helpdesk-emailjsPublicKey');
        if (savedPublicKey) {
            setEmailjsPublicKeyState(savedPublicKey);
        } else {
            setEmailjsPublicKeyState(DEFAULT_EMAILJS_PUBLIC_KEY);
        }
        const savedEmailTemplates = localStorage.getItem('vistaran-helpdesk-emailTemplates');
        if (savedEmailTemplates) {
            setEmailTemplatesState(JSON.parse(savedEmailTemplates));
        }
    } catch (error) {
        console.error("Failed to load settings from localStorage", error);
    }
  }, []);

  const setLogoUrl = (url: string) => {
    setLogoUrlState(url);
    localStorage.setItem('vistaran-helpdesk-logoUrl', url);
  };

  const setNotificationSettings = (settings: Partial<NotificationSettings>) => {
    const newSettings = { ...notificationSettings, ...settings };
    setNotificationSettingsState(newSettings);
    localStorage.setItem('vistaran-helpdesk-notificationSettings', JSON.stringify(newSettings));
  };
  
  const setEmailjsServiceId = (id: string) => {
    setEmailjsServiceIdState(id);
    localStorage.setItem('vistaran-helpdesk-emailjsServiceId', id);
  };

  const setEmailjsPublicKey = (key: string) => {
    setEmailjsPublicKeyState(key);
    localStorage.setItem('vistaran-helpdesk-emailjsPublicKey', key);
  };
  
  const setEmailTemplates = (templates: Partial<EmailTemplateSettings>) => {
    const newTemplates = { ...emailTemplates, ...templates };
    setEmailTemplatesState(newTemplates);
    localStorage.setItem('vistaran-helpdesk-emailTemplates', JSON.stringify(newTemplates));
  };

  const resetSettings = useCallback(() => {
    setLogoUrlState(DEFAULT_LOGO_URL);
    localStorage.removeItem('vistaran-helpdesk-logoUrl');
    setNotificationSettingsState(DEFAULT_NOTIFICATION_SETTINGS);
    localStorage.removeItem('vistaran-helpdesk-notificationSettings');
    
    setEmailjsServiceIdState(DEFAULT_EMAILJS_SERVICE_ID);
    localStorage.removeItem('vistaran-helpdesk-emailjsServiceId');
    setEmailjsPublicKeyState(DEFAULT_EMAILJS_PUBLIC_KEY);
    localStorage.removeItem('vistaran-helpdesk-emailjsPublicKey');
    
    setEmailTemplatesState(DEFAULT_EMAIL_TEMPLATES);
    localStorage.removeItem('vistaran-helpdesk-emailTemplates');
    
    alert("All application settings (logo, notifications, email) have been reset to default.");
  }, []);

  return (
    <SettingsContext.Provider value={{ 
        logoUrl, setLogoUrl, 
        notificationSettings, setNotificationSettings, 
        resetSettings,
        emailjsServiceId, setEmailjsServiceId,
        emailjsPublicKey, setEmailjsPublicKey,
        emailTemplates, setEmailTemplates,
    }}>
      {children}
    </SettingsContext.Provider>
  );
};

export const useSettings = (): SettingsContextType => {
  const context = useContext(SettingsContext);
  if (context === undefined) {
    throw new Error('useSettings must be used within a SettingsProvider');
  }
  return context;
};