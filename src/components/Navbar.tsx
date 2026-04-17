import { NavLink, Link } from 'react-router-dom';
import { FiHome, FiClock, FiPieChart } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className="bg-white border-b border-gray-200 px-4 py-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center">
          <span className="text-2xl font-black text-gray-900">Keen</span>
          <span className="text-2xl font-bold text-[#205541]">Keeper</span>
        </Link>
        
        {/* Navigation Links */}
        <div className="flex items-center space-x-2 sm:space-x-8">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                isActive ? 'bg-[#205541] text-white' : 'text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <FiHome className="text-lg" />
            <span className="hidden sm:inline">Home</span>
          </NavLink>
          
          <NavLink 
            to="/timeline" 
            className={({ isActive }) => 
              `flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                isActive ? 'bg-[#205541] text-white' : 'text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <FiClock className="text-lg" />
            <span className="hidden sm:inline">Timeline</span>
          </NavLink>
          
          <NavLink 
            to="/stats" 
            className={({ isActive }) => 
              `flex items-center space-x-2 px-4 py-2 rounded-md text-sm font-semibold transition-colors ${
                isActive ? 'bg-[#205541] text-white' : 'text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <FiPieChart className="text-lg" />
            <span className="hidden sm:inline">Stats</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
