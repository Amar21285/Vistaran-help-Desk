import React from 'react';

// Recharts is loaded from a CDN, so we access it from the window object.

interface ChartData {
    name: string;
    value: number;
}

interface TicketStatusChartProps {
    data: ChartData[];
}

const COLORS: { [key: string]: string } = {
    'Open': '#3b82f6',
    'In Progress': '#f59e0b',
    'Resolved': '#22c55e',
};

const TicketStatusChart: React.FC<TicketStatusChartProps> = ({ data }) => {
    // Moved from module scope to component scope to ensure library is loaded.
    const Recharts = (window as any).Recharts;
    if (!Recharts) {
        return <div className="flex items-center justify-center h-64 text-slate-500">Loading chart...</div>;
    }
    const { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } = Recharts;

    if (!data || data.length === 0) {
        return <div className="flex items-center justify-center h-64 text-slate-500">No ticket data available.</div>;
    }

    return (
        <div style={{ width: '100%', height: 300 }}>
            <ResponsiveContainer>
                <PieChart>
                    <Tooltip
                        contentStyle={{
                            background: '#fff',
                            border: '1px solid #e2e8f0',
                            borderRadius: '0.5rem',
                        }}
                    />
                    <Legend iconType="circle" />
                    <Pie
                        data={data}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        outerRadius={80}
                        fill="#8884d8"
                        dataKey="value"
                        nameKey="name"
                    >
                        {data.map((entry) => (
                            <Cell key={`cell-${entry.name}`} fill={COLORS[entry.name]} />
                        ))}
                    </Pie>
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
};

export default TicketStatusChart;