import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiPhoneCall, FiMessageSquare, FiVideo, FiClock, FiArchive, FiTrash2, FiEdit2 } from 'react-icons/fi';

interface Friend {
  id: number;
  name: string;
  picture: string;
  email: string;
  days_since_contact: number;
  status: string;
  tags: string[];
  bio: string;
  goal: number;
  next_due_date: string;
}

const FriendDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [friend, setFriend] = useState<Friend | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch('/friends.json');
        const data = await response.json();
        const found = data.find((f: Friend) => f.id === Number(id));
        if (found) {
          setFriend(found);
        } else {
          toast.error("Friend not found!");
          navigate('/');
        }
        setLoading(false);
      } catch (error) {
        console.error("Error fetching friend:", error);
        setLoading(false);
      }
    };
    fetchData();
  }, [id, navigate]);

  const handleInteraction = (type: string) => {
    if (!friend) return;
    
    // Save to localStorage for timeline
    const interaction = {
      id: Date.now(),
      friendId: friend.id,
      friendName: friend.name,
      type: type, // 'Call', 'Text', 'Video'
      date: new Date().toISOString(),
      title: `${type} with ${friend.name}`
    };

    const existingTimeline = JSON.parse(localStorage.getItem('timeline') || '[]');
    localStorage.setItem('timeline', JSON.stringify([interaction, ...existingTimeline]));

    // Show toast notification
    toast.success(`Logged ${type} with ${friend.name}!`);
  };

  if (loading) return <div className="text-center py-20">Loading profile...</div>;
  if (!friend) return <div className="text-center py-20">No data available.</div>;

  let statusColor = "";
  if (friend.status === "overdue") statusColor = "bg-red-100 text-red-800";
  else if (friend.status === "almost due") statusColor = "bg-yellow-100 text-yellow-800";
  else if (friend.status === "on-track") statusColor = "bg-green-100 text-green-800";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
      {/* Left Column — Friend Info Card */}
      <div className="lg:col-span-1 border border-slate-200 bg-white p-6 rounded-2xl shadow-sm text-center flex flex-col h-fit">
        <img 
          src={friend.picture} 
          alt={friend.name} 
          className="w-32 h-32 rounded-full mx-auto mb-4 object-cover border-4 border-slate-50"
        />
        <h2 className="text-2xl font-bold text-slate-800">{friend.name}</h2>
        <div className="mt-2">
          <span className={`text-sm font-semibold px-3 py-1 rounded-full uppercase ${statusColor}`}>
            {friend.status}
          </span>
        </div>
        
        <p className="text-slate-500 mt-3 text-sm">{friend.email}</p>
        
        <div className="flex flex-wrap gap-2 justify-center mt-4">
          {friend.tags.map(tag => (
            <span key={tag} className="bg-slate-100 text-slate-600 text-xs px-3 py-1 rounded-full">
              {tag}
            </span>
          ))}
        </div>
        
        <p className="text-slate-600 my-6 text-sm italic py-4 border-y border-slate-100">
          "{friend.bio}"
        </p>
        
        <div className="flex flex-col space-y-3 mt-auto">
          <button className="flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 transition">
            <FiClock /> <span>Snooze 2 Weeks</span>
          </button>
          <button className="flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-slate-50 hover:bg-slate-100 text-slate-700 transition">
            <FiArchive /> <span>Archive</span>
          </button>
          <button className="flex items-center justify-center space-x-2 py-2 px-4 rounded-lg bg-red-50 hover:bg-red-100 text-red-600 transition">
            <FiTrash2 /> <span>Delete</span>
          </button>
        </div>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-2 space-y-6">
        
        {/* Stats Cards (3 cards) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <p className="text-slate-500 text-sm font-medium mb-1">Days Since Contact</p>
            <p className="text-3xl font-bold text-slate-800">{friend.days_since_contact}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <p className="text-slate-500 text-sm font-medium mb-1">Goal (Days)</p>
            <p className="text-3xl font-bold text-slate-800">{friend.goal}</p>
          </div>
          <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col justify-center">
            <p className="text-slate-500 text-sm font-medium mb-1">Next Due Date</p>
            <p className="text-xl font-bold text-slate-800 mt-2">{friend.next_due_date}</p>
          </div>
        </div>

        {/* Relationship Goal Card */}
        <div className="bg-white p-6 rounded-2xl border border-slate-200 shadow-sm flex items-center justify-between">
          <div>
            <h3 className="text-lg font-bold text-slate-800">Relationship Goal</h3>
            <p className="text-slate-500 text-sm mt-1">Connect every {friend.goal} days to stay on-track.</p>
          </div>
          <button className="bg-slate-50 hover:bg-slate-100 p-3 rounded-lg text-slate-600 transition">
            <FiEdit2 />
          </button>
        </div>

        {/* Quick Check-In Card */}
        <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-sm text-slate-800">
          <h3 className="text-lg font-bold mb-1">Quick Check-In</h3>
          <p className="text-slate-500 mb-6 text-sm">Reach out now and log the interaction instantly.</p>
          
          <div className="grid grid-cols-3 gap-4">
            <button 
              onClick={() => handleInteraction('Call')}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-100 transition rounded-xl p-4 flex flex-col items-center justify-center space-y-2 group text-slate-700"
            >
              <div className="p-3 bg-white shadow-sm border border-slate-100 rounded-full group-hover:scale-110 transition-transform text-[#205541]">
                <FiPhoneCall className="text-xl" />
              </div>
              <span className="font-medium text-sm">Call</span>
            </button>
            <button 
               onClick={() => handleInteraction('Text')}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-100 transition rounded-xl p-4 flex flex-col items-center justify-center space-y-2 group text-slate-700"
            >
              <div className="p-3 bg-white shadow-sm border border-slate-100 rounded-full group-hover:scale-110 transition-transform text-[#205541]">
                <FiMessageSquare className="text-xl" />
              </div>
              <span className="font-medium text-sm">Text</span>
            </button>
            <button 
               onClick={() => handleInteraction('Video')}
              className="bg-slate-50 hover:bg-slate-100 border border-slate-100 transition rounded-xl p-4 flex flex-col items-center justify-center space-y-2 group text-slate-700"
            >
              <div className="p-3 bg-white shadow-sm border border-slate-100 rounded-full group-hover:scale-110 transition-transform text-[#205541]">
                <FiVideo className="text-xl" />
              </div>
              <span className="font-medium text-sm">Video</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FriendDetails;
