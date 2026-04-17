import instagramIcon from '../../assets/instagram.png';
import facebookIcon from '../../assets/facebook.png';
import twitterIcon from '../../assets/twitter.png';

const Footer = () => {
  return (
    <footer className="bg-[#205541] text-white pt-16 pb-6 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Top Section */}
        <div className="flex flex-col items-center text-center">
          <h2 className="text-4xl font-bold mb-3 tracking-wide">KeenKeeper</h2>
          <p className="text-[#a5c9b8] text-sm max-w-2xl mb-10">
            Your personal shelf of meaningful connections. Browse, tend, and nurture the relationships that matter most.
          </p>
          
          <h3 className="text-sm font-semibold mb-4">Social Links</h3>
          <div className="flex space-x-4 mb-16">
            <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-slate-200 transition">
              <img src={instagramIcon} alt="Instagram" className="w-5 h-5 object-contain" />
            </a>
            <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-slate-200 transition">
              <img src={facebookIcon} alt="Facebook" className="w-5 h-5 object-contain" />
            </a>
            <a href="#" className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-slate-200 transition">
              <img src={twitterIcon} alt="Twitter" className="w-5 h-5 object-contain" />
            </a>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="border-t border-[#316952] pt-6 flex flex-col md:flex-row justify-between items-center text-[#a5c9b8] text-xs">
          <p className="mb-4 md:mb-0">© 2026 KeenKeeper. All rights reserved.</p>
          <div className="flex space-x-6">
            <a href="#" className="hover:text-white transition">Privacy Policy</a>
            <a href="#" className="hover:text-white transition">Terms of Service</a>
            <a href="#" className="hover:text-white transition">Cookies</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;
