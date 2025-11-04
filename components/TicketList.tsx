import React from 'react';
import TicketCard from './TicketCard';
import { Ticket, Technician, Symptom } from '../types';

interface TicketListProps {
    tickets: Ticket[];
    onEditTicket: (ticket: Ticket) => void;
    technicians: Technician[];
    symptoms: Symptom[];
    selectedTicketIds: string[];
    onTicketSelect: (ticketId: string) => void;
}

const TicketList: React.FC<TicketListProps> = ({ tickets, onEditTicket, technicians, symptoms, selectedTicketIds, onTicketSelect }) => {
    if (tickets.length === 0) {
        return (
            <div className="text-center p-12 bg-white dark:bg-slate-800 rounded-lg shadow">
                <h3 className="text-xl font-semibold text-slate-600 dark:text-slate-200">No tickets found.</h3>
                <p className="text-slate-500 dark:text-slate-400 mt-2">Looks like everything is in order!</p>
            </div>
        );
    }

    return (
        <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
            {tickets.map(ticket => (
                <TicketCard 
                    key={ticket.id} 
                    ticket={ticket} 
                    onEdit={onEditTicket} 
                    technicianName={technicians.find(t => t.id === ticket.assignedTechId)?.name}
                    symptomName={symptoms.find(s => s.id === ticket.symptomId)?.name}
                    isSelected={selectedTicketIds.includes(ticket.id)}
                    onSelect={onTicketSelect}
                />
            ))}
        </div>
    );
};

export default TicketList;
