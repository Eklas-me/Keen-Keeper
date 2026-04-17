import { useState, useEffect } from 'react';
import { FiPhoneCall, FiMessageSquare, FiVideo, FiFilter } from 'react-icons/fi';

interface TimelineEntry {
  id: number;
  friendId: number;
  friendName: string;
  type: string;
  date: string;
  title: string;
}

const Timeline = () => {
  const [timeline, setTimeline] = useState<TimelineEntry[]>([]);
  const [filter, setFilter] = useState<string>('All');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('timeline') || '[]');
    setTimeline(data);
  }, []);

  const filteredTimeline = filter === 'All' 
    ? timeline 
    : timeline.filter(entry => entry.type === filter);

  return (
    <div className="max-w-4xl mx-auto py-8">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Timeline</h1>
          <p className="text-slate-500 mt-1">History of all your interactions</p>
        </div>
        
        {/* Timeline Filter (Challenge C2) */}
        <div className="mt-4 sm:mt-0 flex items-center space-x-3 bg-white p-2 rounded-xl shadow-sm border border-slate-100">
          <FiFilter className="text-slate-400 ml-2" />
          <select 
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="bg-transparent text-slate-700 font-medium outline-none pr-4"
          >
            <option value="All">All Interactions</option>
            <option value="Call">Call</option>
            <option value="Text">Text</option>
            <option value="Video">Video</option>
          </select>
        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {filteredTimeline.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No interactions found. Go to a friend's details page to log a check-in!
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {filteredTimeline.map((entry) => {
              const dateObj = new Date(entry.date);
              
              // Icon resolution
              let Icon = FiMessageSquare;
              let iconBg = "bg-blue-100 text-blue-600";
              if (entry.type === 'Call') {
                Icon = FiPhoneCall;
                iconBg = "bg-green-100 text-green-600";
              } else if (entry.type === 'Video') {
                Icon = FiVideo;
                iconBg = "bg-purple-100 text-purple-600";
              }

              return (
                <div key={entry.id} className="p-5 sm:p-6 hover:bg-slate-50 transition flex items-center">
                  <div className={`p-3 rounded-full mr-5 shrink-0 ${iconBg}`}>
                    <Icon className="text-xl" />
                  </div>
                  
                  <div className="flex-grow">
                    <h3 className="text-lg font-bold text-slate-800">{entry.title}</h3>
                    <p className="text-sm text-slate-500">{entry.friendName}</p>
                  </div>
                  
                  <div className="text-right shrink-0">
                    <p className="text-sm font-medium text-slate-800">
                      {dateObj.toLocaleDateString(undefined, { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="text-xs text-slate-500">
                      {dateObj.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default Timeline;
