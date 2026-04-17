import { NavLink, Link } from 'react-router-dom';
import { FiHome, FiClock, FiPieChart } from 'react-icons/fi';

const Navbar = () => {
  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 px-3 py-3 sm:px-6 lg:px-8 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo */}
        <Link to="/" className="flex items-center tracking-tight mr-2 sm:mr-0">
          <span className="text-[1.3rem] sm:text-2xl font-black text-gray-900">Keen</span>
          <span className="text-[1.3rem] sm:text-2xl font-bold text-[#205541]">Keeper</span>
        </Link>
        
        {/* Navigation Links */}
        <div className="flex items-center gap-1 sm:gap-6">
          <NavLink 
            to="/" 
            className={({ isActive }) => 
              `flex items-center gap-2 p-2 sm:px-4 sm:py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive ? 'bg-[#205541] text-white' : 'text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <FiHome className="text-lg sm:text-lg" />
            <span className="hidden sm:inline">Home</span>
          </NavLink>
          
          <NavLink 
            to="/timeline" 
            className={({ isActive }) => 
              `flex items-center gap-2 p-2 sm:px-4 sm:py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive ? 'bg-[#205541] text-white' : 'text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <FiClock className="text-lg sm:text-lg" />
            <span className="hidden sm:inline">Timeline</span>
          </NavLink>
          
          <NavLink 
            to="/stats" 
            className={({ isActive }) => 
              `flex items-center gap-2 p-2 sm:px-4 sm:py-2 rounded-lg text-sm font-semibold transition-colors ${
                isActive ? 'bg-[#205541] text-white' : 'text-slate-500 hover:text-slate-800'
              }`
            }
          >
            <FiPieChart className="text-lg sm:text-lg" />
            <span className="hidden sm:inline">Stats</span>
          </NavLink>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
