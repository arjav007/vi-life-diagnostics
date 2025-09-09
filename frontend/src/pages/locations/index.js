// frontend/pages/locations/index.js
import React, { useState } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { MapPinIcon } from '@heroicons/react/24/outline';
import { PhoneIcon, ClockIcon } from '@heroicons/react/24/solid';

const LocationsPage = () => {
  // Static data for locations and connectivity details
  const locations = [
    { 
      name: 'Thane', 
      address: 'Casting Company, Unit 1A & B, 1st Floor, Shreeji Arcade, opp. Nitin - Cadbury Flyover, Panch Pakhdi, Thane, Maharashtra 400602', 
      mapLink: 'http://google.com/maps?q=ViLife+Diagnostics+Thane', 
      connectivity: [
        { type: 'Airport', title: 'Airport', description: 'Navi Mumbai International Airport', distance: '30.2 km', duration: '1 hour drive' },
        { type: 'Bus Station', title: 'Bus Station', description: 'MSRTC Bus stand Thane', distance: '1.8 km', duration: '11 min drive' },
        { type: 'Metro Station', title: 'Metro Station', description: 'Thane RTO Metro Station,(W)', distance: '1 km', duration: '4 min drive' },
        { type: 'Train Station', title: 'Train Station', description: 'Thane Railway Station', distance: '2.3 km', duration: '14 min walk' },
      ] 
    },
    { 
      name: 'Dombivli', 
      address: 'Hopewell Multispeciality Hospital, Meadows Gate Bungalow No. 46, Cssa Rio Gara No. 2, Palava City, Dombivli - 421204', 
      mapLink: 'http://google.com/maps?q=Hopewell+Multispeciality+Hospital+Dombivli', 
      connectivity: [
        { type: 'Airport', title: 'Airport', description: 'Navi Mumbai International Airport', distance: '28.2 km', duration: '1 hour 6 min drive' },
        { type: 'Train Station', title: 'Train Station', description: 'Dombivli Railway Station', distance: '11 km', duration: '30 min drive' },
        { type: 'Bus Station', title: 'Bus Station', description: 'Bus depot MIDC', distance: '10.7 km', duration: '25 min drive' },
      ]
    },
    
  ];

  const allConnectivityTypes = [...new Set(locations.flatMap(loc => loc.connectivity.map(c => c.type)))];

  const [activeLocation, setActiveLocation] = useState(locations[0]);
  const [activeFilter, setActiveFilter] = useState('All');

  const filteredConnectivity = activeFilter === 'All'
    ? activeLocation.connectivity
    : activeLocation.connectivity.filter(item => item.type === activeFilter);

  return (
    <>
      <Head>
        <title>Our Locations | ViLife Diagnostics</title>
        <meta name="description" content="Find our ViLife Diagnostics center and access world-class diagnostic services with ease and convenience." />
      </Head>

      {/* Main Content Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="text-center mb-10">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">
              Our Locations
            </h1>
            <p className="text-lg text-gray-600 max-w-xl mx-auto">
              Find your nearest ViLife Diagnostics center and access world-class diagnostic services with ease and convenience.
            </p>
          </div>

          <div className="grid lg:grid-cols-2 gap-8">
            {/* Left Column: Locations List */}
            <div className="space-y-4">
              {locations.map((location, index) => (
                <div 
                  key={index} 
                  className={`border rounded-lg p-6 cursor-pointer transition-all duration-200 ${
                    activeLocation.name === location.name ? 'border-teal-600 bg-teal-50' : 'border-gray-200 bg-white hover:bg-gray-50'
                  }`}
                  onClick={() => {
                    setActiveLocation(location);
                    setActiveFilter('All'); // Reset filter when a new location is selected
                  }}
                >
                  <div className="flex items-start space-x-4">
                    <div className={`w-8 h-8 rounded-full flex-shrink-0 flex items-center justify-center font-bold text-white text-sm ${
                      activeLocation.name === location.name ? 'bg-teal-600' : 'bg-gray-400'
                    }`}>
                      {index + 1}
                    </div>
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">{location.name}</h3>
                      <p className="text-sm text-gray-600 leading-relaxed">{location.address}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Right Column: Map and Connectivity */}
            <div className="flex flex-col gap-8">
              {/* Map Section */}
              <div className="relative h-[400px] rounded-lg overflow-hidden shadow-lg">
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/GmapsLocation.png"
                    alt="Map of ViLife Diagnostics locations"
                    layout="fill"
                    objectFit="cover"
                    quality={100}
                  />
                </div>
                <div className="absolute inset-0 bg-black/30 flex items-center justify-center z-10">
                  <Link href={activeLocation.mapLink} passHref target="_blank" rel="noopener noreferrer">
                    <button className="bg-white text-gray-800 px-6 py-3 rounded-full font-semibold shadow-lg hover:bg-gray-100 transition-colors duration-200">
                      Get Directions on Google Maps
                    </button>
                  </Link>
                </div>
              </div>

              {/* Connectivity Section */}
              <div className="bg-white p-6 rounded-lg shadow-sm">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Connectivity</h2>

                {/* Filter Buttons */}
                <div className="flex flex-wrap gap-2 mb-8">
                  <button
                    onClick={() => setActiveFilter('All')}
                    className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-200 ${
                      activeFilter === 'All' ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                    }`}
                  >
                    All X
                  </button>
                  {allConnectivityTypes.map((filterType) => (
                    <button
                      key={filterType}
                      onClick={() => setActiveFilter(filterType)}
                      className={`px-4 py-2 rounded-full font-semibold text-sm transition-colors duration-200 ${
                        activeFilter === filterType ? 'bg-teal-600 text-white' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
                      }`}
                    >
                      {filterType}
                    </button>
                  ))}
                </div>

                {/* Connectivity Details Grid */}
                <div className="grid md:grid-cols-2 gap-4">
                  {filteredConnectivity.map((item, index) => (
                    <div key={index} className="bg-white border border-gray-200 rounded-lg p-4 flex justify-between items-center shadow-sm">
                      <div className="space-y-1">
                        <h3 className="font-semibold text-gray-800">{item.title}</h3>
                        <p className="text-sm text-gray-600">{item.description}</p>
                      </div>
                      <div className="text-right flex-shrink-0">
                        <p className="font-semibold text-gray-800">{item.distance}</p>
                        <p className="text-sm text-gray-500">{item.duration}</p>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Home Collection CTA Section */}
<section className="relative py-16 overflow-hidden">
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url('/images/BookHomeCollection.jpg')`
    }}
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
      
    </>
  );
};

export default LocationsPage;