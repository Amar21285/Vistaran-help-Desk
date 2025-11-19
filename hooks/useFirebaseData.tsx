import { useState, useEffect, useCallback } from 'react';
import { 
  listenToTickets, 
  getTickets, 
  getUsers, 
  getTechnicians, 
  getSymptoms, 
  getFiles, 
  getTemplates 
} from '../utils/firebaseService';
import { Ticket, User, Technician, Symptom, ManagedFile, TicketTemplate } from '../types';

interface FirebaseData {
  tickets: Ticket[];
  users: User[];
  technicians: Technician[];
  symptoms: Symptom[];
  files: ManagedFile[];
  templates: TicketTemplate[];
}

interface UseFirebaseDataProps {
  enabled?: boolean; // whether to enable real-time updates
}

/**
 * Custom hook for implementing real-time data synchronization with Firebase
 * 
 * @param props Configuration options for the Firebase data hook
 * @returns Real-time data and control functions
 */
export const useFirebaseData = (props: UseFirebaseDataProps = {}) => {
  const { enabled = true } = props;
  
  // State for Firebase data
  const [firebaseData, setFirebaseData] = useState<FirebaseData>({
    tickets: [],
    users: [],
    technicians: [],
    symptoms: [],
    files: [],
    templates: []
  });
  
  // Loading and error states
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  /**
   * Function to manually trigger a data refresh
   */
  const refreshData = useCallback(async () => {
    if (!enabled) return;
    
    setIsLoading(true);
    setError(null);
    
    try {
      // Fetch all data from Firebase
      const [tickets, users, technicians, symptoms, files, templates] = await Promise.all([
        getTickets(),
        getUsers(),
        getTechnicians(),
        getSymptoms(),
        getFiles(),
        getTemplates()
      ]);
      
      setFirebaseData({
        tickets,
        users,
        technicians,
        symptoms,
        files,
        templates
      });
    } catch (err) {
      console.error('Error fetching Firebase data:', err);
      setError('Failed to fetch data from Firebase');
    } finally {
      setIsLoading(false);
    }
  }, [enabled]);
  
  /**
   * Set up real-time listeners for Firebase data
   */
  useEffect(() => {
    if (!enabled) return;
    
    // Initial data load
    refreshData();
    
    // Set up real-time listeners
    const unsubscribeTickets = listenToTickets((tickets) => {
      setFirebaseData(prev => ({ ...prev, tickets }));
    });
    
    // TODO: Add listeners for other collections as needed
    // For now, we'll fetch other data periodically
    
    const intervalId = setInterval(() => {
      // Refresh non-ticket data periodically
      Promise.all([
        getUsers(),
        getTechnicians(),
        getSymptoms(),
        getFiles(),
        getTemplates()
      ]).then(([users, technicians, symptoms, files, templates]) => {
        setFirebaseData(prev => ({
          ...prev,
          users,
          technicians,
          symptoms,
          files,
          templates
        }));
      }).catch(err => {
        console.error('Error refreshing non-ticket data:', err);
      });
    }, 30000); // Refresh non-ticket data every 30 seconds
    
    // Clean up listeners on unmount
    return () => {
      unsubscribeTickets();
      clearInterval(intervalId);
    };
  }, [refreshData, enabled]);
  
  return {
    ...firebaseData,
    isLoading,
    error,
    refreshData
  };
};