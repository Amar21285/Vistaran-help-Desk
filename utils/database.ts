import { Ticket, User, Technician, Symptom, TicketTemplate, ManagedFile } from '../types';

// Database configuration interface
export interface DatabaseConfig {
  host: string;
  port: number;
  user: string;
  password: string;
  database: string;
  url: string;
}

// Default configuration using Railway environment variables
export const getDatabaseConfig = (): DatabaseConfig => {
  return {
    host: import.meta.env.VITE_MYSQLHOST || 'mysql.railway.internal',
    port: parseInt(import.meta.env.VITE_MYSQLPORT || '3306', 10),
    user: import.meta.env.VITE_MYSQLUSER || 'root',
    password: import.meta.env.VITE_MYSQLPASSWORD || '',
    database: import.meta.env.VITE_MYSQLDATABASE || 'railway',
    url: import.meta.env.VITE_MYSQL_URL || ''
  };
};

// Database connection class
class DatabaseService {
  private config: DatabaseConfig;
  private isConnected: boolean = false;

  constructor() {
    this.config = getDatabaseConfig();
  }

  // Initialize database connection
  async connect(): Promise<boolean> {
    try {
      // In a real implementation, this would establish a connection to MySQL
      // For now, we'll simulate a connection
      console.log('Connecting to MySQL database:', this.config.host);
      
      // Simulate connection delay
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Check if we have the required credentials
      if (this.config.host && this.config.user && this.config.database) {
        this.isConnected = true;
        console.log('Database connected successfully');
        return true;
      } else {
        throw new Error('Missing database configuration');
      }
    } catch (error) {
      console.error('Database connection failed:', error);
      this.isConnected = false;
      return false;
    }
  }

  // Check if database is connected
  isConnectedDB(): boolean {
    return this.isConnected;
  }

  // Generic method to fetch data from a table
  async fetchData<T>(tableName: string): Promise<T[]> {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }

    try {
      // In a real implementation, this would query the database
      // For now, we'll return data from localStorage for compatibility
      const data = localStorage.getItem(`vistaran-helpdesk-${tableName}`);
      return data ? JSON.parse(data) : [];
    } catch (error) {
      console.error(`Error fetching data from ${tableName}:`, error);
      return [];
    }
  }

  // Generic method to save data to a table
  async saveData<T>(tableName: string, data: T[]): Promise<boolean> {
    if (!this.isConnected) {
      throw new Error('Database not connected');
    }

    try {
      // In a real implementation, this would save to the database
      // For now, we'll save to localStorage for compatibility
      localStorage.setItem(`vistaran-helpdesk-${tableName}`, JSON.stringify(data));
      return true;
    } catch (error) {
      console.error(`Error saving data to ${tableName}:`, error);
      return false;
    }
  }

  // Fetch all tickets
  async getTickets(): Promise<Ticket[]> {
    return this.fetchData<Ticket>('tickets');
  }

  // Save all tickets
  async saveTickets(tickets: Ticket[]): Promise<boolean> {
    return this.saveData<Ticket>('tickets', tickets);
  }

  // Fetch all users
  async getUsers(): Promise<User[]> {
    return this.fetchData<User>('users');
  }

  // Save all users
  async saveUsers(users: User[]): Promise<boolean> {
    return this.saveData<User>('users', users);
  }

  // Fetch all technicians
  async getTechnicians(): Promise<Technician[]> {
    return this.fetchData<Technician>('technicians');
  }

  // Save all technicians
  async saveTechnicians(technicians: Technician[]): Promise<boolean> {
    return this.saveData<Technician>('technicians', technicians);
  }

  // Fetch all symptoms
  async getSymptoms(): Promise<Symptom[]> {
    return this.fetchData<Symptom>('symptoms');
  }

  // Save all symptoms
  async saveSymptoms(symptoms: Symptom[]): Promise<boolean> {
    return this.saveData<Symptom>('symptoms', symptoms);
  }

  // Fetch all templates
  async getTemplates(): Promise<TicketTemplate[]> {
    return this.fetchData<TicketTemplate>('templates');
  }

  // Save all templates
  async saveTemplates(templates: TicketTemplate[]): Promise<boolean> {
    return this.saveData<TicketTemplate>('templates', templates);
  }

  // Fetch all files
  async getFiles(): Promise<ManagedFile[]> {
    return this.fetchData<ManagedFile>('files');
  }

  // Save all files
  async saveFiles(files: ManagedFile[]): Promise<boolean> {
    return this.saveData<ManagedFile>('files', files);
  }
}

// Export singleton instance
export const databaseService = new DatabaseService();

// Initialize database connection
export const initializeDatabase = async (): Promise<boolean> => {
  return await databaseService.connect();
};