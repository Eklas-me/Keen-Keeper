import { useState, useEffect } from 'react';
import { FiFilter, FiSearch, FiChevronDown, FiPhoneCall, FiMessageSquare, FiVideo } from 'react-icons/fi';

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
  const [search, setSearch] = useState<string>('');
  const [sortOrder, setSortOrder] = useState<string>('newest');

  useEffect(() => {
    const data = JSON.parse(localStorage.getItem('timeline') || '[]');
    setTimeline(data);
  }, []);

  // Filter and Search logic
  let processedTimeline = timeline.filter(entry => {
    const matchesFilter = filter === 'All' || entry.type === filter;
    const matchesSearch = 
      entry.friendName.toLowerCase().includes(search.toLowerCase()) || 
      entry.type.toLowerCase().includes(search.toLowerCase());
    return matchesFilter && matchesSearch;
  });

  // Sort logic
  processedTimeline.sort((a, b) => {
    const dateA = new Date(a.date).getTime();
    const dateB = new Date(b.date).getTime();
    return sortOrder === 'newest' ? dateB - dateA : dateA - dateB;
  });

  return (
    <div className="max-w-5xl mx-auto py-8 px-4 lg:px-0">
      <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end mb-8 gap-4">
        <div>
          <h1 className="text-3xl font-bold text-slate-800">Timeline</h1>
          <p className="text-slate-500 mt-1">History of all your interactions</p>
        </div>
        
        {/* Controls: Search, Sort, Filter */}
        <div className="flex flex-col sm:flex-row items-center gap-3 w-full lg:w-auto">
          
          {/* Search */}
          <div className="relative w-full sm:w-auto flex-grow">
            <FiSearch className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" />
            <input 
              type="text" 
              placeholder="Search friend or type..." 
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              className="w-full sm:w-64 pl-10 pr-4 py-2 bg-white rounded-xl shadow-sm border border-slate-200 outline-none focus:border-[#205541] transition"
            />
          </div>

          <div className="flex w-full sm:w-auto gap-3">
            {/* Sort */}
            <div className="relative bg-white rounded-xl shadow-sm border border-slate-200 px-3 py-2 flex items-center flex-1">
              <select 
                value={sortOrder}
                onChange={(e) => setSortOrder(e.target.value)}
                className="bg-transparent text-slate-700 font-medium outline-none w-full appearance-none pr-6 cursor-pointer"
              >
                <option value="newest">Newest First</option>
                <option value="oldest">Oldest First</option>
              </select>
              <FiChevronDown className="absolute right-3 text-slate-400 pointer-events-none" />
            </div>

            {/* Filter */}
            <div className="relative bg-white rounded-xl shadow-sm border border-slate-200 px-3 py-2 flex items-center flex-1">
              <FiFilter className="text-slate-400 mr-2" />
              <select 
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
                className="bg-transparent text-slate-700 font-medium outline-none w-full appearance-none pr-6 cursor-pointer"
              >
                <option value="All">All Types</option>
                <option value="Call">Call</option>
                <option value="Text">Text</option>
                <option value="Video">Video</option>
              </select>
              <FiChevronDown className="absolute right-3 text-slate-400 pointer-events-none" />
            </div>
          </div>

        </div>
      </div>

      <div className="bg-white rounded-2xl shadow-sm border border-slate-200 overflow-hidden">
        {processedTimeline.length === 0 ? (
          <div className="p-12 text-center text-slate-500">
            No matching interactions found.
          </div>
        ) : (
          <div className="divide-y divide-slate-100">
            {processedTimeline.map((entry) => {
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
                  <div className={`p-3 rounded-full mr-5 shrink-0 ${iconBg} flex items-center justify-center`}>
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
