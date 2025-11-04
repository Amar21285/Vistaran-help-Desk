import React, { useState, useEffect } from 'react';
import { useAuth, AuthProvider } from './hooks/useAuth';
import { SettingsProvider } from './hooks/useSettings';
import { ThemeProvider } from './hooks/useTheme';
import Login from './components/Login';
import TopNav from './components/TopNav';
import Sidebar from './components/Sidebar';
import Dashboard from './components/Dashboard';
import AdminDashboard from './components/AdminDashboard';
import TicketManagement from './components/TicketManagement';
import CreateTicket from './components/CreateTicket';
import UserManagement from './components/UserManagement';
import Settings from './components/Settings';
import Profile from './components/Profile';
import Reports from './components/Reports';
import FileManager from './components/FileManager';
import UserModal from './components/UserModal';
import Chatbot from './components/Chatbot'; // Import the new Chatbot component
import { USERS, TICKETS, TECHNICIANS, SYMPTOMS, FILES, TICKET_TEMPLATES } from './constants';
import { User, Ticket, ManagedFile, Technician, Symptom, Role, TicketTemplate } from './types';

interface ModalAction {
    label: string;
    onClick: () => void;
    className?: string;
}

// Helper to load data from localStorage or fallback to initial constants
const loadFromStorage = <T,>(key: string, fallback: T): T => {
    try {
        const storedValue = localStorage.getItem(key);
        if (storedValue) {
            return JSON.parse(storedValue);
        }
    } catch (error) {
        console.error(`Failed to load '${key}' from localStorage`, error);
    }
    return fallback;
};

const InfoModal: React.FC<{
    title: string;
    message: React.ReactNode;
    onClose: () => void;
    actions?: ModalAction[];
}> = ({ title, message, onClose, actions }) => {
    return (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4 modal-backdrop">
            <div className="bg-white dark:bg-slate-800 rounded-lg shadow-xl p-6 w-full max-w-md text-center modal-content">
                <div className="text-blue-500 mb-4">
                    <i className="fas fa-info-circle fa-3x"></i>
                </div>
                <h2 className="text-xl font-bold text-slate-800 dark:text-slate-100">{title}</h2>
                <div className="text-slate-600 dark:text-slate-300 my-4 text-left">
                    {message}
                </div>
                <div className="flex justify-center flex-wrap gap-4 mt-6">
                     {actions?.map((action, index) => (
                        <button
                            key={index}
                            onClick={action.onClick}
                            className={action.className || 'bg-green-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-green-700 transition'}
                        >
                            {action.label}
                        </button>
                    ))}
                    <button
                        onClick={onClose}
                        className="bg-blue-600 text-white font-semibold px-4 py-2 rounded-lg hover:bg-blue-700 transition"
                    >
                        {actions && actions.length > 0 ? 'Close' : 'OK'}
                    </button>
                </div>
            </div>
        </div>
    );
};


const AppContent: React.FC = () => {
    const { user, realUser, logout, updateUser, startImpersonation, stopImpersonation } = useAuth();
    
    // App-wide state with localStorage persistence
    const [allUsers, setAllUsers] = useState<User[]>(() => loadFromStorage('vistaran-helpdesk-users', USERS));
    const [allTickets, setAllTickets] = useState<Ticket[]>(() => loadFromStorage('vistaran-helpdesk-tickets', TICKETS));
    const [allFiles, setAllFiles] = useState<ManagedFile[]>(() => loadFromStorage('vistaran-helpdesk-files', FILES));
    const [allTechnicians, setAllTechnicians] = useState<Technician[]>(() => loadFromStorage('vistaran-helpdesk-technicians', TECHNICIANS));
    const [allSymptoms, setAllSymptoms] = useState<Symptom[]>(() => loadFromStorage('vistaran-helpdesk-symptoms', SYMPTOMS));
    const [allTemplates, setAllTemplates] = useState<TicketTemplate[]>(() => loadFromStorage('vistaran-helpdesk-templates', TICKET_TEMPLATES));
    const [allDepartments, setAllDepartments] = useState<string[]>(() => {
        const deriveInitialDepartments = (): string[] => {
            const deptSet = new Set<string>();
            [...USERS, ...TECHNICIANS, ...SYMPTOMS, ...TICKETS, ...TICKET_TEMPLATES].forEach(item => {
                if (item.department) {
                    deptSet.add(item.department);
                }
            });
            return Array.from(deptSet).sort();
        };
        return loadFromStorage('vistaran-helpdesk-departments', deriveInitialDepartments());
    });


    const [currentView, setCurrentView] = useState('dashboard');
    const [globalFilter, setGlobalFilter] = useState('');

    // Modal States
    const [editingUser, setEditingUser] = useState<User | null>(null);
    const [infoModalContent, setInfoModalContent] = useState<{ title: string; message: React.ReactNode; actions?: ModalAction[] } | null>(null);

    // Effect to save data to localStorage whenever it changes
    useEffect(() => { try { localStorage.setItem('vistaran-helpdesk-users', JSON.stringify(allUsers)); } catch (e) { console.error('Failed to save users to localStorage:', e); } }, [allUsers]);
    useEffect(() => { try { localStorage.setItem('vistaran-helpdesk-tickets', JSON.stringify(allTickets)); } catch (e) { console.error('Failed to save tickets to localStorage:', e); } }, [allTickets]);
    useEffect(() => { try { localStorage.setItem('vistaran-helpdesk-files', JSON.stringify(allFiles)); } catch (e) { console.error('Failed to save files to localStorage:', e); } }, [allFiles]);
    useEffect(() => { try { localStorage.setItem('vistaran-helpdesk-technicians', JSON.stringify(allTechnicians)); } catch (e) { console.error('Failed to save technicians to localStorage:', e); } }, [allTechnicians]);
    useEffect(() => { try { localStorage.setItem('vistaran-helpdesk-symptoms', JSON.stringify(allSymptoms)); } catch (e) { console.error('Failed to save symptoms to localStorage:', e); } }, [allSymptoms]);
    useEffect(() => { try { localStorage.setItem('vistaran-helpdesk-templates', JSON.stringify(allTemplates)); } catch (e) { console.error('Failed to save templates to localStorage:', e); } }, [allTemplates]);
    useEffect(() => { try { localStorage.setItem('vistaran-helpdesk-departments', JSON.stringify(allDepartments)); } catch (e) { console.error('Failed to save departments to localStorage:', e); } }, [allDepartments]);


    useEffect(() => {
        if (user?.role !== 'Admin' && (currentView === 'dashboard' || currentView === 'users' || currentView === 'app-settings' || currentView === 'reports')) {
            setCurrentView('tickets');
        } else if (user?.role === 'Admin' && currentView !== 'dashboard' && currentView !== 'users' && currentView !== 'app-settings' && currentView !== 'reports' && currentView !== 'tickets' && currentView !== 'assigned-tickets' && currentView !== 'create-ticket' && currentView !== 'file-manager' && currentView !== 'my-profile') {
            setCurrentView('dashboard');
        }
    }, [user, currentView]);

    const handleUpdateUser = (updatedUser: User) => {
        setAllUsers(prev => prev.map(u => u.id === updatedUser.id ? updatedUser : u));
        updateUser(updatedUser); // Update auth context as well
        setEditingUser(null);
    };
    
    const handlePhotoUpdate = (userId: string, photoDataUrl: string) => {
        const userToUpdate = allUsers.find(u => u.id === userId);
        if (userToUpdate) {
            handleUpdateUser({ ...userToUpdate, photo: photoDataUrl });
        }
    };
    
    if (!user) {
        return <Login />;
    }

    const currentUserTechnician = allTechnicians.find(tech => tech.email === user.email);
    const currentUserTechId = currentUserTechnician?.id;

    const renderView = () => {
        switch (currentView) {
            case 'dashboard':
                return user.role === Role.ADMIN 
                    ? <AdminDashboard tickets={allTickets} users={allUsers} setCurrentView={setCurrentView} />
                    : <Dashboard tickets={allTickets} users={allUsers} globalFilter={globalFilter} />;
            case 'tickets':
                return <TicketManagement key="tickets" tickets={allTickets} setTickets={setAllTickets} users={allUsers} technicians={allTechnicians} symptoms={allSymptoms} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} setInfoModalContent={setInfoModalContent} departments={allDepartments} />;
            case 'assigned-tickets':
                return <TicketManagement key="assigned-tickets" tickets={allTickets} setTickets={setAllTickets} users={allUsers} technicians={allTechnicians} symptoms={allSymptoms} globalFilter={globalFilter} setGlobalFilter={setGlobalFilter} setInfoModalContent={setInfoModalContent} assignedToMeTechId={currentUserTechId} departments={allDepartments} />;
            case 'create-ticket':
                return <CreateTicket templates={allTemplates} symptoms={allSymptoms} setTickets={setAllTickets} setCurrentView={setCurrentView} setInfoModalContent={setInfoModalContent} departments={allDepartments} />;
            case 'users':
                return <UserManagement users={allUsers} setUsers={setAllUsers} globalFilter={globalFilter} onImpersonate={startImpersonation} onEditUser={setEditingUser} onPhotoUpdate={handlePhotoUpdate} departments={allDepartments} />;
            case 'app-settings':
                return <Settings templates={allTemplates} setTemplates={setAllTemplates} symptoms={allSymptoms} setSymptoms={setAllSymptoms} departments={allDepartments} setDepartments={setAllDepartments} users={allUsers} tickets={allTickets} />;
            case 'my-profile':
                 return <Profile tickets={allTickets} />;
            case 'reports':
                return <Reports tickets={allTickets} users={allUsers} departments={allDepartments} />;
            case 'file-manager':
                return <FileManager 
                    globalFilter={globalFilter}
                    files={allFiles} 
                    onFileAdd={(file) => setAllFiles(prev => [...prev, file])} 
                    onFileDelete={(id) => setAllFiles(prev => prev.filter(f => f.id !== id))}
                />;
            default:
                return user.role === Role.ADMIN 
                    ? <AdminDashboard tickets={allTickets} users={allUsers} setCurrentView={setCurrentView} />
                    : <Dashboard tickets={allTickets} users={allUsers} globalFilter={globalFilter} />;
        }
    };

    return (
        <div className="flex h-screen bg-slate-100 dark:bg-slate-900 text-slate-800 dark:text-slate-200 font-sans">
            <Sidebar currentView={currentView} setCurrentView={setCurrentView} />
            <div className="flex-1 flex flex-col overflow-hidden">
                <TopNav 
                    user={user} 
                    onLogout={logout} 
                    globalFilter={globalFilter}
                    setGlobalFilter={setGlobalFilter}
                    isImpersonating={!!(realUser && user.id !== realUser.id)}
                    stopImpersonation={stopImpersonation}
                    onViewProfile={() => setCurrentView('my-profile')}
                />
                <main className="flex-1 overflow-y-auto p-8">
                    {renderView()}
                </main>
            </div>
            
            {/* Modals */}
            {editingUser && <UserModal userToEdit={editingUser} currentUser={user} onClose={() => setEditingUser(null)} onSave={handleUpdateUser} departments={allDepartments} />}
            {infoModalContent && (
                <InfoModal 
                    title={infoModalContent.title}
                    message={infoModalContent.message}
                    onClose={() => setInfoModalContent(null)} 
                    actions={infoModalContent.actions}
                />
            )}

            {/* AI Chatbot */}
            <Chatbot />
        </div>
    );
};

const App: React.FC = () => (
    <ThemeProvider>
        <SettingsProvider>
            <AuthProvider>
                <AppContent />
            </AuthProvider>
        </SettingsProvider>
    </ThemeProvider>
);

export default App;
