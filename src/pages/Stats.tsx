import { useState, useEffect } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from 'recharts';
import { FiPieChart } from 'react-icons/fi';

interface InteractionCount {
  name: string;
  value: number;
}

const COLORS = ['#10B981', '#3B82F6', '#8B5CF6']; // Green for Call, Blue for Text, Purple for Video

const Stats = () => {
  const [statsData, setStatsData] = useState<InteractionCount[]>([]);

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('timeline') || '[]');
    
    const callCount = data.filter((item: any) => item.type === 'Call').length;
    const textCount = data.filter((item: any) => item.type === 'Text').length;
    const videoCount = data.filter((item: any) => item.type === 'Video').length;

    setStatsData([
      { name: 'Call', value: callCount },
      { name: 'Text', value: textCount },
      { name: 'Video', value: videoCount },
    ]);
  }, []);

  const totalInteractions = statsData.reduce((acc, curr) => acc + curr.value, 0);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="mb-8 border-b border-slate-200 pb-4">
        <h1 className="text-3xl font-bold text-slate-800 flex items-center">
          <FiPieChart className="mr-3 text-[#205541]" />
          Friendship Analytics
        </h1>
        <p className="text-slate-500 mt-2">A visual breakdown of your interaction habits.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        
        {/* Chart Section (Challenge C1) */}
        <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex flex-col items-center">
          <h2 className="text-lg font-bold text-slate-800 w-full mb-6 text-center">Interaction Breakdown</h2>
          
          {totalInteractions === 0 ? (
            <div className="h-64 flex items-center justify-center text-slate-400">
              No data to display. Log some check-ins first!
            </div>
          ) : (
            <div className="w-full h-72">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={statsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={70}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                    stroke="none"
                  >
                    {statsData.map((_entry, index) => (
                      <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                  </Pie>
                  <Tooltip 
                    contentStyle={{ borderRadius: '10px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                  />
                  <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px' }} />
                </PieChart>
              </ResponsiveContainer>
            </div>
          )}
        </div>

        {/* Summary Card */}
        <div className="flex flex-col space-y-4">
          <div className="bg-[#205541] rounded-2xl shadow-sm p-6 text-white text-center">
            <h3 className="text-emerald-100 font-medium mb-2">Total Interactions Logged</h3>
            <p className="text-6xl font-bold">{totalInteractions}</p>
          </div>
          
          <div className="bg-white rounded-2xl shadow-sm border border-slate-200 p-6 flex-grow">
             <h3 className="text-lg font-bold text-slate-800 mb-4">Summary</h3>
             <ul className="space-y-4">
                {statsData.map((item, idx) => (
                  <li key={item.name} className="flex justify-between items-center">
                    <div className="flex items-center">
                      <span className="w-3 h-3 rounded-full mr-3" style={{ backgroundColor: COLORS[idx] }}></span>
                      <span className="font-medium text-slate-600">{item.name}s</span>
                    </div>
                    <span className="font-bold text-slate-800">{item.value} times</span>
                  </li>
                ))}
             </ul>
          </div>
        </div>

      </div>
    </div>
  );
};

export default Stats;
