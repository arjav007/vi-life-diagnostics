import { useState, useEffect } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { useRouter } from 'next/router';
import { Bars3Icon, XMarkIcon, PhoneIcon, MapPinIcon, UserCircleIcon } from '@heroicons/react/24/outline';
import { useAuth } from '../../context/AuthContext';

const Header = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const router = useRouter();
  const { user, logout } = useAuth();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navigation = [
    { name: 'Packages', href: '/packages' },
    { name: 'About Us', href: '/about' },
    { name: 'Our Locations', href: '/locations' },
  ];

  const quickActions = [
    { name: 'Call', href: 'tel:+919828826646', icon: PhoneIcon },
    { name: 'Mail', href: 'mailto:info@vlifediagnostics.com', icon: null },
    { name: 'Whatsapp', href: 'https://wa.me/919828826646', icon: null },
    { name: 'Upload Prescription', href: '/upload-prescription', icon: null },
    { name: 'Download Reports', href: '/dashboard/reports', icon: null },
    { name: 'Blogs', href: '/blogs', icon: null },
  ];

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleLogout = () => {
    logout();
    router.push('/');
  };

  return (
    <>
      {/* Top Bar */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-2 text-sm">
            <div className="flex items-center space-x-6">
              <div className="flex items-center space-x-2 text-gray-600">
                <PhoneIcon className="w-4 h-4" />
                <span>+91 882-882-6646</span>
              </div>
              <div className="hidden md:flex items-center space-x-2 text-gray-600">
                <MapPinIcon className="w-4 h-4" />
                <span>Multiple Locations in Mumbai</span>
              </div>
            </div>
            
            <div className="flex items-center space-x-4">
              {quickActions.map((action, index) => (
                <Link
                  key={index}
                  href={action.href}
                  className="text-gray-600 hover:text-teal-600 transition-colors duration-200 text-xs hidden lg:block"
                >
                  {action.name}
                </Link>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className={`sticky top-0 z-50 transition-all duration-300 ${
        isScrolled 
          ? 'bg-white/95 backdrop-blur-lg shadow-lg' 
          : 'bg-white'
      }`}>
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between py-4">
            {/* Logo */}
            <Link href="/" className="flex items-center space-x-3">
             <Image
             src="/images/logo.png"
             alt="ViLife Diagnostics"
             width={180}   // adjust as needed
             height={60}   // adjust as needed
             priority
             />
             </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center space-x-8">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  className={`text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200 relative ${
                    router.pathname === item.href ? 'text-teal-600' : ''
                  }`}
                >
                  {item.name}
                  {router.pathname === item.href && (
                    <div className="absolute -bottom-1 left-0 w-full h-0.5 bg-teal-600 rounded-full"></div>
                  )}
                </Link>
              ))}
            </nav>

            {/* Right Side Actions */}
            <div className="flex items-center space-x-4">
              {/* User Menu */}
              {user ? (
                <div className="relative group">
                  <button className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition-colors duration-200">
                    <UserCircleIcon className="w-6 h-6" />
                    <span className="hidden md:block font-medium">{user.name}</span>
                  </button>
                  
                  {/* Dropdown Menu */}
                  <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-xl border opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 transform translate-y-2 group-hover:translate-y-0">
                    <div className="py-2">
                      <Link
                        href="/dashboard"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-colors duration-200"
                      >
                        Dashboard
                      </Link>
                      <Link
                        href="/dashboard/reports"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-colors duration-200"
                      >
                        My Reports
                      </Link>
                      <Link
                        href="/dashboard/bookings"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-colors duration-200"
                      >
                        My Bookings
                      </Link>
                      <Link
                        href="/dashboard/profile"
                        className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 hover:text-teal-600 transition-colors duration-200"
                      >
                        Profile
                      </Link>
                      <hr className="my-2" />
                      <button
                        onClick={handleLogout}
                        className="block w-full text-left px-4 py-2 text-sm text-red-600 hover:bg-gray-50 transition-colors duration-200"
                      >
                        Sign Out
                      </button>
                    </div>
                  </div>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  className="flex items-center space-x-2 text-gray-700 hover:text-teal-600 transition-colors duration-200"
                >
                  <UserCircleIcon className="w-6 h-6" />
                  <span className="hidden md:block font-medium">Sign In</span>
                </Link>
              )}

              {/* CTA Button */}
              <Link href="/book-home-visit">
                <button className="bg-gradient-to-r from-teal-500 to-emerald-500 text-white px-6 py-2.5 rounded-full font-semibold hover:shadow-lg hover:scale-105 transition-all duration-300 hidden md:block">
                  Book a Home Visit
                </button>
              </Link>

              {/* Mobile Menu Button */}
              <button
                onClick={toggleMenu}
                className="lg:hidden p-2 text-gray-700 hover:text-teal-600 transition-colors duration-200"
              >
                {isMenuOpen ? (
                  <XMarkIcon className="w-6 h-6" />
                ) : (
                  <Bars3Icon className="w-6 h-6" />
                )}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        <div className={`lg:hidden overflow-hidden transition-all duration-300 ${
          isMenuOpen ? 'max-h-screen border-t border-gray-200' : 'max-h-0'
        }`}>
          <div className="container mx-auto px-4 py-6 bg-white">
            <nav className="space-y-4">
              {navigation.map((item) => (
                <Link
                  key={item.name}
                  href={item.href}
                  onClick={() => setIsMenuOpen(false)}
                  className={`block text-gray-700 hover:text-teal-600 font-medium transition-colors duration-200 py-2 ${
                    router.pathname === item.href ? 'text-teal-600 border-l-4 border-teal-600 pl-4' : ''
                  }`}
                >
                  {item.name}
                </Link>
              ))}
              
              <hr className="my-4" />
              
              {/* Quick Actions Mobile */}
              <div className="space-y-3">
                <h3 className="text-sm font-semibold text-gray-500 uppercase tracking-wider">Quick Actions</h3>
                {quickActions.slice(0, 4).map((action, index) => (
                  <Link
                    key={index}
                    href={action.href}
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-600 hover:text-teal-600 transition-colors duration-200 py-1"
                  >
                    {action.name}
                  </Link>
                ))}
              </div>

              <hr className="my-4" />
              
              {/* CTA Button Mobile */}
              <Link href="/book-home-visit" onClick={() => setIsMenuOpen(false)}>
                <button className="w-full bg-gradient-to-r from-teal-500 to-emerald-500 text-white py-3 rounded-lg font-semibold hover:shadow-lg transition-all duration-300">
                  Book a Home Visit
                </button>
              </Link>

              {/* User Actions Mobile */}
              {user ? (
                <div className="space-y-2 mt-4">
                  <Link
                    href="/dashboard"
                    onClick={() => setIsMenuOpen(false)}
                    className="block text-gray-700 hover:text-teal-600 font-medium py-2"
                  >
                    Dashboard
                  </Link>
                  <button
                    onClick={() => {
                      handleLogout();
                      setIsMenuOpen(false);
                    }}
                    className="block w-full text-left text-red-600 hover:text-red-700 font-medium py-2"
                  >
                    Sign Out
                  </button>
                </div>
              ) : (
                <Link
                  href="/auth/login"
                  onClick={() => setIsMenuOpen(false)}
                  className="block w-full bg-gray-100 text-gray-700 py-3 rounded-lg font-semibold hover:bg-gray-200 transition-colors duration-300 text-center mt-4"
                >
                  Sign In
                </Link>
              )}
            </nav>
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;