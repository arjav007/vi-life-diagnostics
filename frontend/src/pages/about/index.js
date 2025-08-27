// frontend/pages/about.js
import React from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';

const AboutPage = () => {
  return (
    <>
      <Head>
        <title>About Us | ViLife Diagnostics</title>
        <meta name="description" content="Learn about ViLife Diagnostics, an NABL Accredited & Leading Pathology Laboratory in Mumbai." />
      </Head>

      {/* Hero Section */}
      <section className="relative min-h-[50vh] flex items-center justify-center text-center text-white overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: "url('/images/LabPhoto.webp')" }} // Place your image in public/images
        >
          <div className="absolute inset-0 bg-black/50"></div> {/* Dark overlay */}
        </div>
        <div className="relative z-10 p-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-2">About Us</h1>
          <p className="text-lg md:text-xl font-medium max-w-2xl mx-auto">
            We are an NABL Accredited & Leading Pathology Laboratory in Mumbai.
          </p>
        </div>
      </section>

      {/* Lab Director Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Director's Photo */}
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/images/directorPhoto.webp" // Place your image in public/images
                alt="Dr. Snehal Kosale, Lab Director"
                width={500}
                height={500}
                className="rounded-xl shadow-lg"
              />
            </div>
            
            {/* Director's Info and Certifications */}
            <div className="space-y-6">
              <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Lab Director</h2>
              <h3 className="text-2xl font-semibold text-teal-700">Dr. Snehal Kosale</h3>
              <p className="text-lg text-gray-600 mb-4">MBBS, MD (Pathology)</p>
              
              <p className="text-gray-700 leading-relaxed">
                ViLife Diagnostics prioritises health over anything. We are equipped with technologically advanced fully automated machinery carefully selected to provide accurate results. We are accredited by NABL National Accreditation Board for Testing and Calibration Laboratories standards and also are an ISO (9001:2015, 17025) certified laboratory. We conduct daily quality controls and are a part of several external quality assurance programs.
              </p>
              
              <p className="text-gray-700 font-semibold leading-relaxed">
                Experience quality healthcare by being a part of our family.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Our Values Section */}
      <section className="py-20 bg-gray-100">
        <div className="container mx-auto px-4 text-center">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ViLife Diagnostics as an organisation works towards meeting industry standards to deliver quality healthcare for you and your loved ones.
            </p>
          </div>
          {/* Updated Values Grid with cards and shadows */}
          <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-6">
            {[
              'Quality',
              'Timeliness',
              'Excellence',
              'Humanity',
              'Teamwork',
              'Research'
            ].map((value, index) => (
              <div 
                key={index} 
                className="bg-white p-6 rounded-lg shadow-sm hover:shadow-lg transition-shadow duration-300"
              >
                <p className="text-xl font-medium text-gray-800">{value}</p>
              </div>
            ))}
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

export default AboutPage;