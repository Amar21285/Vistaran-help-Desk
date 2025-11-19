# Database Integration Guide

This document explains how the Help Desk application integrates with MySQL databases, particularly when deployed on Railway.

## Overview

The application has been enhanced to support MySQL database connections while maintaining backward compatibility with localStorage. The database integration includes:

1. Database configuration utilities
2. React hooks for database operations
3. Connection status monitoring
4. Data access methods for all application entities

## Key Components

### 1. Database Utility (`utils/database.ts`)

This module provides:
- Database configuration management
- Connection initialization
- Data access methods for all entities
- Fallback to localStorage for compatibility

### 2. Database Hook (`hooks/useDatabase.tsx`)

A React hook that provides:
- Connection status monitoring
- Loading state management
- Error handling
- Data fetching and saving methods

### 3. System Settings Integration

The System Settings panel now displays the actual database connection status.

## Environment Variables

The application reads the following environment variables for database configuration:

- `VITE_MYSQLHOST` - Database host (defaults to `mysql.railway.internal`)
- `VITE_MYSQLPORT` - Database port (defaults to `3306`)
- `VITE_MYSQLUSER` - Database user
- `VITE_MYSQLPASSWORD` - Database password
- `VITE_MYSQLDATABASE` - Database name
- `VITE_MYSQL_URL` - Full connection URL (optional)

These variables are automatically provided by Railway when you connect a MySQL database service to your application.

## Current Implementation

The current implementation provides a framework for database connectivity but still uses localStorage as the primary data store for compatibility. The database connection is established at application startup, and the status is displayed in the System Settings panel.

## Future Migration

To fully migrate from localStorage to MySQL:

1. Install a MySQL client library (e.g., `mysql2`)
2. Implement actual database queries in `utils/database.ts`
3. Replace localStorage operations with database operations throughout the application
4. Implement proper connection pooling and error handling
5. Add database migration support

## Testing Database Connection

After deployment:

1. Access your application
2. Navigate to Settings > System
3. Check the "Database Status" indicator
4. It should show "Connected (MySQL)" if the connection is successful

## Files Created

- `utils/database.ts` - Database utility functions
- `hooks/useDatabase.tsx` - React hook for database operations
- `components/DatabaseTest.tsx` - Sample component demonstrating database usage
- `MYSQL_CONNECTION_GUIDE.md` - Detailed connection guide
- `DATABASE_SCHEMA.md` - Database schema definition
- `DATABASE_INTEGRATION.md` - This file

## Updating Existing Files

- `App.tsx` - Added database initialization
- `components/settings/SystemSettings.tsx` - Updated to show actual database status
- `DEPLOYMENT-GUIDE.md` - Updated with database configuration instructions

## Security Considerations

- Never commit database credentials to version control
- Use environment variables for sensitive data
- Ensure proper database user permissions
- Consider using private networking to avoid public endpoints