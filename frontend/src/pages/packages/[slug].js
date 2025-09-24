import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/20/solid';

const PackageDetailsPage = ({ packageData }) => {
  // This check is good, it prevents errors if props are empty
  if (!packageData || Object.keys(packageData).length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold">Package not found.</h1>
        <p className="text-gray-600 mt-2">
          The package you are looking for does not exist or may have been removed.
        </p>
        <Link href="/packages" className="mt-4 inline-block bg-blue-600 text-white px-6 py-2 rounded-md hover:bg-blue-700">
          Back to Packages
        </Link>
      </div>
    );
  }

  // Safely access nested data
  const testParameters = Array.isArray(packageData.included_tests)
    ? packageData.included_tests
    : [];
  const reviews = Array.isArray(packageData.reviews) ? packageData.reviews : [];

  return (
    <>
      <Head>
        <title>{`${packageData.name} - Package | ViLife Diagnostics`}</title>
        <meta name="description" content={packageData.description} />
      </Head>

      {/* Package Details Hero */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="md:flex md:justify-between md:items-center">
            {/* Info Side */}
            <div className="mb-8 md:mb-0 md:w-1/2">
              <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">
                {packageData.name}
              </h1>
              <p className="text-lg text-gray-600 max-w-xl leading-relaxed mb-6">
                {packageData.description}
              </p>
              <div className="flex items-center mb-6">
                <span className="text-2xl font-bold text-gray-800 mr-2">
                  INR {packageData.price}
                </span>
                {packageData.original_price && (
                  <span className="text-lg text-gray-500 line-through">
                    {packageData.original_price}
                  </span>
                )}
              </div>
              <a
                href={`https://wa.me/918828826646?text=Hello%20ViLife%20Diagnostics.%20I%20would%20like%20to%20book%20the%20'${packageData.name}'%20package.`}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#7ac144] text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors"
              >
                Book Now
              </a>
            </div>
            {/* Image Side */}
            <div className="relative flex-shrink-0 w-full md:w-5/12 h-64 bg-gray-200 rounded-xl overflow-hidden">
              <Image
                src="/images/diagnostics.jpg"
                alt="Medical Laboratory Analysis"
                fill
                className="object-cover"
                sizes="(max-width: 768px) 100vw, 50vw"
                priority
              />
            </div>
          </div>
        </div>
      </section>

      {/* Test Parameters and Reviews */}
      <section className="py-16 bg-gray-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8">
            {/* Test Parameters */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Test Parameters ({testParameters.length})
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-x-4 gap-y-2">
                {testParameters.length > 0 ? (
                  testParameters.map((param, index) => (
                    <p key={index} className="text-gray-600">
                      <span className="font-semibold text-teal-600 mr-2">✓</span>
                      {param}
                    </p>
                  ))
                ) : (
                  <p className="text-gray-400 col-span-2">No test parameters listed for this package.</p>
                )}
              </div>
            </div>
            {/* Ratings and Reviews */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">
                Rating & Reviews
              </h2>
              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div
                      key={index}
                      className="border-b pb-4 last:border-b-0 last:pb-0"
                    >
                      <p className="text-gray-700 mb-2 leading-relaxed italic">
                        &quot;{review.text}&quot;
                      </p>
                      <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => (
                            <StarIcon key={i} className="w-5 h-5" />
                          ))}
                        </div>
                        <p className="font-semibold text-gray-800">
                          {review.author}
                        </p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No reviews yet for this package.</p>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Sticky WhatsApp */}
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
            fill
            className="object-contain rounded-full"
          />
        </div>
      </a>

      {/* Home Collection CTA Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div
          className="absolute inset-0 bg-cover bg-center bg-no-repeat"
          style={{ backgroundImage: `url('/images/BookHomeCollection.jpg')` }}
        >
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <div className="flex flex-col items-center text-center gap-8 md:flex-row md:justify-between md:text-left">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">
                Book Your Home Collection
              </h2>
              <p className="text-lg md:text-xl text-gray-200">
                Get exclusive packages on your first healthcare test.
              </p>
            </div>
            <div className="flex-shrink-0">
              <a
                href="https://wa.me/918828826646?text=Hello%20ViLife%20Diagnostics.%20I%20would%20like%20to%20book%20a%20home%20visit."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors"
              >
                Book a Home Visit
              </a>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export async function getServerSideProps(context) {
  const { slug } = context.params;

  // Re-use the reliable base URL logic
  const protocol = context.req.headers['x-forwarded-proto'] || 'http';
  const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || `${protocol}://${context.req.headers.host}`;
  const endpoint = `${baseUrl}/api/package-api/${slug}`;

  try {
    const response = await fetch(endpoint);
    // It's good practice to also check for server errors (5xx)
    if (!response.ok) {
      console.error(`Failed to fetch package ${slug}. Status: ${response.status}`);
      return { notFound: true };
    }
    const packageData = await response.json();
    
    // This handles cases where the API returns a valid but empty response
    if (!packageData || Object.keys(packageData).length === 0) {
      return { notFound: true };
    }

    return { 
      props: { 
        // Ensure data is serializable (handles Date objects, etc.)
        packageData: JSON.parse(JSON.stringify(packageData))
      } 
    };
  } catch (error) {
    console.error(`Error fetching package data for slug "${slug}":`, error);
    return { notFound: true };
  }
}

export default PackageDetailsPage;