// frontend/pages/packages/[slug].js
import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/router';
import Head from 'next/head';
import Link from 'next/link';
import { StarIcon } from '@heroicons/react/20/solid';

const PackageDetailsPage = () => {
  const router = useRouter();
  const { slug } = router.query;
  const [packageData, setPackageData] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchPackage = async () => {
      if (slug) {
        try {
          // This API_BASE variable will be defined in your .env.local file
          const API_BASE = process.env.NEXT_PUBLIC_API_BASE;
          const response = await fetch(`http://localhost:3000/api/packages/${slug}`);
          if (!response.ok) {
            throw new Error('Package not found');
          }
          const data = await response.json();
          setPackageData(data);
        } catch (error) {
          console.error('Failed to fetch package:', error);
          setPackageData(null);
        } finally {
          setLoading(false);
        }
      }
    };
    fetchPackage();
  }, [slug]);

  if (loading) {
    return <div>Loading...</div>;
  }
  
  if (!packageData) {
    return <div>Package not found.</div>;
  }
  
  // Convert included_tests object to an array of values for rendering
  const testParameters = Object.values(packageData.included_tests);

  return (
    <>
      <Head>
        <title>{packageData.name} - Package | ViLife Diagnostics</title>
        <meta name="description" content={packageData.description} />
      </Head>

      {/* Package Details Hero Section */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="md:flex md:justify-between md:items-center">
            {/* Left side with package info */}
            <div className="mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {packageData.name}
              </h1>
              <p className="text-lg text-gray-600 max-w-xl leading-relaxed mb-6">
                {packageData.description}
              </p>
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold text-gray-800 mr-2">INR {packageData.price}</span>
                <span className="text-lg text-gray-500 line-through">{packageData.original_price}</span>
              </div>
              <Link 
                href="https://wa.me/918828826646?text=Hello%20ViLife%20Diagnostics.%20I%20would%20like%20to%20book%20a%20home%20visit."
                passHref
              >
                <button className="bg-[#7ac144] text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-300">
                  Book Now
                </button>
              </Link>
            </div>

            {/* Right side with an empty space or image if you have one */}
<div className="flex-shrink-0 w-full md:w-1/2 lg:w-1/3 h-64 bg-gray-200 rounded-xl overflow-hidden">
  <img 
    src="/images/Diagnostics.jpg" 
    alt="Medical Laboratory Analysis"
    className="w-full h-full object-cover"
  />
</div>
          </div>
        </div>
      </section>

      {/* Test Parameters and Reviews Section */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Test Parameters */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Test Parameters ({testParameters.length})</h2>
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {testParameters.map((param, index) => (
                  <p key={index} className="text-gray-600">
                    <span className="font-semibold text-teal-600 mr-2">✓</span>{param}
                  </p>
                ))}
              </div>
            </div>

            {/* Ratings and Reviews */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Rating & Reviews</h2>
              <div className="space-y-6">
                {packageData.reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <p className="text-gray-700 mb-2 leading-relaxed italic">
                      "{review.text}"
                    </p>
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        <StarIcon className="w-5 h-5" />
                        <StarIcon className="w-5 h-5" />
                        <StarIcon className="w-5 h-5" />
                        <StarIcon className="w-5 h-5" />
                        <StarIcon className="w-5 h-5" />
                      </div>
                      <p className="font-semibold text-gray-800">{review.author}</p>
                    </div>
                  </div>
                ))}
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
    </>
  );
};

export default PackageDetailsPage;
