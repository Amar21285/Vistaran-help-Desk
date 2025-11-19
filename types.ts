

export enum Role {
    ADMIN = 'Admin',
    USER = 'User',
}

export enum UserStatus {
    ACTIVE = 'Active',
    INACTIVE = 'Inactive',
}

export enum LoginStatus {
    SUCCESS = 'SUCCESS',
    INVALID_CREDENTIALS = 'INVALID_CREDENTIALS',
    USER_INACTIVE = 'USER_INACTIVE',
}

export interface User {
    id: string;
    name: string;
    email: string;
    password?: string;
    role: Role;
    department: string;
    status: UserStatus;
    joinedDate: string;
    photo?: string;
    phone?: string;
    whatsapp?: string;
}

export enum TicketStatus {
    OPEN = 'Open',
    IN_PROGRESS = 'In Progress',
    RESOLVED = 'Resolved',
}

export enum Priority {
    URGENT = 'Urgent',
    HIGH = 'High',
    MEDIUM = 'Medium',
    LOW = 'Low',
}

export interface ChatMessage {
    id: string;
    senderId: string;
    senderName: string;
    message: string;
    timestamp: string;
    avatar?: string;
}

export interface Ticket {
    id: string;
    userId: string;
    email: string;
    description: string;
    department: string;
    priority: Priority;
    status: TicketStatus;
    dateCreated: string;
    dateResolved: string | null;
    assignedTechId: string | null;
    symptomId: string;
    photoUrl?: string;
    history?: TicketHistory[];
    notes?: string;
    cc?: string;
    chatHistory?: ChatMessage[];
}

export interface Technician {
    id: string;
    name: string;
    email: string;
    department: string;
    phone?: string;
    whatsapp?: string;
}

export interface Symptom {
    id: string;
    name: string;
    department: string;
}

export interface TicketHistory {
    id: string;
    ticketId: string;
    userId: string; // User who made the change
    change: string;
    timestamp: string;
}

export interface TicketTemplate {
    id: string;
    title: string;
    description: string;
    department: string;
    priority: Priority;
    symptomId: string;
}

export enum FileType {
    IMAGE = 'image',
    DOC = 'doc',
    PDF = 'pdf',
    SPREADSHEET = 'spreadsheet',
}

export interface ManagedFile {
    id: string;
    name: string;
    size: string;
    date: string;
    type: FileType;
}

export interface AuditLogEntry {
    id: string;
    userId: string;
    userName: string;
    action: string;
    timestamp: string;
    ip: string; // Mocked client-side
}