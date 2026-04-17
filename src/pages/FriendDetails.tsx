import { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { FiClock, FiArchive, FiTrash2 } from 'react-icons/fi';
import callIcon from '../../assets/call.png';
import textIcon from '../../assets/text.png';
import videoIcon from '../../assets/video.png';

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
    toast.success(`${type} with ${friend.name}!`);
  };

  if (loading) return <div className="text-center py-20">Loading profile...</div>;
  if (!friend) return <div className="text-center py-20">No data available.</div>;

  let statusColor = "";
  if (friend.status === "overdue") statusColor = "bg-red-100 text-red-800";
  else if (friend.status === "almost due") statusColor = "bg-yellow-100 text-yellow-800";
  else if (friend.status === "on-track") statusColor = "bg-green-100 text-green-800";

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
      {/* Left Column — Friend Info & Action Buttons */}
      <div className="lg:col-span-4 flex flex-col gap-3">
        {/* Info Card */}
        <div className="bg-white border border-slate-200 p-8 rounded-xl shadow-sm text-center flex flex-col items-center">
          <img 
            src={friend.picture} 
            alt={friend.name} 
            className="w-24 h-24 rounded-full mx-auto mb-4 object-cover shadow-sm"
          />
          <h2 className="text-[1.35rem] font-bold text-slate-800 mb-3">{friend.name}</h2>
          
          <div className="flex flex-col gap-2 items-center mb-6">
            <span className={`text-[11px] font-bold px-3 py-[4px] rounded-full uppercase tracking-wide ${statusColor}`}>
              {friend.status}
            </span>
            <div className="flex flex-wrap gap-2 justify-center">
              {friend.tags.map(tag => (
                <span key={tag} className="bg-[#bdf3cf] text-[#1b5e32] text-[10px] font-bold px-3 py-[3px] rounded-full uppercase tracking-wider">
                  {tag}
                </span>
              ))}
            </div>
          </div>
          
          <p className="text-[#64748b] text-[15px] italic mb-2">
            "{friend.bio}"
          </p>
          <p className="text-slate-500 text-[13px]">
            Preferred: email
          </p>
        </div>
        
        {/* Action Buttons */}
        <button className="w-full bg-white border border-slate-200 py-4 px-4 rounded-xl shadow-sm flex justify-center items-center gap-2 hover:bg-slate-50 transition text-slate-700 font-medium text-[15px]">
          <FiClock className="text-lg" />
          <span>Snooze 2 Weeks</span>
        </button>
        
        <button className="w-full bg-white border border-slate-200 py-4 px-4 rounded-xl shadow-sm flex justify-center items-center gap-2 hover:bg-slate-50 transition text-slate-700 font-medium text-[15px]">
          <FiArchive className="text-lg" />
          <span>Archive</span>
        </button>

        <button className="w-full bg-white border border-slate-200 py-4 px-4 rounded-xl shadow-sm flex justify-center items-center gap-2 hover:bg-red-50 transition text-[#F04B4B] font-medium text-[15px]">
          <FiTrash2 className="text-lg" />
          <span>Delete</span>
        </button>
      </div>

      {/* Right Column */}
      <div className="lg:col-span-8 flex flex-col gap-5">
        
        {/* Stats Cards (3 items) */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          <div className="bg-white py-8 px-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="text-[2rem] font-bold text-[#1f4a38] leading-none mb-3">{friend.days_since_contact}</div>
            <div className="text-[14px] text-slate-500 font-medium">Days Since Contact</div>
          </div>
          <div className="bg-white py-8 px-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="text-[2rem] font-bold text-[#1f4a38] leading-none mb-3">{friend.goal}</div>
            <div className="text-[14px] text-slate-500 font-medium">Goal (Days)</div>
          </div>
          <div className="bg-white py-8 px-4 rounded-xl border border-slate-200 shadow-sm flex flex-col items-center text-center">
            <div className="text-[1.6rem] font-bold text-[#1f4a38] leading-none mb-3">{friend.next_due_date}</div>
            <div className="text-[14px] text-slate-500 font-medium">Next Due</div>
          </div>
        </div>

        {/* Relationship Goal Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <div className="flex justify-between items-center mb-5">
            <h3 className="text-[1.15rem] font-bold text-[#1f4a38]">Relationship Goal</h3>
            <button className="bg-slate-50 border border-slate-200 text-slate-700 px-5 py-1.5 rounded-lg text-sm font-medium hover:bg-slate-100 transition">
              Edit
            </button>
          </div>
          <p className="text-slate-600 text-[15px]">
            Connect every <span className="font-bold text-[#111827]">{friend.goal} days</span>
          </p>
        </div>

        {/* Quick Check-In Card */}
        <div className="bg-white p-6 rounded-xl border border-slate-200 shadow-sm">
          <h3 className="text-[1.15rem] font-bold text-[#1f4a38] mb-6">Quick Check-In</h3>
          
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <button 
              onClick={() => handleInteraction('Call')}
              className="bg-[#f8fafc] border border-slate-200 hover:bg-slate-100 transition rounded-xl py-6 flex flex-col items-center gap-3 text-slate-700"
            >
              <img src={callIcon} alt="Call" className="w-6 h-6 object-contain" />
              <span className="font-medium text-[15px]">Call</span>
            </button>
            <button 
               onClick={() => handleInteraction('Text')}
              className="bg-[#f8fafc] border border-slate-200 hover:bg-slate-100 transition rounded-xl py-6 flex flex-col items-center gap-3 text-slate-700"
            >
              <img src={textIcon} alt="Text" className="w-6 h-6 object-contain" />
              <span className="font-medium text-[15px]">Text</span>
            </button>
            <button 
               onClick={() => handleInteraction('Video')}
              className="bg-[#f8fafc] border border-slate-200 hover:bg-slate-100 transition rounded-xl py-6 flex flex-col items-center gap-3 text-slate-700"
            >
              <img src={videoIcon} alt="Video" className="w-6 h-6 object-contain" />
              <span className="font-medium text-[15px]">Video</span>
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FriendDetails;
