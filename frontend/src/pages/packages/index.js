import { useEffect, useState } from "react";
import { MagnifyingGlassIcon } from '@heroicons/react/24/outline';

export default function PackagesPage() {
  const [packages, setPackages] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    category: '',
    gender: '',
    age: '',
    popular: '',
  });

  // This effect simulates fetching data and can be replaced with your actual API call.
  // It also adds new properties (gender, category, etc.) to the dummy data for filtering.
  useEffect(() => {
    // This is where you would fetch your data.
    // For now, a dummy array is used to simulate the package list.
    const dummyPackages = [
      { id: 1, name: 'ViLife Adult Female', price: '2,999', oldPrice: '5,999', parameters: 9, gender: 'Female', category: 'General' },
      { id: 2, name: 'ViLife Adult Female', price: '2,999', oldPrice: '5,999', parameters: 9, gender: 'Female', category: 'General' },
      { id: 3, name: 'ViLife Adult Male', price: '2,999', oldPrice: '5,999', parameters: 9, gender: 'Male', category: 'General' },
      { id: 4, name: 'ViLife Diabetes Advance', price: '2,999', oldPrice: '5,999', parameters: 9, gender: 'Both', category: 'Diabetes' },
      { id: 5, name: 'ViLife Adult Female', price: '2,999', oldPrice: '5,999', parameters: 9, gender: 'Female', category: 'General' },
      { id: 6, name: 'ViLife Adult Female', price: '2,999', oldPrice: '5,999', parameters: 9, gender: 'Female', category: 'General' },
      { id: 7, name: 'ViLife Adult Male', price: '2,999', oldPrice: '5,999', parameters: 9, gender: 'Male', category: 'General' },
      { id: 8, name: 'ViLife Diabetes Advance', price: '2,999', oldPrice: '5,999', parameters: 9, gender: 'Both', category: 'Diabetes' },
      { id: 9, name: 'ViLife Adult Female', price: '2,999', oldPrice: '5,999', parameters: 9, gender: 'Female', category: 'General' },
      { id: 10, name: 'ViLife Adult Female', price: '2,999', oldPrice: '5,999', parameters: 9, gender: 'Female', category: 'General' },
      { id: 11, name: 'ViLife Adult Male', price: '2,999', oldPrice: '5,999', parameters: 9, gender: 'Male', category: 'General' },
      { id: 12, name: 'ViLife Diabetes Advance', price: '2,999', oldPrice: '5,999', parameters: 9, gender: 'Both', category: 'Diabetes' },
      { id: 13, name: 'ViLife Adult Female', price: '2,999', oldPrice: '5,999', parameters: 9, gender: 'Female', category: 'General' },
      { id: 14, name: 'ViLife Adult Female', price: '2,999', oldPrice: '5,999', parameters: 9, gender: 'Female', category: 'General' },
      { id: 15, name: 'ViLife Adult Male', price: '2,999', oldPrice: '5,999', parameters: 9, gender: 'Male', category: 'General' },
      { id: 16, name: 'ViLife Diabetes Advance', price: '2,999', oldPrice: '5,999', parameters: 9, gender: 'Both', category: 'Diabetes' },
    ];
    setPackages(dummyPackages);
  }, []);

  // Filter packages based on state
  const filteredPackages = packages.filter((pkg) => {
    const matchesSearch = pkg.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCategory = filters.category ? pkg.category === filters.category : true;
    const matchesGender = filters.gender ? pkg.gender === filters.gender : true;
    // Add more filter logic here as needed for age and popular
    return matchesSearch && matchesCategory && matchesGender;
  });

  // Helper functions to manage filter tags
  const getActiveFilterTags = () => {
    const tags = [];
    if (searchTerm) tags.push(searchTerm);
    if (filters.category) tags.push(filters.category);
    if (filters.gender) tags.push(filters.gender);
    if (filters.age) tags.push(filters.age);
    if (filters.popular) tags.push(filters.popular);
    return tags;
  };

  const clearAllFilters = () => {
    setSearchTerm('');
    setFilters({ category: '', gender: '', age: '', popular: '' });
  };

  const removeFilter = (tagToRemove) => {
    if (tagToRemove === searchTerm) setSearchTerm('');
    else if (tagToRemove === filters.category) setFilters({ ...filters, category: '' });
    else if (tagToRemove === filters.gender) setFilters({ ...filters, gender: '' });
    else if (tagToRemove === filters.age) setFilters({ ...filters, age: '' });
    else if (tagToRemove === filters.popular) setFilters({ ...filters, popular: '' });
  };

  return (
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
      <div className="container mx-auto -mt-12 py-8 px-6 sm:px-12">
        {/* Search and Filters */}
        <div className="bg-white p-6 rounded-lg shadow-md flex flex-wrap items-center space-y-4 md:space-y-0 md:space-x-4">
          {/* UPDATED SEARCH BAR */}
          <div className="flex-grow relative">
            <MagnifyingGlassIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search by package name, health condition, or parameter..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full border-gray-300 rounded-full shadow-sm focus:border-green-500 focus:ring-green-500 text-gray-900 placeholder-gray-500 pl-10 pr-4 py-2 transition-all duration-300"
            />
          </div>

          <select 
            className="border-gray-300 rounded-md text-gray-900"
            value={filters.category}
            onChange={(e) => setFilters({ ...filters, category: e.target.value })}
          >
            <option value="">Category</option>
            <option value="General">General</option>
            <option value="Diabetes">Diabetes</option>
          </select>
          <select 
            className="border-gray-300 rounded-md text-gray-900"
            value={filters.age}
            onChange={(e) => setFilters({ ...filters, age: e.target.value })}
          >
            <option value="">Age</option>
            {/* Add age options */}
          </select>
          <select 
            className="border-gray-300 rounded-md text-gray-900"
            value={filters.gender}
            onChange={(e) => setFilters({ ...filters, gender: e.target.value })}
          >
            <option value="">Gender</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
            <option value="Both">Both</option>
          </select>
          <select 
            className="border-gray-300 rounded-md text-gray-900"
            value={filters.popular}
            onChange={(e) => setFilters({ ...filters, popular: e.target.value })}
          >
            <option value="">Popular Packages</option>
            {/* Add popular options */}
          </select>
        </div>
        
        {/* Active Filter Tags */}
        <div className="flex items-center space-x-2 mt-4">
          {getActiveFilterTags().map((tag) => (
            <span key={tag} className="bg-green-100 text-green-800 text-sm font-medium px-2.5 py-0.5 rounded-full">
              {tag} <button onClick={() => removeFilter(tag)} className="text-green-500 hover:text-green-700 ml-1">x</button>
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
            <div key={pkg.id} className="bg-white p-6 rounded-lg shadow-md border border-gray-200">
              <h3 className="text-lg font-semibold mb-2 text-[#1e535e]">{pkg.name}</h3>
              <p className="text-gray-600 mb-2">
                <span className="text-xl font-bold text-green-600">₹{pkg.price}</span>{" "}
                <span className="line-through">₹{pkg.oldPrice}</span>
              </p>
              <p className="text-gray-500 text-sm mb-4">{pkg.parameters} Parameters</p>
              <button className="w-full bg-green-600 text-white py-2 rounded-md hover:bg-green-700 transition duration-300">
                Book Now
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}