# Help Desk Application Database Schema

This document describes the database schema for the Help Desk application when migrating from localStorage to MySQL.

## Tables

### 1. Users
```sql
CREATE TABLE users (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    password VARCHAR(255),
    role ENUM('Admin', 'User') NOT NULL,
    department VARCHAR(255) NOT NULL,
    status ENUM('Active', 'Inactive') NOT NULL,
    joined_date DATETIME NOT NULL,
    photo TEXT,
    phone VARCHAR(20),
    whatsapp VARCHAR(20)
);
```

### 2. Tickets
```sql
CREATE TABLE tickets (
    id VARCHAR(36) PRIMARY KEY,
    user_id VARCHAR(36) NOT NULL,
    email VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    department VARCHAR(255) NOT NULL,
    priority ENUM('Urgent', 'High', 'Medium', 'Low') NOT NULL,
    status ENUM('Open', 'In Progress', 'Resolved') NOT NULL,
    date_created DATETIME NOT NULL,
    date_resolved DATETIME NULL,
    assigned_tech_id VARCHAR(36) NULL,
    symptom_id VARCHAR(36) NOT NULL,
    photo_url TEXT,
    notes TEXT,
    cc TEXT
);
```

### 3. Technicians
```sql
CREATE TABLE technicians (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL,
    phone VARCHAR(20),
    whatsapp VARCHAR(20)
);
```

### 4. Symptoms
```sql
CREATE TABLE symptoms (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    department VARCHAR(255) NOT NULL
);
```

### 5. Ticket Templates
```sql
CREATE TABLE ticket_templates (
    id VARCHAR(36) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    description TEXT NOT NULL,
    department VARCHAR(255) NOT NULL,
    priority ENUM('Urgent', 'High', 'Medium', 'Low') NOT NULL,
    symptom_id VARCHAR(36) NOT NULL
);
```

### 6. Files
```sql
CREATE TABLE files (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    size VARCHAR(50) NOT NULL,
    date DATETIME NOT NULL,
    type ENUM('image', 'doc', 'pdf', 'spreadsheet') NOT NULL
);
```

### 7. Ticket History
```sql
CREATE TABLE ticket_history (
    id VARCHAR(36) PRIMARY KEY,
    ticket_id VARCHAR(36) NOT NULL,
    user_id VARCHAR(36) NOT NULL,
    change TEXT NOT NULL,
    timestamp DATETIME NOT NULL
);
```

### 8. Chat Messages
```sql
CREATE TABLE chat_messages (
    id VARCHAR(36) PRIMARY KEY,
    ticket_id VARCHAR(36) NOT NULL,
    sender_id VARCHAR(36) NOT NULL,
    sender_name VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    timestamp DATETIME NOT NULL,
    avatar TEXT
);
```

### 9. Departments
```sql
CREATE TABLE departments (
    id VARCHAR(36) PRIMARY KEY,
    name VARCHAR(255) NOT NULL
);
```

## Relationships

- Tickets.user_id references Users.id
- Tickets.assigned_tech_id references Technicians.id
- Tickets.symptom_id references Symptoms.id
- Ticket_Templates.symptom_id references Symptoms.id
- Ticket_History.ticket_id references Tickets.id
- Ticket_History.user_id references Users.id
- Chat_Messages.ticket_id references Tickets.id
- Symptoms.department references Departments.name
- Technicians.department references Departments.name
- Users.department references Departments.name
- Ticket_Templates.department references Departments.name

## Indexes

```sql
CREATE INDEX idx_tickets_user_id ON tickets(user_id);
CREATE INDEX idx_tickets_assigned_tech_id ON tickets(assigned_tech_id);
CREATE INDEX idx_tickets_status ON tickets(status);
CREATE INDEX idx_tickets_department ON tickets(department);
CREATE INDEX idx_tickets_date_created ON tickets(date_created);
CREATE INDEX idx_users_email ON users(email);
CREATE INDEX idx_users_department ON users(department);
CREATE INDEX idx_ticket_history_ticket_id ON ticket_history(ticket_id);
CREATE INDEX idx_chat_messages_ticket_id ON chat_messages(ticket_id);
```

## Notes

1. All IDs are UUIDs (36 characters including hyphens)
2. Timestamps are stored in DATETIME format
3. ENUM types are used for fields with predefined values
4. TEXT type is used for longer content like descriptions and messages
5. VARCHAR sizes are chosen based on expected content length