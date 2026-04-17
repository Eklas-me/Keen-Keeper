import { useState, useEffect } from 'react';
import Banner from '../components/Banner';
import FriendCard from '../components/FriendCard';

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

const Home = () => {
  const [friends, setFriends] = useState<Friend[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Simulating network fetch with a timeout 
    const fetchData = async () => {
      try {
        const response = await fetch('/friends.json');
        const data = await response.json();
        setTimeout(() => {
          setFriends(data);
          setLoading(false);
        }, 800); // Slight delay to show loading state clearly
      } catch (error) {
        console.error("Error fetching friends data:", error);
        setLoading(false);
      }
    };
    
    fetchData();
  }, []);

  return (
    <div className="w-full">
      <Banner />
      
      <div className="mt-10 mb-6">
        <h2 className="text-2xl font-bold text-gray-800">Your Friends</h2>
        <p className="text-gray-500">Keep track of your relationships</p>
      </div>

      {loading ? (
        <div className="flex justify-center items-center py-20">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <span className="ml-3 text-lg text-gray-600">Loading friends...</span>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {friends.map((friend) => (
            <FriendCard key={friend.id} friend={friend} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Home;
