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
    // Fetch featured packages
    const fetchPackages = async () => {
      try {
        const response = await fetch('/api/packages?featured=true');
        const data = await response.json();
        setPackages(data.packages || []);
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

      {/* Hero Section */}
      <section className="relative min-h-screen bg-gradient-to-br from-emerald-900 via-teal-800 to-cyan-900 overflow-hidden">
        {/* Background Pattern */}
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-20 left-10 w-32 h-32 border-2 border-white/20 rounded-full"></div>
          <div className="absolute top-40 right-20 w-24 h-24 border-2 border-white/15 rounded-full"></div>
          <div className="absolute bottom-40 left-1/4 w-40 h-40 border-2 border-white/10 rounded-full"></div>
        </div>

        {/* Medical Equipment Overlay */}
        <div className="absolute inset-0 bg-black/20"></div>
        
        <div className="relative container mx-auto px-4 py-20 lg:py-32">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-8">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Your Health, 
                  <span className="text-emerald-300"> Our Priority</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed">
                  Vi-Life Diagnostics delivers accurate, reliable, and timely pathology testing services to help you make confident, informed decisions about your health.
                </p>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button 
                  variant="primary" 
                  size="lg"
                  className="bg-emerald-500 hover:bg-emerald-600 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
                >
                  Book a Home Visit
                </Button>
                <Button 
                  variant="outline" 
                  size="lg"
                  className="border-2 border-white text-white hover:bg-emerald-600 hover:text-teal-800 px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300"
                >
                  View Packages
                </Button>
              </div>

              {/* Contact Info */}
              <div className="flex flex-wrap gap-6 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <PhoneIcon className="w-5 h-5 text-emerald-300" />
                  <span>+91 882-882-6646</span>
                </div>
                <div className="flex items-center gap-2">
                  <ClockIcon className="w-5 h-5 text-emerald-300" />
                  <span>6:30 AM - 7:30 PM</span>
                </div>
              </div>
            </div>

            {/* Features Grid */}
            <div className="grid grid-cols-2 gap-4 lg:gap-6">
              {heroFeatures.map((feature, index) => (
                <Card 
                  key={index}
                  className="bg-white/10 backdrop-blur-lg border-white/20 p-6 text-white hover:bg-white/15 transition-all duration-300 transform hover:scale-105"
                >
                  <div className="text-3xl mb-3">{feature.icon}</div>
                  <h3 className="font-semibold text-lg mb-2">{feature.title}</h3>
                  <p className="text-gray-200 text-sm leading-relaxed">{feature.description}</p>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Vi-Life Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Why Choose ViLife Diagnostics?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              We combine cutting-edge technology with expert care to deliver reliable diagnostic services you can trust.
            </p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              {
                icon: '🎯',
                title: 'Quality Assurance',
                description: 'NABL accredited laboratory with stringent quality control measures'
              },
              {
                icon: '🔬',
                title: 'Precision Testing',
                description: 'Advanced equipment and experienced pathologists for accurate results'
              },
              {
                icon: '👨‍⚕️',
                title: 'Experienced Pathologists',
                description: 'Expert team with years of experience in diagnostic medicine'
              },
              {
                icon: '⭐',
                title: '4.9 out of 5',
                description: 'Highly rated by thousands of satisfied customers across Mumbai'
              }
            ].map((item, index) => (
              <Card key={index} className="text-center p-8 hover:shadow-lg transition-all duration-300 transform hover:-translate-y-2">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-xl font-semibold text-gray-800 mb-3">{item.title}</h3>
                <p className="text-gray-600">{item.description}</p>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Accreditations Section */}
      <section className="py-16 bg-blue-50">
  <div className="container mx-auto px-6 md:px-12 lg:px-20 text-center">
    {/* Heading */}
    <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-6">
      Trusted Accreditations
    </h2>

    {/* Description */}
    <p className="text-gray-600 max-w-3xl mx-auto text-lg mb-10 leading-relaxed">
      National Accreditation Board for Testing and Calibration Laboratories (NABL) and International Laboratory Accreditation Cooperation (ILAC) accreditations ensure that labs follow the stringent quality protocols set up by these bodies. ViLife Diagnostics as an organisation works towards meeting industry standards to deliver quality healthcare for you and your loved ones.
    </p>

    {/* Logos */}
    <div className="flex justify-center items-center gap-12">
      <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
        <img
          src="/images/NABL.png"
          alt="NABL Accredited"
          className="object-contain w-full h-full"
        />
      </div>
      <div className="w-32 h-32 md:w-40 md:h-40 flex items-center justify-center">
        <img
          src="/images/ILAC.png"
          alt="ILAC Accredited"
          className="object-contain w-full h-full"
        />
      </div>
    </div>
  </div>
</section>


      {/* Healthcare Packages Section */}
      <section className="py-20 bg-gray-50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-gray-800 mb-4">
        Healthcare Packages for Everyone
      </h2>
      <p className="text-lg text-gray-600 max-w-2xl mx-auto">
        Find the most suitable package for you from our range of ViLife Packages
      </p>
    </div>

    {/* Category Tabs */}
    <div className="flex justify-center mb-12">
      <div className="flex space-x-2 bg-white rounded-full p-1 shadow-sm">
        <button className="px-6 py-2 bg-teal-600 text-white rounded-full font-medium text-sm">
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
      {[
        {
          name: "ViLife Adult Female",
          price: "2,999",
          originalPrice: "5,999",
          parameters: "9 Parameters"
        },
        {
          name: "ViLife Adult Female",
          price: "2,999",
          originalPrice: "5,999",
          parameters: "9 Parameters"
        },
        {
          name: "ViLife Adult Male",
          price: "2,999",
          originalPrice: "5,999",
          parameters: "9 Parameters"
        },
        {
          name: "ViLife Diabetes Advance",
          price: "2,999",
          originalPrice: "5,999",
          parameters: "9 Parameters"
        }
      ].map((pkg, index) => (
        <div key={index} className="bg-white rounded-lg p-6 shadow-sm border hover:shadow-md transition-shadow duration-300">
          <h3 className="text-lg font-semibold text-teal-700 mb-4">{pkg.name}</h3>
          <div className="mb-3">
            <span className="text-2xl font-bold text-gray-800">INR {pkg.price}</span>
            <span className="text-sm text-gray-500 line-through ml-2">{pkg.originalPrice}</span>
          </div>
          <p className="text-sm text-gray-600 mb-6">{pkg.parameters}</p>
          <button className="w-full bg-green-500 hover:bg-green-600 text-white py-3 rounded-lg font-medium transition-colors duration-300">
            Book Now
          </button>
        </div>
      ))}
    </div>
    
    <div className="text-center">
      <button className="border border-gray-300 text-gray-700 px-8 py-3 rounded-lg hover:bg-gray-50 transition-colors duration-300">
        View All Packages
      </button>
    </div>
  </div>
</section>

      {/* Get Reports Faster Section */}
      <section className="py-20 bg-blue-50">
  <div className="container mx-auto px-4">
    <div className="grid lg:grid-cols-2 gap-12 items-center">
      <div>
        <h2 className="text-4xl font-bold text-gray-800 mb-6">
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
        <div className="bg-white rounded-2xl p-8 shadow-lg">
          {/* Microscope Image Placeholder */}
          <div className="w-full h-64 bg-gray-200 rounded-xl mb-4 flex items-center justify-center overflow-hidden">
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
      <h2 className="text-4xl font-bold text-teal-700 mb-4">
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
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2ZM11 16H13V18H11V16ZM11 10H13V14H11V10Z"/>
            </svg>
          ),
          title: "State of the Art Technology",
          bgColor: "bg-blue-100"
        },
        {
          icon: (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 21H5V3H13V9H19V21ZM12 13C13.1 13 14 13.9 14 15S13.1 17 12 17 10 16.1 10 15 10.9 13 12 13M8 18H16V19H8V18Z"/>
            </svg>
          ),
          title: "Specialized Testing Expertise",
          bgColor: "bg-blue-100"
        },
        {
          icon: (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M9 12L11 14L15 10M21 12C21 16.97 17.97 21 12 21C7.03 21 2 16.97 2 12C2 7.03 7.03 2 12 2C16.97 2 21 7.03 21 12Z"/>
            </svg>
          ),
          title: "Uncompromised Sample Integrity",
          bgColor: "bg-blue-100"
        },
        {
          icon: (
            <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24">
              <path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/>
            </svg>
          ),
          title: "Nationwide Coverage",
          bgColor: "bg-blue-100"
        }
      ].map((feature, index) => (
        <div key={index} className="text-center">
          <div className={`${feature.bgColor} rounded-full w-20 h-20 flex items-center justify-center mx-auto mb-6`}>
            <div className="w-12 h-12 bg-teal-600 rounded-full flex items-center justify-center">
              {feature.icon}
            </div>
          </div>
          <h3 className="text-lg font-semibold text-teal-700 leading-tight">
            {feature.title}
          </h3>
        </div>
      ))}
    </div>

    {/* CTA Button */}
    <div className="text-center">
      <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300">
        Connect for Clinical Trial Support
      </button>
    </div>
  </div>
</section>

      {/* Testimonials Section */}
<section className="py-20 bg-blue-50">
  <div className="container mx-auto px-4">
    <div className="text-center mb-16">
      <h2 className="text-4xl font-bold text-teal-700 mb-4">
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
        <div key={index} className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-300">
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
        <div className="bg-white rounded-2xl shadow-lg overflow-hidden">
          <img 
            src="/images/GmapsLocation.png" 
            alt="ViLife Diagnostics locations on Google Maps"
            className="w-full h-96 object-cover"
          />
        </div>
      </div>
      
      <div>
        <h2 className="text-4xl font-bold text-teal-700 mb-6">
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
              name: "Bhiwandi", 
              address: "Bhiwandi Location",
              googleMapsUrl: "https://maps.google.com/?q=Bhiwandi+ViLife+Diagnostics"
            },
            {
              name: "Vashi",
              address: "Vashi Location", 
              googleMapsUrl: "https://maps.google.com/?q=Vashi+ViLife+Diagnostics"
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
                <div className="w-8 h-8 bg-green-500 text-white rounded-full flex items-center justify-center text-sm font-bold">
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
        
        <button className="bg-green-500 hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300">
          View All Locations
        </button>
      </div>
    </div>
  </div>
</section>

      {/* FAQ Section */}
      <section className="py-20 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
          </div>

          <div className="max-w-4xl mx-auto space-y-4">
            {[
              {
                question: "How many samples does ViLife Laboratory have in Bhiwandi?",
                answer: "We have multiple collection centers in Bhiwandi to serve you better with convenient sample collection services."
              },
              {
                question: "How long does it take to get my test results back?",
                answer: "Most test results are available within 24-48 hours. Some specialized tests may take 2-3 days. We provide same-day reports for routine tests."
              },
              {
                question: "What types of testing does ViLife Diagnostics offer?",
                answer: "We offer comprehensive diagnostic services including blood tests, urine analysis, health packages, diabetes monitoring, and specialized pathology tests."
              },
              {
                question: "Do you provide home sample collection?",
                answer: "Yes, we provide convenient home sample collection services across all our service areas in Mumbai and surrounding regions."
              }
            ].map((faq, index) => (
              <details key={index} className="group bg-white rounded-lg shadow-sm">
                <summary className="flex justify-between items-center p-6 cursor-pointer hover:bg-gray-50 transition-colors duration-200">
                  <span className="font-semibold text-gray-800">{faq.question}</span>
                  <ChevronRightIcon className="w-5 h-5 text-gray-400 group-open:rotate-90 transition-transform duration-200" />
                </summary>
                <div className="px-6 pb-6">
                  <p className="text-gray-600 leading-relaxed">{faq.answer}</p>
                </div>
              </details>
            ))}
          </div>
        </div>
      </section>

      {/* Home Collection CTA Section */}
<section className="relative py-16 overflow-hidden">
  {/* Background Image Overlay */}
  <div className="absolute inset-0 bg-gradient-to-r from-black/70 via-black/60 to-black/70"></div>
  
  {/* Background Image */}
  <div 
    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
    style={{
      backgroundImage: `url('/images/BookHomeCollection.jpg')` // This is a placeholder - replace with your actual image path
    }}
  ></div>

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
        <button className="bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300 shadow-lg">
          Book a Home Visit
        </button>
      </div>
    </div>
  </div>
</section>
    </>
  );
};

export default Homepage;
