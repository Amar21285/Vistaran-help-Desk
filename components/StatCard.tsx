import React from 'react';

interface StatCardProps {
    title: string;
    value: string | number;
    iconClass: string;
}

const StatCard: React.FC<StatCardProps> = ({ title, value, iconClass }) => {
    return (
        <div className="bg-white dark:bg-slate-800 p-5 rounded-lg shadow-md flex items-center space-x-4 transition hover:shadow-lg hover:-translate-y-1">
            <div className="text-3xl text-primary bg-primary-light dark:bg-primary-light-dark dark:text-primary-dark p-4 rounded-full">
                <i className={iconClass}></i>
            </div>
            <div>
                <h3 className="text-3xl font-bold text-slate-800 dark:text-slate-100">{value}</h3>
                <p className="text-slate-500 dark:text-slate-400 font-semibold">{title}</p>
            </div>
        </div>
    );
};

export default StatCard;