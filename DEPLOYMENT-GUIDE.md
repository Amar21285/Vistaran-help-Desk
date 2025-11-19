# Help Desk System - Deployment Guide

## Prerequisites
- A web server that can serve static files (Apache, Nginx, etc.)
- A domain or subdomain to host the application (optional)

## Deployment Steps

### 1. Build the Application
The application has already been built and the production files are in the `dist` directory:
- `dist/index.html` - Main HTML file
- `dist/assets/index-[hash].js` - JavaScript bundle

### 2. Configure Environment Variables
Before deploying, you need to set up the following environment variables:

1. **Google Gemini API Key**:
   - Sign up for Google AI Studio: https://aistudio.google.com/
   - Create an API key
   - Set it as `GEMINI_API_KEY` in your hosting environment

2. **EmailJS Configuration** (for email notifications):
   - Sign up at https://www.emailjs.com/
   - Create an account and get your:
     - Service ID
     - Public Key (API Key)
     - Template ID (use `template_4k5m98r` or create your own)
   - Configure these in the application settings after deployment

3. **MySQL Database Configuration** (optional, for Railway deployment):
   - If deploying to Railway with a MySQL database:
     - The application will automatically connect using Railway-provided environment variables
     - No additional configuration is needed
   - For other deployments:
     - Set the following environment variables:
       - `VITE_MYSQLHOST` - Database host (default: mysql.railway.internal)
       - `VITE_MYSQLPORT` - Database port (default: 3306)
       - `VITE_MYSQLUSER` - Database user
       - `VITE_MYSQLPASSWORD` - Database password
       - `VITE_MYSQLDATABASE` - Database name
       - `VITE_MYSQL_URL` - Full database connection URL (optional)

### 3. Deploy Files
Upload the contents of the `dist` directory to your web server:
```
dist/
├── index.html
└── assets/
    └── index-[hash].js
```

### 4. Web Server Configuration
Ensure your web server is configured to:
- Serve static files
- Handle client-side routing (if applicable)
- Support HTTPS (recommended)

### 5. Access the Application
Navigate to your deployed URL and log in with:
- Admin account: ITsupport@vistaran.in / 88283671
- User accounts: Various emails in the system (passwords are the numbers in their email)

### 6. Post-Deployment Configuration
After logging in as admin:
1. Go to Settings > Email to configure EmailJS settings
2. Check Settings > System to verify database connection status
3. Update any other settings as needed
4. Add new users or technicians as required

## Troubleshooting
- If the application doesn't load, check browser console for errors
- If AI features don't work, verify your Google Gemini API key is correctly configured
- If emails don't send, check your EmailJS configuration in the app settings
- If the database shows as disconnected in Settings > System, verify your MySQL environment variables are correctly configured