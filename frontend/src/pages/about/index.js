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
          style={{ backgroundImage: "url('/images/LabPhoto.webp')" }}
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

      {/* Lab Director Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Director's Photo */}
            <div className="flex justify-center lg:justify-start">
              <Image
                src="/images/directorPhoto.webp"
                alt="Dr. Snehal Kosale, Lab Director"
                width={500}
                height={500}
                className="rounded-xl"
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

      {/* Accreditations Section */}
<section className="py-16 bg-blue-50">
  <div className="container mx-auto px-6 md:px-12 lg:px-20">
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1c515c] mb-6">
          Trusted Accreditations
        </h2>
        <p className="text-gray-600 mx-auto md:mx-0 text-lg mb-10 leading-relaxed max-w-xl">
          National Accreditation Board for Testing and Calibration Laboratories (NABL) and International Laboratory Accreditation Cooperation (ILAC) accreditations ensure that labs follow the stringent quality protocols set up by these bodies. ViLife Diagnostics as an organisation works towards meeting industry standards to deliver quality healthcare for you and your loved ones.
        </p>
      </div>
      <div className="md:w-1/2 flex justify-center md:justify-end items-center gap-12 md:gap-8"> {/* Adjusted gap */}
        {/* ILAC Logo Container */}
        <div className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center"> {/* Slightly smaller container for better fit */}
          <Image 
            src="/images/ILAC.png" 
            alt="ILAC Accredited" 
            width={160} // Explicit width for consistent rendering
            height={160} // Explicit height for consistent rendering
            className="object-contain" 
          />
        </div>
        
        {/* NABL Logo Container */}
        <div className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center"> {/* Slightly smaller container for better fit */}
          <Image 
            src="/images/NABL-FINAL.png" 
            alt="NABL Accredited" 
            width={120} // Explicit width for consistent rendering
            height={120} // Explicit height for consistent rendering
            className="object-contain" 
          />
        </div>
      </div>
    </div>
  </div>
</section>

      {/* Our Values Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4 text-center">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-2">Our Values</h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              ViLife Diagnostics as an organisation works towards meeting industry standards to deliver quality healthcare for you and your loved ones.
            </p>
          </div>
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
                className="bg-blue-50 p-6 rounded-lg"
              >
                <p className="text-xl font-medium text-gray-800">{value}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
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
    className="inline-block bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
  >
    Book a Home Visit
  </Link>
</div>

    </div>
  </div>
</section>
    </>
  );
};

export default AboutPage;
