import { useEffect, useState } from "react";
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image'; // Added this import for the Image component

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    gender: '',
    age: '',
    popular: '',
  });

  useEffect(() => {
    // This is where you would fetch your data.
    const dummyPackages = [
      { id: 1, name: 'ViLife Adult Female', price: '2,999', oldPrice: '5,999', parameters: 9, gender: 'Female', category: 'General' },
      { id: 2, name: 'ViLife Adult Male', price: '2,999', oldPrice: '5,999', parameters: 10, gender: 'Male', category: 'General' },
      { id: 3, name: 'ViLife Adult Anaemia', price: '1,499', oldPrice: '2,999', parameters: 16, gender: 'Both', category: 'General' },
      { id: 4, name: 'ViLife Diabetes Advance', price: '1,399', oldPrice: '2,999', parameters: 8, gender: 'Both', category: 'Diabetes' },
      { id: 5, name: 'ViLife Diabetes Basic', price: '399', oldPrice: '699', parameters: 3, gender: 'Both', category: 'General' },
      { id: 6, name: 'ViLife Fever Advance', price: '2,499', oldPrice: '4,499', parameters: 16, gender: 'Female', category: 'General' },
      { id: 7, name: 'ViLife Fever Basic', price: '1,699', oldPrice: '2,699', parameters: 16, gender: 'Both', category: 'General' },
      { id: 8, name: 'ViLife Health', price: '2,499', oldPrice: '6,599', parameters: 16, gender: 'Both', category: 'General' },
      { id: 9, name: 'ViLife Healthy Heart Advance', price: '2,999', oldPrice: '5,999', parameters: 16, gender: 'Both', category: 'General' },
      { id: 10, name: 'ViLife Healthy Heart Basic', price: '1,499', oldPrice: '2,799', parameters: 16, gender: 'Female', category: 'General' },
      { id: 11, name: 'ViLife Healthy Heart Plus', price: '4,999', oldPrice: '9,999', parameters: 16, gender: 'Both', category: 'General' },
      { id: 12, name: 'ViLife Hormone', price: '5,999', oldPrice: '9,999', parameters: 16, gender: 'Both', category: 'General' },
      { id: 13, name: 'ViLife Infertility Female', price: '5,099', oldPrice: '5,999', parameters: 13, gender: 'Female', category: 'General' },
      { id: 14, name: 'ViLife Infertility Male', price: '4,499', oldPrice: '6,899', parameters: 9, gender: 'Male', category: 'General' },
      { id: 15, name: 'ViLife Junior', price: '899', oldPrice: '1,799', parameters: 5, gender: 'Both', category: 'General' },
      { id: 16, name: 'ViLife Mother', price: '1,299', oldPrice: '2,499', parameters: 9, gender: 'Both', category: 'General' },
      { id: 17, name: 'ViLife Senior 60+ Male', price: '3,499', oldPrice: '8,399', parameters: 12, gender: 'Male', category: 'General' },
      { id: 18, name: 'ViLife Senior 60+ Female', price: '2,999', oldPrice: '5,999', parameters: 12, gender: 'Female', category: 'Diabetes' },
    ];
    setPackages(dummyPackages);
  }, []);

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filters.category ? pkg.category === filters.category : true;
    const matchesGender = filters.gender ? pkg.gender === filters.gender : true;
    return matchesSearch && matchesCategory && matchesGender;
  });

  const getActiveFilterTags = () => {
    const tags = [];
    if (filters.gender) tags.push(filters.gender);
    if (filters.category) tags.push(filters.category);
    return tags;
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilters({ category: '', gender: '', age: '', popular: '' });
  };

  const removeFilter = (tagToRemove) => {
    if (tagToRemove === filters.gender) setFilters({ ...filters, gender: '' });
    if (tagToRemove === filters.category) setFilters({ ...filters, category: '' });
  };

  return (
    <>
      <div className="bg-gray-100 min-h-screen">
        {/* Header Section with Background Image */}
        <div 
          className="relative bg-cover bg-center text-white py-16 px-6 sm:px-12"
          style={{ backgroundImage: 'url("/images/HealthcarePackage.png")' }}
        >
          <div className="absolute inset-0 bg-black opacity-60"></div>
          <div className="container mx-auto relative z-10">
            <h1 className="text-4xl font-bold mb-4">Healthcare Packages</h1>
            <p className="max-w-2xl text-lg">
              Explore our ViLife Packages, carefully curated to suit your unique health needs. From preventive care to managing chronic health, each package offers quality diagnostics and precision-driven insights for better health.
            </p>
          </div>
        </div>

        {/* Main Content Section */}
        <div className="container mx-auto -mt-1 py-8 px-6 sm:px-12">
          
          {/* Search Bar */}
          <div className="bg-[#eeeeee] rounded-full -md w-[459px] h-[36px] p-0 flex items-center mb-4">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by package name, health condition, or parameter..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500 pl-5 pr-12 py-2"
              />
              <MagnifyingGlassIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Filter Buttons Container */}
          <div className="flex flex-wrap items-center space-x-2 md:space-x-4 mb-4" style={{ width: '440px', height: '31px' }}>
            {/* Category Dropdown */}
            <div className="relative w-[109px] h-[31px]">
              <select 
                className="w-full px-4 py-2 bg-[#ddf3fc] text-gray-700 rounded-[23px] appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="">Category</option>
                <option value="General">General</option>
                <option value="Diabetes">Diabetes</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>

            {/* Age Dropdown */}
            <div className="relative w-[79px] h-[31px]">
              <select 
                className="w-full px-4 py-2 bg-[#ddf3fc] text-gray-700 rounded-[30px] appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                value={filters.age}
                onChange={(e) => setFilters({ ...filters, age: e.target.value })}
              >
                <option value="">Age</option>
                <option value="20-30">20-30</option>
                <option value="30-40">30-40</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            
            {/* Gender Dropdown */}
            <div className="relative w-[102px] h-[31px]">
              <select 
                className="w-full px-4 py-2 bg-[#ddf3fc] text-gray-700 rounded-[23px] appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                value={filters.gender}
                onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Both">Both</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
            
            {/* Popular Packages Dropdown */}
            <div className="relative w-[102px] h-[31px]">
              <select 
                className="w-full px-4 py-2 bg-[#ddf3fc] text-gray-700 rounded-[23px] appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                value={filters.popular}
                onChange={(e) => setFilters({ ...filters, popular: e.target.value })}
              >
                <option value="">Popular Packages</option>
                <option value="Most Booked">Most Booked</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
            </div>
          </div>
          
          {/* Active Filter Tags */}
          <div className="flex items-center space-x-2 mt-4">
            {getActiveFilterTags().map((tag) => (
              <span key={tag} className="bg-[#1e535e] text-white text-sm font-medium px-2.5 py-0.5 rounded-full">
                {tag} <button onClick={() => removeFilter(tag)} className="text-white hover:text-gray-200 ml-1">x</button>
              </span>
            ))}
            {getActiveFilterTags().length > 0 && (
              <button onClick={clearAllFilters} className="text-gray-500 hover:text-gray-700">
                Clear All
              </button>
            )}
          </div>

          {/* Total Packages Count */}
          <p className="mt-4 text-gray-600 font-medium">Total {filteredPackages.length} packages</p>

          {/* Package Cards Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPackages.map((pkg) => (
              <Link 
                key={pkg.id} 
                href={`/packages/${pkg.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`}
                passHref
              >
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow duration-300">
                  <h3 className="text-lg font-semibold mb-2 text-[#1e535e]">{pkg.name}</h3>
                  <p className="text-gray-600 mb-2">
                    <span className="text-xl font-bold ">₹{pkg.price}</span>{" "}
                    <span className="line-through">₹{pkg.oldPrice}</span>
                  </p>
                  <p className="text-gray-500 text-sm mb-4">{pkg.parameters} Parameters</p>
                  <button 
                    className="w-full bg-[#7ac144] text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      window.open("https://wa.me/918828826646?text=Hello%20ViLife%20Diagnostics.%20I%20would%20like%20to%20book%20a%20home%20visit.", "_blank");
                    }}
                  >
                    Book Now
                  </button>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
      
      {/* Home Collection CTA Section */}
      <section className="relative py-16 overflow-hidden">
        {/* Background Image */}
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/BookHomeCollection.jpg')` }}
        >
          {/* Background Image Overlay */}
          <div className="absolute inset-0 bg-black/80"></div>
        </div>

        <div className="relative container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-4">
                Book Your Home Collection
              </h2>
              <p className="text-xl text-gray-200">
                Get exclusive packages on your first healthcare test.
              </p>
            </div>
            
            <div className="flex-shrink-0">
              <Link href="https://wa.me/918828826646?text=Hello%20ViLife%20Diagnostics.%20I%20would%20like%20to%20book%20a%20home%20visit." passHref>
                <button className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
                  Book a Home Visit
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky WhatsApp Icon */}
      <a
        href="https://wa.me/918828826646"
        target="_blank"
        rel="noopener noreferrer"
        className="fixed bottom-6 right-6 z-50 transition-transform hover:scale-110"
      >
        <div className="relative w-16 h-16">
          <Image
            src="/images/watsapp-icon.png" // Path to your uploaded image
            alt="WhatsApp Chat"
            layout="fill"
            objectFit="contain"
            className="rounded-full"
          />
        </div>
      </a>
    </>
  );
}