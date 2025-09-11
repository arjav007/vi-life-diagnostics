import { useState } from "react";
import Head from 'next/head';
import { MagnifyingGlassIcon, ChevronDownIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import Image from 'next/image';

// The page now receives the 'initialPackages' prop from the server
export default function PackagesPage({ initialPackages }) {
  const [packages] = useState(initialPackages); // Use the server-provided data
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    gender: '',
    age: '',
    popular: '',
  });

  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase());
    // Ensure filters match backend data structure
    const matchesCategory = filters.category ? pkg.category === filters.category : true;
    const matchesGender = filters.gender ? pkg.gender === filters.gender || pkg.gender === 'Both' : true;
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
      <Head>
        <title>Healthcare Packages | ViLife Diagnostics</title>
        <meta name="description" content="Explore our comprehensive healthcare packages, carefully curated to suit your unique health needs." />
      </Head>

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
        <div className="container mx-auto py-8 px-6 sm:px-12">
          
          {/* Search Bar */}
          <div className="bg-white rounded-full shadow-sm w-full max-w-lg p-1 flex items-center mb-6">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search by package name..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="w-full bg-transparent border-none focus:outline-none focus:ring-0 text-gray-900 placeholder-gray-500 pl-5 pr-12 py-2"
              />
              <MagnifyingGlassIcon className="absolute right-4 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            </div>
          </div>

          {/* Filter Buttons Container */}
          <div className="flex flex-wrap items-center gap-2 md:gap-4 mb-4">
            {/* Category Dropdown */}
            <div className="relative">
              <select 
                className="w-full px-4 py-2 bg-blue-50 text-gray-700 rounded-full appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                value={filters.category}
                onChange={(e) => setFilters({ ...filters, category: e.target.value })}
              >
                <option value="">Category</option>
                <option value="General">General</option>
                <option value="Diabetes">Diabetes</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>

            {/* Gender Dropdown */}
            <div className="relative">
              <select 
                className="w-full px-4 py-2 bg-blue-50 text-gray-700 rounded-full appearance-none pr-8 focus:outline-none focus:ring-2 focus:ring-blue-300 text-sm"
                value={filters.gender}
                onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
              >
                <option value="">Gender</option>
                <option value="Male">Male</option>
                <option value="Female">Female</option>
              </select>
              <ChevronDownIcon className="absolute right-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400 pointer-events-none" />
            </div>
          </div>
          
          {/* Active Filter Tags */}
          <div className="flex items-center space-x-2 my-4 min-h-[2rem]">
            {getActiveFilterTags().map((tag) => (
              <span key={tag} className="bg-[#1e535e] text-white text-sm font-medium px-2.5 py-1 rounded-full flex items-center">
                {tag} 
                <button onClick={() => removeFilter(tag)} className="text-white hover:text-gray-200 ml-2 text-xs">✕</button>
              </span>
            ))}
            {getActiveFilterTags().length > 0 && (
              <button onClick={clearAllFilters} className="text-gray-500 hover:text-gray-700 text-sm font-medium">
                Clear All
              </button>
            )}
          </div>

          {/* Total Packages Count */}
          <p className="text-gray-600 font-medium">Showing {filteredPackages.length} of {packages.length} packages</p>

          {/* Package Cards Grid */}
          <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {filteredPackages.map((pkg) => (
              <Link 
                key={pkg.id} 
                href={`/packages/${pkg.slug || pkg.name.replace(/\s+/g, '-').toLowerCase()}`}
                passHref
              >
                <div className="bg-white p-6 rounded-lg shadow-md border border-gray-200 cursor-pointer hover:shadow-lg transition-shadow duration-300 flex flex-col h-full">
                  <h3 className="text-lg font-semibold mb-2 text-[#1e535e] flex-grow">{pkg.name}</h3>
                  <p className="text-gray-600 mb-2">
                    <span className="text-xl font-bold">₹{pkg.price}</span>{" "}
                    <span className="line-through text-sm">₹{pkg.original_price}</span>
                  </p>
                  <p className="text-gray-500 text-sm mb-4">{pkg.parameter_count} Parameters</p>
                  <button 
                    className="w-full mt-auto bg-[#7ac144] text-white py-2 rounded-md hover:bg-green-700 transition duration-300"
                    onClick={(e) => {
                      e.stopPropagation(); 
                      window.open(`https://wa.me/918828826646?text=Hello%20ViLife%20Diagnostics.%20I%20would%20like%20to%20book%20the%20'${pkg.name}'%20package.`, "_blank");
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
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/BookHomeCollection.jpg')` }}
        >
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-between text-center md:text-left">
            <div className="text-white mb-6 md:mb-0">
              <h2 className="text-4xl font-bold mb-4">Book Your Home Collection</h2>
              <p className="text-xl text-gray-200">Get exclusive packages on your first healthcare test.</p>
            </div>
            <div className="flex-shrink-0">
              <Link href="https://wa.me/918828826646?text=Hello%20ViLife%20Diagnostics.%20I%20would%20like%20to%20book%20a%20home%20visit." passHref>
                {/* FIX: Removed shadow for consistency */}
                <button className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
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
            src="/images/watsapp-icon.png"
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

// This function runs on the server for every request to this page
export async function getServerSideProps() {
  let initialPackages = [];
  try {
    const apiUrl = process.env.NEXT_PUBLIC_API_URL;
    const response = await fetch(`${apiUrl}/api/packages`);
    if (response.ok) {
      initialPackages = await response.json();
    } else {
      console.error('Failed to fetch packages, status:', response.status);
    }
  } catch (error) {
    console.error('Error fetching packages from API:', error);
  }

  return {
    props: {
      initialPackages,
    },
  };
}
