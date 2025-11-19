# Vistaran Help Desk

A comprehensive help desk application built with React, TypeScript, and Vite.

## Features

- Ticket management system
- User and technician management
- Department-based organization
- Real-time updates
- Dark/light theme support
- File management
- Reporting dashboard
- AI-powered assistance

## Deployment

This application is configured for deployment to GitHub Pages. The deployment workflow is defined in `.github/workflows/deploy.yml`.

## Local Development

1. Install dependencies:
   ```bash
   npm install
   ```

2. Start the development server:
   ```bash
   npm run dev
   ```

3. Build for production:
   ```bash
   npm run build
   ```

## Environment Variables

For local development, create a `.env` file with the following variables:

```
VITE_GEMINI_API_KEY=your_google_gemini_api_key
```

## GitHub Pages Setup

To deploy to GitHub Pages:

1. Go to your repository settings
2. Navigate to "Pages" section
3. Set source to "GitHub Actions"
4. Push to your main branch to trigger the deployment workflow

The application will be automatically built and deployed on each push to the main branch.