import React, { useState, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';

const GeneralSettings: React.FC = () => {
    const { theme, setTheme, colorTheme, setColorTheme } = useTheme();

    // Branding state and handlers
    const [logoSrc, setLogoSrc] = useState("https://via.placeholder.com/80/4a90e2/ffffff?text=V");
    const [appName, setAppName] = useState("Vistaran Help Desk");
    const [subtitle, setSubtitle] = useState("IT Support Ticket Management System");
    const [isUploadFormVisible, setUploadFormVisible] = useState(false);
    const fileInputRef = useRef<HTMLInputElement>(null);
    
    const THEMES = [
        { name: 'default', label: 'Default Blue', color: 'bg-blue-500' },
        { name: 'emerald', label: 'Emerald Green', color: 'bg-emerald-500' },
        { name: 'crimson', label: 'Crimson Red', color: 'bg-red-600' },
        { name: 'royal', label: 'Royal Purple', color: 'bg-violet-600' },
        { name: 'sunset', label: 'Sunset Orange', color: 'bg-orange-500' },
    ];


    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = (event) => {
                setLogoSrc(event.target?.result as string);
            };
            reader.readAsDataURL(file);
        }
    };
    
    const handleSaveBranding = (e: React.FormEvent) => {
        e.preventDefault();
        alert(`Branding saved!\nApp Name: ${appName}\nSubtitle: ${subtitle}`);
    }

    const ThemeButton: React.FC<{ value: 'light' | 'dark' | 'system', label: string, iconClass: string }> = ({ value, label, iconClass }) => (
        <button
            onClick={() => setTheme(value)}
            className={`flex-1 p-4 rounded-lg border-2 transition-colors ${theme === value ? 'bg-primary-light dark:dark:bg-primary-light-dark border-primary' : 'bg-slate-50 dark:bg-slate-700 border-transparent hover:border-slate-300 dark:hover:border-slate-500'}`}
        >
            <i className={`text-2xl ${iconClass}`}></i>
            <p className="font-semibold mt-2 text-sm">{label}</p>
        </button>
    );

    return (
        <div className="space-y-6">
            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4">Appearance</h3>
                 <div className="flex flex-col sm:flex-row gap-4 text-slate-700 dark:text-slate-200 text-center">
                    <ThemeButton value="light" label="Light" iconClass="fas fa-sun" />
                    <ThemeButton value="dark" label="Dark" iconClass="fas fa-moon" />
                    <ThemeButton value="system" label="System" iconClass="fas fa-desktop" />
                </div>
                 <div className="mt-6 pt-6 border-t dark:border-slate-700">
                    <h4 className="font-semibold text-slate-700 dark:text-slate-200">Accent Color</h4>
                    <div className="flex flex-wrap gap-3 mt-2">
                        {THEMES.map((t) => (
                             <button
                                key={t.name}
                                title={t.label}
                                onClick={() => setColorTheme(t.name as any)}
                                className={`h-10 w-10 rounded-full ${t.color} transition-transform hover:scale-110 ${colorTheme === t.name ? 'ring-2 ring-offset-2 ring-offset-white dark:ring-offset-slate-800 ring-primary' : ''}`}
                            />
                        ))}
                    </div>
                 </div>
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200 mb-4">Web Application Logo</h3>
                <div className="flex items-center space-x-6 p-4 border border-slate-200 dark:border-slate-700 rounded-lg">
                    <img id="current-app-logo" src={logoSrc} alt="Current Logo" className="h-20 w-20 object-contain bg-slate-100 p-2 rounded-md"/>
                    <div className="space-y-2">
                        <p><strong>Usage:</strong> Navigation & Login Page</p>
                        <div className="flex space-x-2">
                             <button onClick={() => setUploadFormVisible(true)} className="bg-primary text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-primary-hover transition">
                                <i className="fas fa-upload mr-2"></i>Upload New Logo
                            </button>
                             <button onClick={() => setLogoSrc("https://via.placeholder.com/80/4a90e2/ffffff?text=V")} className="bg-slate-200 dark:bg-slate-600 text-slate-700 dark:text-slate-200 px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-300 dark:hover:bg-slate-500 transition">
                                <i className="fas fa-undo mr-2"></i>Reset to Default
                            </button>
                        </div>
                         <small className="text-slate-400 block pt-1">
                            <i className="fas fa-info-circle mr-1"></i>
                            Recommended: PNG with transparency, 80x80px to 200x200px.
                        </small>
                    </div>
                </div>

                {isUploadFormVisible && (
                    <div className="mt-6 p-4 border-t dark:border-slate-700">
                        <h4 className="font-semibold mb-2">Upload New Logo</h4>
                        <input type="file" ref={fileInputRef} onChange={handleFileChange} accept="image/*" className="text-sm file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary-light dark:file:dark:bg-primary-light-dark file:text-primary-light-text dark:file:dark:text-primary-light-text-dark hover:file:bg-blue-100 dark:hover:file:bg-blue-900"/>
                         <div className="mt-4 flex space-x-2">
                            <button onClick={() => { alert('Logo uploaded successfully!'); setUploadFormVisible(false);}} className="bg-green-600 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-green-700 transition">
                                Save Logo
                            </button>
                            <button onClick={() => setUploadFormVisible(false)} className="bg-slate-500 text-white px-4 py-2 rounded-lg text-sm font-semibold hover:bg-slate-600 transition">
                                Cancel
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="bg-white dark:bg-slate-800 p-6 rounded-lg shadow-md">
                <h3 className="text-xl font-semibold text-slate-700 dark:text-slate-200">Branding Options</h3>
                <form id="branding-form" className="mt-4 space-y-4" onSubmit={handleSaveBranding}>
                    <div>
                        <label htmlFor="app-title" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Application Title</label>
                        <input type="text" id="app-title" value={appName} onChange={e => setAppName(e.target.value)} className="mt-1 w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700"/>
                    </div>
                    <div>
                        <label htmlFor="app-subtitle" className="block text-sm font-medium text-slate-600 dark:text-slate-300">Subtitle</label>
                        <input type="text" id="app-subtitle" value={subtitle} onChange={e => setSubtitle(e.target.value)} className="mt-1 w-full p-2 border border-slate-300 dark:border-slate-600 rounded-md bg-white dark:bg-slate-700"/>
                    </div>
                    <div className="text-right">
                        <button type="submit" className="bg-primary text-white px-4 py-2 rounded-lg font-semibold hover:bg-primary-hover transition">
                           <i className="fas fa-save mr-2"></i>Save Branding
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default GeneralSettings;