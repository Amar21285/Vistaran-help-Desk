import type { User, Technician, Symptom, Ticket, ManagedFile, TicketTemplate } from './types';
import { Role, UserStatus, Priority, TicketStatus, FileType } from './types';

export const USERS: User[] = [
    { id: 'USR001', name: 'Amarjeet yadav', email: 'ITsupport@vistaran.in', password: '88283671', role: Role.ADMIN, department: 'IT', status: UserStatus.ACTIVE, joinedDate: '2023-01-15T10:00:00Z', photo: 'https://randomuser.me/api/portraits/men/1.jpg', phone: '+918828367178', whatsapp: '+918828367178' },
    { id: 'USR002', name: 'BHANDUOP -001', email: 'purchasebhandup@vistaran.in', password: '10001', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR003', name: 'VIKHROLI -002', email: 'purchasevikhroli@vistaran.in', password: '10002', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR004', name: 'HIRANANDANI -003', email: 'purchasepowai@vistaran.in', password: '10003', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR005', name: 'POWAI -004', email: 'purchasepowai2@vistaran.in', password: '10004', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR006', name: 'Mulund -005', email: 'purchasemulund@vistaran.in', password: '10005', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR007', name: 'Mulund -006', email: 'purchaseveenanagar@vistaran.in', password: '10006', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR008', name: 'Mulund -007', email: 'purchasecyprus@vistaran.in', password: '10007', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR009', name: 'Hindustan Chowk 008', email: 'purchasecolonymul@vistaran.in', password: '10008', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR010', name: 'Tambe Nagar 009', email: 'purchasetambenagar@vistaran.in', password: '10009', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR011', name: 'Romell vasant 010', email: 'purchaseromellmul@vistaran.in', password: '10010', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR012', name: 'Chandiwali 011', email: 'purchasechandivali@vistaran.in', password: '10011', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR013', name: 'Sakinaka 012', email: 'purchasesakinaka@vistaran.in', password: '10012', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR014', name: 'Godrej 013', email: 'purchasegodrej@vistaran.in', password: '10013', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR015', name: 'Tagore Nagar014', email: 'purchasetagore@vistaran.in', password: '10014', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR016', name: 'Veena Two 015', email: 'purchaseveena2@vistaran.in', password: '10015', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR017', name: 'Hanuman Chowk 016', email: 'purchasehanuman@vistaran.in', password: '10016', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR018', name: 'KailashBranch 017', email: 'purchasekailash@vistaran.in', password: '10017', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR019', name: 'Lok kedar branch 018', email: 'purchaselokkedar@vistaran.in', password: '10018', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR020', name: 'Sai Dham Branch 019', email: 'purchasesaidham@vistaran.in', password: '10019', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR021', name: 'Civilhospital Branch 20', email: 'purchasecivilhospital@vistaran.in', password: '10020', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR022', name: 'Talaopali Branch 21', email: 'purchasetalaopali@vistaran.in', password: '10021', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR023', name: 'Vartaknagar Branch 22', email: 'purchasevartaknagar@vistaran.in', password: '10022', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR024', name: 'Parksite Branch', email: 'purchaseparksite@vistaran.in', password: '11111', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR025', name: 'Customer Support ID', email: 'pillsandmore@vistaran.in', password: '77661', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR026', name: 'Vistaran office Ho', email: 'purchase@vistaran.in', password: '776688', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR027', name: 'Warehouse 501', email: 'purchasedc@vistaran.in', password: '50001', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
    { id: 'USR028', name: 'Dhokali Naka 023', email: 'purchasedhokali@vistaran.in', password: '10023', role: Role.USER, department: 'Operations', status: UserStatus.ACTIVE, joinedDate: '2023-02-20T11:30:00Z' },
];

export const TECHNICIANS: Technician[] = [
    { id: 'TECH001', name: 'Amarjeet yadav', email: 'ITsupport@vistaran.in', department: 'IT', phone: '+918828367178', whatsapp: '+918828367178' },
];

export const SYMPTOMS: Symptom[] = [
    // IT Department
    { id: 'SYM001', name: 'Keyboard or mouse issues', department: 'IT' },
    { id: 'SYM002', name: 'Computer wont turn on', department: 'IT' },
    { id: 'SYM003', name: 'Suspected computer virus', department: 'IT' },
    { id: 'SYM004', name: 'Cannot connect to the internet', department: 'IT' },
    { id: 'SYM005', name: 'Cannot log in', department: 'IT' },
    { id: 'SYM006', name: 'Issues with email', department: 'IT' },
    { id: 'SYM007', name: 'Issue with website', department: 'IT' },
    { id: 'SYM008', name: 'Issue with App', department: 'IT' },
    { id: 'SYM009', name: 'Spilled coffee on keyboard', department: 'IT' },
    { id: 'SYM010', name: 'Monitor Issue', department: 'IT' },
    { id: 'SYM011', name: 'Hardware related issues', department: 'IT' },
    { id: 'SYM012', name: 'TSC Printer', department: 'IT' },
    { id: 'SYM013', name: 'HP Printer', department: 'IT' },
    { id: 'SYM014', name: 'Epson lx 310 printer', department: 'IT' },
    { id: 'SYM015', name: 'Ecogreen Not working', department: 'IT' },
    { id: 'SYM016', name: 'MOBILE', department: 'IT' },
    { id: 'SYM017', name: 'BARCOAD ROLL', department: 'IT' },
    { id: 'SYM018', name: 'Not listed', department: 'IT' },

    // Operations Department
    { id: 'SYM100', name: 'STAPLER PIN', department: 'Operations' },
    { id: 'SYM101', name: 'SCISSORS', department: 'Operations' },
    { id: 'SYM102', name: 'Logbook', department: 'Operations' },
    { id: 'SYM103', name: 'MARKER', department: 'Operations' },
    { id: 'SYM104', name: 'Blue Pen', department: 'Operations' },
    { id: 'SYM105', name: 'BLACK PEN', department: 'Operations' },
    { id: 'SYM106', name: 'RED PEN', department: 'Operations' },
    { id: 'SYM107', name: 'A4 - SIZE PAPER', department: 'Operations' },
    { id: 'SYM108', name: 'Register for customer order', department: 'Operations' },
    { id: 'SYM109', name: 'Dustbin Bucket', department: 'Operations' },
    { id: 'SYM110', name: 'Eraser', department: 'Operations' },
    { id: 'SYM111', name: 'Duster Cleaner', department: 'Operations' },
    { id: 'SYM112', name: 'Pencil', department: 'Operations' },
    { id: 'SYM113', name: 'Expense book', department: 'Operations' },
    { id: 'SYM114', name: 'SHIFT BOOK', department: 'Operations' },
    { id: 'SYM115', name: 'Not listed', department: 'Operations' },

    // HR Department
    { id: 'SYM200', name: 'Payroll', department: 'HR' },
    { id: 'SYM201', name: 'Not listed', department: 'HR' },
    
    // Accounts Department
    { id: 'SYM300', name: 'Not listed', department: 'Accounts' },
];

export const TICKETS: Ticket[] = [
    { id: 'TKT001', userId: 'USR002', email: 'purchasebhandup@vistaran.in', description: 'My computer is running extremely slow, making it difficult to work.', department: 'IT', priority: Priority.HIGH, status: TicketStatus.IN_PROGRESS, dateCreated: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000).toISOString(), dateResolved: null, assignedTechId: 'TECH001', symptomId: 'SYM011', history: [
        { id: 'HIST001', ticketId: 'TKT001', userId: 'USR001', change: 'Ticket assigned to Amarjeet yadav.', timestamp: new Date(Date.now() - 2 * 24 * 60 * 60 * 1000 + 100000).toISOString() },
        { id: 'HIST002', ticketId: 'TKT001', userId: 'TECH001', change: 'Contacted user, running remote diagnostics.', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString() },
    ], notes: "Initial diagnostics show high memory usage. Investigating startup programs.", cc: 'manager@example.com', chatHistory: [
        { id: 'CHAT001', senderId: 'USR001', senderName: 'Amarjeet yadav', message: 'Hi there, I am looking into your ticket now. Could you please tell me if you have restarted your computer recently?', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 50000).toISOString(), avatar: 'https://randomuser.me/api/portraits/men/1.jpg' },
        { id: 'CHAT002', senderId: 'USR002', senderName: 'BHANDUOP -001', message: 'Yes, I restarted it this morning but it is still very slow.', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 600000).toISOString() },
        { id: 'CHAT003', senderId: 'USR001', senderName: 'Amarjeet yadav', message: 'Okay, thanks. I am running a remote scan now to check for any issues. I will let you know what I find.', timestamp: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000 + 700000).toISOString(), avatar: 'https://randomuser.me/api/portraits/men/1.jpg' }
    ]},
    { id: 'TKT002', userId: 'USR003', email: 'purchasevikhroli@vistaran.in', description: 'The office printer on the 3rd floor is not printing. It shows a paper jam error but there is no paper jammed.', department: 'IT', priority: Priority.MEDIUM, status: TicketStatus.OPEN, dateCreated: new Date(Date.now() - 1 * 24 * 60 * 60 * 1000).toISOString(), dateResolved: null, assignedTechId: null, symptomId: 'SYM013', cc: '' },
    { id: 'TKT003', userId: 'USR002', email: 'purchasebhandup@vistaran.in', description: 'I need to have Adobe Photoshop installed on my machine for a new project.', department: 'IT', priority: Priority.LOW, status: TicketStatus.RESOLVED, dateCreated: new Date(Date.now() - 5 * 24 * 60 * 60 * 1000).toISOString(), dateResolved: new Date(Date.now() - 4 * 24 * 60 * 60 * 1000).toISOString(), assignedTechId: 'TECH001', symptomId: 'SYM008', cc: '' },
];

export const FILES: ManagedFile[] = [
    { id: 'FILE001', name: 'screenshot-error.png', size: '1.2 MB', date: '2024-05-20', type: FileType.IMAGE },
    { id: 'FILE002', name: 'installation-guide.pdf', size: '3.4 MB', date: '2024-05-18', type: FileType.PDF },
    { id: 'FILE003', name: 'asset-report.xlsx', size: '780 KB', date: '2024-05-15', type: FileType.SPREADSHEET },
    { id: 'FILE004', name: 'troubleshooting-log.docx', size: '256 KB', date: '2024-05-21', type: FileType.DOC },
];

export const TICKET_TEMPLATES: TicketTemplate[] = [
    { 
        id: 'TPL001', 
        title: 'Printer Not Working', 
        description: 'The office printer is not responding. I have checked for paper jams and power, but it still will not print.', 
        department: 'IT', 
        priority: Priority.MEDIUM, 
        symptomId: 'SYM013' // HP Printer
    },
    { 
        id: 'TPL002', 
        title: 'Internet Connectivity Issue', 
        description: 'I cannot connect to the internet on my computer. Other devices seem to be working fine. I have already tried restarting my computer.', 
        department: 'IT', 
        priority: Priority.HIGH, 
        symptomId: 'SYM004' // Cannot connect to the internet
    },
    { 
        id: 'TPL003', 
        title: 'Request for A4 Paper', 
        description: 'We have run out of A4 size paper at our branch. Please arrange for a new ream to be sent.', 
        department: 'Operations', 
        priority: Priority.LOW, 
        symptomId: 'SYM107' // A4 - SIZE PAPER
    },
    {
        id: 'TPL004',
        title: 'Laptop not booting properly',
        description: 'My HP laptop is not starting, showing a black screen after login.',
        department: 'IT',
        priority: Priority.HIGH,
        symptomId: 'SYM002' // Computer wont turn on
    },
    {
        id: 'TPL005',
        title: 'Request for new keyboard',
        description: 'My keyboard is not working properly; need a replacement.',
        department: 'IT',
        priority: Priority.MEDIUM,
        symptomId: 'SYM001' // Keyboard or mouse issues
    },
    {
        id: 'TPL006',
        title: 'Need MS Office 365 access',
        description: 'Please install MS Office 365 and configure Outlook for my system.',
        department: 'IT',
        priority: Priority.LOW,
        symptomId: 'SYM008' // Issue with App
    },
    {
        id: 'TPL007',
        title: 'Email password reset',
        description: 'Unable to log in to company email, need password reset.',
        department: 'IT',
        priority: Priority.HIGH,
        symptomId: 'SYM005' // Cannot log in
    },
    {
        id: 'TPL008',
        title: 'Wi-Fi not connecting',
        description: 'Office Wi-Fi not connecting since morning.',
        department: 'IT',
        priority: Priority.HIGH,
        symptomId: 'SYM004' // Cannot connect to the internet
    },
    {
        id: 'TPL009',
        title: 'Printer not printing',
        description: 'Printer shows "paper jam" error even after checking tray.',
        department: 'IT',
        priority: Priority.MEDIUM,
        symptomId: 'SYM013' // HP Printer
    },
    {
        id: 'TPL010',
        title: 'Request data recovery',
        description: 'Need to recover data deleted from shared drive.',
        department: 'IT',
        priority: Priority.URGENT,
        symptomId: 'SYM018' // Not listed
    },
    {
        id: 'TPL011',
        title: 'Vendor payment pending',
        description: 'Payment for invoice #INV452 still pending; please release.',
        department: 'Accounts',
        priority: Priority.HIGH,
        symptomId: 'SYM300'
    },
    {
        id: 'TPL012',
        title: 'Incorrect invoice amount',
        description: 'Received wrong amount in invoice; please verify and correct.',
        department: 'Accounts',
        priority: Priority.HIGH,
        symptomId: 'SYM300'
    },
    {
        id: 'TPL013',
        title: 'Monthly expense report request',
        description: 'Please share department expense report for September.',
        department: 'Accounts',
        priority: Priority.LOW,
        symptomId: 'SYM300'
    },
    {
        id: 'TPL014',
        title: 'Update bank account info',
        description: 'Need to update my salary account number.',
        department: 'Accounts',
        priority: Priority.MEDIUM,
        symptomId: 'SYM300'
    },
    {
        id: 'TPL015',
        title: 'Request for marketing budget',
        description: 'Need approval for Q4 marketing budget allocation.',
        department: 'Accounts',
        priority: Priority.MEDIUM,
        symptomId: 'SYM300'
    },
    {
        id: 'TPL016',
        title: 'Monthly expense report request',
        description: 'Please share department expense report for September.',
        department: 'Accounts',
        priority: Priority.LOW,
        symptomId: 'SYM300'
    },
    {
        id: 'TPL017',
        title: 'Leave application for 5 days',
        description: 'Requesting leave from 5th to 9th Nov due to personal reasons.',
        department: 'HR',
        priority: Priority.MEDIUM,
        symptomId: 'SYM201' // Not listed
    },
    {
        id: 'TPL018',
        title: 'Attendance not marked',
        description: 'My attendance for 22nd Oct is missing; please correct it.',
        department: 'HR',
        priority: Priority.MEDIUM,
        symptomId: 'SYM201' // Not listed
    },
    {
        id: 'TPL019',
        title: 'New joiner system setup',
        description: 'Need IT access and ID card for new employee joining today.',
        department: 'HR',
        priority: Priority.HIGH,
        symptomId: 'SYM201' // Not listed
    },
    {
        id: 'TPL020',
        title: 'Workplace concern',
        description: 'I want to report an issue related to team communication.',
        department: 'HR',
        priority: Priority.HIGH,
        symptomId: 'SYM201' // Not listed
    },
    {
        id: 'TPL021',
        title: 'Request for Excel training',
        description: 'Need advanced Excel training for finance team.',
        department: 'HR',
        priority: Priority.LOW,
        symptomId: 'SYM201' // Not listed
    },
    {
        id: 'TPL022',
        title: 'Payslip for Sept 2025',
        description: 'Please share my salary slip for September 2025.',
        department: 'HR',
        priority: Priority.MEDIUM,
        symptomId: 'SYM200' // Payroll
    }
];