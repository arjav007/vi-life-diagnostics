import React from 'react';
import Link from 'next/link';
import Image from 'next/image'; // Import the Next.js Image component
import { Phone, MapPin, Mail, Clock } from 'lucide-react';

const Footer = () => {
  const whatsappNumber = '918828826646';

  const whatsappMessage = {
    prescription: 'Hello, ViLife Diagnostics. Here is my doctor\'s prescription.',
    reports: 'Hello, ViLife Diagnostics. Kindly share me my reports.'
  };

  return (
    <footer className="bg-[#244d59] text-white py-12">
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Company Info Section */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3 mb-6">
              {/* FIX 1: Replaced <img> with next/image <Image> for optimization */}
              <Image 
                src="/images/footer-logo.png" 
                alt="ViLife Diagnostics" 
                width={180} // Specify width
                height={48}  // Specify height
              />
            </div>
            <h3 className="text-xl font-semibold mb-4">Your Health Our Priority</h3>
            <p className="text-gray-300 leading-relaxed">
              {/* FIX 2: Escaped the apostrophe in "we're" */}
              ViLife Diagnostics delivers accurate, reliable, and timely pathology testing services to help you make confident, informed decisions about your health. With expert professionals and trusted accreditations, we&apos;re committed to your well-being at every step.
            </p>
          </div>

          {/* Quick Links Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Quick Link</h3>
            <ul className="space-y-3">
              <li>
                <Link href="/" className="text-gray-300 hover:text-white transition-colors">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-white transition-colors">
                  About Us
                </Link>
              </li>
              <li>
                <Link href="/packages" className="text-gray-300 hover:text-white transition-colors">
                  Health Packages
                </Link>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage.prescription)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Upload Prescription
                </a>
              </li>
              <li>
                <a 
                  href={`https://wa.me/${whatsappNumber}?text=${encodeURIComponent(whatsappMessage.reports)}`} 
                  target="_blank" 
                  rel="noopener noreferrer" 
                  className="text-gray-300 hover:text-white transition-colors"
                >
                  Download Reports
                </a>
              </li>
              <li>
                {/* FIX 3: Changed to a proper Link component for the /blogs page */}
                <Link href="/blogs" className="text-gray-300 hover:text-white transition-colors">
                  Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* Contact Us Section */}
          <div className="space-y-4">
            <h3 className="text-xl font-semibold mb-4">Contact Us</h3>
            <div className="space-y-4">
              <div className="flex items-center space-x-3">
                <Phone className="h-5 w-5 text-lime-400 flex-shrink-0" />
                <span className="text-gray-300">+91 882-882-6646</span>
              </div>
              
              <div className="flex items-start space-x-3">
                <MapPin className="h-5 w-5 text-lime-400 flex-shrink-0 mt-1" />
                <div className="text-gray-300">
                  <p>Casting Company, Unit 1A & B, 1st Floor, Shreeji Arcade,</p>
                  <p>opp. Nitin - Cadbury Flyover, Panch Pakhdi, Thane,</p>
                  <p>Maharashtra 400602</p>
                </div>
              </div>
              
              <div className="flex items-center space-x-3">
                <Mail className="h-5 w-5 text-lime-400 flex-shrink-0" />
                <a href="mailto:info@viliifediagnostics.com" className="text-gray-300 hover:text-white transition-colors">
                  info@viliifediagnostics.com
                </a>
              </div>
              
              <div className="flex items-start space-x-3">
                <Clock className="h-5 w-5 text-lime-400 flex-shrink-0 mt-1" />
                <div className="text-gray-300">
                  <p>Call Center: 24x7</p>
                  <p>Collection Centers: 6:30 AM - 7:30 PM</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Bottom Section (The /locations link was already correctly using <Link>) */}
        <div className="border-t border-teal-100 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-300 text-sm">
              © 2025 ViLife Diagnostics. All Rights Reserved.
            </p>
            <div className="flex space-x-3 mt-4 md:mt-0">
              <a 
                href={`tel:+${whatsappNumber}`} 
                className="bg-lime-500 hover:bg-lime-600 transition-colors rounded-full p-2"
                aria-label="Phone"
              >
                <Phone className="h-5 w-5 text-white" />
              </a>
              <Link 
                href="/locations" 
                className="bg-lime-500 hover:bg-lime-600 transition-colors rounded-full p-2"
                aria-label="Location"
              >
                <MapPin className="h-5 w-5 text-white" />
              </Link>
              <a 
                href="mailto:info@viliifediagnostics.com" 
                className="bg-lime-500 hover:bg-lime-600 transition-colors rounded-full p-2"
                aria-label="Email"
              >
                <Mail className="h-5 w-5 text-white" />
              </a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
