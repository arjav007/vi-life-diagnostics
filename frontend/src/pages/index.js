import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRightIcon } from '@heroicons/react/24/outline';

const Homepage = ({ packages }) => {
  const testimonials = [
    {
      name: 'Pooja Katkar',
      text: "I would highly recommend this ViLife diagnostics to others. Their patients service is excellent and results are Fast Very polite staff. Quick Response. and they keep their...",
      avatar: "👩‍💼"
    },
    {
      name: 'Vishal Tekale', 
      text: "New diagnostic lab with high-tech equipment and experienced and supportive staff leads to most accurate reporting in health care. Best wishes to ViLife Diagnostics.",
      avatar: "👨‍💼"
    },
    {
      name: 'Suman Maurya',
      text: "Had a very good Experience here. The new process of sample collection was very smooth and the staff was coordinating in a good manners",
      avatar: "👩‍🰰"
    }
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

      {/* Hero Section */}
      <section className="relative h-[90vh] md:min-h-screen bg-gray-900 overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url('/images/HomePhoto.jpg')` }}
        >
          <div className="absolute inset-0 bg-black/50"></div>
        </div>
        <div className="relative container mx-auto px-4 h-full flex items-center">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="text-white space-y-6">
              <div className="space-y-4">
                <h1 className="text-4xl lg:text-6xl font-bold leading-tight">
                  Your Health, 
                  <span className="text-[#7ac144]"> Our Priority</span>
                </h1>
                <p className="text-xl lg:text-2xl text-gray-200 leading-relaxed">
                  ViLife Diagnostics provides accurate, reliable, and timely pathology testing services to help you make confident, informed decisions about your health. Whatsapp us for home collection.
                </p>
              </div>
              <a
                href="https://wa.me/918828826646?text=Hello%20ViLife%20Diagnostics.%20I%20would%20like%20to%20book%20a%20test."
                target="_blank"
                rel="noopener noreferrer"
                className="inline-block bg-[#7ac144] hover:bg-emerald-600 text-white px-8 py-4 text-lg font-semibold rounded-xl transition-all duration-300 transform hover:scale-105"
              >
                Book a Test Now
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose Vi-Life Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1c515c] mb-4">
              Why Choose ViLife Diagnostics?
            </h2>
            <p className="text-xl text-gray-800 max-w-3xl mx-auto">
              ViLife Diagnostics firmly believes in providing quality healthcare with excellent customer service. Here are top 4 reasons why you should choose us.
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            {[
              { icon: '🎯', title: 'Quality Assurance', description: 'Reliable diagnostics backed by strict quality control standards' },
              { icon: '🔬', title: 'Precision Testing', description: 'Accurate and detailed results for informed healthcare decisions.' },
              { icon: '👨‍⚕️', title: 'Experienced Pathologists', description: 'Our team of experts brings years of experience to every diagnosis' },
              { icon: '⭐', title: '4.9 out of 5', description: 'Highly rated by patients for service excellence and reliable results.' }
            ].map((item, index) => (
              <div key={index} className="bg-blue-50 text-center p-8 rounded-xl transition-all duration-300 transform hover:-translate-y-2">
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
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-12">
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1c515c] mb-6">
                Trusted Accreditations
              </h2>
              <p className="text-gray-600 mx-auto md:mx-0 text-lg mb-8 leading-relaxed max-w-xl">
                National Accreditation Board for Testing and Calibration Laboratories (NABL) and International Laboratory Accreditation Cooperation (ILAC) accreditations ensure that labs follow the stringent quality protocols set up by these bodies. ViLife Diagnostics as an organisation works towards meeting industry standards to deliver quality healthcare for you and your loved ones.
              </p>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end items-center gap-12 md:gap-8">
              <div className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center">
                <Image 
                  src="/images/ILAC.png" 
                  alt="ILAC Accredited" 
                  width={160}
                  height={160}
                  className="object-contain" 
                />
              </div>
              <div className="w-28 h-28 md:w-32 md:h-32 flex items-center justify-center">
                <Image 
                  src="/images/NABL-FINAL.png" 
                  alt="NABL Accredited" 
                  width={120}
                  height={120}
                  className="object-contain" 
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Healthcare Packages Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1c515c] mb-4">
              Healthcare Packages for Everyone
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Find the most suitable package for you from our range of ViLife Packages
            </p>
          </div>
          <div className="flex justify-center mb-12">
            <div className="flex flex-wrap justify-center gap-2">
              <button className="px-5 py-2 bg-[#1c515c] text-white rounded-full font-medium text-sm transition-colors duration-300">Most Booked</button>
              <button className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-full font-medium text-sm border border-gray-300 transition-colors duration-300">Heart Health</button>
              <button className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-full font-medium text-sm border border-gray-300 transition-colors duration-300">Full Body Checkup</button>
              <button className="px-5 py-2 text-gray-600 hover:bg-gray-100 rounded-full font-medium text-sm border border-gray-300 transition-colors duration-300">Sexual Health</button>
            </div>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {packages.slice(0, 4).map((pkg) => (
              <Link key={pkg.id} href={`/packages/${pkg.slug || pkg.name.replace(/\s+/g, '-').toLowerCase()}`}>
                <a className="block bg-white p-6 rounded-lg border border-gray-200 hover:shadow-lg hover:-translate-y-1 transition-all duration-300">
                  <h3 className="text-lg font-semibold text-[#1c515c] mb-3 h-14">{pkg.name}</h3>
                  <div className="mb-4">
                    <span className="text-2xl font-bold text-gray-800">₹{pkg.price}</span>
                    {pkg.original_price && (<span className="text-sm text-gray-500 line-through ml-2">₹{pkg.original_price}</span>)}
                  </div>
                  <p className="text-sm text-gray-600 mb-6">{pkg.parameter_count} Parameters</p>
                  <div className="w-full bg-[#7ac144] text-white text-center py-2.5 rounded-md font-medium transition-colors duration-300">Book Now</div>
                </a>
              </Link>
            ))}
          </div>
          <div className="text-center">
            <Link href="/packages">
              <a className="inline-block border border-gray-400 text-gray-800 px-8 py-3 rounded-md hover:bg-gray-100 font-semibold transition-colors duration-300">
                View All Packages
              </a>
            </Link>
          </div>
        </div>
      </section>

      {/* Get Reports Faster Section */}
      <section className="py-16 bg-blue-50">
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
            <div className="relative w-full h-96 rounded-xl overflow-hidden">
              <Image 
                src="/images/ReportFast.png" 
                alt="Laboratory microscope"
                layout="fill"
                objectFit="cover"
                className="rounded-xl"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Clinical Trials Section */}
      <section className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1c515c] mb-4">
              Centralized Pathology Laboratory for Multicentric Clinical Trials
            </h2>
            <p className="text-lg text-gray-600 max-w-3xl mx-auto">
              Reliable end-to-end sample solutions tailored for clinical trials
            </p>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {[
              { icon: <svg className=" w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2L2 7V10C2 16 6 20.9 12 22C18 20.9 22 16 22 10V7L12 2ZM11 16H13V18H11V16ZM11 10H13V14H11V10Z"/></svg>, title: "State of the Art Technology" },
              { icon: <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C13.1 2 14 2.9 14 4C14 5.1 13.1 6 12 6C10.9 6 10 5.1 10 4C10 2.9 10.9 2 12 2ZM21 9V7L15 1H5C3.9 1 3 1.9 3 3V21C3 22.1 3.9 23 5 23H19C20.1 23 21 22.1 21 21V9ZM19 21H5V3H13V9H19V21ZM12 13C13.1 13 14 13.9 14 15S13.1 17 12 17 10 16.1 10 15 10.9 13 12 13M8 18H16V19H8V18Z"/></svg>, title: "Specialized Testing Expertise" },
              { icon: <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M9 12L11 14L15 10M21 12C21 16.97 17.97 21 12 21C7.03 21 2 16.97 2 12C2 7.03 7.03 2 12 2C16.97 2 21 7.03 21 12Z"/></svg>, title: "Uncompromised Sample Integrity" },
              { icon: <svg className="w-8 h-8 text-white" fill="currentColor" viewBox="0 0 24 24"><path d="M12 2C6.48 2 2 6.48 2 12S6.48 22 12 22 22 17.52 22 12 17.52 2 12 2ZM13 17H11V15H13V17ZM13 13H11V7H13V13Z"/></svg>, title: "Nationwide Coverage" }
            ].map((feature, index) => (
              <div key={index} className="text-center p-8 rounded-xl bg-blue-50">
                <div className="bg-[#1c515c] rounded-full w-16 h-16 flex items-center justify-center mx-auto mb-6">{feature.icon}</div>
                <h3 className="text-lg font-semibold text-[#1c515c] leading-tight">{feature.title}</h3>
              </div>
            ))}
          </div>
          <div className="text-center">
            <a 
              href="https://wa.me/918828826646?text=Hello%20ViLife%20Diagnostics.%20I%20would%20like%20to%20book%20a%20home%20visit." 
              target="_blank" 
              rel="noopener noreferrer" 
              className="inline-block bg-[#7ac144] hover:bg-green-600 text-white px-8 py-3 rounded-lg font-medium transition-colors duration-300"
            >
              Connect for Clinical Trial Support
            </a>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-[#1c515c] mb-4">
              Why Customers Love ViLife Diagnostics?
            </h2>
            <p className="text-lg text-gray-600 max-w-4xl mx-auto">
              Here are some reviews of what our customers are saying about us and that&apos;s what makes us work hard each and every day.
            </p>
          </div>
          <div className="grid md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-white rounded-xl p-6 transition-shadow duration-300">
                <p className="text-gray-700 mb-6 leading-relaxed text-sm">{testimonial.text}</p>
                <div className="flex items-center space-x-3">
                  <div className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center text-xl">{testimonial.avatar}</div>
                  <div>
                    <h4 className="font-semibold text-gray-800">{testimonial.name}</h4>
                    <div className="flex space-x-1 mt-1">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-4 h-4 text-orange-400" fill="currentColor" viewBox="0 0 20 20"><path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" /></svg>
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
      <section className="py-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div className="relative">
              <div className="bg-white rounded-2xl overflow-hidden">
                <Image 
                  src="/images/GmapsLocation.png" 
                  alt="ViLife Diagnostics locations on Google Maps"
                  width={600}
                  height={400}
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
              <div className="space-y-3 mb-8">
                {[
                  { name: "Thane", address: "Thane Location", googleMapsUrl: "https://maps.google.com/?q=Thane+ViLife+Diagnostics" },
                  { name: "Dombivli", address: "Dombivli Location", googleMapsUrl: "https://maps.google.com/?q=Dombivli+ViLife+Diagnostics" }
                ].map((location, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors duration-200 cursor-pointer" onClick={() => window.open(location.googleMapsUrl, '_blank')}>
                    <div className="flex items-center space-x-3">
                      <div className="w-8 h-8 bg-[#7ac144] text-white rounded-full flex items-center justify-center text-sm font-bold">{index + 1}</div>
                      <div>
                        <h4 className="font-semibold text-gray-800">{location.name}</h4>
                        <p className="text-sm text-gray-600">{location.address}</p>
                      </div>
                    </div>
                    <ChevronRightIcon className="w-5 h-5 text-gray-400" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* About ViLife Section */}
      <section className="py-16 bg-white">
        <div className="container mx-auto px-6 md:px-12 lg:px-20">
          <div className="flex flex-col-reverse md:flex-row md:items-center gap-12">
            <div className="md:w-1/2 text-center md:text-left">
              <h2 className="text-3xl md:text-4xl font-bold text-[#1c515c] mb-6">
                ViLife Diagnostics
              </h2>
              <p className="text-gray-600 mx-auto md:mx-0 text-lg mb-6 leading-relaxed max-w-xl">
                ViLife Diagnostics believes in the ideology of quality, precision, timeliness. We are equipped with technologically advanced fully automated machinery carefully selected to provide accurate results. We conduct daily quality controls and are a part of several external quality assurance programs.
              </p>
              <Link href="/about">
                <a className="inline-block bg-transparent border border-gray-400 text-gray-700 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300">
                  Read More
                </a>
              </Link>
            </div>
            <div className="md:w-1/2 flex justify-center md:justify-end">
              <div className="rounded-xl overflow-hidden w-full relative h-96">
                <Image
                  src="/images/LabPhoto.webp"
                  alt="ViLife Diagnostics Lab"
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-16 bg-blue-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-bold text-gray-800 mb-4">
              Frequently Asked Questions
            </h2>
          </div>
          <div className="max-w-6xl mx-auto">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-x-8 gap-y-4">
              {[
                { question: "How many centers does ViLife Laboratory have in Maharashtra?", answer: "ViLife Diagnostics has multiple labs and collection centers located in Thane, Dombivli, and Navi Mumbai, with plans for more expansion in the future." },
                { question: "How long does it take to get my test results back?", answer: "Most test results are available within 24-48 hours. Some specialized tests may take 2-3 days. We provide same-day reports for routine tests." },
                { question: "How do you ensure the accuracy of your test results?", answer: "Our laboratory is NABL and ISO certified. We are equipped with technologically advanced fully automated machinery and conduct daily quality controls to ensure accurate results." },
                { question: "Can I request a copy of my pathology report?", answer: "Yes, you can request a digital copy of your pathology report via WhatsApp or email. Reports are also available for download on our patient portal." },
                { question: "What types of pathology tests does ViLife Laboratory offer?", answer: "We offer comprehensive diagnostic services including blood tests, urine analysis, health packages, diabetes monitoring, and specialized pathology tests." },
                { question: "What to check before selecting a diagnostic lab for blood tests?", answer: "You should look for a lab with NABL and ISO certifications, experienced pathologists, and a reputation for using modern technology to ensure accuracy and reliability." },
                { question: "Are your staff and lab technicians certified and licensed?", answer: "Yes, all of our staff and lab technicians are certified and licensed professionals with extensive experience in pathology and diagnostic services." },
                { question: "How will I receive my test results?", answer: "You will receive your test results digitally via WhatsApp and email. You can also download them directly from our website's patient dashboard." },
                { question: "Why is ViLife Laboratory the best in Mumbai?", answer: "ViLife Diagnostics is highly-rated for our commitment to quality, cutting-edge technology, NABL accreditation, and our convenient home collection and digital report services." },
                { question: "Do I need to make an appointment to have a pathology test done?", answer: "While walk-ins are welcome, we recommend booking an appointment in advance for home collection services or to minimize your waiting time at our centers." },
                { question: "What are the hours of operation for your lab?", answer: "Our collection centers are open from 6:30 AM to 7:30 PM. Please note that hours may vary on holidays, so it's best to call ahead." },
                { question: "Does ViLife Laboratory offer free home blood sampling in Mumbai?", answer: "Yes, we provide convenient home sample collection services across all our service areas in Mumbai and surrounding regions for most of our packages." },
              ].map((faq, index) => (
                <details key={index} className="group bg-white rounded-lg">
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
        </div>
      </section>

     {/* Home Collection CTA Section */}
      <section className="relative py-16 md:py-20 overflow-hidden">
        <div className="absolute inset-0 bg-cover bg-center bg-no-repeat" style={{ backgroundImage: `url('/images/BookHomeCollection.jpg')` }}>
          <div className="absolute inset-0 bg-black/80"></div>
        </div>
        <div className="relative container mx-auto px-4">
          <div className="flex flex-col items-center text-center gap-8 md:flex-row md:justify-between md:text-left">
            <div className="text-white">
              <h2 className="text-3xl md:text-4xl font-bold mb-3">Book Your Home Collection</h2>
              <p className="text-lg md:text-xl text-gray-200">Get exclusive packages on your first healthcare test.</p>
            </div>
            <div className="flex-shrink-0">
              <a 
                href="https://wa.me/918828826646?text=Hello%20ViLife%20Diagnostics.%20I%20would%20like%20to%20book%20a%20home%20visit." 
                target="_blank" 
                rel="noopener noreferrer" 
                className="inline-block bg-white text-gray-800 px-8 py-3 rounded-lg font-semibold hover:bg-gray-100 transition-colors duration-300"
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

export async function getServerSideProps() {
  let packages = [];
  try {
    const baseUrl = process.env.NEXT_PUBLIC_BASE_URL || 'http://localhost:3000';
    const response = await fetch(`${baseUrl}/api/package-api`);
    if (response.ok) {
      packages = await response.json();
    } else {
      console.error("Failed to fetch packages for homepage, status:", response.status);
    }
  } catch (error) {
    console.error("Error fetching packages for homepage:", error);
  }
  return {
    props: {
      packages,
    },
  };
}

export default Homepage;