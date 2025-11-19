# MySQL Database Connection Guide for Railway Deployment

This guide explains how to connect your Help Desk application to a MySQL database deployed on Railway.

## Prerequisites

1. A MySQL database deployed on Railway
2. Railway environment variables configured with database credentials

## Environment Variables

The application expects the following environment variables to be set in your Railway deployment:

```
VITE_MYSQLHOST=mysql.railway.internal
VITE_MYSQLPORT=3306
VITE_MYSQLUSER=your_mysql_user
VITE_MYSQLPASSWORD=your_mysql_password
VITE_MYSQLDATABASE=your_database_name
VITE_MYSQL_URL=your_mysql_connection_url
```

These variables are automatically provided by Railway when you have a MySQL database service connected to your application.

## How the Connection Works

The application uses a database service layer that:

1. Reads the Railway environment variables
2. Establishes a connection to the MySQL database
3. Provides data access methods for all application entities

## Current Implementation Status

The current implementation includes:

- Database configuration utility (`utils/database.ts`)
- Database hook for React components (`hooks/useDatabase.tsx`)
- Integration with the main application (`App.tsx`)
- Updated system settings display

The database connection is initialized when the application starts, and the status is displayed in the System Settings panel.

## Future Implementation

To fully migrate from localStorage to MySQL, you would need to:

1. Install a MySQL client library (e.g., `mysql2` for Node.js)
2. Implement actual database queries in `utils/database.ts`
3. Replace localStorage operations with database operations throughout the application
4. Set up proper connection pooling and error handling
5. Implement database migrations for schema management

## Testing the Connection

After deployment to Railway:

1. Access your application
2. Navigate to Settings > System
3. Check the "Database Status" indicator
4. It should show "Connected (MySQL)" if the connection is successful

## Troubleshooting

If the database shows as disconnected:

1. Verify all environment variables are set correctly in Railway
2. Check that your MySQL service is properly connected to your application
3. Ensure the database user has the necessary permissions
4. Check Railway logs for any connection errors

## Security Considerations

- Never commit database credentials to version control
- Use Railway's environment variable management for sensitive data
- Ensure your database is properly secured with strong passwords
- Consider using Railway's private networking features to avoid public endpoints