import React from 'react';
import { useAuth } from '../hooks/useAuth';
import { Role } from '../types';
import { DashboardIcon, TicketIcon, PlusCircleIcon, UserCircleIcon, UsersIcon, FolderOpenIcon, CogsIcon, ChartBarIcon, UserTagIcon } from './icons/FontAwesome';

interface SidebarProps {
    currentView: string;
    setCurrentView: (view: string) => void;
    isOpen: boolean;
    setIsOpen: (isOpen: boolean) => void;
}

interface NavItemProps {
    icon: React.ReactNode;
    label: string;
    isActive: boolean;
    onClick: () => void;
}

const NavItem: React.FC<NavItemProps> = ({ icon, label, isActive, onClick }) => (
    <li
        onClick={onClick}
        className={`flex items-center space-x-3 p-3 my-1 rounded-lg cursor-pointer transition-all duration-200 ${
            isActive
                ? 'bg-primary text-white shadow-lg'
                : 'text-slate-700 dark:text-slate-300 hover:bg-slate-200 dark:hover:bg-slate-700'
        }`}
    >
        {icon}
        <span className="font-semibold">{label}</span>
    </li>
);

const Sidebar: React.FC<SidebarProps> = ({ currentView, setCurrentView, isOpen, setIsOpen }) => {
    const { user, realUser } = useAuth();
    if (!user) return null;
    
    // Base the admin check on the 'realUser' to ensure an admin's UI persists during impersonation.
    const isAdmin = realUser?.role === Role.ADMIN;
    
    const handleNavigation = (view: string) => {
        setCurrentView(view);
        // Close sidebar on navigation on smaller screens
        if (window.innerWidth < 768) { // md breakpoint
            setIsOpen(false);
        }
    };

    return (
        <aside className={`w-64 bg-white dark:bg-slate-800 shadow-xl flex-shrink-0 p-4 flex flex-col no-print fixed inset-y-0 left-0 z-30 transform transition-transform duration-300 ease-in-out md:relative md:translate-x-0 ${isOpen ? 'translate-x-0' : '-translate-x-full'}`}>
            <nav className="flex-1">
                <ul className="space-y-1">
                    {isAdmin && (
                        <NavItem
                            icon={<DashboardIcon />}
                            label="Dashboard"
                            isActive={currentView === 'dashboard'}
                            onClick={() => handleNavigation('dashboard')}
                        />
                    )}
                    <NavItem
                        icon={<TicketIcon />}
                        label={isAdmin ? "Ticket Management" : "My Tickets"}
                        isActive={currentView === 'tickets'}
                        onClick={() => handleNavigation('tickets')}
                    />
                    <NavItem
                        icon={<PlusCircleIcon />}
                        label="Create Ticket"
                        isActive={currentView === 'create-ticket'}
                        onClick={() => handleNavigation('create-ticket')}
                    />
                    {isAdmin && (
                        <NavItem
                            icon={<UserTagIcon />}
                            label="My Assigned Tickets"
                            isActive={currentView === 'assigned-tickets'}
                            onClick={() => handleNavigation('assigned-tickets')}
                        />
                    )}
                    <NavItem
                        icon={<FolderOpenIcon />}
                        label="File Manager"
                        isActive={currentView === 'file-manager'}
                        onClick={() => handleNavigation('file-manager')}
                    />
                    {isAdmin && (
                        <>
                            <hr className="my-4 border-slate-200 dark:border-slate-700" />
                            <NavItem
                                icon={<UsersIcon />}
                                label="Users"
                                isActive={currentView === 'users'}
                                onClick={() => handleNavigation('users')}
                            />
                            <NavItem
                                icon={<CogsIcon />}
                                label="App Settings"
                                isActive={currentView === 'app-settings'}
                                onClick={() => handleNavigation('app-settings')}
                            />
                             <NavItem
                                icon={<ChartBarIcon />}
                                label="Reports"
                                isActive={currentView === 'reports'}
                                onClick={() => handleNavigation('reports')}
                            />
                        </>
                    )}
                </ul>
            </nav>
            <div className="mt-auto text-center text-xs text-slate-400 space-y-1">
                <p>Founded by Amarjeet Yadav</p>
                <p>&copy; 2024 Vistaran Inc.</p>
            </div>
        </aside>
    );
};

export default Sidebar;
