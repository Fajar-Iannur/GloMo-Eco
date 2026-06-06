import { AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', value: 95 },
  { name: 'Feb', value: 75 },
  { name: 'Mar', value: 74 },
  { name: 'Apr', value: 60 },
  { name: 'May', value: 58 },
  { name: 'Jun', value: 40 },
  { name: 'Jul', value: 36 },
];

export default function EcoChart() {
  return (
    <ResponsiveContainer width="100%" height="100%">
      <AreaChart data={data} margin={{ top: 10, right: 10, bottom: 0, left: -20 }}>
        <defs>
          <linearGradient id="colorValue" x1="0" y1="0" x2="0" y2="1">
            <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.2}/>
            <stop offset="95%" stopColor="#3B82F6" stopOpacity={0}/>
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#F3F4F6" />
        <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} dy={10} />
        <YAxis axisLine={false} tickLine={false} tick={{ fill: '#6B7280', fontSize: 12 }} />
        <Tooltip contentStyle={{ borderRadius: '8px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }} />
        <Area 
          type="monotone" 
          dataKey="value" 
          stroke="#3B82F6" 
          strokeWidth={2} 
          fillOpacity={1} 
          fill="url(#colorValue)" 
          dot={{ r: 4, fill: '#10B981', strokeWidth: 2, stroke: '#fff' }} 
          activeDot={{ r: 6 }} 
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}