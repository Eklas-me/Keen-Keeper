import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="flex flex-col items-center justify-center py-24 text-center px-4">
      <h1 className="text-8xl font-black text-[#205541] mb-4">404</h1>
      <h2 className="text-2xl font-bold text-slate-800 mb-2">Friend Not Found!</h2>
      <p className="text-slate-500 mb-10 max-w-md mx-auto">
        It looks like this relationship doesn't exist yet, or the page has moved to another timeline.
      </p>
      <Link to="/" className="px-8 py-3 bg-[#205541] text-white rounded-lg font-bold hover:bg-[#1a4535] transition-all transform hover:scale-105 shadow-md">
        Back to Dashboard
      </Link>
    </div>
  );
};

export default NotFound;
