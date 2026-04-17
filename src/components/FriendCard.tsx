import { useNavigate } from 'react-router-dom';

interface FriendProps {
  friend: {
    id: number;
    name: string;
    picture: string;
    days_since_contact: number;
    status: string;
    tags: string[];
  };
}

const FriendCard = ({ friend }: FriendProps) => {
  const navigate = useNavigate();

  // Determine status color badge
  let statusColor = "";
  let statusText = "";
  if (friend.status === "overdue" || friend.status === "Overdue") {
    statusColor = "bg-[#F04B4B] text-white";
    statusText = "Overdue";
  } else if (friend.status === "almost due" || friend.status === "Almost Due") {
    statusColor = "bg-[#F4AC45] text-white";
    statusText = "Almost Due";
  } else if (friend.status === "on-track" || friend.status === "On-Track") {
    statusColor = "bg-[#205541] text-white";
    statusText = "On-Track";
  }

  return (
    <div 
      onClick={() => navigate(`/friend/${friend.id}`)}
      className="bg-white rounded-[20px] shadow-sm border border-gray-100 p-6 pb-8 cursor-pointer hover:shadow-md transition-shadow flex flex-col items-center text-center"
    >
      <img 
        src={friend.picture} 
        alt={friend.name} 
        className="w-20 h-20 rounded-full object-cover mb-4 shadow-sm" 
      />
      <h3 className="font-bold text-[1.15rem] tracking-tight text-slate-800 truncate w-full mb-1">{friend.name}</h3>
      <p className="text-[13px] text-slate-400 font-medium mb-3">{friend.days_since_contact}d ago</p>
      
      <div className="flex flex-wrap gap-2 justify-center mb-5">
        {friend.tags.map((tag, idx) => (
          <span key={idx} className="bg-[#bdf3cf] text-[#1b5e32] text-[11px] font-bold px-3 py-[4px] rounded-full uppercase tracking-wider">
            {tag}
          </span>
        ))}
      </div>
      
      <div className="mt-auto">
        <span className={`text-[12px] font-semibold px-4 py-[6px] rounded-full ${statusColor}`}>
          {statusText}
        </span>
      </div>
    </div>
  );
};

export default FriendCard;
