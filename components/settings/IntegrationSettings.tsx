import React from 'react';

const IntegrationCard: React.FC<{ iconClass: string; name: string; description: string; }> = ({ iconClass, name, description }) => (
    <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md flex items-center space-x-4">
        <div className="text-4xl">
            <i className={iconClass}></i>
        </div>
        <div className="flex-grow">
            <h4 className="font-bold text-lg text-slate-800 dark:text-slate-100">{name}</h4>
            <p className="text-sm text-slate-500 dark:text-slate-400">{description}</p>
        </div>
        <button className="bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 font-semibold px-4 py-2 rounded-lg hover:bg-slate-300 dark:hover:bg-slate-500 transition text-sm">
            Connect
        </button>
    </div>
);

const IntegrationSettings: React.FC = () => {
    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">Third-Party Integrations</h3>
                <p className="mt-1 text-sm text-slate-500 dark:text-slate-400">
                    Connect your help desk to other services to streamline your workflow.
                </p>
            </div>

            <div className="space-y-4">
                <IntegrationCard 
                    iconClass="fab fa-google text-red-500"
                    name="Google"
                    description="Enable Single Sign-On (SSO) with Google accounts."
                />
                <IntegrationCard 
                    iconClass="fab fa-slack text-purple-500"
                    name="Slack"
                    description="Get ticket notifications directly in your Slack channels."
                />
                <IntegrationCard 
                    iconClass="fab fa-jira text-blue-600"
                    name="Jira"
                    description="Sync tickets with your Jira projects for advanced issue tracking."
                />
                 <IntegrationCard 
                    iconClass="fas fa-cloud-upload-alt text-sky-500"
                    name="Cloud Storage"
                    description="Connect Google Drive or AWS S3 for file attachments."
                />
            </div>
        </div>
    );
};

export default IntegrationSettings;
