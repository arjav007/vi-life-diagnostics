import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/20/solid';


const PackageDetailsPage = ({ packageData }) => {
  // Your UI component remains unchanged.
  if (!packageData) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold">Package not found.</h1>
        <p className="text-gray-600 mt-2">The package you are looking for does not exist or may have been removed.</p>
        <Link href="/packages">
          <a className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
            Back to Packages
          </a>
        </Link>
      </div>
    );
  }

  const testParameters = Object.values(packageData.included_tests || {});
  const reviews = packageData.reviews || [];

  return (
    <>
      <Head>
        <title>{packageData.name} - Package | ViLife Diagnostics</title>
        <meta name="description" content={packageData.description} />
      </Head>

      {/* Package Details Hero */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="md:flex md:justify-between md:items-center">
            <div className="mb-8 md:mb-0">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {packageData.name}
              </h1>
              <p className="text-lg text-gray-600 max-w-xl leading-relaxed mb-6">
                {packageData.description}
              </p>
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold text-gray-800 mr-2">INR {packageData.price}</span>
                {packageData.original_price && (
                  <span className="text-lg text-gray-500 line-through">{packageData.original_price}</span>
                )}
              </div>
              <Link href={`https://wa.me/918828826646?text=Hello%20ViLife%20Diagnostics.%20I%20would%20like%20to%20book%20the%20'${packageData.name}'%20package.`} passHref>
                <a target="_blank" rel="noopener noreferrer" className="inline-block bg-[#7ac144] text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-300">
                  Book Now
                </a>
              </Link>
            </div>

            <div className="relative flex-shrink-0 w-full md:w-1/2 lg:w-1/3 h-64 bg-gray-200 rounded-xl overflow-hidden">
              <Image 
                src="/images/Diagnostics.jpg" 
                alt="Medical Laboratory Analysis"
                layout="fill"
                objectFit="cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Test Parameters and Reviews */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
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

            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Rating & Reviews</h2>
              <div className="space-y-6">
                {reviews.length > 0 ? reviews.map((review, index) => (
                  <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                    <p className="text-gray-700 mb-2 leading-relaxed italic">&quot;{review.text}&quot;</p>
                    <div className="flex items-center space-x-2">
                      <div className="flex text-yellow-400">
                        {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5" />)}
                      </div>
                      <p className="font-semibold text-gray-800">{review.author}</p>
                    </div>
                  </div>
                )) : <p className="text-gray-500">No reviews yet.</p>}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Whatsapp Icon Sticky */}
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

      {/* Home Collection CTA */}
      <section className="relative py-16 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/BookHomeCollection.jpg')` }}
        >
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <div className="flex items-center justify-between">
            <div className="text-white">
              <h2 className="text-4xl font-bold mb-4">Book Your Home Collection</h2>
              <p className="text-xl text-gray-200">Get exclusive packages on your first healthcare test.</p>
            </div>
            <div className="flex-shrink-0">
              <Link href="https://wa.me/918828826646?text=Hello%20ViLife%20Diagnostics.%20I%20would%20like%20to%20book%20a%20home%20visit." passHref>
                <a className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                  Book a Home Visit
                </a>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

// --- THIS IS THE UPDATED PART ---
export async function getServerSideProps(context) {
  const { slug } = context.params;
  
  const apiBase =
    process.env.NEXT_PUBLIC_API_URL ||
    `https://${context.req.headers.host}`;

  // --- ADD THIS DEBUG LINE ---
  const fullApiUrl = `${apiBase}/api/package-api/${slug}`;
  console.log('Attempting to fetch package data from URL:', fullApiUrl);
  // -------------------------

  const res = await fetch(fullApiUrl); // Use the new variable here

  if (!res.ok) {
    // Also log the failure status
    console.error(`Failed to fetch from ${fullApiUrl}, status: ${res.status}`);
    return { notFound: true };
  }

  const packageData = await res.json();

  return {
    props: { packageData }
  };
}
export default PackageDetailsPage;