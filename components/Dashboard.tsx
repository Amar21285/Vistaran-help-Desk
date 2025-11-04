import React, { useMemo } from 'react';
import { Ticket, TicketStatus, User, Role } from '../types';
import { useAuth } from '../hooks/useAuth';
import StatCard from './StatCard';
import TicketStatusChart from './charts/TicketStatusChart';

interface DashboardProps {
    tickets: Ticket[];
    users: User[];
    globalFilter: string;
}

const TicketRow: React.FC<{ticket: Ticket}> = ({ ticket }) => (
     <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition">
        <div>
            <p className="font-semibold text-slate-700 dark:text-slate-200">#{ticket.id}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-xs">{ticket.description}</p>
        </div>
        <span className={`text-xs font-bold px-2 py-1 rounded-full ${
            ticket.status === TicketStatus.OPEN ? 'bg-blue-100 text-blue-700' :
            ticket.status === TicketStatus.IN_PROGRESS ? 'bg-yellow-100 text-yellow-700' :
            'bg-green-100 text-green-700'
        }`}>
            {ticket.status}
        </span>
    </div>
);

const ResolvedTicketRow: React.FC<{ ticket: Ticket }> = ({ ticket }) => (
    <div className="flex items-center justify-between p-3 bg-slate-50 dark:bg-slate-700 hover:bg-slate-100 dark:hover:bg-slate-600 rounded-lg transition">
        <div>
            <p className="font-semibold text-slate-700 dark:text-slate-200">#{ticket.id}</p>
            <p className="text-sm text-slate-500 dark:text-slate-400 truncate max-w-xs">{ticket.description}</p>
        </div>
        <div className="text-right shrink-0 ml-2">
            <p className="text-xs font-semibold text-green-700 dark:text-green-400">Resolved</p>
            <p className="text-xs text-slate-500 dark:text-slate-400">
                {ticket.dateResolved ? new Date(ticket.dateResolved).toLocaleDateString() : 'N/A'}
            </p>
        </div>
    </div>
);


const Dashboard: React.FC<DashboardProps> = ({ tickets, users, globalFilter }) => {
    const { user: currentUser } = useAuth();

    const filteredTickets = useMemo(() => {
        if (!currentUser) return [];

        let userTickets = currentUser.role === Role.ADMIN
            ? tickets
            : tickets.filter(ticket => ticket.userId === currentUser.id);

        if (!globalFilter) {
            return userTickets;
        }

        const lowercasedFilter = globalFilter.toLowerCase();
        return userTickets.filter(ticket => {
            const ticketUser = users.find(u => u.id === ticket.userId);
            return ticket.id.toLowerCase().includes(lowercasedFilter) ||
                   ticket.description.toLowerCase().includes(lowercasedFilter) ||
                   ticket.department.toLowerCase().includes(lowercasedFilter) ||
                   (ticketUser && ticketUser.name.toLowerCase().includes(lowercasedFilter));
        });
    }, [tickets, users, currentUser, globalFilter]);
    
    const recentTickets = useMemo(() => {
      return [...filteredTickets].sort((a,b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime())
    }, [filteredTickets]);

    const recentlyResolvedTickets = useMemo(() => {
        const sevenDaysAgo = new Date();
        sevenDaysAgo.setDate(sevenDaysAgo.getDate() - 7);

        // Filter all tickets, not just the user's, for this system-wide view
        return tickets
            .filter(ticket =>
                ticket.status === TicketStatus.RESOLVED &&
                ticket.dateResolved &&
                new Date(ticket.dateResolved) >= sevenDaysAgo
            )
            .sort((a, b) => new Date(b.dateResolved!).getTime() - new Date(a.dateResolved!).getTime());
    }, [tickets]);


    const stats = useMemo(() => {
        const pending = filteredTickets.filter(t => t.status === TicketStatus.OPEN || t.status === TicketStatus.IN_PROGRESS).length;
        const resolved = filteredTickets.filter(t => t.status === TicketStatus.RESOLVED).length;
        return {
            totalTickets: filteredTickets.length,
            pendingTickets: pending,
            resolvedTickets: resolved,
            totalUsers: users.length, // Total users stat is independent of ticket filter
        };
    }, [filteredTickets, users]);

    const statusChartData = useMemo(() => {
        const counts: Record<string, number> = {
            [TicketStatus.OPEN]: 0,
            'In Progress': 0,
            [TicketStatus.RESOLVED]: 0,
        };
        
        filteredTickets.forEach(ticket => {
            if (counts[ticket.status] !== undefined) {
                counts[ticket.status]++;
            }
        });
        
        return Object.entries(counts)
            .map(([name, value]) => ({ name, value }));
    }, [filteredTickets]);

    return (
        <div className="space-y-6">
            <header>
                <h2 className="text-3xl font-bold text-slate-800 dark:text-slate-100">Dashboard Overview</h2>
                <p className="text-slate-500 dark:text-slate-400 mt-1">Welcome to your help desk dashboard</p>
            </header>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
                <StatCard title="Total Tickets" value={stats.totalTickets} iconClass="fas fa-ticket-alt" />
                <StatCard title="Pending Tickets" value={stats.pendingTickets} iconClass="fas fa-clock" />
                <StatCard title="Resolved Tickets" value={stats.resolvedTickets} iconClass="fas fa-check-circle" />
                {currentUser?.role === Role.ADMIN && (
                    <StatCard title="Total Users" value={stats.totalUsers} iconClass="fas fa-users" />
                )}
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
                <div className="lg:col-span-3 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                        {globalFilter ? `Filtered Tickets (${recentTickets.length})` : "Recent Tickets"}
                    </h3>
                    <div className="space-y-2">
                        {recentTickets.length > 0 ? (
                            recentTickets.slice(0, 5).map(ticket => <TicketRow key={ticket.id} ticket={ticket} />)
                        ) : (
                            <p className="text-center text-slate-500 dark:text-slate-400 py-4">
                                {globalFilter ? `No tickets found for "${globalFilter}".` : "No recent tickets to display."}
                            </p>
                        )}
                    </div>
                </div>
                 <div className="lg:col-span-2 bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                    <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                        Tickets by Status
                    </h3>
                    <TicketStatusChart data={statusChartData} />
                </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-bold text-slate-800 dark:text-slate-100 mb-4">
                    Recently Resolved (Last 7 Days)
                </h3>
                <div className="space-y-2">
                    {recentlyResolvedTickets.length > 0 ? (
                        recentlyResolvedTickets.slice(0, 5).map(ticket => <ResolvedTicketRow key={ticket.id} ticket={ticket} />)
                    ) : (
                        <p className="text-center text-slate-500 dark:text-slate-400 py-4">
                            No tickets have been resolved in the last week.
                        </p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Dashboard;