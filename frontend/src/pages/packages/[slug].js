import React from 'react';
import Head from 'next/head';
import Link from 'next/link';
import Image from 'next/image';
import { StarIcon } from '@heroicons/react/20/solid';

const PackageDetailsPage = ({ packageData }) => {
  // Defensive log to spot runtime issues (leave until verified in prod)
  if (typeof window !== "undefined") {
    console.log('Rendering with packageData:', packageData);
  }

  if (!packageData || Object.keys(packageData).length === 0) {
    return (
      <div className="text-center py-20">
        <h1 className="text-2xl font-semibold">Package not found.</h1>
      </div>
    );
  }

  const testParameters = packageData.included_tests ? Object.values(packageData.included_tests) : [];
  const reviews = Array.isArray(packageData.reviews) ? packageData.reviews : [];

  return (
    <>
      <Head>
        <title>{`${packageData.name || ''} - Package | ViLife Diagnostics`}</title>
        <meta name="description" content={packageData.description || ''} />
      </Head>

      {/* Package Details Hero */}
      <section className="bg-white py-12">
        <div className="container mx-auto px-4">
          <div className="md:flex md:justify-between md:items-center">
            {/* Info Side */}
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
              <a
  href="https://wa.me/918828826646?text=Hello%20ViLife%20Diagnostics.%20I%20would%20like%20to%20book%20a%20home%20visit."
  target="_blank"
  rel="noopener noreferrer"
  className="inline-block bg-[#7ac144] text-white px-8 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-300"
>
  Book Now
</a>
            </div>
            {/* Image Side */}
            <div className="relative flex-shrink-0 w-full md:w-1/2 lg:w-1/3 h-64 bg-gray-200 rounded-xl overflow-hidden">
              <Image
                src="/images/diagnostics.jpg"
                alt="Medical Laboratory Analysis"
                layout="fill"
                objectFit="cover"
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
              <div className="grid grid-cols-2 gap-x-4 gap-y-2">
                {testParameters.map((param, index) => (
                  <p key={index} className="text-gray-600">
                    <span className="font-semibold text-teal-600 mr-2">✓</span>{param}
                  </p>
                ))}
                {testParameters.length === 0 && <p className="text-gray-400">No test parameters listed.</p>}
              </div>
            </div>
            {/* Ratings and Reviews */}
            <div className="bg-white p-6 rounded-lg shadow-sm">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Rating & Reviews</h2>
              <div className="space-y-6">
                {reviews.length > 0 ? (
                  reviews.map((review, index) => (
                    <div key={index} className="border-b pb-4 last:border-b-0 last:pb-0">
                      <p className="text-gray-700 mb-2 leading-relaxed italic">&quot;{review.text}&quot;</p>
                      <div className="flex items-center space-x-2">
                        <div className="flex text-yellow-400">
                          {[...Array(5)].map((_, i) => <StarIcon key={i} className="w-5 h-5" />)}
                        </div>
                        <p className="font-semibold text-gray-800">{review.author}</p>
                      </div>
                    </div>
                  ))
                ) : (
                  <p className="text-gray-500">No reviews yet.</p>
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
            layout="fill"
            objectFit="contain"
            className="rounded-full"
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
    {/* This container is now responsive:
      - On mobile (default): it's a vertical column (flex-col), with centered text and a gap.
      - On medium screens and up (md:): it becomes a horizontal row (md:flex-row) with space between items.
    */}
    <div className="flex flex-col items-center text-center gap-8 md:flex-row md:justify-between md:text-left">
      
      {/* Text Content */}
      <div className="text-white">
        <h2 className="text-3xl md:text-4xl font-bold mb-3">Book Your Home Collection</h2>
        <p className="text-lg md:text-xl text-gray-200">Get exclusive packages on your first healthcare test.</p>
      </div>

      {/* Button */}
      <div className="flex-shrink-0">
        <Link 
          href="https://wa.me/918828826646?text=Hello%20ViLife%20Diagnostics.%20I%20would%20like%20to%20book%20a%20home%20visit." 
          passHref
        >
          <a className="inline-block bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
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

export async function getServerSideProps(context) {
  const { slug } = context.params;
  const apiUrl = `https://${context.req.headers.host}`;
  const endpoint = `${apiUrl}/api/package-api/${slug}`;
  try {
    const response = await fetch(endpoint);
    if (!response.ok) {
      return { notFound: true };
    }
    const packageData = await response.json();
    return { props: { packageData } };
  } catch (error) {
    return { notFound: true };
  }
}

export default PackageDetailsPage;
