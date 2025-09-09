import { useState, useEffect } from 'react';
import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';
import { ChevronRightIcon, PhoneIcon, MapPinIcon, ClockIcon } from '@heroicons/react/24/outline';

const Homepage = () => {
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    // Fetch all packages to get the top 4
    const fetchPackages = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/packages');
        const data = await response.json();
        // Slice the first 4 packages to display on the homepage
        setPackages(data.slice(0, 4) || []);
      } catch (error) {
        console.error('Error fetching packages:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchPackages();
  }, []);

  const heroFeatures = [
    {
      icon: '🎯',
      title: 'Quality Assurance',
      description: 'Precision-driven insights for better health decisions'
    },
    {
      icon: '🏠',
      title: 'Home Collection',
      description: 'Convenient sample collection at your doorstep'
    },
    {
      icon: '📱',
      title: 'Digital Reports',
      description: 'Get your reports online with WhatsApp delivery'
    },
    {
      icon: '⭐',
      title: 'NABL Accredited',
      description: 'Trusted and certified diagnostic services'
    }
  ];

  const testimonials = [
    {
      name: 'Priya Sharma',
      rating: 5,
      text: 'Excellent service! Got my reports on time and the home collection was very convenient.',
      location: 'Thane'
    },
    {
      name: 'Rajesh Kumar',
      rating: 5,
      text: 'Professional staff and accurate results. Highly recommend Vi-Life Diagnostics.',
      location: 'Dombivli'
    },
    {
      name: 'Meera Patel',
      rating: 5,
      text: 'Great experience with their diabetes package. Very comprehensive tests.',
      location: 'Vashi'
    }
  ];

  const locations = [
    { name: 'Thane', address: 'Casting Company, Unit 1A & B, 1st Floor' },
    { name: 'Dombivli', address: 'Hopewell Multispeciality Hospital, Meadows Gate' },
    { name: 'Vashi', address: 'Global 5 Heights, F 2/0-1 Main Road, Sector 9' },
    { name: 'Bhiwandi', address: 'House no 278, Old Mumbai-Agra Rd' }
  ];

  return (
    <>
      <Head>
        <title>Vi-Life Diagnostics - Your Health, Our Priority | NABL Accredited Lab</title>
        <meta name="description" content="Vi-Life Diagnostics provides accurate, reliable pathology testing services in Mumbai. NABL accredited with home collection, digital reports, and expert care." />
        <meta name="keywords" content="pathology lab, blood tests, health checkup, NABL accredited, Mumbai, Thane, home collection" />
      </Head>

      {/* Sticky WhatsApp Icon */}
      <a 
        href="https://wa.me/918828826646" 
        target="_blank" 
        rel="noopener noreferrer" 
        className="fixed bottom-6 right-6 z-50 bg-[#25D366] text-white p-3 rounded-full transition-transform hover:scale-110"
      >
        <svg 
          className="w-8 h-8" 
          fill="currentColor" 
          viewBox="0 0 24 24" 
          xmlns="http://www.w3.org/2000/svg"
        >
          <path d="M20.52 3.44A10.82 10.82 0 0012.04 1.5C6.07 1.5 1 6.32 1 12.16c0 1.94.51 3.82 1.48 5.48L1 23l6.55-1.72a10.9 10.9 0 005.49 1.48c5.97 0 10.99-4.82 10.99-10.66C23.03 6.64 21.82 4.67 20.52 3.44zM12.04 21.31a8.91 8.91 0 01-4.63-1.29l-.33-.19L4.41 21.3l1.1-3.95-.21-.34a9.14 9.14 0 01-1.39-5.11C3.91 7.42 7.55 3.75 12.04 3.75c2.47 0 4.79 1 6.55 2.76a8.91 8.91 0 012.63 6.39c0 4.7-3.79 8.54-8.49 8.54zM17.15 15.11c-.24-.12-.42-.19-.8-.38-.4-.2-.59-.28-.84-.33-.2-.04-.42-.04-.61.03-.17.06-.39.19-.59.4-.2.2-.42.22-.59.13-.24-.13-.99-.36-1.89-1.15a8.2 8.2 0 01-1.35-1.57c-.29-.38-.08-.59.18-.84.18-.18.4-.44.59-.65.2-.24.26-.38.4-.7a.9.9 0 00.12-.59c-.06-.15-.59-1.42-.81-1.92-.19-.46-.37-.39-.55-.39-.17 0-.39.03-.59.03-.2 0-.42.06-.61.25-.2.19-.77.75-.77 1.84s.82 2.13.94 2.29c.15.19 1.51 2.31 3.59 3.29.98.47 1.76.75 2.37.95.49.16.8.13 1.05.08.31-.06.99-.4 1.13-.78.14-.37.14-.69.1-.75-.03-.06-.11-.1-.23-.17z" />
        </svg>
      </a>

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gray-900 overflow-hidden">
        {/* Background Image with Overlay */}
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/HomePhoto.jpg')` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Your Health, 
                  <span className="text-emerald-300"> Our Priority</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed">
                  ViLife Diagnostics provides accurate, reliable, and timely pathology testing services to help you make confident, informed decisions about your health. Whatsapp us for home collection.
                </p>
              </div>

              {/* Book a Test Now Button */}
              <Link
                href="https://wa.me/918828826646?text=Hello%20ViLife%20Diagnostics.%20I%20would%20like%20to%20book%20a%20test."
                passHref
              >
                <button className="bg-[#7ac144] hover:bg-emerald-600 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105">
                  Book a Test Now
                </button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Vi-Life Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-[#1c515c] mb-4">
              Why Choose ViLife Diagnostics?
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              ViLife Diagnostics firmly believes in providing quality healthcare with excellent customer service. Here are top 4 reasons why you should choose us.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Quality Assurance',
                description: 'Reliable diagnostics backed by strict quality control standards'
              },
              {
                icon: '🔬',
                title: 'Precision Testing',
                description: 'Accurate and detailed results for informed healthcare decisions.'
              },
              {
                icon: '👨‍⚕️',
                title: 'Experienced Pathologists',
                description: 'Our team of experts brings years of experience to every diagnosis'
              },
              {
                icon: '⭐',
                title: '4.9 out of 5',
                description: 'Highly rated by patients for service excellence and reliable results.'
              }
            ].map((item, index) => (
              <div 
                key={index} 
                className="bg-blue-50 text-center p-8 rounded-xl transition-all duration-300 transform hover:-translate-y-2"
              >
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-semibold text-[#1e535e] mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations Section */}
<section className="py-16 bg-blue-50">
  <div className="container mx-auto px-6 md:px-12 lg:px-20"> {/* Removed text-center */}
    
    {/* Use flexbox for the two-column layout */}
    <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
      
      {/* Left side: Content and Heading */}
      <div className="md:w-1/2 text-center md:text-left">
        <h2 className="text-3xl md:text-4xl font-bold text-[#1c515c] mb-6">
          Trusted Accreditations
        </h2>
        <p className="text-gray-600 mx-auto md:mx-0 text-lg mb-10 leading-relaxed max-w-xl">
          National Accreditation Board for Testing and Calibration Laboratories (NABL) and International Laboratory Accreditation Cooperation (ILAC) accreditations ensure that labs follow the stringent quality protocols set up by these bodies. ViLife Diagnostics as an organisation works towards meeting industry standards to deliver quality healthcare for you and your loved ones.
        </p>
      </div>
      
      {/* Right side: Logos */}
      <div className="md:w-1/2 flex justify-center md:justify-end items-center gap-12">
        <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
          <img
            src="/images/ILAC.png"
            alt="ILAC Accredited"
            className="object-contain w-full h-full"
          />
        </div>
        <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
          <img
            src="/images/NABL-FINAL.png"
            alt="NABL Accredited"
            className="object-contain w-full h-full"
          />
        </div>
      </div>
      
    </div>
  </div>
</section>


     {/* Healthcare Packages Section */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-[#1c515c] mb-4">
        Healthcare Packages for Everyone
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Find the most suitable package for you from our range of ViLife Packages
      </p>
    </div>

    {/* Category Tabs */}
    <div className="flex justify-center mb-12">
      <div className="flex space-x-2 bg-white rounded-full p-1">
        <button className="px-6 py-2 bg-[#1c515c] text-white rounded-full font-medium text-sm">
          Most Booked
        </button>
        <button className="px-6 py-2 text-gray-600 hover:text-gray-800 rounded-full font-medium text-sm">
          Heart Health
        </button>
        <button className="px-6 py-2 text-gray-600 hover:text-gray-800 rounded-full font-medium text-sm">
          Full Body Checkup
        </button>
        <button className="px-6 py-2 text-gray-600 hover:text-gray-800 rounded-full font-medium text-sm">
          Sexual Health
        </button>
      </div>
    </div>

    {/* Package Cards */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
      {packages.map((pkg) => (
        <Link 
          key={pkg.id} 
          href={`/packages/${pkg.name.replace(/\s+/g, '-').replace(/[^a-zA-Z0-9-]/g, '').toLowerCase()}`}
          passHref
        >
          <div className="bg-white p-6 rounded-lg border hover:shadow-md transition-shadow duration-300 cursor-pointer">
            <h3 className="text-lg font-semibold text-teal-700 mb-4">{pkg.name}</h3>
            <div className="mb-3">
              <span className="text-2xl font-bold text-gray-800">INR {pkg.price}</span>
              <span className="text-sm text-gray-500 line-through ml-2">{pkg.original_price}</span>
            </div>
            <p className="text-sm text-gray-600 mb-6">{pkg.parameter_count} Parameters</p>
            {/* Updated "Book Now" button */}
            <button 
              className="w-full bg-[#7ac144] hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors duration-300"
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
    
    <div className="text-center">
      <Link href="/packages" passHref>
        <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-300">
          View All Packages
        </button>
      </Link>
    </div>
  </div>
</section>

      {/* Get Reports Faster Section */}
      <section className="py-20 bg-blue-50">
  <div className="container mx-auto px-4">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-4xl font-bold text-[#1c515c] mb-6">
          Get Your Test Reports Faster Than Ever
        </h2>
        <p className="text-lg text-gray-600 mb-8">
          Thanks to cutting-edge automation and thorough expert validation, we process your samples quickly while maintaining the highest quality standards. Most diagnostic reports are completed and shared within just 6–12 hours, ensuring you receive fast, accurate results when you need them most.
        </p>
        
        <div className="space-y-4">
          {[
            'Same-day report delivery for most tests',
            'Digital access via WhatsApp and Email', 
            'Expert-verified for 100% accuracy'
          ].map((item, index) => (
            <div key={index} className="flex items-center space-x-3">
              <div className="w-2 h-2 bg-teal-600 rounded-full flex-shrink-0"></div>
              <span className="text-gray-700 font-medium">{item}</span>
            </div>
          ))}
        </div>
      </div>
      
      <div className="relative">
        <div className="bg-white rounded-2xl p-8 overflow-hidden">
          {/* Microscope Image Placeholder */}
          <div className="w-full h-64  flex items-center justify-center overflow-hidden">
            <img 
              src="/images/ReportFast.png" 
              alt="Laboratory microscope"
              className="w-full h-full object-cover"
            />
          </div>
        </div>
      </div>
    </div>
  </div>
</section>

       {/* Clinical Trials Section */}
<section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-[#1c515c] mb-4">
        Centralized Pathology Laboratory for Multicentric Clinical Trials
      </h2>
      <p className="text-lg text-gray-600 max-w-3xl mx-auto">
        Reliable end-to-end sample solutions tailored for clinical trials
      </p>
    </div>

    {/* Features Grid */}
    <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
      {[
        {
          icon: (
            <svg className=" w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2ZM11 16H13V18H11V16ZM11 10H13V14H11V10Z"/>
            </svg>
          ),
          title: "State of the Art Technology",
        },
        {
          icon: (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 21H5V3H13V9H19V21ZM12 13C13.1 13 14 13.9 14 15S13.1 17 12 17 10 16.1 10 15 10.9 13 12 13M8 18H16V19H8V18Z"/>
            </svg>
          ),
          title: "Specialized Testing Expertise",
        },
        {
          icon: (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12L11 14L15 10M21 12C21 16.97 17.97 21 12 21C7.03 21 2 16.97 2 12C2 7.03 7.03 2 12 2C16.97 2 21 7.03 21 12Z"/>
            </svg>
          ),
          title: "Uncompromised Sample Integrity",
        },
        {
          icon: (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/>
            </svg>
          ),
          title: "Nationwide Coverage",
        }
      ].map((feature, index) => (
        <div key={index} className="text-center p-8 rounded-xl bg-blue-50">
          <div className="bg-[#1c515c] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">
            {feature.icon}
          </div>
          <h3 className="text-lg font-semibold text-[#1c515c] leading-tight">
            {feature.title}
          </h3>
        </div>
      ))}
    </div>

    {/* CTA Button */}
    <div className="text-center">
      <Link href="https://wa.me/918828826646?text=Hello%20ViLife%20Diagnostics.%20I%20would%20like%20to%20book%20a%20home%20visit." passHref>
        <button className="bg-[#7ac144] hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300">
          Connect for Clinical Trial Support
        </button>
      </Link>
    </div>
  </div>
</section>

      {/* Testimonials Section */}
<section className="py-20 bg-blue-50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-[#1c515c] mb-4">
        Why Customers Love ViLife Diagnostics?
      </h2>
      <p className="text-lg text-gray-600 max-w-4xl mx-auto">
        Here are some reviews of what our customers are saying about us and that's what makes us work hard each and every day.
      </p>
    </div>

    <div className="grid md:grid-cols-3 gap-8">
      {[
        {
          name: "Pooja Katkar",
          text: "I would highly recommend this ViLife diagnostics to others. Their patients service is excellent and results are Fast Very polite staff. Quick Response. and they keep their...",
          avatar: "👩‍💼"
        },
        {
          name: "Vishal Tekale", 
          text: "New diagnostic lab with high-tech equipment and experienced and supportive staff leads to most accurate reporting in health care. Best wishes to ViLife Diagnostics.",
          avatar: "👨‍💼"
        },
        {
          name: "Suman Maurya",
          text: "Had a very good Experience here. The new process of sample collection was very smooth and the staff was coordinating in a good manners",
          avatar: "👩‍🦰"
        }
      ].map((testimonial, index) => (
        <div key={index} className="bg-white rounded-xl p-6 transition-shadow duration-300">
          <p className="text-gray-700 mb-6 leading-relaxed text-sm">
            {testimonial.text}
          </p>
          <div className="flex items-center space-x-3">
            <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">
              {testimonial.avatar}
            </div>
            <div>
              <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
              <div className="flex space-x-1 mt-1">
                {[...Array(5)].map((_, i) => (
                  <svg key={i} className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
            </div>
          </div>
        </div>
      ))}
    </div>
  </div>
</section>

{/* Multiple Clinics Section */}
<section className="py-20 bg-white">
  <div className="container mx-auto px-4">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div className="relative">
        <div className="bg-white rounded-2xl overflow-hidden">
          <img 
            src="/images/GmapsLocation.png" 
            alt="ViLife Diagnostics locations on Google Maps"
            className="w-full h-96 object-cover"
          />
        </div>
      </div>
      
      <div>
        <h2 className="text-4xl font-bold text-[#1c515c] mb-6">
          Multiple Clinics, One Promise of Care
        </h2>
        <p className="text-lg text-gray-600 mb-8 leading-relaxed">
          Our clinics are strategically located near airports and major transport hubs, ensuring quick and easy access. Each center is equipped with world-class diagnostic facilities to deliver the highest standards of healthcare.
        </p>
        
        {/* Location List */}
        <div className="space-y-3 mb-8">
          {[
            {
              name: "Thane",
              address: "Thane Location",
              googleMapsUrl: "https://maps.google.com/?q=Thane+ViLife+Diagnostics"
            },
           
            {
              name: "Dombivli",
              address: "Dombivli Location",
              googleMapsUrl: "https://maps.google.com/?q=Dombivli+ViLife+Diagnostics"
            }
          ].map((location, index) => (
            <div 
              key={index} 
              className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer"
              onClick={() => window.open(location.googleMapsUrl, '_blank')}
            >
              <div className="flex items-center space-x-3">
                <div className="w-8 h-8 bg-[#7ac144] text-white rounded-full flex items-center justify-center text-sm font-bold">
                  {index + 1}
                </div>
                <div>
                  <h4 className="font-semibold text-gray-800">{location.name}</h4>
                  <p className="text-sm text-gray-600">{location.address}</p>
                </div>
              </div>
              <svg className="w-5 h-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
              </svg>
            </div>
          ))}
        </div>
        
       
      </div>
    </div>
  </div>
</section>

       
    <section className="py-20 bg-white">
      <div className="container mx-auto px-6 md:px-12 lg:px-20">
        <div className="flex flex-col-reverse md:flex-row md:items-center gap-12">
          
          {/* Left Side: Text Content and Button */}
          <div className="md:w-1/2 text-center md:text-left">
            <h2 className="text-3xl md:text-4xl font-bold text-[#1c515c] mb-6">
              ViLife Diagnostics
            </h2>
            <p className="text-gray-600 mx-auto md:mx-0 text-lg mb-6 leading-relaxed max-w-xl">
              ViLife Diagnostics believes in the ideology of quality, precision, timeliness. We are equipped with technologically advanced fully automated machinery carefully selected to provide accurate results. We conduct daily quality controls and are a part of several external quality assurance programs.
            </p>
            <Link href="/about" passHref>
              <button className="bg-transparent border border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                Read More
              </button>
            </Link>
          </div>

          {/* Right Side: Image Grid (Single image for this specific screenshot) */}
          <div className="md:w-1/2 flex justify-center md:justify-end">
            <div className="rounded-xl overflow-hidden">
              <Image
                src="/images/LabPhoto.webp" // Replace with your image path
                alt="ViLife Diagnostics Lab"
                width={700}
                height={500}
                layout="responsive"
              />
            </div>
          </div>
          
        </div>
      </div>
    </section>
  


{/* FAQ Section  */}
<section className="py-20 bg-blue-50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        Frequently Asked Questions
      </h2>
    </div>

    <div className="max-w-6xl mx-auto">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
        {[
          {
            question: "How many centers does ViLife Laboratory have in Maharashtra?",
            answer: "ViLife Diagnostics has multiple labs and collection centers located in Thane, Dombivli, and Navi Mumbai, with plans for more expansion in the future."
          },
          {
            question: "How long does it take to get my test results back?",
            answer: "Most test results are available within 24-48 hours. Some specialized tests may take 2-3 days. We provide same-day reports for routine tests."
          },
          {
            question: "How do you ensure the accuracy of your test results?",
            answer: "Our laboratory is NABL and ISO certified. We are equipped with technologically advanced fully automated machinery and conduct daily quality controls to ensure accurate results."
          },
          {
            question: "Can I request a copy of my pathology report?",
            answer: "Yes, you can request a digital copy of your pathology report via WhatsApp or email. Reports are also available for download on our patient portal."
          },
          {
            question: "What types of pathology tests does ViLife Laboratory offer?",
            answer: "We offer comprehensive diagnostic services including blood tests, urine analysis, health packages, diabetes monitoring, and specialized pathology tests."
          },
          {
            question: "What to check before selecting a diagnostic lab for blood tests?",
            answer: "You should look for a lab with NABL and ISO certifications, experienced pathologists, and a reputation for using modern technology to ensure accuracy and reliability."
          },
          {
            question: "Are your staff and lab technicians certified and licensed?",
            answer: "Yes, all of our staff and lab technicians are certified and licensed professionals with extensive experience in pathology and diagnostic services."
          },
          {
            question: "How will I receive my test results?",
            answer: "You will receive your test results digitally via WhatsApp and email. You can also download them directly from our website's patient dashboard."
          },
          {
            question: "Why is ViLife Laboratory the best in Mumbai?",
            answer: "ViLife Diagnostics is highly-rated for our commitment to quality, cutting-edge technology, NABL accreditation, and our convenient home collection and digital report services."
          },
          {
            question: "Do I need to make an appointment to have a pathology test done?",
            answer: "While walk-ins are welcome, we recommend booking an appointment in advance for home collection services or to minimize your waiting time at our centers."
          },
          {
            question: "What are the hours of operation for your lab?",
            answer: "Our collection centers are open from 6:30 AM to 7:30 PM. Please note that hours may vary on holidays, so it's best to call ahead."
          },
          {
            question: "Does ViLife Laboratory offer free home blood sampling in Mumbai?",
            answer: "Yes, we provide convenient home sample collection services across all our service areas in Mumbai and surrounding regions for most of our packages."
          },
        ].map((faq, index) => (
          <details key={index} className="group bg-white rounded-lg">
            <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
              <span className="font-semibold text-gray-800">{faq.question}</span>
              {/* This ChevronDownIcon will rotate 90 degrees when the details tag is open */}
              <ChevronRightIcon className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform duration-200" />
            </summary>
            <div className="px-6 pb-6">
              <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
            </div>
          </details>
        ))}
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
          <button className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
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

export default Homepage;