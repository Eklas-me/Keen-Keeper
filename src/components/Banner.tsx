import { FiUserPlus, FiUsers, FiClock, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

const Banner = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 mb-8 text-center mt-4">
      <h1 className="text-4xl font-bold text-gray-900 mb-3">Keep Your Friendships Alive</h1>
      <p className="text-lg text-gray-600 mb-6 max-w-2xl mx-auto">
        Never let a good friendship slip away. Track your connections and stay in touch.
      </p>
      
      <button className="bg-[#205541] hover:bg-[#1a4535] text-white px-6 py-3 rounded-lg font-medium inline-flex items-center space-x-2 transition-colors mb-10">
        <FiUserPlus className="text-xl" />
        <span>Add a Friend</span>
      </button>
      
      {/* 4 Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4 max-w-4xl mx-auto">
        <div className="bg-blue-50 p-4 rounded-lg flex flex-col items-center justify-center border border-blue-100">
          <FiUsers className="text-2xl text-blue-600 mb-2" />
          <p className="text-sm font-medium text-gray-600">Total Friends</p>
          <p className="text-2xl font-bold text-gray-900">8</p>
        </div>
        <div className="bg-green-50 p-4 rounded-lg flex flex-col items-center justify-center border border-green-100">
          <FiCheckCircle className="text-2xl text-green-600 mb-2" />
          <p className="text-sm font-medium text-gray-600">On Track</p>
          <p className="text-2xl font-bold text-gray-900">3</p>
        </div>
        <div className="bg-yellow-50 p-4 rounded-lg flex flex-col items-center justify-center border border-yellow-100">
          <FiClock className="text-2xl text-yellow-600 mb-2" />
          <p className="text-sm font-medium text-gray-600">Almost Due</p>
          <p className="text-2xl font-bold text-gray-900">2</p>
        </div>
        <div className="bg-red-50 p-4 rounded-lg flex flex-col items-center justify-center border border-red-100">
          <FiAlertCircle className="text-2xl text-red-600 mb-2" />
          <p className="text-sm font-medium text-gray-600">Overdue</p>
          <p className="text-2xl font-bold text-gray-900">3</p>
        </div>
      </div>
    </div>
  );
};

export default Banner;
